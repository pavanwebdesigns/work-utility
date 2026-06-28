export function LastUpdatedBadge({ date = "June 2026" }: { date?: string }) {
  return (
    <p className="mt-3 text-xs text-content-muted">
      Last updated: {date}
    </p>
  );
}
