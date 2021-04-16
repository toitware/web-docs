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
