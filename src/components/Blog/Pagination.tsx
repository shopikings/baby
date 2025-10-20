import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) {
  const renderPageNumbers = () => {
    const pages = []

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`flex size-10 items-center justify-center rounded-full text-sm transition-all ${
              currentPage === i
                ? 'bg-button-hover text-white'
                : 'bg-transparent text-black hover:bg-gray-200'
            }`}
          >
            {i}
          </button>
        )
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(
          <span
            key={i}
            className="flex size-10 items-center justify-center text-black"
          >
            ...
          </span>
        )
      }
    }

    return pages
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex size-10 items-center justify-center rounded-full bg-[#EAE4E0] transition-all hover:bg-[#d4ccc6] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <img
          src="/assets/icons/arrowLeftTwo.svg"
          alt="Previous"
          className="size-3.5 select-none"
        />
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex size-10 items-center justify-center rounded-full bg-[#EAE4E0] transition-all hover:bg-[#d4ccc6] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <img
          src="/assets/icons/arrowRightTwo.svg"
          alt="Next"
          className="size-3.5 select-none"
        />
      </button>
    </div>
  )
}
