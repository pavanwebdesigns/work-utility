import {
  blogPosts,
  getBlogPostsForListing,
  PILLAR_POST_SLUGS,
  type BlogPost,
} from "@/app/blog/posts";

export type BlogPageCategoryId =
  | "all"
  | "pillar"
  | "pdf"
  | "image-photo"
  | "finance"
  | "developer"
  | "productivity"
  | "students"
  | "documents";

export const BLOG_PAGE_CATEGORY_TABS: {
  id: BlogPageCategoryId;
  label: string;
}[] = [
  { id: "all", label: "All Posts" },
  { id: "pillar", label: "Pillar Guides" },
  { id: "pdf", label: "PDF" },
  { id: "image-photo", label: "Image/Photo" },
  { id: "finance", label: "Finance & Tax" },
  { id: "developer", label: "Developer Tools" },
  { id: "productivity", label: "Productivity" },
  { id: "students", label: "Students & Utilities" },
  { id: "documents", label: "Documents" },
];

export const BLOG_PAGE_SECTION_LABELS: Record<BlogPageCategoryId, string> = {
  all: "ALL POSTS",
  pillar: "PILLAR GUIDES",
  pdf: "PDF",
  "image-photo": "IMAGE/PHOTO",
  finance: "FINANCE & TAX",
  developer: "DEVELOPER TOOLS",
  productivity: "PRODUCTIVITY",
  students: "STUDENTS & UTILITIES",
  documents: "DOCUMENTS",
};

export const BLOG_POSTS_PAGE_SIZE = 12;

export function isPillarBlogPost(post: BlogPost): boolean {
  return (
    Boolean(post.featured) ||
    PILLAR_POST_SLUGS.has(post.slug) ||
    post.category === "Complete Guide"
  );
}

export function getBlogPageCategory(
  post: BlogPost,
): BlogPageCategoryId | undefined {
  if (isPillarBlogPost(post)) {
    return "pillar";
  }

  switch (post.category) {
    case "PDF":
      return "pdf";
    case "Images":
    case "Photo":
      return "image-photo";
    case "Finance":
      return "finance";
    case "Developer Tools":
      return "developer";
    case "Productivity":
      return "productivity";
    case "Students & Utilities":
      return "students";
    case "PDF & Documents":
      return "documents";
    default:
      return undefined;
  }
}

export function getPillarBlogPosts(): BlogPost[] {
  return blogPosts.filter(isPillarBlogPost);
}

export function getBlogPostsForPageListing(): BlogPost[] {
  return getBlogPostsForListing();
}

export function filterBlogPostsByPageCategory(
  posts: BlogPost[],
  categoryId: BlogPageCategoryId,
): BlogPost[] {
  if (categoryId === "all") {
    return posts;
  }

  return posts.filter((post) => getBlogPageCategory(post) === categoryId);
}

export function getBlogCountByPageCategory(
  posts: BlogPost[] = getBlogPostsForPageListing(),
): Record<BlogPageCategoryId, number> {
  const counts = {} as Record<BlogPageCategoryId, number>;

  for (const tab of BLOG_PAGE_CATEGORY_TABS) {
    counts[tab.id] = filterBlogPostsByPageCategory(posts, tab.id).length;
  }

  return counts;
}
