export type ArticleModel = {
  id: number
  title: string
  content: string
  authorId?: number
  views: number
  createdAt: string
  updatedAt: string
  categoryId?: number
  author: object
  category: object
  tags: TagModel[]
  summary: string
}

export type TagModel = {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  _count: { articles: number }
}
