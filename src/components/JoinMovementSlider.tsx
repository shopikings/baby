import { useState, useRef } from 'react'

function JoinMovementSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const images = [
    '/assets/images/join-moment-one.jpg',
    '/assets/images/join-moment-two.jpg',
    '/assets/images/join-moment-three.jpg',
    '/assets/images/join-moment-one.jpg',
    '/assets/images/join-moment-two.jpg',
    '/assets/images/join-moment-three.jpg'
  ]

  const scrollToIndex = (index: number) => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.clientWidth
      const scrollWidth = sliderRef.current.scrollWidth
      const maxIndex = images.length - 4

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
    const maxIndex = images.length - 4
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
        <div className="mb-8 text-center sm:mb-12">
          <h2 className="mb-1 font-rubik text-3xl font-bold text-text-primary sm:text-3xl md:text-4xl lg:text-4xl">
            Join The Movement
          </h2>
          <p className="font-rubik text-lg text-text-primary/70 sm:text-2xl">
            @maisonbabyandkids
          </p>
        </div>

        <div className="relative">
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto sm:gap-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="min-w-[280px] sm:min-w-[300px] lg:min-w-[320px]"
              >
                <div className="group overflow-hidden rounded-lg border-2 border-button-hover transition-all ease-in-out hover:border-transparent">
                  <img
                    src={image}
                    alt={`Movement post ${index + 1}`}
                    className="h-80 w-full object-cover "
                  />
                </div>
              </div>
            ))}
          </div>

          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 flex -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full p-3 shadow-md transition-all hover:shadow-xl"
              style={{ backgroundColor: 'white' }}
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

          {currentIndex < images.length - 4 && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 flex -translate-y-1/2 translate-x-4 items-center justify-center rounded-full p-3 shadow-md transition-all hover:shadow-xl"
              style={{ backgroundColor: 'white' }}
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

        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: Math.max(0, images.length - 3) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`size-2 rounded-full transition-colors ${
                  currentIndex === index ? 'bg-black' : 'bg-[#C4C4C4]'
                }`}
              />
            )
          )}
        </div>
      </div>
    </section>
  )
}

export default JoinMovementSlider
