import { useState, useRef, useEffect } from 'react'
import PostModal from './PostModal'

function JoinMovementSlider() {
  const [posts, setPosts] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedPost, setSelectedPost] = useState<number | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const fetchPosts = async () => {
    // const base = import.meta.env.VITE_INSTAGRAM_API
    const resp = await fetch('https://dirtydogdesignz.com/api/instagram-baby', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ limit: 6 })
    })

    const data = await resp.json()

    // Transform into required UI structure
    const transformed = data.data.map((post: any) => ({
      image: post.media_url,
      title: post.caption?.slice(0, 50) || 'Instagram Post',
      description: post.caption || ''
    }))

    setPosts(transformed)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const scrollToIndex = (index: number) => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.clientWidth
      const scrollWidth = sliderRef.current.scrollWidth
      const maxIndex = posts.length - 4

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
    const maxIndex = posts.length - 4
    if (currentIndex < maxIndex) {
      scrollToIndex(currentIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1)
    }
  }

  const handleCardClick = (index: number) => {
    setSelectedPost(index)
  }

  const handleCloseModal = () => {
    setSelectedPost(null)
  }

  return (
    <section className="bg-cream py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:mb-12">
          <h2 className="mb-1 font-rubik text-3xl font-bold capitalize text-text-primary sm:text-3xl md:text-4xl lg:text-4xl">
            where playtime begins
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
            {posts.map((post, index) => (
              <div
                key={index}
                className="min-w-[280px] sm:min-w-[300px] lg:min-w-[320px]"
              >
                <div
                  onClick={() => handleCardClick(index)}
                  className="group cursor-pointer overflow-hidden rounded-lg border-2 border-button-hover transition-all ease-in-out hover:border-transparent"
                >
                  <img
                    src={post.image}
                    alt={`Movement post ${index + 1}`}
                    className="h-80 w-full object-cover"
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

          {currentIndex < posts.length - 4 && (
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
          {Array.from({ length: Math.max(0, posts.length - 3) }).map(
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

      {selectedPost !== null && (
        <PostModal
          isOpen={selectedPost !== null}
          onClose={handleCloseModal}
          image={posts[selectedPost].image}
          title={posts[selectedPost].title}
          description={posts[selectedPost].description}
        />
      )}
    </section>
  )
}

export default JoinMovementSlider
