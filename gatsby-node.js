// const { createFilePath } = require(`gatsby-source-filesystem`);
// const path = require(`path`);

// // exports.onCreateNode = ({ node }) => {
// //   console.log(`Node created of type "${node.internal.type}"`);
// // };
// exports.onCreateNode = ({ node, getNode, actions }) => {
//   const { createNodeField } = actions;
//   if (node.internal.type === `Mdx`) {
//     // console.log(node);
//     const slug = createFilePath({ node, getNode, basePath: `docs` });
//     createNodeField({
//       node,
//       name: `slug`,
//       value: slug,
//     });
//     // const slug = `/${node.relativePath}`;

//     // console.log(`Creating path: ${slug}`);
//     // createNodeField({
//     //   node,
//     //   name: "slug",
//     //   value: slug,
//     // });
//     // const fileNode = getNode(node.parent);
//     // console.log(`\n`, fileNode.relativePath);
//   }
// };

// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions;
//   // **Note:** The graphql function call returns a Promise
//   // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
//   const result = await graphql(`
//     query {
//       allMdx {
//         edges {
//           node {
//             slug
//           }
//         }
//       }
//     }
//   `);

//   result.data.allMdx.edges.forEach(({ node }) => {
//     console.log(node);
//     if (node.slug != "") {
//       createPage({
//         path: node.slug,
//         component: path.resolve(`./src/templates/doc-page.tsx`),
//         context: {
//           // Data passed to context is available
//           // in page queries as GraphQL variables.
//           slug: node.slug,
//         },
//       });
//     }
//   });

//   // console.log(JSON.stringify(result, null, 4));
// };
