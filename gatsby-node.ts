import crypto from "crypto";
import { Document } from "flexsearch";
import fs from "fs";
import { Actions, CreatePagesArgs, GatsbyNode } from "gatsby";
import yaml from "js-yaml";
import path from "path";

type SearchDocument = {
  id: string;
  path: string;
  title: string;
  excerpt: string;
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  rawBody: string;
};

type MdxNode = {
  id: string;
  slug: string;
  excerpt: string;
  rawBody: string;
  headings: [{ value: string; depth: number }];
};

type MdxGraphType = {
  allMdx: {
    nodes: MdxNode[];
  };
};
type MenuItem = {
  name: string; // The text that should appear in the menu.
  path: string; // The path in the URL, with a leading slash (/).
  children?: MenuItem[];
  href?: string; // Can link to external resources.
  icon?: string;
};
type Menu = {
  items: MenuItem[];
};
export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter, createNodeId }) => {
  const { createPage, createNode } = actions;
  const searchDocuments: SearchDocument[] = [];
  const docsTemplate = path.resolve(`src/components/layout/MdxLayout.tsx`);

  // Variables can be added as the second function parameter
  const result = await graphql<MdxGraphType>(
    `
      query {
        allMdx(filter: { fileAbsolutePath: { regex: "//docs//" } }) {
          nodes {
            id
            slug
            excerpt
            rawBody
            headings {
              value
              depth
            }
          }
        }
      }
    `
  );

  if (result.errors || !result.data) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
    return;
  }

  // A cache for all paths so we can check their validity more easily later on.
  const allMdPaths: string[] = [];
  const menu = yaml.load(fs.readFileSync("./docs/menu.yaml", "utf-8")) as Menu;

  const flatMenu = (function flattenMenu(entries, flatMenu: { path: string; name: string }[] = []) {
    for (const entry of entries) {
      flatMenu.push({ path: entry.path, name: entry.name });
      if (entry.children && entry.children.length > 0) {
        flattenMenu(entry.children, flatMenu);
      }
    }
    return flatMenu;
  })(menu.items);

  const getHeadings = (node: MdxNode, depth: number) =>
    node.headings
      .filter((heading) => heading.depth === depth)
      .map((heading) => heading.value)
      .join(" ")
      .trim();

  // Create docs pages.
  result.data.allMdx.nodes.forEach((node) => {
    const path = `/${node.slug.replace(/\/$/, "")}`;
    allMdPaths.push(path);

    const menuItem = flatMenu.find((item) => item.path == path);

    if (!menuItem) {
      console.warn(`Didn't find a menu entry for ${path}`);
    }

    let title = "";

    if (menuItem) {
      title = menuItem.name;
    } else if (node.headings.length > 0) {
      title = node.headings[0].value;
    }

    createPage({
      // Path for this page — required
      path: path,
      component: docsTemplate,
      context: {
        title: title,
        id: node.id,
        // Add optional context data to be inserted
        // as props into the page component..
        //
        // The context data can also be used as
        // arguments to the page GraphQL query.
        //
        // The page "path" is always available as a GraphQL
        // argument.
      },
    });

    searchDocuments.push({
      id: node.id,
      path: path,
      title: title,
      excerpt: node.excerpt,
      h1: getHeadings(node, 1),
      h2: getHeadings(node, 2),
      h3: getHeadings(node, 3),
      h4: getHeadings(node, 4),
      rawBody: node.rawBody,
    });
  });

  // Now check that each entry in the menu file has a corresponding md file.
  for (const entry of flatMenu) {
    if (entry.path != "/" && !allMdPaths.includes(entry.path)) {
      reporter.panicOnBuild(`🚨  ERROR: The path ${entry.path} does not have a corresponding .md file`);
    }
  }
  await createSearchNode({ searchDocuments, createNode, createNodeId });
};

const SEARCH_NODE_TYPE = `SiteSearch`;

async function createSearchNode({
  searchDocuments,
  createNode,
  createNodeId,
}: {
  searchDocuments: SearchDocument[];
  createNode: Actions["createNode"];
  createNodeId: CreatePagesArgs["createNodeId"];
}) {
  const documentConfig = {
    store: ["path", "title", "excerpt"],
    index: [
      {
        field: "title",
        tokenize: "forward",
        optimize: true,
        resolution: 9,
      },
      {
        field: "h1",
        tokenize: "forward",
        optimize: true,
        resolution: 8,
      },
      {
        field: "h2",
        tokenize: "forward",
        optimize: true,
        resolution: 6,
      },
      {
        field: "h3",
        tokenize: "forward",
        optimize: true,
        resolution: 4,
      },
      {
        field: "rawBody",
        tokenize: "strict",
        optimize: true,
        resolution: 3,
        minlength: 3,
      },
    ],
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const index = new Document(documentConfig);

  searchDocuments.forEach((value) => index.add(value));

  // Exporting the index into a serializable store.
  const store: { [key: string]: unknown } = {};
  const exportFinished = new Promise<void>((resolve) => {
    // Unfortunately the FlexSearch export API is not great. You provide
    // callbacks for each export but you don't know beforehand how often it's
    // going to be called and don't get access to a list of promises to handle
    // this properly.
    //
    // https://github.com/nextapps-de/flexsearch/issues/274
    //
    // I realised that the "store" key was always last, so I just built a
    // Promise myself that I resolve as soon as the callback for "store" is
    // invoked. I really hope that this gets fixed in a future version.
    void index.export((key, data) => {
      store[key] = data;
      if (key == "store") resolve();
    });
  });
  await exportFinished;

  const content = JSON.stringify(store);
  const contentDigest = crypto.createHash("md5").update(content).digest("hex");

  const node = {
    id: createNodeId("SiteSearch"),
    index: content,
    documentConfig: JSON.stringify(documentConfig),
    internal: {
      type: SEARCH_NODE_TYPE,
      contentDigest: contentDigest,
    },
  };

  createNode(node);
}

/**
 * Adds the GraphQL schema customization for our search index.
 */
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = (gatsbyContext) => {
  const { actions, schema } = gatsbyContext;
  const { createTypes } = actions;

  createTypes([
    schema.buildObjectType({
      name: SEARCH_NODE_TYPE,
      fields: {
        documentConfig: {
          type: "String!",
          description: "The config used to create the document store.",
        },
        index: {
          type: "String!",
          description: "The search index created stored as JSON.",
        },
      },
      interfaces: ["Node"],
    }),
  ]);
};
