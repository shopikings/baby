import { useState } from 'react'

interface Color {
  name: string
  hex: string
}

interface ProductInfoProps {
  name: string
  price: number
  originalPrice: number
  rating: number
  colors: Color[]
}

function ProductInfo({
  name,
  price,
  originalPrice,
  rating,
  colors
}: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0].name)

  return (
    <div>
      <h1 className="font-rubik text-3xl font-medium text-text-primary">
        {name}
      </h1>
      <div className="mt-2 flex items-center gap-2">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className="size-4"
              fill="#444B59"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <span className="font-inter text-sm text-gray-600">{rating}/5</span>
      </div>

      <div className="mt-4 flex items-baseline gap-3">
        <span className="font-rubik text-3xl font-semibold text-text-primary">
          ${price}
        </span>
        <span className="font-inter text-lg text-gray-500 line-through">
          ${originalPrice}
        </span>
      </div>

      <div className="mt-6">
        <h3 className="font-inter text-sm font-medium text-text-primary">
          Select Color
        </h3>
        <div className="mt-3 flex gap-3">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              className={`size-8 rounded-full border-2 ${
                selectedColor === color.name
                  ? 'border-gray-800'
                  : 'border-gray-300'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <button className="mt-6 w-full rounded-md bg-[#E89FAC] py-3 font-inter text-sm font-medium text-white transition-colors hover:bg-[#d88d9a]">
        Add to Bag
      </button>

      <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-3 font-inter text-sm font-medium text-text-primary transition-colors hover:bg-gray-50">
        <svg
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        Add to Wishlist
      </button>

      <div className="mt-6">
        <h3 className="font-inter text-sm font-medium text-text-primary">
          Details about
        </h3>
        <p className="mt-2 font-inter text-sm text-gray-600">
          This cozy sherpa fleece zip-up is perfect for keeping your little one
          warm. Made with soft, high-quality materials that are gentle on
          delicate skin. Features a full zip closure and relaxed fit for easy
          movement.
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-inter text-sm font-medium text-text-primary">
          Product Information
        </h3>
        <ul className="mt-2 space-y-1 font-inter text-sm text-gray-600">
          <li>Material: 100% Polyester Sherpa Fleece</li>
          <li>Care: Machine wash cold, tumble dry low</li>
          <li>Made in USA</li>
        </ul>
      </div>
    </div>
  )
}

export default ProductInfo
