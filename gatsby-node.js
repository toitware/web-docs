const path = require(`path`);
const yaml = require(`js-yaml`);
const fs = require(`fs`);
const crypto = require("crypto");
const { Index, Document, Worker } = require("flexsearch");
const { resolve } = require("path/posix");
const { reporter } = require("gatsby-cli/lib/reporter/reporter");

exports.createPages = async ({ graphql, actions, reporter, getNode, createNodeId }) => {
  const { createPage, createNode } = actions;
  const searchDocuments = [];
  const docsTemplate = path.resolve(`src/components/layout/MdxLayout.tsx`);

  // Variables can be added as the second function parameter
  const result = await graphql(
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

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  // A cache for all paths so we can check their validity more easily later on.
  const allMdPaths = [];

  const menu = yaml.load(fs.readFileSync("./docs/menu.yaml", "utf-8"));

  const flatMenu = (function flattenMenu(entries, flatMenu = []) {
    for (const entry of entries) {
      flatMenu.push({ path: entry.path, name: entry.name });
      if (entry.children && entry.children.length > 0) {
        flattenMenu(entry.children, flatMenu);
      }
    }
    return flatMenu;
  })(menu.items);

  const getHeadings = (node, depth) =>
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

    const page = {
      // Path for this page — required
      path: path,
      component: docsTemplate,
      context: {
        title: title,
        id: node.id,
        excerpt: node.excerpt,
        rawBody: node.rawBody,
        // Add optional context data to be inserted
        // as props into the page component..
        //
        // The context data can also be used as
        // arguments to the page GraphQL query.
        //
        // The page "path" is always available as a GraphQL
        // argument.
      },
    };

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
  createSearchNode({ searchDocuments, createNode, createNodeId });
};

const SEARCH_NODE_TYPE = `SiteSearch`;

async function createSearchNode({ searchDocuments, createNode, createNodeId }) {
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
        resolution: 4,
        minlength: 3,
        resolution: 3,
      },
    ],
  };
  const index = new Document(documentConfig);

  searchDocuments.forEach((value) => index.add(value));

  // Exporting the index into a serializable store.
  const store = {};
  const exportFinished = new Promise((resolve) => {
    // Unfortunately the FlexSearch export API is not great. You provide
    // callbacks for each export but you don't know beforehand how often it's
    // going to be called and don't get access to a list of promises to handle
    // this properly.
    //
    // I realised that the "store" key was always last, so I just built a
    // Promise myself that I resolve as soon as the callback for "store" is
    // invoked. I really hope that this gets fixed in a future version.
    function exportCallback(key, data) {
      store[key] = data;
      if (key == "store") resolve();
    }
    index.export(exportCallback);
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
exports.createSchemaCustomization = async (gatsbyContext, pluginOptions) => {
  const { actions, schema, reporter, pathPrefix } = gatsbyContext;
  const { createTypes } = actions;
  const { name } = pluginOptions;

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
