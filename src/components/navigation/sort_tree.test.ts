import { NavPage } from "./Navigation";
import sortTree from "./sort_tree";

describe("Navigation", () => {
  describe("sortTree", () => {
    const p = (order?: number, subPages?: NavPage[], title = "Title"): NavPage => ({
      slug: "",
      title: title,
      order: order,
      subPages: subPages,
      showInMenu: true,
    });
    it("sorts pages according to order field", () => {
      const pages: NavPage[] = [p(3), p(2), p(1, [p(2), p(3), p(1)])];
      sortTree(pages);

      expect(pages).toEqual([p(1, [p(1), p(2), p(3)]), p(2), p(3)]);
    });
    it("sorts pages with order first", () => {
      const pages: NavPage[] = [p(3), p(), p(1, [p(3), p(), p(1)])];
      sortTree(pages);

      expect(pages).toEqual([p(1, [p(1), p(3), p()]), p(3), p()]);
    });
    it("sorts pages with no order alphabetically", () => {
      const pages: NavPage[] = [
        p(undefined, undefined, "z"),
        p(undefined, undefined, "a"),
        p(1, [p(undefined, undefined, "f"), p(3), p(undefined, undefined, "c")]),
      ];
      sortTree(pages);

      expect(pages).toEqual([
        p(1, [p(3), p(undefined, undefined, "c"), p(undefined, undefined, "f")]),
        p(undefined, undefined, "a"),
        p(undefined, undefined, "z"),
      ]);
    });
    it("handles special characters properly when sorting alphabetically", () => {
      const pages: NavPage[] = ["réservé", "Premier", "Cliché", "communiqué", "café", "Adieu"].map((title) =>
        p(undefined, undefined, title)
      );
      sortTree(pages);

      expect(pages.map((page) => page.title)).toEqual(["Adieu", "café", "Cliché", "communiqué", "Premier", "réservé"]);
    });
  });
});
