const fs = require("fs")
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries")
const BundleTracker = require("webpack-bundle-tracker")

const targets = fs
  .readdirSync(path.resolve(__dirname, "theme"))
  .filter((fileName) => fileName.endsWith("scss"))
  .map((fileName) => fileName.split(".")[0])
  .reduce(
    (s, t) => ({
      ...s,
      [t]: `./theme/${t}.scss`,
    }),
    {}
  )

module.exports = {
  entry: targets,
  module: {
    rules: [
      {
        test: /\.(s?)css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                fiber: require("fibers"),
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new FixStyleOnlyEntriesPlugin(),
    new BundleTracker({
      path: __dirname,
      filename: "webpack-stats.json",
    }),
  ],
}
