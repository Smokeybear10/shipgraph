"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

/**
 * Strip anything that prefixes the actual `org/repo`:
 *   - protocol (http://, https://)
 *   - host (github.com, www.github.com)
 *   - trailing slashes / dotgit / tree+branch / blob+sha paths
 *
 * Called both on every keystroke (so paste auto-cleans) and on submit.
 */
function cleanInput(raw: string): string {
  let v = raw.trim();
  v = v.replace(/^https?:\/\//i, "");
  v = v.replace(/^(www\.)?github\.com\/?/i, "");
  // If they pasted "github.com" alone with no slash, kill the whole prefix
  v = v.replace(/^github\.com$/i, "");
  // Strip trailing slash + .git
  v = v.replace(/\.git$/i, "");
  return v;
}

function parseRepoInput(raw: string): { owner: string; repo: string } | null {
  const cleaned = cleanInput(raw);
  if (!cleaned) return null;
  const parts = cleaned.split(/[/\s?#]/).filter(Boolean);
  if (parts.length < 2) return null;
  const owner = parts[0].replace(/[^A-Za-z0-9_.-]/g, "");
  const repo = parts[1].replace(/[^A-Za-z0-9_.-]/g, "").replace(/\.git$/, "");
  if (!owner || !repo) return null;
  return { owner, repo };
}

export function PasteInput({ autofocus = false }: { autofocus?: boolean }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const submit = () => {
    const parsed = parseRepoInput(value);
    if (!parsed) {
      setError("paste a repo like vercel/next.js or a github.com url");
      return;
    }
    setError(null);
    startTransition(() => {
      router.push(`/g/${parsed.owner}/${parsed.repo}`);
    });
  };

  return (
    <div className="w-full max-w-2xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="relative flex items-stretch border border-border-strong bg-surface focus-within:border-accent transition-colors"
      >
        <span className="flex items-center pl-4 pr-2 font-mono text-text-dim text-sm select-none">
          github.com/
        </span>
        <input
          autoFocus={autofocus}
          value={value}
          onChange={(e) => {
            // Strip github.com / https:// etc the instant they type or paste
            const cleaned = cleanInput(e.target.value);
            setValue(cleaned);
            if (error) setError(null);
          }}
          placeholder="org/repo"
          spellCheck={false}
          autoComplete="off"
          className="flex-1 bg-transparent text-text placeholder:text-text-dim py-3.5 pr-2 outline-none text-base"
        />
        <button
          type="submit"
          disabled={isPending || !value}
          className="btn-primary px-5 disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm"
        >
          {isPending ? "loading…" : "see graph →"}
        </button>
      </form>
      {error && (
        <div className="font-mono text-xs text-pink mt-2">{error}</div>
      )}
    </div>
  );
}
