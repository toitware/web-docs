import { NavPage } from "./Navigation";

/**
 * Sorts the pages.
 *
 * - if both pages have an `order` property it's used
 * - if only one has the `order` property, then it's sorted first
 * - if neither has the `order` property, then they're sorted alphabetically
 */
export function sortTree(pages: NavPage[]): void {
  pages.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    } else if (a.order !== undefined) {
      return -1;
    } else if (b.order !== undefined) {
      return 1;
    } else {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      // names must be equal
      return 0;
    }
  });
  for (const page of pages) {
    if (page.subPages !== undefined) sortTree(page.subPages);
  }
}

export default sortTree;
