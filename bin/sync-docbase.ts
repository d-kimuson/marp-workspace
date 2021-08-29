import fs from "fs"
import path from "path"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkFrontmatter from "remark-frontmatter"
import remarkExtractFrontmatter from "remark-extract-frontmatter"
import yaml from "yaml"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const toMdFilePaths = (basePath: string): string | string[] => {
  if (basePath.endsWith(".md")) return basePath

  const stats = fs.statSync(basePath)
  return stats.isDirectory()
    ? fs
        .readdirSync(basePath)
        .flatMap((pathName) => toMdFilePaths(path.resolve(basePath, pathName)))
    : []
}

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter, [
    {
      type: "yaml",
      marker: "-",
      anywhere: false,
    },
  ])
  .use(remarkExtractFrontmatter, {
    yaml: yaml.parse,
    name: "frontMatter",
  })
  .use(remarkRehype)
  .use(rehypeStringify)

async function extractFrontmatter(
  content: string
): Promise<Record<string, unknown>> {
  const parsed = await processor.process(content)
  return parsed.data.frontMatter as Record<string, unknown>
}

function extractBody(content: string): string {
  return content.replace(/---([\s\S]*?)---/, "")
}

const targets = fs
  .readdirSync(path.resolve(__dirname, "../slides"))
  .flatMap((pathName) =>
    toMdFilePaths(path.resolve(__dirname, `../slides/${pathName}`))
  )
  .filter((maybePath) => typeof maybePath === "string")

for await (const target of targets) {
  const content = fs.readFileSync(target, "utf8")
  const frontMatter = await extractFrontmatter(content)
  const body = extractBody(content)

  // console.log(frontMatter, body)

  /**
   * WIP: マークダウンファイルから docbase への動機処理を書く
   * 1. frontmatter と 本文を分離して受け取る
   * 2-1. frontmatter に docbase の id が含まれている
   *   - 本文の update 処理を書く
   * 2-2. frontmatter に docbase の id が含まれない
   *   - Docbase に本文をそのまま載せる形で新規投稿する
   *   - 投稿したメモの id を受け取り、frontmatter を更新する
   */
}

// console.log(await fetchPost(2034307))
