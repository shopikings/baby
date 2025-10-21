import { useState } from 'react'
import { useCart } from 'contexts/CartContext'
import { useWishlist } from 'contexts/WishlistContext'
import toast from 'react-hot-toast'
import CustomersAlsoBoughtSlider from './CustomersAlsoBoughtSlider'

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
  const [isShoppingOpen, setIsShoppingOpen] = useState(false)

  const { addToCart, removeFromCart, cartItems } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const productId = `product-${name.replace(/\s+/g, '-').toLowerCase()}`
  const isInCart = cartItems.some((item) => item.id === productId)
  const isWishlisted = isInWishlist(productId)

  const sizes = [
    '3-6 months',
    '6-9 months',
    '9-12 months',
    '12-18 months',
    '18-24 months'
  ]

  const handleAddToBag = () => {
    if (!selectedSize) {
      toast.error('Please select a size')
      return
    }

    if (isInCart) {
      removeFromCart(productId)
      toast.success('Removed from cart')
    } else {
      const cartItem = {
        id: productId,
        name: name,
        price: `$${price}`,
        image: '/assets/images/product-gallery-1.png' // Using first gallery image
      }
      addToCart(cartItem)
      toast.success('Added to cart')
    }
  }

  const handleWishlistClick = () => {
    if (isWishlisted) {
      removeFromWishlist(productId)
      toast.success('Removed from wishlist')
    } else {
      const wishlistItem = {
        id: productId,
        name: name,
        price: `$${price}`,
        image: '/assets/images/product-gallery-1.png' // Using first gallery image
      }
      addToWishlist(wishlistItem)
      toast.success('Added to wishlist')
    }
  }

  return (
    <div className="bg-cream">
      <div className="flex items-start justify-between gap-4">
        <h1 className="flex-1 font-rubik text-base font-bold text-[#2E2E2E]">
          {name}
        </h1>
        <div className="flex flex-col items-end">
          <span className="font-rubik text-base font-bold text-[#2E2E2E]">
            ${price}
            {originalPrice && <span className="ml-2"> - ${originalPrice}</span>}
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-0">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className="size-5"
              fill={star <= rating ? '#2E2E2E' : '#E5E7EB'}
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
          <span className="ml-1 font-inter text-xs text-gray-600">
            ({reviewCount})
          </span>
        </div>
        <span className="font-inter text-xs text-gray-600">{sku}</span>
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
        <button
          onClick={handleAddToBag}
          className={`flex-1 rounded py-3 font-inter text-sm font-bold uppercase text-white transition-colors ${
            isInCart ? 'bg-red-500' : 'bg-button-hover'
          }`}
        >
          {isInCart ? 'Remove from Bag' : 'Add to Bag'}
        </button>
        <button
          onClick={handleWishlistClick}
          className="flex size-12 items-center justify-center rounded border-2 border-gray-300 bg-white transition-colors hover:bg-gray-50"
        >
          <svg
            className="size-6"
            fill={isWishlisted ? '#E8A5A5' : 'none'}
            stroke={isWishlisted ? '#E8A5A5' : 'currentColor'}
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className="mt-6 pl-6 pr-4">
        <button
          onClick={() => setIsShoppingOpen(!isShoppingOpen)}
          className="flex w-full items-center justify-between font-inter text-sm font-normal text-[#2E2E2E]"
        >
          <span>Why you'll love shopping with maison baby & kids</span>
          <svg
            className={`size-5 transition-transform ${
              isShoppingOpen ? 'rotate-180' : ''
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
        {isShoppingOpen && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-8">
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex flex-1 flex-col">
                    <span className="font-inter text-sm font-medium text-text-primary">
                      Free delivery
                    </span>
                    <span className="font-inter text-xs text-gray-600">
                      over $90
                    </span>
                  </div>
                  <img
                    src="/assets/icons/check-icon.svg"
                    alt="Check"
                    className="ml-4 size-8"
                  />
                </div>

                <div className="flex items-center">
                  <span className="flex-1 font-inter text-sm font-medium text-text-primary">
                    We pay tax & duty
                  </span>
                  <img
                    src="/assets/icons/check-icon.svg"
                    alt="Check"
                    className="ml-4 size-8"
                  />
                </div>

                <div className="flex items-start">
                  <div className="flex flex-1 flex-col">
                    <span className="font-inter text-sm font-medium text-text-primary">
                      Delivery 3-4
                    </span>
                    <span className="font-inter text-xs text-gray-600">
                      working days
                    </span>
                  </div>
                  <img
                    src="/assets/icons/check-icon.svg"
                    alt="Check"
                    className="ml-4 size-8"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <img
                  src="/assets/icons/apple-pay-white.svg"
                  alt="Apple Pay"
                  className="h-8 w-auto"
                />
                <img
                  src="/assets/icons/paypal-full.svg"
                  alt="PayPal"
                  className="h-6 w-auto"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 py-4">
        <button
          onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
          className="w-full text-left"
        >
          <div className="flex items-center justify-between">
            <span className="font-inter text-sm font-bold text-[#2E2E2E]">
              Description
            </span>
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
          </div>
          <div className="mt-2">
            <p
              className={`font-inter text-sm text-gray-600 ${
                isDescriptionOpen ? '' : 'line-clamp-1'
              }`}
            >
              {description}
            </p>
          </div>
        </button>
        {isDescriptionOpen && (
          <div className="mt-3">
            <ul className="space-y-1 font-inter text-sm text-gray-600">
              {productInfo.map((info, index) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-0 py-4">
        <h3 className="font-inter text-sm font-bold text-[#2E2E2E]">
          Customers Also Bought
        </h3>
        <div className="mt-4">
          <CustomersAlsoBoughtSlider />
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
