import { AlertCircle, Loader2 } from "lucide-react";

// Shared loading + error UI so pages that fetch from the API stay tidy.

export function Loading({ label = "Loading…" }) {
  return (
    <div className="flex items-center gap-2 py-12 text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>{label}</span>
    </div>
  );
}

export function ErrorState({ error }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm">
      <AlertCircle className="mt-0.5 h-4 w-4 text-destructive" />
      <div>
        <p className="font-medium text-destructive">Couldn’t load this section</p>
        <p className="text-muted-foreground">
          {error?.message || "The backend API may not be running yet."} Is the API up at the
          configured URL?
        </p>
      </div>
    </div>
  );
}
