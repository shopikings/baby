import { useEffect, useState } from 'react'

interface ProductImageGalleryProps {
  thumbnails: string[]
  productName: string
}

function ProductImageGallery({
  thumbnails,
  productName
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleImageChange = (index: number) => {
    if (index === selectedIndex) return
    setIsTransitioning(true)
    setTimeout(() => {
      setSelectedIndex(index)
      setIsTransitioning(false)
    }, 200)
  }

  const handlePrevious = () => {
    const newIndex =
      selectedIndex > 0 ? selectedIndex - 1 : thumbnails.length - 1
    handleImageChange(newIndex)
  }

  const handleNext = () => {
    const newIndex =
      selectedIndex < thumbnails.length - 1 ? selectedIndex + 1 : 0
    handleImageChange(newIndex)
  }

  return (
    <>
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* Thumbnail Container */}
          <div className="flex flex-row gap-2 lg:flex-col">
            {thumbnails.map((img, index) => (
              <button
                key={index}
                onClick={() => handleImageChange(index)}
                // ⭐ Thumbnails are now explicitly square with 'size-20' (h-20 w-20)
                className={`size-20 flex-shrink-0 overflow-hidden rounded-none border-2 transition-all hover:scale-105 ${
                  selectedIndex === index
                    ? 'border-text-primary'
                    : 'border-gray-300'
                }`}
              >
                <img
                  src={img}
                  alt={`${productName} ${index + 1}`}
                  className="size-full object-cover" // Ensures image covers the square area
                />
              </button>
            ))}
          </div>

          {/* Main Image Container */}
          <div className="relative flex-1 overflow-hidden rounded-none">
            {/* ⭐ Main image now forces aspect-square and full height */}
            <img
              src={thumbnails[selectedIndex]}
              alt={productName}
              className={`inset-0 h-full w-full aspect-square object-cover transition-opacity duration-200 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
            />

            {thumbnails.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-text-primary shadow-md transition-all hover:scale-110 hover:bg-white"
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

                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-text-primary shadow-md transition-all hover:scale-110 hover:bg-white"
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
              </>
            )}

            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white/90 text-text-primary shadow-md transition-all hover:scale-110 hover:bg-white"
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
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white text-text-primary transition-colors hover:bg-gray-100"
          >
            <svg
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="relative max-h-[90vh] max-w-[90vw]">
            <img
              src={thumbnails[selectedIndex]}
              alt={productName}
              // ⭐ Fullscreen image also takes up its maximum available square space
              className="max-h-[90vh] max-w-[90vw] object-contain aspect-square"
              onClick={(e) => e.stopPropagation()}
            />

            {thumbnails.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePrevious()
                  }}
                  className="absolute left-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-text-primary shadow-lg transition-all hover:scale-110 hover:bg-white"
                >
                  <svg
                    className="size-6"
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

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNext()
                  }}
                  className="absolute right-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-text-primary shadow-lg transition-all hover:scale-110 hover:bg-white"
                >
                  <svg
                    className="size-6"
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
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ProductImageGallery
