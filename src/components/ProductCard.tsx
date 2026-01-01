import { useNavigate } from 'react-router-dom'
import { useCart } from 'contexts/CartContext'
import toast from 'react-hot-toast'

interface ProductCardProps {
  image: string
  hoverImage?: string
  title: string
  price: string
  className?: string
  id?: string
}

function ProductCard({
  id,
  image,
  hoverImage,
  title,
  price,
  className = ''
}: ProductCardProps) {
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const handleCardClick = () => {
    if (id) {
      // Convert Shopify ID to plain number if needed
      const cleanId = id.toString().includes('gid://shopify/Product/')
        ? id.toString().split('/').pop()
        : id.toString()

      navigate(`/product/${cleanId}`)
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart({
      id: id?.toString() || `product-${Date.now()}`,
      name: title,
      price: price,
      image: image
    })
    toast.success(`${title} added to cart!`)
  }
  return (
    <div
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

          <div className="absolute bottom-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              onClick={handleAddToCart}
              className="rounded-lg bg-white p-2 transition-transform hover:scale-105"
              style={{ boxShadow: '0 0 8px rgba(0, 0, 0, 0.15)' }}
            >
              <img
                src="/assets/icons/cart.svg"
                alt="Add to cart"
                className="size-5"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-rubik text-sm font-semibold leading-[18px] text-text-primary sm:text-lg sm:leading-[22px]">
          {title}
        </h3>
        <p className="font-raleway text-lg font-medium text-text-primary sm:text-base">
          {price}
        </p>
      </div>
    </div>
  )
}

export default ProductCard
