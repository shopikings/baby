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
      title: 'Big Fan of Maison Baby & Kids',
      review:
        'Amazing selection, the quality of the baby clothes and gear blew me away.',
      author: 'C.E',
      location: 'Florida',
      image: '/assets/images/review-1.jpg',
      type: 'text'
    },
    {
      id: 2,
      rating: 4.5,
      title: 'Love the clothes!',
      author: 'M.H',
      image: '/assets/images/reviews/new-1.png',
      type: 'image'
    },
    {
      id: 3,
      rating: 4.4,
      title: 'Fast Shipping, Quality Service',
      review:
        'Speedy shipping and a smooth checkout; my order arrived in perfect condition.',
      author: 'T.A',
      location: 'North Carolina',
      image: '/assets/images/review1.png',
      type: 'text'
    },
    {
      id: 4,
      rating: 4.5,
      title: 'Love it!',
      author: 'T.B',
      image: '/assets/images/reviews/new-2.png',
      type: 'image'
    },
    {
      id: 5,
      rating: 5,
      title: 'Fab Quality Clothes!',
      review:
        'Beautiful, premium brands, I loved how curated and stylish everything felt',
      author: 'E.F',
      location: 'California',
      image: '/assets/images/review-3.jpg',
      type: 'text'
    },
    {
      id: 6,
      rating: 4.5,
      title: 'Cute stuff!',
      author: 'P.H',
      image: '/assets/images/reviews/new-3.png',
      type: 'image'
    },
    {
      id: 7,
      rating: 4.5,
      title: 'Great Quality Products',
      review:
        'A little pricey, but worth every penny for the craftsmanship and feel of the items.',
      author: 'J.M',
      type: 'text'
    },
    {
      id: 8,
      rating: 4.5,
      title: 'Very helpful!',
      author: 'M.H',
      image: '/assets/images/reviews/new-4.png',
      type: 'image'
    },
    {
      id: 9,
      rating: 4.5,
      title: 'Helpful Staff & Good Customer Service',
      review:
        'Customer service was super helpful and friendly when I had questions about sizing.',
      author: 'S.K',
      type: 'text'
    },
    {
      id: 10,
      rating: 4.5,
      title: 'Keeps my kid busy!',
      author: 'A.T',
      image: '/assets/images/reviews/new-5.png',
      type: 'image'
    }
  ]

  const scrollToIndex = (index: number) => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.clientWidth
      const scrollWidth = sliderRef.current.scrollWidth

      const getCardsPerView = () => {
        if (window.innerWidth >= 1280) return 6
        if (window.innerWidth >= 1024) return 5
        if (window.innerWidth >= 640) return 4
        return 2
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
                    author={review.author || 'Anonymous'}
                    location={review.location}
                  />
                ) : (
                  <ImageReviewCard
                    image={review.image || '/default-image.jpg'}
                    title={review.title}
                    author={review.author || 'Anonymous'}
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
