import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWishlist } from 'contexts/WishlistContext'
import toast from 'react-hot-toast'

interface VariantInfo {
  id: string
  price: string
  image: string
  title?: string
}

interface ShopProductCardProps {
  id?: number
  title: string
  price: string
  mainImage: string
  variantImages: string[]
  rating?: number
  className?: string
  handle?: string
  variants?: VariantInfo[]
}

interface ShopProductCardProps {
  id?: number
  title: string
  price: string
  mainImage: string
  variantImages: string[]
  rating?: number
  className?: string
  handle?: string
  variants?: VariantInfo[]
  defaultVariant?: VariantInfo
  isOnSale?: boolean // Add this to show sale badge
  originalPrice?: string // Add this to show crossed-out price
  sizes?: string[] // Add this for size options
}

interface WishlistItem {
  id: string
  name: string
  price: string
  image: string // default product image
  variantId: string // first/default variant ID
  variantTitle: string // e.g., "Red / Small"
  variantImage?: string // optional, variant-specific image
  quantity?: number
}

function ShopProductCard({
  id,
  title,
  price,
  mainImage,
  variantImages,
  rating = 0,
  className = '',
  handle,
  variants, // Optional variant data
  defaultVariant,
  isOnSale = false,
  originalPrice,
  sizes = []
}: ShopProductCardProps) {
  const [currentImage, setCurrentImage] = useState(mainImage)
  const [currentPrice, setCurrentPrice] = useState(price)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const navigate = useNavigate()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const productId =
    id?.toString() || `product-${title.replace(/\s+/g, '-').toLowerCase()}`
  const isWishlisted = isInWishlist(productId)

  const handleImageClick = (
    image: string,
    index: number,
    e: React.MouseEvent
  ) => {
    e.stopPropagation()
    if (image === currentImage) return

    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentImage(image)

      // If we have variant data and the clicked image corresponds to a variant,
      // update the price to match that variant
      if (variants && variants[index]) {
        setCurrentPrice(variants[index].price)
      }

      setIsTransitioning(false)
    }, 200)
  }

  const handleCardClick = () => {
    if (handle) {
      navigate(`/product/${handle}`)
    }
  }

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!defaultVariant) return

    const wishlistItem: WishlistItem = {
      id: productId,
      name: title,
      price: defaultVariant.price,
      image: defaultVariant.image,
      variantId: defaultVariant.id,
      quantity: 1,
      variantTitle: defaultVariant.title || 'Default'
    }

    if (isWishlisted) {
      removeFromWishlist(productId)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist(wishlistItem)
      toast.success('Added to wishlist')
    }
  }

  const handleSizeClick = (size: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedSize(selectedSize === size ? null : size)
  }

  return (
    <div
      className={`group cursor-pointer ${className}`}
      onClick={handleCardClick}
    >
      <div className="mb-4 overflow-hidden rounded-lg bg-white p-4 shadow-sm transition-shadow duration-300 group-hover:shadow-md">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
          <img
            src={currentImage}
            alt={title}
            className={`absolute inset-0 size-full object-cover transition-all duration-300 ${
              isTransitioning ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
            }`}
          />

          {/* Sale Badge */}
          {isOnSale && (
            <div className="absolute left-3 top-3 z-10">
              <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                SALE
              </span>
            </div>
          )}

          <div className="absolute bottom-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              onClick={handleWishlistClick}
              className="rounded-lg bg-white p-2 transition-transform hover:scale-110"
              style={{ boxShadow: '0 0 8px rgba(0, 0, 0, 0.15)' }}
            >
              <svg
                className="size-5"
                fill={isWishlisted ? '#E8A5A5' : 'none'}
                stroke={isWishlisted ? '#E8A5A5' : 'black'}
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Size Options - Directly under the image */}
        {sizes.length > 0 ? (
          <div className="mt-3 grid grid-cols-5 gap-1">
            {sizes.map((size, index) => (
              <button
                key={index}
                onClick={(e) => handleSizeClick(size, e)}
                className={`border py-2 text-xs font-medium transition-all hover:border-gray-400 ${
                  selectedSize === size
                    ? 'border-button-hover bg-button-hover text-white'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        ) : (
          /* Add to Cart button when no sizes available */
          <div className="mt-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-button-hover py-2 text-xs font-medium text-white transition-all hover:bg-[#7d969a]"
            >
              ADD TO CART
            </button>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="line-clamp-3 font-rubik text-xs font-normal leading-[18px] text-text-primary">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <p className="font-raleway text-sm font-bold text-text-primary">
            {currentPrice}
          </p>
          {isOnSale && originalPrice && (
            <p className="font-raleway text-xs text-gray-500 line-through">
              {originalPrice}
            </p>
          )}
          {isOnSale && originalPrice && (
            <span className="rounded bg-red-100 px-1 py-0.5 text-xs font-medium text-red-600">
              SALE
            </span>
          )}
        </div>

        <div className="flex items-center gap-0">
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
        </div>

        {variantImages.length > 0 && (
          <div className="flex items-center gap-2 pt-1">
            {variantImages.map((image, index) => (
              <button
                key={index}
                onClick={(e) => handleImageClick(image, index, e)}
                className={`size-8 overflow-hidden rounded-md border-2 transition-all hover:scale-110 ${
                  currentImage === image
                    ? 'border-button-hover'
                    : 'border-gray-300'
                }`}
              >
                <img
                  src={image}
                  alt={`Variant ${index + 1}`}
                  className="size-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ShopProductCard
