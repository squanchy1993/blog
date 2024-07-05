export type ArticleModel = {
  id: number
  title: string
  content: string
  authorId?: number
  views: number
  createdAt: string
  updatedAt: string
  categoryId?: number
  author: AuthorModel
  category: object
  tags: TagModel[]
  summary: string
}

export type ArticleDetail = ArticleModel & {
  prev?: { id: number; title: string }
  next?: { id: number; title: string }
}

export type TagModel = {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  _count: { articles: number }
}

export type AuthorModel = {
  id: number
  nickname: string
  avatar: string
}
