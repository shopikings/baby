import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchProducts } from '../utils/shopify'

interface Product {
  id: string
  title: string
  price: string
  image: string
}

function MostPopular() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const navigate = useNavigate() // ✅ ADDED

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    const loadProducts = async () => {
      const { products } = await fetchProducts({
        tag: 'best-selling',
        limit: 20
      })

      const formatted = products.map((p) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        image: p.images[0] || '/no-image.png'
      }))

      setProducts(formatted)
      setLoading(false)
      setTimeout(checkScroll, 200)
    }

    loadProducts()
  }, [])

  useEffect(() => {
    const scrollEl = scrollRef.current
    if (!scrollEl) return

    scrollEl.addEventListener('scroll', checkScroll)
    window.addEventListener('resize', checkScroll)

    return () => {
      scrollEl.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' })
  }

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' })
  }

  // ✅ SAME CLEAN ID LOGIC AS ProductCard
  const openProduct = (shopifyId: string) => {
    const cleanId = shopifyId.includes('gid://shopify/Product/')
      ? shopifyId.split('/').pop()
      : shopifyId

    navigate(`/product/${cleanId}`)
  }

  if (loading)
    return <p className="text-center py-10 text-gray-500">Loading...</p>

  return (
    <div className="pt-10">
      <div className="mx-auto max-w-[90%] px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-rubik text-2xl font-medium text-text-primary">
            Most Popular
          </h2>
          <Link
            to="/shop"
            className="font-inter text-sm font-medium text-text-primary hover:underline"
          >
            View All
          </Link>
        </div>
      </div>

      <div className="bg-white py-8">
        <div className="relative">
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 z-10 flex h-12 w-8 -translate-y-1/2 items-center justify-center border border-gray-200 bg-white text-text-primary shadow-lg transition-all hover:w-10 hover:bg-gray-50"
            >
              <svg
                className="size-5"
                fill="none"
                stroke="currentColor"
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

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto px-2 pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => openProduct(product.id)} // ✅ CLICK HANDLER
                className="w-[200px] shrink-0 cursor-pointer transition-all"
              >
                <div className="h-48 overflow-hidden rounded-none bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="size-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="mt-4">
                  <h3 className="line-clamp-2 font-inter text-sm font-medium text-text-primary">
                    {product.title}
                  </h3>

                  <p className="mt-2 font-inter text-lg font-semibold text-text-primary">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 z-10 flex h-12 w-8 -translate-y-1/2 items-center justify-center border border-gray-200 bg-white text-text-primary shadow-lg transition-all hover:w-10 hover:bg-gray-50"
            >
              <svg
                className="size-5"
                fill="none"
                stroke="currentColor"
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
    </div>
  )
}

export default MostPopular
