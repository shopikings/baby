import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWishlist } from 'contexts/WishlistContext'
import toast from 'react-hot-toast'

interface ShopProductCardProps {
  id?: string
  title: string
  price: string
  comparePrice?: string
  mainImage: string
  variantImages: string[]
  rating?: number
  className?: string
  isOnSale?: boolean
  handle?: string // Add this
}

const getValidImage = (image: string) => {
  return image && image.trim() !== ''
    ? image
    : '/assets/images/placeholder.webp'
}

function ShopProductCard({
  id,
  title,
  price,
  comparePrice,
  mainImage,
  variantImages,
  rating = 0,
  className = '',
  isOnSale = false,
  handle
}: ShopProductCardProps) {
  const [currentImage, setCurrentImage] = useState(getValidImage(mainImage))
  const [isTransitioning, setIsTransitioning] = useState(false)
  const navigate = useNavigate()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const productId = id || `product-${title.replace(/\s+/g, '-').toLowerCase()}`
  const isWishlisted = isInWishlist(productId)

  const handleImageClick = (image: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (image === currentImage) return

    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentImage(image)
      setIsTransitioning(false)
    }, 200)
  }
  const handleCardClick = () => {
    // Use the provided handle or fallback to generated one
    const productHandle = handle || title.replace(/\s+/g, '-').toLowerCase()
    navigate(`/product/${productHandle}`)
  }

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (isWishlisted) {
      removeFromWishlist(productId)
      toast.success('Removed from wishlist')
    } else {
      const wishlistItem = {
        id: productId,
        name: title,
        price: price,
        image: currentImage,
        comparePrice
      }
      addToWishlist(wishlistItem)
      toast.success('Added to wishlist')
    }
  }

  // Filter out empty variant images
  const validVariantImages = variantImages.filter(
    (img) =>
      img && img.trim() !== '' && img !== '/assets/images/placeholder.webp'
  )

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
            onError={(e) => {
              // Fallback if image fails to load
              const target = e.target as HTMLImageElement
              target.src = '/assets/images/placeholder.webp'
            }}
          />

          {/* Sale Badge */}
          {isOnSale && (
            <div className="absolute left-3 top-3">
              <span className="rounded-md bg-red-500 px-2 py-1 font-raleway text-xs font-bold text-white">
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
      </div>

      <div className="space-y-2">
        <h3 className="line-clamp-3 font-rubik text-xs font-normal leading-[18px] text-text-primary">
          {title}
        </h3>

        {/* Price with compare price */}
        <div className="flex items-center gap-2">
          {comparePrice ? (
            <>
              <p className="font-raleway text-sm font-bold text-red-500">
                {price}
              </p>
              <p className="font-raleway text-sm text-gray-500 line-through">
                {comparePrice}
              </p>
            </>
          ) : (
            <p className="font-raleway text-sm font-bold text-text-primary">
              {price}
            </p>
          )}
        </div>

        {/* Rating */}
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

        {/* Variant Images */}
        {validVariantImages.length > 0 && (
          <div className="flex items-center gap-2 pt-1">
            {validVariantImages.slice(0, 3).map((image, index) => (
              <button
                key={index}
                onClick={(e) => handleImageClick(image, e)}
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
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/assets/images/placeholder.webp'
                  }}
                />
              </button>
            ))}
            {variantImages.length > 3 && (
              <span className="font-raleway text-xs text-gray-500">
                +{variantImages.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ShopProductCard
