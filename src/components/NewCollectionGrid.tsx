import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

interface Brand {
  id: string
  name: string
  image?: string
}

function NewCollectionGrid() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    async function fetchBrands() {
      try {
        setLoading(true)
        const resp = await fetch(
          import.meta.env.VITE_BACKEND_API_URL + `/brands`
        )

        const data = await resp.json()

        if (data && data.data) {
          // Transform the string array into Brand objects
          const brandList = data.data
            .filter((brandName: string) => brandName !== '(Default Supplier)') // Filter out unwanted entries
            .map((brandName: string, index: number) => ({
              id: `brand-${index}`,
              name: brandName,
              // Use placeholder images or map to actual images if available
              image: getBrandImage(brandName)
            }))
          setBrands(brandList)
        }
      } catch (err) {
        console.error('Failed to load brands:', err)
        // Fallback to hardcoded brands if API fails
        setBrands(getFallbackBrands())
      } finally {
        setLoading(false)
      }
    }

    fetchBrands()
  }, [])

  // Helper function to get appropriate image for each brand
  const getBrandImage = (brandName: string): string => {
    const imageMap: Record<string, string> = {
      JELLYCAT: '/assets/images/featured-brands-one.jpg',
      ENEWTON: '/assets/images/featured-brands-two.jpg',
      NUNA: '/assets/images/featured-brands-three.jpg',
      UPPABABY: '/assets/images/featured-brands-four.jpg',
      'KYTE BABY': '/assets/images/Kyte-baby.png',
      'MAGNETIC ME': '/assets/images/magnatic.png',
      'QUINCY MAE': '/assets/images/qunicy.png',
      'RYLEE + CRU': '/assets/images/ryle-+-cru.png',
      'BAREFOOT DREAMS': '/assets/images/dreams.png'
    }

    return (
      imageMap[brandName.toUpperCase()] || '/assets/images/default-brand.jpg'
    )
  }

  // Fallback brands in case API fails
  const getFallbackBrands = (): Brand[] => {
    return [
      {
        id: '1',
        name: 'JELLYCAT',
        image: '/assets/images/featured-brands-one.jpg'
      },
      {
        id: '2',
        name: 'ENEWTON',
        image: '/assets/images/featured-brands-two.jpg'
      },
      {
        id: '3',
        name: 'NUNA',
        image: '/assets/images/featured-brands-three.jpg'
      },
      {
        id: '4',
        name: 'UPPABABY',
        image: '/assets/images/featured-brands-four.jpg'
      },
      { id: '5', name: 'KYTE BABY', image: '/assets/images/Kyte-baby.png' },
      { id: '6', name: 'MAGNETIC ME', image: '/assets/images/magnatic.png' },
      { id: '7', name: 'QUINCY MAE', image: '/assets/images/qunicy.png' },
      { id: '8', name: 'RYLEE + CRU', image: '/assets/images/ryle-+-cru.png' },
      { id: '9', name: 'BAREFOOT DREAMS', image: '/assets/images/dreams.png' }
    ]
  }

  const filteredBrands = useMemo(() => {
    let filtered = brands

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by selected letter
    if (selectedLetter) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().startsWith(selectedLetter.toLowerCase())
      )
    }

    return filtered
  }, [brands, searchQuery, selectedLetter])

  const handleCardClick = (brand: Brand) => {
    navigate(`/shop?brand=${encodeURIComponent(brand.name.toLowerCase())}`)
  }

  if (loading) {
    return (
      <section className="bg-cream py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <h2 className="mb-8 uppercase font-raleway text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">
              Shop by brand
            </h2>
            <div className="py-12 text-center">
              <p className="text-text-primary/60 font-raleway">
                Loading brands...
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-cream py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="flex flex-col items-center">
          <div>
            <h2 className="mb-8 uppercase font-raleway text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">
              Shop by brand
            </h2>
          </div>

          <div className="relative w-full max-w-xl mr-3 mb-7">
            <svg
              className="absolute left-3 top-[10px] size-4 text-gray-400"
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
            <input
              type="text"
              placeholder="Search by brand..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setSelectedLetter(null)
              }}
              className="w-full rounded-lg border font-raleway border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-text-primary placeholder-gray-400 transition-colors focus:border-text-primary focus:outline-none"
            />
          </div>
          {/* Search Bar and Alphabet Filters on same line */}
          <div className="mb-8 flex flex-wrap items-center gap-2 h-auuto">
            <button
              onClick={() => setSelectedLetter(null)}
              className={`rounded-lg border px-3 font-raleway py-1 text-xs transition-colors sm:px-3 sm:text-sm ${
                selectedLetter === null
                  ? 'bg-[#E9908E] text-white'
                  : 'bg-[#E9908E] text-white  hover:bg-[#E9908E]/95'
              }`}
            >
              All
            </button>

            {/* Alphabet Filter */}
            {[
              'A',
              'B',
              'C',
              'D',
              'E',
              'F',
              'G',
              'H',
              'I',
              'J',
              'K',
              'L',
              'M',
              'N',
              'O',
              'P',
              'Q',
              'R',
              'S',
              'T',
              'U',
              'V',
              'W',
              'X',
              'Y',
              'Z'
            ].map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`rounded-lg border px-2 py-1 text-xs transition-colors font-raleway sm:px-3 sm:text-sm ${
                  selectedLetter === letter
                    ? 'border-[#E9908E] bg-[#E9908E] text-white'
                    : 'border-gray-300 bg-white text-text-primary hover:border-text-primary hover:bg-gray-50'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Brands Grid */}
        {filteredBrands.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5 lg:gap-8">
            {filteredBrands.map((brand) => {
              return (
                <div
                  key={brand.id}
                  className="group cursor-pointer border border-black font-raleway hover:bg-[#E9908E] hover:text-white shadow-lg p-5 rounded-lg h-full min-h-[120px] flex items-center justify-center"
                  onClick={() => handleCardClick(brand)}
                >
                  <div className="space-y-2 text-center">
                    <h3 className="font-raleway uppercase text-lg font-medium leading-[18px] text-black sm:text-lg sm:leading-[22px] group-hover:text-white">
                      {brand.name}
                    </h3>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-text-primary/60 font-raleway">
              {searchQuery
                ? `No brands found matching "${searchQuery}"`
                : 'No brands available'}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default NewCollectionGrid
