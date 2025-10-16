import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface Product {
  id: number
  title: string
  price: string
  image: string
}

function YouMayAlsoLike() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      checkScroll()
    }, 100)

    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScroll)
      window.addEventListener('resize', checkScroll)
      return () => {
        clearTimeout(timer)
        scrollElement.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
      }
    }
  }, [])

  const products: Product[] = [
    {
      id: 1,
      title: 'Blue/Purple Patterned Zip...',
      price: '$37',
      image: '/assets/images/product1.png'
    },
    {
      id: 2,
      title: 'Green/White Harlequin...',
      price: '$38',
      image: '/assets/images/product2.png'
    },
    {
      id: 3,
      title: 'Chocolate Brown Plain Funnel',
      price: '$35',
      image: '/assets/images/product3.png'
    },
    {
      id: 4,
      title: 'Blue Plain Funnel Neck Fleece Zip...',
      price: '$35',
      image: '/assets/images/product4.png'
    },
    {
      id: 5,
      title: 'Stone Plain Funnel Neck Fleece Zip...',
      price: '$35',
      image: '/assets/images/product5.png'
    },
    {
      id: 6,
      title: 'Blue/Navy Pattern Navy Fleece Shock...',
      price: '$37',
      image: '/assets/images/product6.png'
    },
    {
      id: 7,
      title: 'Multi Checkerboard Hooded Fleece Zip...',
      price: '$35',
      image: '/assets/images/product7.png'
    },
    {
      id: 8,
      title: 'Light Blue Hooded Fleece Zip Through...',
      price: '$35',
      image: '/assets/images/product8.png'
    },
    {
      id: 9,
      title: 'Navy Blue Hooded Fleece Zip Through...',
      price: '$35',
      image: '/assets/images/clothing.jpg'
    },
    {
      id: 10,
      title: 'Charcoal Grey Plain Funnel Neck Fleece...',
      price: '$35',
      image: '/assets/images/bathTime4.jpg'
    },
    {
      id: 11,
      title: 'Tan Brown Hooded Fleece Zip Through...',
      price: '$40',
      image: '/assets/images/gifts.jpg'
    }
  ]

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="pt-10">
      <div className="mx-auto max-w-[90%] px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-rubik text-2xl font-medium text-text-primary">
            You May Also Like
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
                    {product.price}
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

export default YouMayAlsoLike
