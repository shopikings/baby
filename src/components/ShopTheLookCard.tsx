import { useCart } from 'contexts/CartContext'
import toast from 'react-hot-toast'

interface ShopTheLookCardProps {
  isOpen: boolean
  onClose: () => void
  product: {
    id?: number
    name: string
    price: string
    image: string
  }
  position: {
    top: number
    left: number
  }
}

function ShopTheLookCard({
  isOpen,
  onClose,
  product,
  position
}: ShopTheLookCardProps) {
  const { addToCart } = useCart()

  const handleQuickBuy = () => {
    addToCart({
      id: product.id?.toString() || `shop-look-${Date.now()}`,
      name: product.name,
      price: product.price,
      image: product.image
    })
    toast.success(`${product.name} added to cart!`)
    onClose()
  }
  if (!isOpen) return null

  return (
    <div
      className="fixed z-50 w-80 rounded-lg bg-cream p-3 shadow-xl"
      style={{
        top: position.top,
        left: position.left
      }}
    >
      <button
        onClick={onClose}
        className="absolute right-1 top-1 text-text-primary hover:text-text-primary/70"
      >
        <svg
          className="size-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="flex gap-3">
        <div className="size-16 shrink-0 overflow-hidden rounded-lg bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="size-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3 className="mb-1 font-rubik text-xs font-semibold text-text-primary line-clamp-2">
              {product.name}
            </h3>
            <p className="font-inter text-sm font-bold text-text-primary">
              {product.price}
            </p>
          </div>

          <button
            onClick={handleQuickBuy}
            className="mt-2 rounded-md bg-[#E8A5A5] px-3 py-1 font-inter text-xs font-medium text-white transition-colors hover:bg-[#E8A5A5]/90"
          >
            QUICK BUY
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShopTheLookCard
