import { useNavigate } from 'react-router-dom'
import { useWishlist } from 'contexts/WishlistContext'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

interface VariantInfo {
  id: string
  price: {
    amount: string
  }
  image: {
    url: string
  }
  availableForSale?: boolean
  title?: string
}

interface ProductCardProps {
  image: string
  hoverImage?: string
  title: string
  price: string
  className?: string
  id?: string
  handle?: string
  variants?: VariantInfo[]
}

function ProductCard({
  id,
  image,
  hoverImage,
  title,
  price,
  className = '',
  handle,
  variants
}: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const navigate = useNavigate()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showUndoButton, setShowUndoButton] = useState(false)
  const [undoTimeout, setUndoTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null)

  useEffect(() => {
    if (id) {
      setIsWishlisted(isInWishlist(id.toString()))
    }
  }, [id, isInWishlist])

  const handleCardClick = () => {
    if (handle) {
      navigate(`/product/${handle}`)
    }
  }

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.stopPropagation()
    const productId = id?.toString() || `product-${Date.now()}`

    const variantNodes = variants || []
    const defaultVariant =
      variantNodes.find((v) => v.availableForSale) || variantNodes[0] || null

    const wishlistItem = {
      id: productId,
      name: title,
      price: defaultVariant ? defaultVariant.price.amount : price,
      image: defaultVariant ? defaultVariant.image.url : image,
      variantId: defaultVariant ? defaultVariant.id : productId,
      variantTitle: defaultVariant?.title || 'Default'
    }

    addToWishlist(wishlistItem)
    setIsWishlisted(true)
    setShowUndoButton(true)
    toast.success(`${title} added to wishlist!`)

    // Auto-hide undo button after 5 seconds
    if (undoTimeout) {
      clearTimeout(undoTimeout)
    }
    const timeout = setTimeout(() => {
      setShowUndoButton(false)
    }, 5000)
    setUndoTimeout(timeout)
  }

  const handleUndo = (e: React.MouseEvent) => {
    e.stopPropagation()
    const productId = id?.toString() || `product-${Date.now()}`
    removeFromWishlist(productId)
    setIsWishlisted(false)
    setShowUndoButton(false)
    if (undoTimeout) {
      clearTimeout(undoTimeout)
    }
    toast.success(`${title} removed from wishlist!`)
  }

  return (
    <div
      // href={`/product/${handle}`}
      className={`group cursor-pointer ${className}`}
      onClick={handleCardClick}
    >
      <div className="mb-4 overflow-hidden rounded-lg bg-white p-4 shadow-sm transition-shadow duration-300 group-hover:shadow-md">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 size-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-0"
          />
          {hoverImage && (
            <img
              src={hoverImage}
              alt={`${title} hover`}
              className="absolute inset-0 size-full object-cover opacity-0 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
            />
          )}

          <div className="absolute bottom-3 right-3 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {showUndoButton && (
              <button
                onClick={handleUndo}
                className="rounded-lg bg-white p-2 transition-transform hover:scale-105"
                style={{ boxShadow: '0 0 8px rgba(0, 0, 0, 0.15)' }}
                title="Undo - Remove from wishlist"
              >
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 7v6h6" />
                  <path d="M21 17v-6h-6" />
                  <path d="M18 5c-1.5-1.5-3.5-2-5.5-2-5 0-9 4-9 9s4 9 9 9c4 0 7.5-2.5 8.5-6" />
                </svg>
              </button>
            )}
            <button
              onClick={handleAddToWishlist}
              className="rounded-lg bg-white p-2 transition-transform hover:scale-105"
              style={{ boxShadow: '0 0 8px rgba(0, 0, 0, 0.15)' }}
            >
              {isWishlisted ? (
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ color: '#ef4444' }}
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              ) : (
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-rubik text-sm font-semibold leading-[18px] text-text-primary sm:text-lg sm:leading-[22px]">
          {title}
        </h3>
        <p className="font-raleway text-lg font-medium text-text-primary sm:text-base">
          ${parseFloat(price).toFixed(2)}
        </p>
      </div>
    </div>
  )
}

export default ProductCard
