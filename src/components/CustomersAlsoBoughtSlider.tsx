import { useRef, useState, useEffect } from 'react'

interface Product {
  id: number
  title: string
  price: string
  image: string
}

function CustomersAlsoBoughtSlider() {
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
      title: 'Chocolate Brown Plain',
      price: '$35',
      image: '/assets/images/product3.png'
    },
    {
      id: 4,
      title: 'Blue Plain Funnel Neck',
      price: '$35',
      image: '/assets/images/product4.png'
    },
    {
      id: 5,
      title: 'Stone Plain Funnel Neck',
      price: '$35',
      image: '/assets/images/product5.png'
    }
  ]

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200,
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="relative bg-white p-2">
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 z-10 flex h-8 w-6 -translate-y-1/2 items-center justify-center border border-gray-200 bg-white text-text-primary shadow transition-all hover:w-8"
        >
          <svg
            className="size-4"
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
        className="flex gap-3 overflow-x-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[120px] shrink-0 cursor-pointer transition-all"
          >
            <div className="h-32 overflow-hidden rounded-none bg-gray-100">
              <img
                src={product.image}
                alt={product.title}
                className="size-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="mt-2">
              <h3 className="line-clamp-2 font-inter text-xs font-medium text-text-primary">
                {product.title}
              </h3>
              <p className="mt-1 font-inter text-sm font-semibold text-text-primary">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 z-10 flex h-8 w-6 -translate-y-1/2 items-center justify-center border border-gray-200 bg-white text-text-primary shadow transition-all hover:w-8"
        >
          <svg
            className="size-4"
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
  )
}

export default CustomersAlsoBoughtSlider
