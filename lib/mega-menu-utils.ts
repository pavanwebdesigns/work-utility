import {
  MENU_CATEGORY_ORDER,
  type MenuCategoryId,
} from "@/lib/menu-categories";

export const LAST_MENU_CATEGORY_KEY = "wu_last_menu_category";

export function getStoredMenuCategory(): MenuCategoryId {
  if (typeof window === "undefined") return "pdf";

  const stored = localStorage.getItem(LAST_MENU_CATEGORY_KEY);
  if (stored && MENU_CATEGORY_ORDER.includes(stored as MenuCategoryId)) {
    return stored as MenuCategoryId;
  }

  return "pdf";
}

export function setStoredMenuCategory(id: MenuCategoryId): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LAST_MENU_CATEGORY_KEY, id);
}

export function getCategoryToolsUrl(categoryId: MenuCategoryId): string {
  return `/tools?category=${categoryId}`;
}
