'use client'

import Link from 'next/link'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface PaginationProps {
  totalPages: number
  currentPage: number
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
  console.log('ok')
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  const preClick = () => {
    const params = new URLSearchParams(searchParams)
    params.set('page', (currentPage - 1).toString())
    console.log(params.toString())
    replace(`${pathname}?${params.toString()}`)
  }

  const nextClick = () => {
    const params = new URLSearchParams(searchParams)
    params.set('page', (currentPage + 1).toString())
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        <button
          className="cursor-auto disabled:opacity-50"
          onClick={() => preClick()}
          disabled={!prevPage}
        >
          Previous
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          className="cursor-auto disabled:opacity-50"
          onClick={() => nextClick()}
          disabled={!nextPage}
        >
          Next
        </button>
      </nav>
    </div>
  )
}
