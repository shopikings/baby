import { useState, useRef, useEffect } from 'react'
import ProductCard from './ProductCard'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { fetchProducts, ShopifyProduct } from '../utils/shopify'

interface RecommendationsSliderProps {
  bgWhite?: boolean
}

const CATEGORY_TO_COLLECTION: Record<string, string> = {
  toys: 'toys',
  clothing: 'clothing',
  gifts: 'gifts'
}

function RecommendationsSlider({ bgWhite }: RecommendationsSliderProps) {
  const [activeCategory, setActiveCategory] = useState('toys')
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadProducts(activeCategory)
  }, [activeCategory])

  const loadProducts = async (category: string) => {
    try {
      setLoading(true)

      const collectionHandle = CATEGORY_TO_COLLECTION[category]

      const { products } = await fetchProducts({
        collectionHandle,
        tag: 'best-selling',
        limit: 20
      })

      setProducts(products)
    } catch (err) {
      console.error('Failed to load products:', err)
      setProducts([])
    } finally {
      setLoading(false)
      setCurrentIndex(0)
      sliderRef.current?.scrollTo({ left: 0 })
    }
  }

  const scrollToIndex = (index: number) => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.clientWidth
      const scrollWidth = sliderRef.current.scrollWidth
      const cardWidth = sliderRef.current.children[0]?.clientWidth || 0
      const actualGap = window.innerWidth >= 640 ? 24 : 16
      const maxIndex = products.length - 4

      let scrollPosition = 0

      if (index === maxIndex) {
        scrollPosition = scrollWidth - containerWidth + 60
      } else {
        scrollPosition = index * (cardWidth + actualGap)
      }

      sliderRef.current.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
      })

      setCurrentIndex(index)
    }
  }

  const nextSlide = () => {
    const maxIndex = products.length - 4
    if (currentIndex < maxIndex) scrollToIndex(currentIndex + 1)
  }

  const prevSlide = () => {
    if (currentIndex > 0) scrollToIndex(currentIndex - 1)
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
  }

  return (
    <section
      className={` py-12 sm:py-16 lg:py-20 ${
        bgWhite ? 'bg-white' : 'bg-cream'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col gap-4 lg:relative lg:flex-row lg:items-center lg:justify-between">
            <h2
              className="text-center font-rubik font-normal uppercase text-text-primary lg:text-start"
              style={{ fontSize: '32px' }}
            >
              BEST SELLING
            </h2>

            {/* CATEGORY BUTTONS */}
            {/* <div className="flex justify-center gap-3 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
              {['toys', 'clothing', 'gifts'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`rounded-full border-2 px-4 py-2 font-rubik text-xs sm:px-6 sm:text-sm ${
                    activeCategory === cat
                      ? 'border-button-hover bg-button-hover text-white underline'
                      : 'border-button-hover text-button-hover hover:bg-button-hover hover:text-white'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div> */}

            <Link to="/shop">
              <button className="flex items-center justify-center gap-2 font-inter text-xs sm:text-base uppercase text-button-hover hover:text-button-hover/80">
                SHOP ALL
                <ArrowUpRight className="size-5 text-black" />
              </button>
            </Link>
          </div>
        </div>

        {/* SLIDER */}
        <div className="relative">
          {loading ? (
            <p className="text-center py-10 text-gray-500">
              Loading products...
            </p>
          ) : (
            <div
              ref={sliderRef}
              className="flex gap-4 overflow-x-auto sm:gap-6"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="min-w-[280px] sm:min-w-[320px]"
                >
                  <ProductCard
                    id={product.id}
                    image={product.images?.[0]}
                    hoverImage={product.images?.[1] || product.images?.[0]}
                    title={product.title}
                    price={`$${product.price}`}
                  />
                </div>
              ))}
            </div>
          )}

          {currentIndex > 0 && !loading && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 bg-button-hover p-3 rounded-full shadow-lg"
            >
              <svg
                className="size-5"
                fill="none"
                stroke="#444B59"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {currentIndex < products.length - 4 && !loading && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2 bg-button-hover p-3 rounded-full shadow-lg"
            >
              <svg
                className="size-5"
                fill="none"
                stroke="#444B59"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default RecommendationsSlider
