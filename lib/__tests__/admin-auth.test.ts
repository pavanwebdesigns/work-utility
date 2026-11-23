/**
 * @jest-environment node
 */
import { verifyAdminPassword, requireAdminBearer } from "@/lib/admin-auth";

describe("admin-auth", () => {
  const PREV = process.env.ADMIN_PASSWORD;

  beforeEach(() => {
    process.env.ADMIN_PASSWORD = "correct-horse";
  });

  afterAll(() => {
    if (PREV === undefined) delete process.env.ADMIN_PASSWORD;
    else process.env.ADMIN_PASSWORD = PREV;
  });

  it("accepts the configured password", () => {
    expect(verifyAdminPassword("correct-horse")).toBe(true);
  });

  it("rejects wrong or missing passwords", () => {
    expect(verifyAdminPassword("wrong")).toBe(false);
    expect(verifyAdminPassword("")).toBe(false);
    expect(verifyAdminPassword(null)).toBe(false);
  });

  it("requireAdminBearer allows valid Bearer tokens", () => {
    const req = new Request("http://localhost/api/admin/analytics", {
      headers: { Authorization: "Bearer correct-horse" },
    });
    expect(requireAdminBearer(req)).toBeNull();
  });

  it("requireAdminBearer returns 401 without auth", async () => {
    const req = new Request("http://localhost/api/admin/analytics");
    const res = requireAdminBearer(req);
    expect(res).not.toBeNull();
    expect(res!.status).toBe(401);
  });
});
