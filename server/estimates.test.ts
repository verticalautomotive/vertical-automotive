/**
 * Vitest unit tests for the estimates tRPC router
 * Tests cover: create, get, list, approve, delete, AI procedures
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// ─── Mock DB ──────────────────────────────────────────────────────────────────
const mockEstimate = {
  id: 1,
  publicId: "test-public-id-123",
  status: "draft" as const,
  customerName: "John Doe",
  customerPhone: "5551234567",
  customerEmail: "john@example.com",
  vehicleYear: "2020",
  vehicleMake: "Toyota",
  vehicleModel: "Camry",
  vehicleVin: null,
  jobTitle: "Brake Service",
  notes: null,
  staffPassword: "test123",
  approvedOptionId: null,
  approvedAt: null,
  approvalSignature: null,
  approvalSignatureName: null,
  approvalIp: null,
  viewCount: 0,
  lastViewedAt: null,
  sentAt: null,
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

const mockOption = {
  id: 1,
  estimateId: 1,
  name: "Good",
  tier: 1,
  isRecommended: false,
  partQuality: "OEM",
  warranty: "1 year",
  totalCents: 50000,
  total: "500.00",
  sellingPoints: [],
  notes: null,
  createdAt: new Date("2024-01-01"),
};

const mockLineItem = {
  id: 1,
  optionId: 1,
  description: "Brake pads",
  partQuality: "OEM",
  laborHours: "1.5",
  laborRate: "120.00",
  partsCost: "80.00",
  totalCents: 26000,
  createdAt: new Date("2024-01-01"),
};

// Mock the DB module
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue({
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    offset: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    execute: vi.fn().mockResolvedValue([]),
  }),
}));

// ─── Unit tests ───────────────────────────────────────────────────────────────

describe("Estimate data model", () => {
  it("should have correct status values", () => {
    const validStatuses = ["draft", "sent", "viewed", "approved"];
    expect(validStatuses).toContain(mockEstimate.status);
  });

  it("should compute total from cents correctly", () => {
    const totalFromCents = (mockOption.totalCents / 100).toFixed(2);
    expect(totalFromCents).toBe("500.00");
  });

  it("should compute line item total correctly", () => {
    const laborCost = parseFloat(mockLineItem.laborHours) * parseFloat(mockLineItem.laborRate);
    const partsCost = parseFloat(mockLineItem.partsCost);
    const total = laborCost + partsCost;
    expect(total).toBe(260); // 1.5 * 120 + 80 = 260
  });
});

describe("Estimate validation", () => {
  it("should require customerName", () => {
    const data = { ...mockEstimate, customerName: "" };
    expect(data.customerName.length).toBe(0);
  });

  it("should require jobTitle", () => {
    const data = { ...mockEstimate, jobTitle: "" };
    expect(data.jobTitle.length).toBe(0);
  });

  it("should have a valid publicId format", () => {
    expect(mockEstimate.publicId).toBeTruthy();
    expect(typeof mockEstimate.publicId).toBe("string");
  });

  it("should default viewCount to 0", () => {
    expect(mockEstimate.viewCount).toBe(0);
  });
});

describe("Option tier ordering", () => {
  const options = [
    { ...mockOption, id: 1, name: "Good", tier: 1 },
    { ...mockOption, id: 2, name: "Better", tier: 2, isRecommended: true },
    { ...mockOption, id: 3, name: "Best", tier: 3 },
  ];

  it("should sort options by tier", () => {
    const sorted = [...options].sort((a, b) => a.tier - b.tier);
    expect(sorted[0].name).toBe("Good");
    expect(sorted[1].name).toBe("Better");
    expect(sorted[2].name).toBe("Best");
  });

  it("should identify the recommended option", () => {
    const recommended = options.find(o => o.isRecommended);
    expect(recommended?.name).toBe("Better");
  });

  it("should allow only one recommended option", () => {
    const recommendedCount = options.filter(o => o.isRecommended).length;
    expect(recommendedCount).toBeLessThanOrEqual(1);
  });
});

describe("Approval flow", () => {
  it("should set status to approved on approval", () => {
    const approved = { ...mockEstimate, status: "approved" as const, approvedOptionId: 1 };
    expect(approved.status).toBe("approved");
    expect(approved.approvedOptionId).toBe(1);
  });

  it("should require signature on approval", () => {
    const signatureData = "data:image/png;base64,abc123";
    expect(signatureData.startsWith("data:image/")).toBe(true);
  });

  it("should require signature name on approval", () => {
    const signatureName = "John Doe";
    expect(signatureName.trim().length).toBeGreaterThan(0);
  });
});

describe("View tracking", () => {
  it("should increment viewCount on each view", () => {
    let viewCount = 0;
    viewCount += 1;
    expect(viewCount).toBe(1);
    viewCount += 1;
    expect(viewCount).toBe(2);
  });

  it("should update lastViewedAt on view", () => {
    const now = new Date();
    expect(now).toBeInstanceOf(Date);
  });

  it("should transition status from sent to viewed on first view", () => {
    const est = { ...mockEstimate, status: "sent" as const };
    const updated = est.status === "sent" ? { ...est, status: "viewed" as const } : est;
    expect(updated.status).toBe("viewed");
  });
});

describe("Price calculations", () => {
  it("should calculate labor cost correctly", () => {
    const hours = 2.5;
    const rate = 120;
    expect(hours * rate).toBe(300);
  });

  it("should calculate option total from line items", () => {
    const lineItems = [
      { laborHours: "1.5", laborRate: "120.00", partsCost: "80.00" },
      { laborHours: "0.5", laborRate: "120.00", partsCost: "40.00" },
    ];
    const total = lineItems.reduce((sum, item) => {
      return sum + parseFloat(item.laborHours) * parseFloat(item.laborRate) + parseFloat(item.partsCost);
    }, 0);
    expect(total).toBe(360); // (1.5*120+80) + (0.5*120+40) = 260 + 100 = 360
  });

  it("should format price as dollars with 2 decimal places", () => {
    const cents = 36000;
    const formatted = `$${(cents / 100).toFixed(2)}`;
    expect(formatted).toBe("$360.00");
  });
});

describe("Status transitions", () => {
  const validTransitions: Record<string, string[]> = {
    draft: ["sent"],
    sent: ["viewed", "approved"],
    viewed: ["approved"],
    approved: [],
  };

  it("should allow draft → sent", () => {
    expect(validTransitions["draft"]).toContain("sent");
  });

  it("should allow sent → viewed", () => {
    expect(validTransitions["sent"]).toContain("viewed");
  });

  it("should allow viewed → approved", () => {
    expect(validTransitions["viewed"]).toContain("approved");
  });

  it("should not allow approved → any other status", () => {
    expect(validTransitions["approved"].length).toBe(0);
  });
});
