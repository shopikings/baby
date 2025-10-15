import { useState } from 'react'

interface ImageGalleryProps {
  images: string[]
  productName: string
}

function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0])

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`h-20 w-20 overflow-hidden rounded border-2 ${
              selectedImage === img ? 'border-gray-800' : 'border-transparent'
            }`}
          >
            <img
              src={img}
              alt={`${productName} ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-hidden rounded-lg">
        <img
          src={selectedImage}
          alt={productName}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}

export default ImageGallery
