import { useState } from 'react'

interface ProductImageGalleryProps {
  thumbnails: string[]
  productName: string
}

function ProductImageGallery({
  thumbnails,
  productName
}: ProductImageGalleryProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showAll, setShowAll] = useState(false)

  const imagesToShow = showAll ? 16 : 4

  return (
    <>
      {/* 2 Column Grid */}
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: imagesToShow }).map((_, index) => (
          thumbnails[index] && (
            <div
              key={index}
              className="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity relative group"
              onClick={() => {
                setSelectedIndex(index)
                setIsFullscreen(true)
              }}
            >
              <img
                src={thumbnails[index]}
                alt={`${productName} ${index + 1}`}
                className="w-full h-full"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedIndex(index)
                  setIsFullscreen(true)
                }}
                className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
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
          )
        ))}
      </div>

      {/* View More Button */}
      {!showAll && thumbnails.length > 4 && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-6 w-full lg:w-full lg:mx-auto py-3 text-white bg-[#E9908E] hover:border hover:border-black font-inter font-light rounded hover:bg-[#EFECDA] hover:text-black transition-colors"
        >
          VIEW MORE
        </button>
      )}

      {/* View Less Button */}
      {showAll && thumbnails.length > 4 && (
        <button
          onClick={() => setShowAll(false)}
          className="mt-6 w-full lg:w-full lg:mx-auto py-3 text-white hover:border hover:border-black bg-[#E9908E] font-inter font-light rounded hover:bg-[#EFECDA] hover:text-black transition-colors"
        >
          VIEW LESS
        </button>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white text-gray-800 transition-colors hover:bg-gray-100"
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
            {thumbnails[selectedIndex] && (
              <img
                src={thumbnails[selectedIndex]}
                alt={productName}
                className="max-h-[90vh] max-w-[90vw] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ProductImageGallery
