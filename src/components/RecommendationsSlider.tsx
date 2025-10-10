import { useState, useRef } from 'react'
import ProductCard from './ProductCard'

function RecommendationsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const products = [
    {
      id: 1,
      image: '/assets/images/product1.png',
      hoverImage: '/assets/images/product5.png',
      title:
        'Boys Organic Bamboo Underwear 7-Pack - Tag-Free, Soft, Breathable',
      price: '$28.00'
    },
    {
      id: 2,
      image: '/assets/images/product2.png',
      hoverImage: '/assets/images/product6.png',
      title: 'Augustin Mini Bum Bag - Organic Cotton Canvas In Olive Green',
      price: '$30.00'
    },
    {
      id: 3,
      image: '/assets/images/product3.png',
      hoverImage: '/assets/images/product7.png',
      title: 'Kids Organic Cotton Girl Power Short Sleeve T-Shirt In Natural',
      price: '$30.00'
    },
    {
      id: 4,
      image: '/assets/images/product4.png',
      hoverImage: '/assets/images/product8.png',
      title: 'Kids MA-1 Flight Test Jacket in Ranger Green',
      price: '$65.00'
    },
    {
      id: 5,
      image: '/assets/images/product1.png',
      hoverImage: '/assets/images/product5.png',
      title: 'Organic Cotton Striped T-Shirt',
      price: '$25.00'
    },
    {
      id: 6,
      image: '/assets/images/product2.png',
      hoverImage: '/assets/images/product6.png',
      title: 'Kids Denim Overalls',
      price: '$45.00'
    }
  ]

  const scrollToIndex = (index: number) => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.clientWidth
      const scrollWidth = sliderRef.current.scrollWidth
      const maxIndex = products.length - 4

      let scrollPosition = 0

      if (index === maxIndex) {
        scrollPosition = scrollWidth - containerWidth + 60
      } else {
        const cardWidth = sliderRef.current.children[0]?.clientWidth || 0
        const actualGap = window.innerWidth >= 640 ? 24 : 16
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
    if (currentIndex < maxIndex) {
      scrollToIndex(currentIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1)
    }
  }

  return (
    <section className="bg-cream py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between sm:mb-12">
          <div>
            <h2 className="mb-2 font-rubik text-2xl font-normal text-text-primary sm:text-3xl md:text-4xl lg:text-4xl">
              BEST SELLING Collection
            </h2>
          </div>

          <button className="flex items-center gap-2 font-inter text-xs font-medium uppercase text-button-hover hover:text-button-hover/80 sm:text-base">
            SHOP ALL
            <img
              src="/assets/icons/ArrowLink.svg"
              alt="Arrow"
              className="size-3"
            />
          </button>
        </div>

        <div className="relative">
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto sm:gap-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <div key={product.id} className="min-w-[280px] sm:min-w-[320px]">
                <ProductCard
                  image={product.image}
                  hoverImage={product.hoverImage}
                  title={product.title}
                  price={product.price}
                />
              </div>
            ))}
          </div>

          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 flex -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full bg-button-hover p-3 shadow-lg transition-all hover:shadow-xl"
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

          {currentIndex < products.length - 4 && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 flex -translate-y-1/2 translate-x-4 items-center justify-center rounded-full bg-button-hover p-3 shadow-lg transition-all hover:shadow-xl"
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
