'use client'

import { alovaInstance } from 'http/index'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { TagModel } from 'types/index.types'

export default function SideBar() {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const [tagList, setTagList] = useState<TagModel[]>([])

  const handleClick = (t?: TagModel) => {
    console.log(`Searching... ${t}`)

    const params = new URLSearchParams(searchParams)

    params.set('page', '1')
    if (t) {
      params.set('tagId', t.id.toString())
    } else {
      params.delete('tagId')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  useEffect(() => {
    alovaInstance
      .Get<{ data: TagModel[] }>(`https://nestjs.zsjs.fun/article-tag`, {
        localCache: 1000,
      })
      .then((res) => {
        setTagList(res.data)
      })
  }, [])
  console.log('searchParams.get(tagId)', searchParams.get('tagId'))

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <div>
        <div
          role="button"
          key={'allPostTag'}
          tabIndex={0}
          className="my-3"
          onClick={() => handleClick()}
          onKeyPress={() => handleClick()}
        >
          <h3
            className={`px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500  ${!searchParams.get('tagId') ? 'text-primary-500' : 'dark:text-gray-300'}`}
          >
            {` All post`}
          </h3>
        </div>
        {tagList.map((t) => {
          return (
            <div
              role="button"
              key={t.id}
              tabIndex={t.id}
              className="my-3"
              onClick={() => handleClick(t)}
              onKeyPress={() => handleClick(t)}
            >
              <h3
                className={`px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500 ${searchParams.get('tagId') == t.id.toString() ? 'text-primary-500' : ''}`}
              >
                {`${t.name} (${t._count.articles})`}
              </h3>
            </div>
          )
        })}
      </div>
    </div>
  )
}
