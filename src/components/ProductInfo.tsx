import { useState } from 'react'

interface Color {
  name: string
  hex: string
}

interface ProductInfoProps {
  name: string
  rating: number
  reviewCount: number
  price: number
  originalPrice?: number
  colors: Color[]
  description: string
  productInfo: string[]
  sku?: string
}

function ProductInfo({
  name,
  rating,
  reviewCount,
  price,
  originalPrice,
  colors,
  description,
  productInfo,
  sku = 'F60-319'
}: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0]?.name || '')
  const [selectedSize, setSelectedSize] = useState('')
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)

  const sizes = [
    '3-6 months',
    '6-9 months',
    '9-12 months',
    '12-18 months',
    '18-24 months'
  ]

  return (
    <div className="bg-cream">
      <h1 className="font-rubik text-base font-bold text-text-primary">
        {name}
      </h1>

      <div className="mt-3 flex items-baseline justify-between">
        <div className="flex items-baseline gap-3">
          <span className="font-rubik text-2xl font-bold text-text-primary">
            ${price}
            {originalPrice && (
              <span className="ml-2 text-xl"> - ${originalPrice}</span>
            )}
          </span>
        </div>
        <span className="font-inter text-xs text-gray-600">{sku}</span>
      </div>

      <div className="mt-3 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className="size-4"
            fill={star <= rating ? '#444B59' : '#E5E7EB'}
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
        <span className="ml-1 font-inter text-xs text-gray-600">
          ({reviewCount})
        </span>
      </div>

      <div className="mt-6">
        <label className="font-inter text-sm font-medium text-text-primary">
          Colour:{' '}
          <span className="font-normal">
            {selectedColor || colors[0]?.name}
          </span>
        </label>
        <div className="mt-3 flex gap-2">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              className={`size-10 overflow-hidden rounded border-2 ${
                selectedColor === color.name
                  ? 'border-text-primary'
                  : 'border-gray-300'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <label className="font-inter text-sm font-medium text-text-primary">
            Size:
          </label>
          <button className="font-inter text-xs font-medium text-text-primary underline">
            Size Guide
          </button>
        </div>
        <div className="relative mt-3">
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full appearance-none rounded border border-gray-300 bg-white px-4 py-3 pr-10 font-inter text-sm text-text-primary focus:border-text-primary focus:outline-none"
          >
            <option value="">Choose Size</option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button className="flex-1 rounded bg-[#E89FAC] py-3 font-inter text-sm font-bold uppercase text-white transition-colors hover:bg-[#d88d9a]">
          Add to Bag
        </button>
        <button className="flex size-12 items-center justify-center rounded border-2 border-gray-300 bg-white transition-colors hover:bg-gray-50">
          <svg
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className="mt-6 border-y border-gray-300 py-4">
        <button
          onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
          className="flex w-full items-center justify-between font-inter text-sm font-bold text-text-primary"
        >
          <span>Description</span>
          <svg
            className={`size-5 transition-transform ${
              isDescriptionOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isDescriptionOpen && (
          <div className="mt-3">
            <p className="font-inter text-sm text-gray-600">{description}</p>
            <ul className="mt-3 space-y-1 font-inter text-sm text-gray-600">
              {productInfo.map((info, index) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-4 border-b border-gray-300 py-4">
        <button className="flex w-full items-center justify-between font-inter text-sm font-bold text-text-primary">
          <span>Why you'll love shopping with NEXT</span>
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      <div className="mt-4 border-b border-gray-300 py-4">
        <button className="flex w-full items-center justify-between font-inter text-sm font-bold text-text-primary">
          <span>Customers Also Bought</span>
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ProductInfo
