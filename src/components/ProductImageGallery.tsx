import { useState, useMemo, useEffect } from 'react'

interface ProductImageGalleryProps {
  thumbnails: string[]
  productName: string
  selectedColor?: string
  variants?: any[]
}

function ProductImageGallery({
  thumbnails,
  productName,
  selectedColor = '',
  variants = []
}: ProductImageGalleryProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Filter images based on selected color
  const filteredThumbnails = useMemo(() => {
    if (!selectedColor || variants.length === 0) {
      return thumbnails
    }

    // Find the variant image that matches the selected color
    let variantImage: string | null = null

    variants.forEach((variant: any) => {
      if (variant.title === selectedColor && variant.image?.url) {
        variantImage = variant.image.url
      }
    })

    if (variantImage) {
      return [variantImage, ...thumbnails.filter((img) => img !== variantImage)]
    }

    return thumbnails
  }, [selectedColor, variants, thumbnails])

  useEffect(() => {
    // whenever selected color changes, show the first image
    setSelectedIndex(0)
  }, [selectedColor])

  return (
    <div className="bg-cream flex flex-col items-center">
      {/* Main Image */}
      <div
        className="w-full max-w-md aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer mb-4"
        onClick={() => setIsFullscreen(true)}
      >
        <img
          src={
            filteredThumbnails[selectedIndex] ||
            '/assets/images/placeholder.webp'
          }
          alt={`${productName} main`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2 overflow-x-auto pb-2 w-full">
        {filteredThumbnails.map((thumbnail, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all bg-white flex items-center justify-center ${
              selectedIndex === index
                ? 'border-[#E9908E] shadow-md'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <img
              src={thumbnail}
              alt={`${productName} ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>

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
            {filteredThumbnails[selectedIndex] && (
              <img
                src={filteredThumbnails[selectedIndex]}
                alt={productName}
                className="max-h-[90vh] max-w-[90vw] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductImageGallery
