import { useState, useRef } from 'react'
import ProductCard from './ProductCard'
import { Link } from 'react-router-dom'

interface RecommendationsSliderProps {
  bgWhite?: boolean
}

function RecommendationsSlider({ bgWhite }: RecommendationsSliderProps) {
  const [activeCategory, setActiveCategory] = useState('toys')
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const productsByCategory = {
    toys: [
      {
        id: 1,
        image: '/assets/images/product1.png',
        hoverImage: '/assets/images/product5.png',
        title: 'Wooden Building Blocks Set - Educational Toy for Kids',
        price: '$35.00'
      },
      {
        id: 2,
        image: '/assets/images/product2.png',
        hoverImage: '/assets/images/product6.png',
        title: 'Organic Cotton Stuffed Animal - Eco-Friendly Plush Bear',
        price: '$28.00'
      },
      {
        id: 3,
        image: '/assets/images/product3.png',
        hoverImage: '/assets/images/product7.png',
        title: 'Montessori Learning Puzzle - Sustainable Bamboo Material',
        price: '$42.00'
      },
      {
        id: 4,
        image: '/assets/images/product4.png',
        hoverImage: '/assets/images/product8.png',
        title: 'Musical Instrument Set - Child-Safe Materials',
        price: '$55.00'
      },
      {
        id: 5,
        image: '/assets/images/product1.png',
        hoverImage: '/assets/images/product5.png',
        title: 'Stacking Rings Toy - Natural Wood Finish',
        price: '$25.00'
      },
      {
        id: 6,
        image: '/assets/images/product2.png',
        hoverImage: '/assets/images/product6.png',
        title: 'Sensory Play Dough Kit - Non-Toxic Formula',
        price: '$18.00'
      }
    ],
    clothing: [
      {
        id: 7,
        image: '/assets/images/product3.png',
        hoverImage: '/assets/images/product7.png',
        title:
          'Boys Organic Bamboo Underwear 7-Pack - Tag-Free, Soft, Breathable',
        price: '$28.00'
      },
      {
        id: 8,
        image: '/assets/images/product4.png',
        hoverImage: '/assets/images/product8.png',
        title: 'Kids Organic Cotton Girl Power Short Sleeve T-Shirt In Natural',
        price: '$30.00'
      },
      {
        id: 9,
        image: '/assets/images/product1.png',
        hoverImage: '/assets/images/product5.png',
        title: 'Kids MA-1 Flight Test Jacket in Ranger Green',
        price: '$65.00'
      },
      {
        id: 10,
        image: '/assets/images/product2.png',
        hoverImage: '/assets/images/product6.png',
        title: 'Augustin Mini Bum Bag - Organic Cotton Canvas In Olive Green',
        price: '$30.00'
      },
      {
        id: 11,
        image: '/assets/images/product3.png',
        hoverImage: '/assets/images/product7.png',
        title: 'Organic Cotton Striped T-Shirt - Comfortable Fit',
        price: '$25.00'
      },
      {
        id: 12,
        image: '/assets/images/product4.png',
        hoverImage: '/assets/images/product8.png',
        title: 'Kids Denim Overalls - Sustainable Cotton',
        price: '$45.00'
      }
    ],
    gifts: [
      {
        id: 13,
        image: '/assets/images/product2.png',
        hoverImage: '/assets/images/product6.png',
        title: 'Personalized Baby Memory Book - Organic Cotton Cover',
        price: '$45.00'
      },
      {
        id: 14,
        image: '/assets/images/product4.png',
        hoverImage: '/assets/images/product8.png',
        title: 'Eco-Friendly Art Supply Kit - Non-Toxic Materials',
        price: '$38.00'
      },
      {
        id: 15,
        image: '/assets/images/product1.png',
        hoverImage: '/assets/images/product5.png',
        title: 'Sustainable Lunch Box Set - BPA-Free Components',
        price: '$32.00'
      },
      {
        id: 16,
        image: '/assets/images/product3.png',
        hoverImage: '/assets/images/product7.png',
        title: 'Handcrafted Wooden Name Puzzle - Personalized Gift',
        price: '$48.00'
      },
      {
        id: 17,
        image: '/assets/images/product2.png',
        hoverImage: '/assets/images/product6.png',
        title: 'Organic Cotton Baby Blanket - Soft & Cozy',
        price: '$55.00'
      },
      {
        id: 18,
        image: '/assets/images/product4.png',
        hoverImage: '/assets/images/product8.png',
        title: 'Milestone Cards Set - Capture Special Moments',
        price: '$22.00'
      }
    ]
  }

  const currentProducts =
    productsByCategory[activeCategory as keyof typeof productsByCategory]

  const scrollToIndex = (index: number) => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.clientWidth
      const scrollWidth = sliderRef.current.scrollWidth
      const maxIndex = currentProducts.length - 4

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
    const maxIndex = currentProducts.length - 4
    if (currentIndex < maxIndex) {
      scrollToIndex(currentIndex + 1)
    }
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setCurrentIndex(0)
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1)
    }
  }

  return (
    <section
      className={` py-12 sm:py-16 lg:py-20 ${
        bgWhite ? 'bg-white' : 'bg-cream'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col gap-4 lg:relative lg:flex-row lg:items-center lg:justify-between lg:gap-0">
            <h2
              className="text-center font-rubik font-normal uppercase text-text-primary lg:text-start"
              style={{ fontSize: '32px' }}
            >
              BEST SELLING Collection
            </h2>

            <div className="flex justify-center gap-3 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
              <button
                onClick={() => handleCategoryChange('toys')}
                className={`rounded-full border-2 px-4 py-2 font-rubik text-xs font-medium transition-all duration-300 sm:px-6 sm:text-sm ${
                  activeCategory === 'toys'
                    ? 'border-button-hover bg-button-hover text-white underline'
                    : 'border-button-hover bg-transparent text-button-hover hover:bg-button-hover hover:text-white hover:underline'
                }`}
              >
                Toys
              </button>
              <button
                onClick={() => handleCategoryChange('clothing')}
                className={`rounded-full border-2 px-4 py-2 font-rubik text-xs font-medium transition-all duration-300 sm:px-6 sm:text-sm ${
                  activeCategory === 'clothing'
                    ? 'border-button-hover bg-button-hover text-white underline'
                    : 'border-button-hover bg-transparent text-button-hover hover:bg-button-hover hover:text-white hover:underline'
                }`}
              >
                Clothing
              </button>
              <button
                onClick={() => handleCategoryChange('gifts')}
                className={`rounded-full border-2 px-4 py-2 font-rubik text-xs font-medium transition-all duration-300 sm:px-6 sm:text-sm ${
                  activeCategory === 'gifts'
                    ? 'border-button-hover bg-button-hover text-white underline'
                    : 'border-button-hover bg-transparent text-button-hover hover:bg-button-hover hover:text-white hover:underline'
                }`}
              >
                Gifts
              </button>
            </div>
            <Link to={'/shop'}>
              <button className="flex items-center justify-center gap-2 font-inter text-xs font-medium uppercase text-button-hover hover:text-button-hover/80 sm:text-base lg:justify-start">
                SHOP ALL
                <img
                  src="/assets/icons/ArrowLink.svg"
                  alt="Arrow"
                  className="size-3"
                />
              </button>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto sm:gap-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {currentProducts.map((product) => (
              <div key={product.id} className="min-w-[280px] sm:min-w-[320px]">
                <ProductCard
                  id={product.id}
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

          {currentIndex < currentProducts.length - 4 && (
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
