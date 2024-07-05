import Link from 'next/link'

import { TagModel } from 'types/index.types'
const ArticleTag = ({ data }: { data: TagModel }) => {
  return (
    <Link
      href={`/blog?page=1&tagId=${data.id}`}
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {data.name}
    </Link>
  )
}

export default ArticleTag
