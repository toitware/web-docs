const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve(`src/components/layout/Layout.tsx`);

  // Variables can be added as the second function parameter
  const result = await graphql(
    `
      query {
        allMdx {
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

  // Create blog post pages.
  result.data.allMdx.nodes.forEach((node) => {
    const path = !node.frontmatter.path ? `/${node.slug}` : node.frontmatter.path;
    createPage({
      // Path for this page — required
      path: path,
      component: blogPostTemplate,
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
