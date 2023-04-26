export const siteMetadata = {
  title: "Toit documentation",
  siteUrl: "https://docs.toit.io",
  // Put common data you want to reuse in the site here.
};

export const plugins = [
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
      icon: "src/images/icon.svg",
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
  "gatsby-plugin-remove-trailing-slashes",
  "gatsby-plugin-layout",
  {
    resolve: "gatsby-plugin-mdx",
    options: {
      extensions: [".mdx", ".md"],
      defaultLayouts: {
        docs: require.resolve("./src/components/layout/MdxLayout.tsx"),
        default: require.resolve("./src/components/layout/MdxLayout.tsx"),
      },
      gatsbyRemarkPlugins: [
        {
          resolve: `gatsby-remark-autolink-headers`,
          options: {
            className: `table-of-contents-icon`,
          },
        },
      ],
    },
  },
  {
    resolve: "gatsby-plugin-segment-js",
    options: {
      // The keys must be defined otherwise the plugin will no load analytics.js
      prodKey: "XXXXXXXXXXXXXXXXX",
      devKey: "XXXXXXXXXXXXXXXXX",
      manualLoad: true,
      trackPage: true,
    },
  },
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `@raae/gatsby-remark-oembed`,
          options: {
            // usePrefix defaults to false
            // usePrefix: true is the same as ["oembed"]
            usePrefix: ["oembed", "video"],
            providers: {
              include: ["YouTube"],
              // Important to exclude providers
              // that adds js to the page.
              // If you do not need them.
              exclude: ["Reddit", "Twitter", "Flickr", "Instagram"],
            },
          },
        },
      ],
    },
  },
];
