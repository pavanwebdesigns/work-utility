"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, MessageSquare, Sparkles } from "lucide-react";

type FeedbackType = "feedback" | "suggest";

type ToolFeedbackProps = {
  toolName: string;
};

export function ToolFeedback({ toolName }: ToolFeedbackProps) {
  const [activeForm, setActiveForm] = useState<FeedbackType | null>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  const resetForm = () => {
    setActiveForm(null);
    setName("");
    setMessage("");
    setStatus("idle");
    setErrorMessage("");
  };

  const handleCancel = () => {
    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    resetForm();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!message.trim()) {
      setStatus("error");
      setErrorMessage("Please enter a message before sending.");
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!accessKey) {
      setStatus("error");
      setErrorMessage("Feedback form is not configured. Please try again later.");
      return;
    }

    const type = activeForm;
    if (!type) return;

    const subject =
      type === "feedback"
        ? `Feedback on ${toolName} — WorkUtilities`
        : "New Tool Suggestion — WorkUtilities";

    const body = [
      `Type: ${type === "feedback" ? "Feedback" : "Tool Suggestion"}`,
      `Tool: ${toolName}`,
      name.trim() ? `Name: ${name.trim()}` : "Name: (not provided)",
      "",
      "Message:",
      message.trim(),
    ].join("\n");

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject,
          name: name.trim() || "Anonymous",
          message: body,
        }),
      });

      const data = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to send feedback.");
      }

      setStatus("success");
      resetTimeoutRef.current = setTimeout(() => {
        resetForm();
      }, 3000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  const placeholder =
    activeForm === "feedback"
      ? `Tell us what you think about ${toolName}...`
      : "Describe the tool you'd like us to build...";

  return (
    <div className="mt-16 rounded-xl border border-surface-border bg-surface-card p-6">
      <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-content-secondary">
        Help Us Improve
      </h2>
      <p className="mt-2 text-center text-sm text-content-muted">
        Your feedback helps us build better tools.
      </p>

      {status === "success" ? (
        <p className="mt-6 text-center text-sm font-medium text-tool-convert">
          Thank you! Your message has been sent.
        </p>
      ) : (
        <>
          {!activeForm && (
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setActiveForm("feedback")}
                aria-label="Give feedback on this tool"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-surface-border bg-surface-elevated px-5 py-3 text-sm font-medium text-content-primary transition-colors hover:border-brand-blue hover:text-white"
              >
                <MessageSquare className="h-4 w-4 text-brand-blue" />
                Give Feedback
              </button>
              <button
                type="button"
                onClick={() => setActiveForm("suggest")}
                aria-label="Suggest a new tool"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-surface-border bg-surface-elevated px-5 py-3 text-sm font-medium text-content-primary transition-colors hover:border-brand-blue hover:text-white"
              >
                <Sparkles className="h-4 w-4 text-brand-blue" />
                Suggest a Tool
              </button>
            </div>
          )}

          {activeForm && (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <p className="text-sm font-medium text-content-primary">
                {activeForm === "feedback"
                  ? `Feedback on ${toolName}`
                  : "Suggest a new tool"}
              </p>

              <div>
                <label
                  htmlFor="feedback-name"
                  className="mb-1.5 block text-xs text-content-muted"
                >
                  Name (optional)
                </label>
                <input
                  id="feedback-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-surface-border bg-surface-base px-4 py-2.5 text-sm text-content-primary outline-none transition-colors focus:border-brand-blue"
                />
              </div>

              <div>
                <label
                  htmlFor="feedback-message"
                  className="mb-1.5 block text-xs text-content-muted"
                >
                  Message
                </label>
                <textarea
                  id="feedback-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder={placeholder}
                  rows={4}
                  required
                  className="w-full resize-none rounded-xl border border-surface-border bg-surface-base px-4 py-2.5 text-sm text-content-primary outline-none transition-colors focus:border-brand-blue"
                />
              </div>

              {status === "error" && errorMessage && (
                <p className="text-sm text-tool-pdf">{errorMessage}</p>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  aria-label="Send feedback"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  Send
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={status === "loading"}
                  aria-label="Cancel feedback form"
                  className="cursor-pointer rounded-xl border border-surface-border px-5 py-2.5 text-sm font-medium text-content-secondary transition-colors hover:text-content-primary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
}
