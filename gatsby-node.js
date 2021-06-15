const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
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
              path
              order
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  // Create docs pages.
  result.data.allMdx.nodes.forEach((node) => {
    const path = !node.frontmatter.path ? `/${node.slug}` : node.frontmatter.path;
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
};
