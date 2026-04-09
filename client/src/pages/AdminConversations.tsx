import { useAuth } from "@/_core/hooks/useAuth";
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
import { MessageCircle, Search, Filter, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState, useMemo } from "react";
import { useLocation } from "wouter";

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
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect if not owner
  if (!authLoading && (!user || user.openId !== user.openId)) {
    setLocation("/");
    return null;
  }

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
    },
    {
      enabled: !!user,
    }
  );

  // Fetch stats
  const { data: stats } = trpc.conversations.stats.useQuery(undefined, {
    enabled: !!user,
  });

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

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Conversation Logs</h1>
          </div>
          <p className="text-muted-foreground">View and search all logged Shift chatbot escalations</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6 border-border/50">
              <div className="text-sm text-muted-foreground mb-2">Total Conversations</div>
              <div className="text-3xl font-bold text-primary">{stats.total}</div>
            </Card>
            <Card className="p-6 border-border/50">
              <div className="text-sm text-muted-foreground mb-2">English</div>
              <div className="text-3xl font-bold">{stats.byLanguage.en}</div>
            </Card>
            <Card className="p-6 border-border/50">
              <div className="text-sm text-muted-foreground mb-2">Spanish</div>
              <div className="text-3xl font-bold">{stats.byLanguage.es}</div>
            </Card>
          </div>
        )}

        {/* Search & Filter Bar */}
        <Card className="p-6 mb-8 border-border/50">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">Filters</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                />
              </div>

              {/* Language Filter */}
              <Select value={language} onValueChange={(val) => {
                setLanguage(val as "all" | "en" | "es");
                setCurrentPage(1);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                </SelectContent>
              </Select>

              {/* Clear Filters Button */}
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="border-border/50"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Conversations List */}
        <div className="space-y-4 mb-8">
          {isLoadingConversations ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : parsedConversations.length === 0 ? (
            <Card className="p-12 text-center border-border/50">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No conversations found</p>
            </Card>
          ) : (
            parsedConversations.map((conversation) => (
              <Card
                key={conversation.id}
                className="p-6 cursor-pointer hover:border-primary/50 transition-colors border-border/50"
                onClick={() => setSelectedConversation(conversation as Conversation)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Language Badge */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                        {conversation.language === "en" ? "English" : "Español"}
                      </span>
                      {conversation.sessionId && (
                        <span className="text-xs text-muted-foreground">
                          ID: {conversation.sessionId.slice(0, 8)}...
                        </span>
                      )}
                    </div>

                    {/* Preview of first message */}
                    <p className="text-sm text-foreground mb-2 line-clamp-2">
                      {conversation.messages[0]?.content || "No messages"}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{conversation.messages.length} messages</span>
                      <span>{formatDistanceToNow(conversation.createdAt, { addSuffix: true })}</span>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages} ({total} total)
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="border-border/50"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="border-border/50"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Conversation Detail Modal */}
      {selectedConversation && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedConversation(null)}
        >
          <Card
            className="w-full max-w-2xl max-h-[80vh] overflow-y-auto border-border/50"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Conversation Details</h2>
                  <div className="flex items-center gap-3">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded">
                      {selectedConversation.language === "en" ? "English" : "Español"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(selectedConversation.createdAt, { addSuffix: true })}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Messages */}
              <div className="space-y-4 mb-6">
                {selectedConversation.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg ${
                      msg.role === "user"
                        ? "bg-primary/10 text-foreground ml-8"
                        : "bg-muted text-foreground mr-8"
                    }`}
                  >
                    <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase">
                      {msg.role === "user" ? "Customer" : "Shift"}
                    </div>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedConversation(null)}
                  className="flex-1 border-border/50"
                >
                  Close
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
