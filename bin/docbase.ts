import axios from "axios"
import { config } from "dotenv"

import type { PostDetail } from "$types/api"

config()

const client = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    "X-DocBaseToken": process.env.DOCBASE_TOKEN,
  },
})

export async function fetchPost(id: number): Promise<PostDetail> {
  return (await client.get<PostDetail>(`/posts/${id}`)).data
}

type PostParameter = {
  title: string
  body: string
  draft?: boolean
  notice?: boolean
  tags?: string[]
  scope?: "everyone" | "group" | "private"
  groups?: number[]
  // admin only
  author_id?: number
  published_at?: string
}

export async function updatePost(id: number, option: Record<string, unknown>) {
  // FIXME
}

export async function createPost(id: number, option: PostParameter) {
  const data: PostParameter = {
    title: "",
    body: option.body,
    // 下書きで投稿して、ID だけ紐付けであとは Docbase でやってくださいという指針
    draft: true,
    scope: "group",
  }
  client.post<PostDetail>(`/posts/${id}`, data)
}
