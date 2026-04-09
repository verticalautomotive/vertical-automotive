import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle, Search, Filter, ChevronLeft, ChevronRight, Download, AlertTriangle } from "lucide-react";
import { useState, useMemo } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Conversation = {
  id: number;
  messages: Message[];
  language: "en" | "es";
  sessionId: string | null;
  createdAt: Date;
};

export default function AdminConversations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState<"all" | "en" | "es">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const pageSize = 20;

  // Fetch conversations
  const { data: conversationsData, isLoading: isLoadingConversations } = trpc.conversations.list.useQuery(
    {
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
      language: language === "all" ? undefined : language,
      search: searchQuery || undefined,
    }
  );

  // Fetch stats
  const { data: stats } = trpc.conversations.stats.useQuery();

  const conversations = conversationsData?.conversations || [];
  const total = conversationsData?.total || 0;
  const totalPages = Math.ceil(total / pageSize);

  // Parse message dates if needed
  const parsedConversations = useMemo(() => {
    return conversations.map(c => ({
      ...c,
      createdAt: c.createdAt instanceof Date ? c.createdAt : new Date(c.createdAt),
      language: (c.language === "en" || c.language === "es" ? c.language : "en") as "en" | "es",
    }));
  }, [conversations]);

  const handlePreviousPage = () => {
    setCurrentPage(p => Math.max(1, p - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(p => Math.min(totalPages, p + 1));
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setLanguage("all");
    setCurrentPage(1);
  };

  const handleExportCSV = () => {
    if (conversations.length === 0) return;

    // Prepare CSV data
    const csvHeaders = ["ID", "Language", "Messages", "Created At", "Session ID"];
    const csvRows = conversations.map((c) => [
      c.id,
      c.language.toUpperCase(),
      c.messages.length,
      new Date(c.createdAt).toISOString(),
      c.sessionId || "N/A",
    ]);

    // Create CSV content
    const csvContent = [
      csvHeaders.join(","),
      ...csvRows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    // Download CSV
    const element = document.createElement("a");
    element.setAttribute("href", `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`);
    element.setAttribute("download", `conversations-${new Date().toISOString().split("T")[0]}.csv`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Conversation Logs</h1>
          <p className="text-muted-foreground">View and search all logged customer conversations</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6">
              <div className="text-sm font-medium text-muted-foreground mb-2">Total Conversations</div>
              <div className="text-3xl font-bold text-foreground">{stats.total}</div>
            </Card>
            <Card className="p-6">
              <div className="text-sm font-medium text-muted-foreground mb-2">English</div>
              <div className="text-3xl font-bold text-foreground">{stats.byLanguage.en}</div>
            </Card>
            <Card className="p-6">
              <div className="text-sm font-medium text-muted-foreground mb-2">Spanish</div>
              <div className="text-3xl font-bold text-foreground">{stats.byLanguage.es}</div>
            </Card>
          </div>
        )}

        {/* Search & Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>
            <Select value={language} onValueChange={(val) => {
              setLanguage(val as "all" | "en" | "es");
              setCurrentPage(1);
            }}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleClearFilters}>
              <Filter className="w-4 h-4 mr-2" />
              Clear
            </Button>
            <Button variant="outline" onClick={handleExportCSV} disabled={conversations.length === 0}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </Card>

        {/* Conversations List */}
        <div className="space-y-4">
          {isLoadingConversations ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">Loading conversations...</p>
            </Card>
          ) : parsedConversations.length === 0 ? (
            <Card className="p-8 text-center">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No conversations found</p>
            </Card>
          ) : (
            parsedConversations.map((conversation) => (
              <Card
                key={conversation.id}
                className="p-4 cursor-pointer hover:bg-accent transition-colors"
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        conversation.language === "en" 
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" 
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }`}>
                        {conversation.language.toUpperCase()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {conversation.messages.length} messages
                      </span>
                    </div>
                    <p className="text-sm text-foreground line-clamp-2">
                      {conversation.messages[0]?.content || "No messages"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {formatDistanceToNow(conversation.createdAt, { addSuffix: true })}
                    </p>
                  </div>
                  <MessageCircle className="w-5 h-5 text-muted-foreground ml-4 flex-shrink-0" />
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Detail Modal */}
        {selectedConversation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-foreground">Conversation Details</h2>
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  {selectedConversation.messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg ${
                        msg.role === "user"
                          ? "bg-primary/10 text-foreground ml-8"
                          : "bg-muted text-foreground mr-8"
                      }`}
                    >
                      <p className="text-xs font-semibold text-muted-foreground mb-1">
                        {msg.role === "user" ? "Customer" : "Shift"}
                      </p>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
