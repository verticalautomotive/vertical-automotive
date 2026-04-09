/**
 * Admin Escalations Page
 * Manage escalated conversations, assign to team members, and track resolution
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";

export default function AdminEscalations() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState<"pending" | "assigned" | "resolved" | undefined>();
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "es" | undefined>();
  const [page, setPage] = useState(0);
  const limit = 20;

  // Redirect if not admin
  if (user && user.role !== "admin") {
    navigate("/");
    return null;
  }

  // Fetch escalations
  const escalationsQuery = trpc.escalation.list.useQuery({
    limit,
    offset: page * limit,
    status: selectedStatus,
    language: selectedLanguage,
  });

  const statsQuery = trpc.escalation.stats.useQuery();

  const isLoading = escalationsQuery.isLoading || statsQuery.isLoading;

  const handleAssign = (conversationId: number) => {
    // TODO: Open dialog to assign to team member
    console.log("Assign conversation:", conversationId);
  };

  const handleResolve = (conversationId: number) => {
    // TODO: Open dialog to resolve with notes
    console.log("Resolve conversation:", conversationId);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Escalated Conversations
          </h1>
          <p className="text-muted-foreground">
            Manage and track escalated customer conversations
          </p>
        </div>

        {/* Stats Cards */}
        {statsQuery.data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Escalations</p>
                  <p className="text-2xl font-bold text-foreground">
                    {statsQuery.data.total}
                  </p>
                </div>
                <AlertCircle className="w-8 h-8 text-destructive opacity-50" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-foreground">
                    {statsQuery.data.pending}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500 opacity-50" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">By Language</p>
                  <p className="text-sm text-foreground mt-2">
                    EN: {statsQuery.data.byLanguage.en} | ES:{" "}
                    {statsQuery.data.byLanguage.es}
                  </p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-green-500 opacity-50" />
              </div>
            </Card>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-foreground block mb-2">
              Status
            </label>
            <select
              value={selectedStatus || ""}
              onChange={(e) =>
                setSelectedStatus(
                  (e.target.value as "pending" | "assigned" | "resolved") || undefined
                )
              }
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium text-foreground block mb-2">
              Language
            </label>
            <select
              value={selectedLanguage || ""}
              onChange={(e) =>
                setSelectedLanguage((e.target.value as "en" | "es") || undefined)
              }
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="">All Languages</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
            </select>
          </div>
        </div>

        {/* Escalations List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : escalationsQuery.data?.conversations.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                No escalated conversations found
              </p>
            </Card>
          ) : (
            escalationsQuery.data?.conversations.map((conversation) => (
              <Card key={conversation.id} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">
                        Conversation #{conversation.id}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`}
                      >
                        {conversation.status}
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                        {conversation.language.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">
                      {conversation.escalationReason || "No reason provided"}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Created:{" "}
                      {new Date(conversation.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {conversation.status === "escalated" && (
                      <Button
                        onClick={() => handleAssign(conversation.id)}
                        size="sm"
                        variant="outline"
                      >
                        Assign
                      </Button>
                    )}
                    {conversation.status !== "closed" && (
                      <Button
                        onClick={() => handleResolve(conversation.id)}
                        size="sm"
                        variant="outline"
                      >
                        Resolve
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Pagination */}
        {escalationsQuery.data && escalationsQuery.data.total > limit && (
          <div className="flex justify-center gap-2">
            <Button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              variant="outline"
            >
              Previous
            </Button>
            <span className="flex items-center px-4 text-sm text-muted-foreground">
              Page {page + 1} of{" "}
              {Math.ceil(escalationsQuery.data.total / limit)}
            </span>
            <Button
              onClick={() =>
                setPage(
                  Math.min(
                    Math.ceil(escalationsQuery.data!.total / limit) - 1,
                    page + 1
                  )
                )
              }
              disabled={
                page >=
                Math.ceil(escalationsQuery.data.total / limit) - 1
              }
              variant="outline"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
