/**
 * ChunkErrorBoundary
 *
 * Catches "Failed to fetch dynamically imported module" errors that occur when
 * a user has an old version of the site open and a new deployment has replaced
 * the hashed JS chunk filenames. On detecting a chunk-load failure the boundary
 * automatically reloads the page once so the browser fetches the new bundle.
 * A second failure within the same page-load is shown as a user-friendly error
 * with a manual Reload button to avoid infinite reload loops.
 */

import React, { Component, ErrorInfo, ReactNode } from "react";

const RELOAD_KEY = "__chunk_reload_attempted__";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

function isChunkLoadError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const msg = error.message ?? "";
  return (
    msg.includes("Failed to fetch dynamically imported module") ||
    msg.includes("Importing a module script failed") ||
    msg.includes("error loading dynamically imported module") ||
    // Vite / Rollup chunk load error
    (error.name === "TypeError" && msg.includes("/assets/"))
  );
}

export class ChunkErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (isChunkLoadError(error)) {
      // Only attempt one automatic reload per page-load to avoid loops
      const alreadyTried = sessionStorage.getItem(RELOAD_KEY);
      if (!alreadyTried) {
        sessionStorage.setItem(RELOAD_KEY, "1");
        // Hard reload — bypasses cache so the new bundle is fetched
        window.location.reload();
        return;
      }
    }
    console.error("[ChunkErrorBoundary]", error, info);
  }

  handleReload = () => {
    sessionStorage.removeItem(RELOAD_KEY);
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-8">
          <div className="max-w-md w-full text-center space-y-6">
            {/* Warning icon */}
            <div className="flex justify-center">
              <svg
                className="w-16 h-16 text-destructive"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold">An unexpected error occurred.</h1>

            {this.state.error && (
              <pre className="bg-muted text-muted-foreground text-xs text-left rounded-lg p-4 overflow-auto whitespace-pre-wrap break-all">
                {this.state.error.message}
              </pre>
            )}

            <button
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ChunkErrorBoundary;
