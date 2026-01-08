import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [brands, setBrands] = useState<string[]>([])

  const brandItems = [
    'JELLYCAT',
    'RYLE + CRU',
    'BAREFOOT DREAMS',
    'KYTE BABY',
    'MAGNETIC ME',
    'QUINCY MAE',
    'ENEWTON',
    'NUNA',
    'UPPABABY'
  ]

  useEffect(() => {
    async function fetchBrands() {
      try {
        setLoading(true)
        const resp = await fetch(
          import.meta.env.VITE_BACKEND_API_URL + `/brands`
        )

        const data = await resp.json()

        if (data && data.data) {
          setBrands(data.data)
        }
      } catch (err) {
        console.error('Failed to load brands:', err)
        // Fallback to hardcoded brands if API fails
      } finally {
        setLoading(false)
      }
    }

    fetchBrands()
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const match = brands.find(
      (b) => b.toLowerCase() === searchQuery.trim().toLowerCase()
    )

    if (match) {
      handleBrandClick(match)
    }
  }

  // Filter brands based on search query
  const filteredBrands = searchQuery.trim()
    ? brands.filter((brand) =>
        brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : brands

  const handleBrandClick = (brand: string) => {
    navigate(`/shop?brand=${encodeURIComponent(brand.toLowerCase())}`)
    setSearchQuery('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 transition-opacity"
        onClick={onClose}
      />

      {/* Side Panel */}
      <div
        className="fixed right-0 top-0 z-50 h-[60%] w-full rounded-b-lg max-w-md bg-cream shadow-2xl flex flex-col transition-transform duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="border-b border-gray-300 p-4 md:p-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full px-4 py-2 border-[1px] border-gray-500 rounded-lg font-raleway text-base focus:outline-none focus:border-gray-800 transition-all bg-cream"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
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
                </button>
              </div>
            </form>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 transition-colors flex-shrink-0"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Brand Suggestions - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <h3 className="font-rubik text-sm font-light text-text-primary mb-6 uppercase">
            Brand Suggestions
          </h3>
          <div className="space-y-2">
            {filteredBrands.length > 0 ? (
              filteredBrands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => handleBrandClick(brand)}
                  className="block w-full text-left px-2 py-1 font-light text-base text-text-primary hover:bg-gray-800 hover:text-cream transition-colors rounded"
                >
                  {brand}
                </button>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No brands found</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchModal
