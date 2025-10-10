import { useState, useRef } from 'react'
import ImageReviewCard from './ImageReviewCard'
import TextReviewCard from './TextReviewCard'

function ReviewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const reviews = [
    {
      id: 1,
      rating: 5,
      title: 'Big Fan of All Things Maison Baby & Kids!',
      review:
        "Love having the opportunity to buy brands that you can't buy on the high street",
      author: 'C.E',
      location: 'London, UK',
      image: '/assets/images/review-1.jpg',
      type: 'text'
    },
    {
      id: 2,
      title: 'Love the clothes!',
      author: 'M.H',
      image: '/assets/images/review1.png',
      type: 'image'
    },
    {
      id: 3,
      rating: 5,
      title: '11.52 x 11.52 arvice!',
      review:
        "I've never dealt with a better company. They've been fantastic. I had to change a size and they couldn't have been more responsive or helpful. They sell some lovely sustainable products too",
      author: 'T.A',
      location: 'Verified Customer',
      image: '/assets/images/review-3.jpg',
      type: 'text'
    },
    {
      id: 4,
      title: 'Love it!',
      author: 'T.B.',
      image: '/assets/images/review3.png',
      type: 'image'
    },
    {
      id: 5,
      rating: 5,
      title: 'Fab Quality Clothes!',
      review:
        'I recently placed an order & was very pleased to receive such stylish, great quality & easy wear clothing for my toddler.',
      author: 'M.H',
      location: 'London, UK',
      image: '/assets/images/review-5.jpg',
      type: 'text'
    },
    {
      id: 6,
      title: 'Cool Shades.',
      author: 'P.H',
      image: '/assets/images/review3.png',
      type: 'image'
    },
    {
      id: 7,
      rating: 5,
      title: 'Big Fan of All Things Maison Baby & Kids!',
      review:
        "Love having the opportunity to buy brands that you can't buy on the high street",
      author: 'C.E',
      location: 'London, UK',
      image: '/assets/images/review-1.jpg',
      type: 'text'
    },
    {
      id: 8,
      title: 'Love the clothes!',
      author: 'M.H',
      image: '/assets/images/review1.png',
      type: 'image'
    },
    {
      id: 9,
      rating: 5,
      title: '11.52 x 11.52 arvice!',
      review:
        "I've never dealt with a better company. They've been fantastic. I had to change a size and they couldn't have been more responsive or helpful. They sell some lovely sustainable products too",
      author: 'T.A',
      location: 'Verified Customer',
      image: '/assets/images/review-3.jpg',
      type: 'text'
    },
    {
      id: 10,
      title: 'Love it!',
      author: 'T.B.',
      image: '/assets/images/review3.png',
      type: 'image'
    }
  ]

  const scrollToIndex = (index: number) => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.clientWidth
      const scrollWidth = sliderRef.current.scrollWidth

      const getCardsPerView = () => {
        if (window.innerWidth >= 1280) return 6 // xl and above
        if (window.innerWidth >= 1024) return 5 // lg
        if (window.innerWidth >= 640) return 4 // sm
        return 2 // mobile
      }

      const cardsPerView = getCardsPerView()
      const maxIndex = Math.max(0, reviews.length - cardsPerView)

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
    const getCardsPerView = () => {
      if (window.innerWidth >= 1280) return 6
      if (window.innerWidth >= 1024) return 5
      if (window.innerWidth >= 640) return 4
      return 2
    }

    const cardsPerView = getCardsPerView()
    const maxIndex = Math.max(0, reviews.length - cardsPerView)

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
        <h2 className="mb-8 text-start font-rubik text-2xl font-bold text-text-primary sm:mb-12 sm:text-3xl md:text-4xl lg:text-5xl">
          WE LOVE CUSTOMER REVIEWS!
        </h2>

        <div className="relative">
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto sm:gap-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="min-w-[280px] sm:min-w-[200px] lg:min-w-[180px] xl:min-w-[200px]"
              >
                {review.type === 'text' ? (
                  <TextReviewCard
                    rating={review.rating!}
                    title={review.title}
                    review={review.review!}
                    author={review.author}
                    location={review.location}
                  />
                ) : (
                  <ImageReviewCard
                    image={review.image}
                    title={review.title}
                    author={review.author}
                  />
                )}
              </div>
            ))}
          </div>

          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 flex -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full p-3 shadow-md transition-all hover:shadow-xl"
              style={{ backgroundColor: '#E9908E' }}
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

          {(() => {
            const getCardsPerView = () => {
              if (window.innerWidth >= 1280) return 6
              if (window.innerWidth >= 1024) return 5
              if (window.innerWidth >= 640) return 4
              return 2
            }
            const cardsPerView = getCardsPerView()
            return currentIndex < Math.max(0, reviews.length - cardsPerView)
          })() && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 flex -translate-y-1/2 translate-x-4 items-center justify-center rounded-full p-3 shadow-md transition-all hover:shadow-xl"
              style={{ backgroundColor: '#E9908E' }}
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

export default ReviewsSlider
