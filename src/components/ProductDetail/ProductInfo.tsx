import { useState } from 'react'
import { useCart } from '../../contexts/CartContext'
import toast from 'react-hot-toast'

interface Color {
  name: string
  hex: string
}

interface ProductInfoProps {
  name: string
  price: string
  originalPrice: number
  rating: number
  colors?: Color[]
  image: string
}

function ProductInfo({
  name,
  price,
  originalPrice,
  rating,
  colors = [],
  image
}: ProductInfoProps) {
  const { addToCart } = useCart()
  const [selectedColor, setSelectedColor] = useState(colors[0]?.name || '')
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    const product = {
      id: `${name}-${selectedColor || 'default'}`,
      name,
      price,
      image,
      color: selectedColor || null,
      quantity
    }

    addToCart(product)
    toast.success(`${name} added to cart!`)
  }

  return (
    <div>
      {/* Product Name */}
      <h1 className="font-rubik text-3xl font-medium text-text-primary">
        {name}
      </h1>

      {/* Rating */}
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

      {/* Price */}
      <div className="mt-4 flex items-baseline gap-3">
        <span className="font-rubik text-3xl font-semibold text-text-primary">
          ${price}
        </span>
        <span className="font-inter text-lg text-gray-500 line-through">
          ${originalPrice}
        </span>
      </div>

      {/* Colors */}
      {colors.length > 0 && (
        <div className="mt-6">
          <h3 className="font-inter text-sm font-medium text-text-primary">
            Select Color
          </h3>
          <div className="mt-3 flex gap-3">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`size-8 rounded-full border-2 transition-all ${
                  selectedColor === color.name
                    ? 'border-gray-800 scale-110'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="rounded-md border border-gray-300 px-3 py-1 text-sm font-medium hover:border-gray-800"
        >
          -
        </button>
        <span className="min-w-[24px] text-center font-inter text-sm">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="rounded-md border border-gray-300 px-3 py-1 text-sm font-medium hover:border-gray-800"
        >
          +
        </button>
      </div>

      {/* Add to Bag */}
      <button
        onClick={handleAddToCart}
        className="mt-6 w-full rounded-md bg-[#E89FAC] py-3 font-inter text-sm font-medium text-white transition-colors hover:bg-[#d88d9a]"
      >
        Add to Bag
      </button>

      {/* Wishlist */}
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

      {/* Product Details */}
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

      {/* Product Info */}
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
