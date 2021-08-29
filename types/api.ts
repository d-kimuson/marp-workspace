export type Tag = unknown
export type Comment = unknown
export type Attachment = unknown
export type Group = unknown

export type User = {
  id: number
  name: string
  profile_image_url: string
}

export type PostDetail = {
  id: number
  title: string
  body: string
  draft: boolean
  archieved: boolean
  url: string
  created_at: string
  updated_at: string
  scope: string // group
  tags: Tag[]
  user: User
  stars_count: 0
  good_jobs_count: 0
  sharing_url: string | null
  comments: Comment[]
  groups: Group[]
  attachments: Attachment[]
}
