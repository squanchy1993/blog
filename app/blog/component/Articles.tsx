import { alovaInstance } from 'http/index'
import Link from 'next/link'
import Tag from './Tag'
import { formatDate } from 'pliny/utils/formatDate'
import Pagination from './Pagination'

type TableParams = { title?: string; tagId?: string; page?: string }

export default async function ArticleTable({ title, tagId, page = '1' }: TableParams) {
  const parmas = {
    page_index: page,
    page_size: 10,
    title,
  }

  if (tagId) {
    parmas['tagIds'] = [tagId]
  } else {
    Reflect.deleteProperty(parmas, 'tagIds')
  }

  const {
    data: { list, pageData: { pageCount } },
  } = await alovaInstance.Get(`https://nestjs.zsjs.fun/article/page`, {
    params: parmas,
    localCache: 1000,
  })


  return (
    <div className="flex flex-col">
      <ul className="list-none">
        {list?.map((item) => (
          <li key={item.id} className="py-5">
            <article className="flex flex-col space-y-2 xl:space-y-0">
              <dl>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                  <time dateTime={item.updatedAt}>{formatDate(item.updatedAt, 'en-US')}</time>
                </dd>
              </dl>
              <div className="space-y-3">
                <div>
                  <h2 className="text-2xl font-bold leading-8 tracking-tight">
                    <Link href={`/`} className="text-gray-900 dark:text-gray-100">
                      {item.title}
                    </Link>
                  </h2>
                  <div className="flex flex-wrap">
                    {item.tags?.map((tag) => <Tag data={tag} key={tag.id} />)}
                  </div>
                </div>
                <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                  {item.content}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <Pagination totalPages={pageCount} currentPage={Number(page)} />
    </div>
  )
}
