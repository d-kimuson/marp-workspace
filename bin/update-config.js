const fs = require("fs")
const path = require("path")
const stripJsonComments = require("strip-json-comments")

/**
 * @name loadJsonc
 * @param {string} filepath
 * @return {Record<string, unknown> | undefined}
 */
function loadJsonc(filepath) {
  return JSON.parse(
    stripJsonComments(fs.readFileSync(path.resolve(filepath), "utf8"))
  )
}

/**
 * @param {{ [key: string]: string }} chunk
 */
function toPathArray(chunk) {
  return Object.values(chunk).map((value) => `./dist/${value}`)
}

const vscodeConfig = loadJsonc(".vscode/settings.json")
const stats = loadJsonc("webpack-stats.json")

if (stats.status === "done") {
  const newPaths = Array.from(
    new Set([
      ...vscodeConfig["markdown.marp.themes"],
      ...toPathArray(stats.chunks),
    ])
  )

  const newConfig = {
    ...vscodeConfig,
    "markdown.marp.themes": newPaths,
  }

  fs.writeFileSync(".vscode/settings.json", JSON.stringify(newConfig))
}
