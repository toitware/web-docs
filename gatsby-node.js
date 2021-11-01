const path = require(`path`);
const yaml = require(`js-yaml`);
const fs = require(`fs`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const docsTemplate = path.resolve(`src/components/layout/MdxLayout.tsx`);

  // Variables can be added as the second function parameter
  const result = await graphql(
    `
      query {
        allMdx(filter: { fileAbsolutePath: { regex: "//docs//" } }) {
          nodes {
            id
            slug
            frontmatter {
              title
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

  // Create docs pages.
  result.data.allMdx.nodes.forEach((node) => {
    const path = `/${node.slug.replace(/\/$/, "")}`;
    allMdPaths.push(path);
    createPage({
      // Path for this page — required
      path: path,
      component: docsTemplate,
      context: {
        id: node.id,
        frontmatter: node.frontmatter,
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
  });

  const menu = yaml.load(fs.readFileSync("./docs/menu.yaml", "utf-8"));

  // Now check that each entry in the menu file has a corresponding md file.
  (function validatePaths(entries) {
    for (const entry of entries) {
      if (entry.path != "/" && !allMdPaths.includes(entry.path)) {
        reporter.panicOnBuild(`🚨  ERROR: The path ${entry.path} does not have a corresponding .md file`);
      }
      if (entry.children) {
        validatePaths(entry.children);
      }
    }
  })(menu.items);
};
