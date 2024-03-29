declare module "*.png";
declare module "*.jpg";

declare module "*.svg?inline" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module "react-use-flexsearch" {
  type StoreItem = { id: string; path: string; title: string; excerpt: string };
  export function useFlexSearch(query: string, index: string, store: { [key: string]: StoreItem }): StoreItem[];
}

declare module "*/docs/menu.yaml" {
  export type MenuItem = {
    name: string; // The text that should appear in the menu.
    path: string; // The path in the URL, with a leading slash (/).
    children?: MenuItem[];
    href?: string; // Can link to external resources.
    icon?:
      | "home"
      | "apis"
      | "language"
      | "firmware"
      | "peripherals"
      | "platform"
      | "getstarted"
      | "support"
      | "tutorials";
  };
  export type Menu = {
    items: MenuItem[];
  };

  const content: Menu;
  export default content;
}
