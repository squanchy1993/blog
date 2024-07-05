import Link from '@/components/Link'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import { alovaInstance } from 'http/index'
import { TagModel } from 'types/index.types'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  const { data: tags } = await alovaInstance.Get<{ data: TagModel[] }>(
    `https://nestjs.zsjs.fun/article-tag`,
    {
      localCache: 1000,
    }
  )
  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            Tags
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {tags.length === 0 && 'No tags found.'}
          {tags.map((t) => {
            return (
              <div key={t.id} className="mb-2 mr-5 mt-2">
                {/* <Tag text={t.name} /> */}
                <Link
                  href={`/blog?page=1&tagId=${t.id}`}
                  className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                  aria-label={`View posts tagged ${t.name}`}
                >
                  {`${t.name} (${t._count.articles})`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
