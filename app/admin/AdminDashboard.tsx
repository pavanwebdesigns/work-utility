"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Globe2,
  Loader2,
  LogOut,
  MonitorSmartphone,
  RefreshCw,
  Users,
} from "lucide-react";
import {
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AdminAnalyticsPayload } from "@/lib/admin-analytics-types";

const AUTH_KEY = "wu_admin_auth";
const PASSWORD_KEY = "wu_admin_password";

const DEVICE_COLORS = ["#8B5CF6", "#3B82F6", "#F59E0B", "#10B981"];

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN").format(value);
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

function formatTimestamp(value: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-28 rounded-xl border border-surface-border bg-surface-card"
          />
        ))}
      </div>
      <div className="h-80 rounded-xl border border-surface-border bg-surface-card" />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-72 rounded-xl border border-surface-border bg-surface-card" />
        <div className="h-72 rounded-xl border border-surface-border bg-surface-card" />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof Users;
}) {
  return (
    <div className="rounded-xl border border-surface-border bg-surface-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-content-secondary">{label}</p>
          <p className="mt-2 text-3xl font-bold text-content-primary">
            {formatNumber(value)}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
          <Icon className="h-5 w-5 text-brand-blue" strokeWidth={1.75} />
        </div>
      </div>
    </div>
  );
}

function LoginForm({
  onSuccess,
}: {
  onSuccess: (password: string) => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError("Invalid password");
        return;
      }

      sessionStorage.setItem(AUTH_KEY, "1");
      sessionStorage.setItem(PASSWORD_KEY, password);
      onSuccess(password);
    } catch {
      setError("Could not verify password. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-base px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-surface-border bg-surface-card p-6 shadow-2xl shadow-black/20 sm:p-8"
      >
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
            <BarChart3 className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
          </div>
          <h1 className="text-2xl font-bold text-content-primary">
            Admin Analytics
          </h1>
          <p className="mt-2 text-sm text-content-secondary">
            Enter your admin password to view Vercel Analytics.
          </p>
        </div>

        <label htmlFor="admin-password" className="sr-only">
          Admin password
        </label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Admin password"
          className="w-full rounded-xl border border-surface-border bg-surface-elevated px-4 py-3 text-content-primary outline-none transition-colors focus:border-brand-blue"
          autoComplete="current-password"
        />

        {error && (
          <p className="mt-3 text-sm text-tool-pdf" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !password.trim()}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2563EB] disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            "Unlock Dashboard"
          )}
        </button>
      </form>
    </div>
  );
}

export default function AdminDashboard() {
  const [password, setPassword] = useState<string | null>(null);
  const [data, setData] = useState<AdminAnalyticsPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadAnalytics = useCallback(async (adminPassword: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/analytics", {
        headers: {
          Authorization: `Bearer ${adminPassword}`,
        },
        cache: "no-store",
      });

      const payload = await response.json();

      if (!response.ok) {
        setData(null);
        setError(payload.error ?? "Could not load analytics");
        return;
      }

      setData(payload as AdminAnalyticsPayload);
    } catch {
      setData(null);
      setError("Could not load analytics");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedAuth = sessionStorage.getItem(AUTH_KEY);
    const storedPassword = sessionStorage.getItem(PASSWORD_KEY);

    if (storedAuth === "1" && storedPassword) {
      setPassword(storedPassword);
      void loadAnalytics(storedPassword);
    }
  }, [loadAnalytics]);

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(PASSWORD_KEY);
    setPassword(null);
    setData(null);
    setError(null);
  };

  const deviceChartData = useMemo(
    () =>
      data?.devices.map((item, index) => ({
        ...item,
        fill: DEVICE_COLORS[index % DEVICE_COLORS.length],
      })) ?? [],
    [data?.devices]
  );

  if (!password) {
    return (
      <LoginForm
        onSuccess={(value) => {
          setPassword(value);
          void loadAnalytics(value);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-surface-base">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Analytics Dashboard
            </h1>
            <p className="mt-1 text-sm text-content-secondary">
              Vercel Web Analytics for WorkUtilities
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {data?.lastUpdated && (
              <p className="text-xs text-content-muted">
                Last updated: {formatTimestamp(data.lastUpdated)}
              </p>
            )}
            <button
              type="button"
              onClick={() => void loadAnalytics(password)}
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-lg border border-surface-border bg-surface-card px-3 py-2 text-sm text-content-secondary transition-colors hover:text-content-primary disabled:opacity-60"
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg border border-surface-border bg-surface-card px-3 py-2 text-sm text-content-secondary transition-colors hover:text-content-primary"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        {isLoading && !data && <LoadingSkeleton />}

        {!isLoading && error && (
          <div className="rounded-xl border border-tool-pdf/30 bg-tool-pdf/5 px-5 py-6 text-center">
            <p className="font-medium text-content-primary">{error}</p>
            <p className="mt-2 text-sm text-content-secondary">
              Check that Web Analytics is enabled in Vercel, `@vercel/analytics`
              is installed, and your API token has access to this project.
            </p>
          </div>
        )}

        {data && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Total Visitors (30 days)"
                value={data.overview.totalVisitors30d}
                icon={Users}
              />
              <StatCard
                label="Total Pageviews (30 days)"
                value={data.overview.totalPageviews30d}
                icon={BarChart3}
              />
              <StatCard
                label="Unique Visitors Today"
                value={data.overview.uniqueVisitorsToday}
                icon={Users}
              />
              <StatCard
                label="Pageviews Today"
                value={data.overview.pageviewsToday}
                icon={MonitorSmartphone}
              />
            </div>

            <div className="rounded-xl border border-surface-border bg-surface-card p-5">
              <h2 className="text-lg font-semibold text-content-primary">
                Traffic Over Time
              </h2>
              <p className="mt-1 text-sm text-content-secondary">
                Daily unique visitors over the last 30 days
              </p>
              <div className="mt-6 h-72 w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.trafficOverTime}>
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "#8B9ABB", fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: "#1F2D45" }}
                      minTickGap={24}
                    />
                    <YAxis
                      tick={{ fill: "#8B9ABB", fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: "#1F2D45" }}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#111827",
                        border: "1px solid #1F2D45",
                        borderRadius: "12px",
                        color: "#F0F4FF",
                      }}
                      labelStyle={{ color: "#8B9ABB" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="visitors"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-xl border border-surface-border bg-surface-card p-5">
              <h2 className="text-lg font-semibold text-content-primary">
                Top Tools
              </h2>
              <p className="mt-1 text-sm text-content-secondary">
                Tool pages ranked by pageviews
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-surface-border text-content-muted">
                      <th className="pb-3 pr-4 font-medium">Tool Name</th>
                      <th className="pb-3 pr-4 font-medium">Pageviews</th>
                      <th className="pb-3 pr-4 font-medium">
                        Unique Visitors
                      </th>
                      <th className="pb-3 font-medium">% of Tool Traffic</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.topTools.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-8 text-center text-content-secondary"
                        >
                          No tool page traffic recorded yet.
                        </td>
                      </tr>
                    ) : (
                      data.topTools.map((tool, index) => (
                        <tr
                          key={tool.path}
                          className={`border-b border-surface-border/50 last:border-0 ${
                            index < 3 ? "bg-brand-blue/5" : ""
                          }`}
                        >
                          <td className="py-3 pr-4 font-medium text-content-primary">
                            {tool.name}
                          </td>
                          <td className="py-3 pr-4 text-content-secondary">
                            {formatNumber(tool.pageviews)}
                          </td>
                          <td className="py-3 pr-4 text-content-secondary">
                            {formatNumber(tool.visitors)}
                          </td>
                          <td className="py-3 text-content-secondary">
                            {formatPercent(tool.percent)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-surface-border bg-surface-card p-5">
                <h2 className="text-lg font-semibold text-content-primary">
                  Top Referrers
                </h2>
                <div className="mt-4 space-y-3">
                  {data.referrers.length === 0 ? (
                    <p className="text-sm text-content-secondary">
                      No referrer data yet.
                    </p>
                  ) : (
                    data.referrers.map((referrer) => (
                      <div
                        key={referrer.name}
                        className="flex items-center justify-between gap-3"
                      >
                        <span className="text-sm text-content-primary">
                          {referrer.name}
                        </span>
                        <div className="text-right">
                          <span className="text-sm font-medium text-content-primary">
                            {formatNumber(referrer.visitors)}
                          </span>
                          <span className="ml-2 text-xs text-content-muted">
                            {formatPercent(referrer.percent)}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-surface-border bg-surface-card p-5">
                <h2 className="text-lg font-semibold text-content-primary">
                  Device Breakdown
                </h2>
                <div className="mt-4 h-56 w-full min-w-0">
                  {deviceChartData.length === 0 ? (
                    <p className="text-sm text-content-secondary">
                      No device data yet.
                    </p>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={deviceChartData}
                          dataKey="visitors"
                          nameKey="name"
                          innerRadius={55}
                          outerRadius={85}
                          paddingAngle={2}
                        >
                          {deviceChartData.map((entry) => (
                            <Cell key={entry.name} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#111827",
                            border: "1px solid #1F2D45",
                            borderRadius: "12px",
                            color: "#F0F4FF",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
                <div className="mt-2 space-y-2">
                  {deviceChartData.map((device) => (
                    <div
                      key={device.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="flex items-center gap-2 text-content-primary">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: device.fill }}
                        />
                        {device.name}
                      </span>
                      <span className="text-content-secondary">
                        {formatPercent(device.percent)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-surface-border bg-surface-card p-5">
              <div className="mb-4 flex items-center gap-2">
                <Globe2 className="h-5 w-5 text-brand-blue" strokeWidth={1.75} />
                <h2 className="text-lg font-semibold text-content-primary">
                  Top Countries
                </h2>
              </div>
              <div className="space-y-3">
                {data.countries.length === 0 ? (
                  <p className="text-sm text-content-secondary">
                    No country data yet.
                  </p>
                ) : (
                  data.countries.map((country, index) => (
                    <div
                      key={country.name}
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="text-sm text-content-primary">
                        {index + 1}. {country.name}
                      </span>
                      <div className="text-right">
                        <span className="text-sm font-medium text-content-primary">
                          {formatNumber(country.visitors)}
                        </span>
                        <span className="ml-2 text-xs text-content-muted">
                          {formatPercent(country.percent)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
