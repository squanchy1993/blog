import { genPageMetadata } from 'app/seo'
import { Suspense } from 'react'
import SideBar from './component/Sidebar'
import ArticleTable from './component/Articles'
import { PostArticleSkeleton } from './component/skeletons'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })
// export const revalidate = 0

export default function BlogPage({
  searchParams,
}: {
  searchParams?: {
    page?: string
    title?: string
    tagId?: string
  }
}) {
  return (
    <div>
      <div className="pb-6 pt-6">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {'Blog'}
        </h1>
      </div>
      <div className="flex sm:space-x-24">
        <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
          <div className="px-6 py-4">
            <SideBar></SideBar>
          </div>
        </div>
        <div className="flex-1">
          <Suspense key={JSON.stringify(searchParams)} fallback={<PostArticleSkeleton />}>
            <ArticleTable
              page={searchParams?.page}
              tagId={searchParams?.tagId}
              title={searchParams?.title}
            ></ArticleTable>
          </Suspense>
        </div>
      </div>
    </div>
  )
}
