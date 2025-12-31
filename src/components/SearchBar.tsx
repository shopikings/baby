interface SearchBarProps {
  onSearchClick: () => void
}

function SearchBar({ onSearchClick }: SearchBarProps) {
  return (
    <button
      onClick={onSearchClick}
      className="hidden sm:flex items-center justify-center flex-1 max-w-xs px-3 py-2 border border-gray-400 rounded font-inter text-xs md:text-sm text-gray-600 hover:text-gray-800 hover:border-gray-800 transition-all bg-white gap-2"
    >
      <svg
        className="w-4 h-4 md:w-5 md:h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <span>Search...</span>
    </button>
  )
}

export default SearchBar
