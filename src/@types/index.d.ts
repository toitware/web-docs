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
  export interface MenuItem {
    name: string;
    path: string;
    children?: MenuItem[];
    href?: string;
    icon?: "home" | "apis" | "language" | "hardware" | "platform" | "getstarted" | "troubleshoot" | "tutorials";
  }
  const content: {
    items: MenuItem[];
  };
  export default content;
}
