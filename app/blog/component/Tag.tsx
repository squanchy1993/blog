import Link from 'next/link'
interface Props {
  data: object
}

const Tag = ({ data }: Props) => {
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
