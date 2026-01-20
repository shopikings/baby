import { useEffect, useRef, useState } from 'react'

// Define the collection type based on your API response
type ShopifyCollection = {
  id: string
  handle: string
  title: string
  description: string
  image: string | null
}

// Collections to exclude (like internal/technical collections)
const EXCLUDE_COLLECTIONS = [
  'globofilter-best-selling-products-index',
  'rylee-cru-quincy-mae-noralee',
  'rylee-cru',
  'accessories',
  'best-selling',
  'christmas',
  'hanukkah',
  'bath-time',
  'veer',
  'kyte-baby',
  'barefoot-dreams',
  'birdie-bean',
  'magnetic-mee',
  'nuna-baby',
  'breathable-organics',
  'uppa-baby',
  'toys',
  'sale'
]

function CategoryNav() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<ShopifyCollection[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCollections() {
      try {
        setLoading(true)
        setError(null)

        const resp = await fetch(
          import.meta.env.VITE_BACKEND_API_URL + `/collections`
        )

        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`)
        }

        const data = await resp.json()

        if (data && data.data) {
          // Filter out collections we don't want to show
          const filteredCollections = data.data.filter(
            (collection: ShopifyCollection) =>
              !EXCLUDE_COLLECTIONS.includes(collection.handle) &&
              !collection.title.includes('Smart Filter') && // Exclude smart filter collections
              !collection.title.includes('Do not delete') // Exclude internal collections
          )

          setCategories(filteredCollections)
        }
      } catch (err) {
        console.error('Failed to load collections:', err)
        setError('Failed to load categories')
        // Fallback to empty array if API fails
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [])

  if (loading) {
    return (
      <div className="bg-cream border-b border-gray-200">
        <div className="overflow-x-auto px-8 py-6">
          <div className="flex gap-4 animate-pulse">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="px-16 py-3 rounded-full bg-gray-200 flex-shrink-0"
                style={{ width: '120px' }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-cream border-b border-gray-200">
        <div className="text-center py-6 text-red-600">
          Failed to load categories. Please try again later.
        </div>
      </div>
    )
  }

  if (categories.length === 0) {
    return (
      <div className="bg-cream border-b border-gray-200">
        <div className="text-center py-6 text-gray-500">
          No categories available.
        </div>
      </div>
    )
  }

  return (
    <div className="bg-cream border-b border-gray-200">
      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto px-8 py-6"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="flex gap-4">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/shop?category=${category.handle}`}
              className="px-16 py-3 rounded-full font-raleway tracking-wide text-xs border-black border transition-all bg-[#E9908E] uppercase text-black font-bold hover:bg-[#d88d9a] flex-shrink-0 inline-block whitespace-nowrap"
              title={category.description || category.title}
            >
              {category.title.toUpperCase()}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        div::-webkit-scrollbar {
          height: 4px;
        }
        div::-webkit-scrollbar-track {
          background: #f5f5f5;
        }
        div::-webkit-scrollbar-thumb {
          background: #E89FAC;
          border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: #d88d9a;
        }
      `}</style>
    </div>
  )
}

export default CategoryNav
