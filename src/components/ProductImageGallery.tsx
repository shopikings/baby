import { useState } from 'react'

interface ProductImageGalleryProps {
  thumbnails: string[]
  productName: string
}

function ProductImageGallery({
  thumbnails,
  productName
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(thumbnails[0])

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
        {thumbnails.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`size-20 overflow-hidden rounded border-2 ${
              selectedImage === img ? 'border-gray-800' : 'border-transparent'
            }`}
          >
            <img
              src={img}
              alt={`${productName} thumbnail ${index + 1}`}
              className="size-full object-cover"
            />
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-hidden rounded-lg">
        <img
          src={selectedImage}
          alt={productName}
          className="size-full object-cover"
        />
      </div>
    </div>
  )
}

export default ProductImageGallery
