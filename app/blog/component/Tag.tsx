import Link from 'next/link'

import { TagModel } from 'types/index.types'
const Tag = ({ data }: { data: TagModel }) => {
  return (
    <Link
      href={`/tags/`}
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {data.name}
    </Link>
  )
}

export default Tag
