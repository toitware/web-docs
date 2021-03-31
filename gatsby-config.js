module.exports = {
  siteMetadata: {
    title: "Toit",
    siteUrl: "https://template.toit.io",
    // Put common data you want to reuse in the site here.
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    "gatsby-plugin-typescript",
    "gatsby-plugin-typescript-checker",
    "gatsby-plugin-eslint",
    "gatsby-plugin-material-ui",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-svgr-svgo`,
      options: {
        inlineSvgOptions: [
          {
            test: /(\.inline\.svg)$/,
            svgoConfig: {
              plugins: [{ removeViewBox: false }],
            },
          },
        ],
        urlSvgOptions: [
          {
            test: /\.svg$/,
            svgoConfig: {
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            },
          },
        ],
      },
    },
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "docs",
        path: `${__dirname}/docs/`,
      },
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: `${__dirname}/docs`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        defaultLayouts: {
          docs: require.resolve("./src/components/layout/Layout.tsx"),
          default: require.resolve("./src/components/layout/Layout.tsx"),
        },
      },
    },

    // You can have multiple instances of this plugin to create indexes with
    // different names or engines. For example, multi-lingual sites could create
    // an index for each language.
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: "pages",

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: "flexsearch",

        // Provide options to the engine. This is optional and only recommended
        // for advanced users.
        //
        // Note: Only the flexsearch engine supports options.
        engineOptions: "speed",

        // GraphQL query used to fetch all data for the search index. This is
        // required.
        query: `
              {
                allMdx(filter: { fileAbsolutePath: { regex: "//docs//" } })  {
                  nodes {
                    id
                    slug
                    excerpt
                    frontmatter {
                      title
                      path
                    }
                    headings {
                      value
                    }
                    rawBody
                  }
                }
              }
          `,

        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: "id",

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        index: ["title", "body"],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        store: ["id", "path", "title", "excerpt"],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }) =>
          data.allMdx.nodes.map((node) => {
            let path = `/${node.slug}`;
            if (!path.endsWith("/")) path += "/";

            return {
              id: node.id,
              path: node.frontmatter.path ?? path,
              title: node.frontmatter.title ? node.frontmatter.title : node.headings[0].value,
              body: node.rawBody,
              excerpt: node.excerpt,
            };
          }),
      },
    },
  ],
};
