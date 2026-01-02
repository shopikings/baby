import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWishlist } from 'contexts/WishlistContext'
import toast from 'react-hot-toast'

interface Collection {
  id: string
  name: string
  image: string
  price: string
}

function NewCollectionGrid() {
  const navigate = useNavigate()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)

  const collections: Collection[] = [
    {
      id: '1',
      name: 'JELLYCAT',
      image: '/assets/images/featured-brands-one.jpg',
      price: '$45.00'
    },
    {
      id: '2',
      name: 'ENEWTON',
      image: '/assets/images/featured-brands-two.jpg',
      price: '$65.00'
    },
    {
      id: '3',
      name: 'NUNA',
      image: '/assets/images/featured-brands-three.jpg',
      price: '$120.00'
    },
    {
      id: '4',
      name: 'UPPABABY',
      image: '/assets/images/featured-brands-four.jpg',
      price: '$150.00'
    },
    {
      id: '5',
      name: 'KYTE BABY',
      image: '/assets/images/Kyte-baby.png',
      price: '$55.00'
    },
    {
      id: '6',
      name: 'MAGNETIC ME',
      image: '/assets/images/magnatic.png',
      price: '$35.00'
    },
    {
      id: '7',
      name: 'QUNICY MAE',
      image: '/assets/images/qunicy.png',
      price: '$75.00'
    },
    {
      id: '8',
      name: 'RYLE + CRU',
      image: '/assets/images/ryle-+-cru.png',
      price: '$85.00'
    },
    {
      id: '9',
      name: 'BAREFOOT DREAMS',
      image: '/assets/images/dreams.png',
      price: '$95.00'
    }
  ]

  const filteredCollections = useMemo(() => {
    let filtered = collections
    
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
  }, [searchQuery, selectedLetter])

  const handleCardClick = (collection: Collection) => {
    navigate(
      `/shop?category=${collection.name.toLowerCase().replace(/\s+/g, '-')}`
    )
  }

  const handleWishlistClick = (e: React.MouseEvent, collection: Collection) => {
    e.stopPropagation()
    const productId = collection.id
    const isWishlisted = isInWishlist(productId)

    if (isWishlisted) {
      removeFromWishlist(productId)
      toast.success('Removed from wishlist')
    } else {
      const wishlistItem = {
        id: productId,
        name: collection.name,
        price: collection.price,
        image: collection.image
      }
      addToWishlist(wishlistItem)
      toast.success('Added to wishlist')
    }
  }

  return (
    <section className="bg-cream py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className='flex flex-col items-center'>
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
          {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map(
            (letter) => (
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
            )
          )}


        </div>
        </div>
        



        {/* Products Grid */}
        {filteredCollections.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5 lg:gap-8">
            {filteredCollections.map((collection) => {
              const isWishlisted = isInWishlist(collection.id)
              return (
                <div
                  key={collection.id}
                  className="group cursor-pointer border border-black font-raleway hover:bg-[#E9908E] hover:text-white shadow-lg p-5 rounded-lg"
                  onClick={() => handleCardClick(collection)}
                >

                  <div className="space-y-2 text-center">
                    <h3 className="font-raleway text-lg font-medium leading-[18px] text-black sm:text-lg sm:leading-[22px]">
                      {collection.name}
                    </h3>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-text-primary/60 font-raleway">No brands found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default NewCollectionGrid
