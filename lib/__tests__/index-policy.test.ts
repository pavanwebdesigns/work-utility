import { ALL_TOOLS } from "@/lib/tools-data";
import { blogPosts } from "@/app/blog/posts";
import { CORE_POSTS, CORE_TOOLS, isIndexable } from "@/lib/index-policy";

describe("index-policy", () => {
  it("CORE_TOOLS has 45 entries and every slug exists in tools-data", () => {
    expect(CORE_TOOLS.size).toBe(45);
    const known = new Set(ALL_TOOLS.map((tool) => tool.slug));
    for (const slug of CORE_TOOLS) {
      expect(known.has(slug)).toBe(true);
    }
  });

  it("CORE_POSTS has 21 entries and every slug exists in posts.ts", () => {
    expect(CORE_POSTS.size).toBe(21);
    const known = new Set(blogPosts.map((post) => post.slug));
    for (const slug of CORE_POSTS) {
      expect(known.has(slug)).toBe(true);
    }
  });

  it("isIndexable returns true for core tools and false for non-core tools", () => {
    expect(isIndexable("/tools/pdf-compress")).toBe(true);
    expect(isIndexable("/tools/glassmorphism-generator")).toBe(false);
  });
});
