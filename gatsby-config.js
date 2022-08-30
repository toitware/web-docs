// Instructions for this are taken from https://gist.github.com/JohnAlbin/2fc05966624dffb20f4b06b4305280f9

// We register the TypeScript evaluator in gatsby-config so we don't need to do
// it in any other .js file. It automatically reads TypeScript config from
// tsconfig.json.
require("ts-node").register();

// Use a TypeScript version of gatsby-config.js.
module.exports = require("./gatsby-config.ts");

flags: {
  THE_FLAG: false
}
