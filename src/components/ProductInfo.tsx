import { useState } from 'react'
import { useCart } from 'contexts/CartContext'
import { useWishlist } from 'contexts/WishlistContext'
import toast from 'react-hot-toast'

interface Color {
  name: string
  hex?: string
}

interface ProductInfoProps {
  name: string
  rating: number
  reviewCount: number
  price: string
  originalPrice?: number
  colors?: string[] | Color[]
  description: string
  productInfo: string[]
  sku?: string
  sizes?: string[]
  image: string
  variantId?: string
}

function ProductInfo({
  name,
  rating,
  reviewCount,
  price,
  originalPrice,
  colors = [],
  variantId,
  description,
  productInfo,
  sizes = [],
  image
}: ProductInfoProps) {
  // --- SAFE COLOR HANDLING ---
  const colorNames =
    colors.length > 0
      ? typeof colors[0] === 'string'
        ? (colors as string[])
        : (colors as Color[]).map((c) => c.name)
      : []

  const [selectedColor, setSelectedColor] = useState(
    colorNames.length > 0 ? colorNames[0] : 'Default'
  )

  const [selectedSize, setSelectedSize] = useState('')

  const { addToCart, removeFromCart, cartItems } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const productId = `product-${name.replace(/\s+/g, '-').toLowerCase()}`
  const isInCart = cartItems.some((item) => item.id === productId)
  const isWishlisted = isInWishlist(productId)

  const handleAddToBag = () => {
    if (sizes.length > 0 && !selectedSize) {
      toast.error('Please select a size')
      return
    }

    if (isInCart) {
      removeFromCart(productId)
      toast.success('Removed from cart')
      return
    }

    const numericVariantId = variantId ? variantId.split('/').pop() : undefined

    addToCart({
      id: productId,
      name,
      price,
      image,
      color: selectedColor || 'Default',
      size: selectedSize,
      variantId: numericVariantId
    })

    toast.success('Added to cart')
  }

  const handleWishlistClick = () => {
    if (isWishlisted) {
      removeFromWishlist(productId)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist({ id: productId, name, price, image })
      toast.success('Added to wishlist')
    }
  }

  return (
    <div className="bg-cream">
      {/* PRODUCT TITLE + PRICE */}
      <div className="flex items-start justify-between gap-4">
        <h1 className="flex-1 font-rubik text-base font-bold text-[#2E2E2E]">
          {name}
        </h1>

        <span className="font-rubik text-base font-bold text-[#2E2E2E]">
          ${price}
          {originalPrice && (
            <span className="ml-2 text-sm line-through text-gray-500">
              ${originalPrice}
            </span>
          )}
        </span>
      </div>

      {/* RATING */}
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
      </div>

      {/* COLOR DROPDOWN (ALWAYS SHOW) */}
      <div className="mt-6">
        <label className="font-inter text-sm font-medium text-text-primary">
          Color:
        </label>

        <div className="relative mt-2">
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className={`
        w-full appearance-none rounded border border-gray-300 bg-white px-4 py-3 pr-10 
        font-inter text-sm 
        ${selectedColor === 'Default' ? 'text-gray-400' : 'text-text-primary'}
      `}
          >
            {colorNames.length === 0 ? (
              <option value="Default">Default</option>
            ) : (
              colorNames.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))
            )}
          </select>

          <svg
            className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" strokeWidth={2} />
          </svg>
        </div>
      </div>

      {/* SIZE DROPDOWN */}
      {sizes.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <label className="font-inter text-sm font-medium text-text-primary">
              Size:
            </label>

            <button className="font-inter text-xs font-medium text-text-primary underline">
              Size Guide
            </button>
          </div>

          <div className="relative mt-2">
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className={`w-full appearance-none rounded border border-gray-300 bg-white px-4 py-3 pr-10 font-inter text-sm ${
                selectedSize ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              <option value="" disabled>
                Select Size
              </option>

              {sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <svg
              className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" strokeWidth={2} />
            </svg>
          </div>
        </div>
      )}

      {/* ADD TO BAG + WISHLIST */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={handleAddToBag}
          className={`flex-1 rounded py-3 font-inter text-sm font-bold uppercase text-white ${
            isInCart ? 'bg-red-500' : 'bg-button-hover'
          }`}
        >
          {isInCart ? 'Remove from Bag' : 'Add to Bag'}
        </button>

        <button
          onClick={handleWishlistClick}
          className="flex size-12 items-center justify-center rounded border-2 border-gray-300 bg-white"
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
    </div>
  )
}

export default ProductInfo
