import { Link } from 'react-router-dom'
import { useWishlist } from 'contexts/WishlistContext'
import { useCart } from 'contexts/CartContext'
import WishlistCard from 'components/WishlistCard'
import toast from 'react-hot-toast'

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

function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  console.log(wishlistItems)

  const handleRemoveFromWishlist = (id: string) => {
    removeFromWishlist(id)
    toast.success('Removed from wishlist')
  }

  const handleAddToCart = (id: string) => {
    const item = wishlistItems.find((item) => item.id === id)
    if (!item) return

    addToCart({
      id: item.variantId,
      name: item.name,
      price: item.price,
      image: item.variantImage || item.image, // use variant image if available
      variantId: item.variantId, // required for checkout
      variantTitle: item.variantTitle || 'Default'
      // quantity: item.quantity || 1
    })

    toast.success('Added to cart')
  }

  const handleAddAllToCart = () => {
    wishlistItems.forEach((item) => {
      addToCart({
        id: item.variantId,
        name: item.name,
        price: item.price,
        image: item.variantImage || item.image,
        variantId: item.variantId
        // variantTitle: item.variantTitle || 'Default',
        // quantity: item.quantity || 1
      })
    })

    toast.success(`Added ${wishlistItems.length} items to cart`)
    clearWishlist()
  }

  const getTotalPrice = () => {
    return wishlistItems.reduce((total, item) => {
      const price = Number(item.price)
      return total + (isNaN(price) ? 0 : price)
    }, 0)
  }

  const getGridCols = () => {
    const itemCount = wishlistItems.length
    if (itemCount === 1) return 'grid-cols-1'
    if (itemCount === 2) return 'grid-cols-1 sm:grid-cols-2'
    if (itemCount === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-12 text-center font-rubik text-2xl font-bold text-text-primary md:text-3xl">
          Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <p className="mb-8 font-rubik text-lg text-text-primary/70">
              Seems you have no items on your wishlist yet!
            </p>

            <Link
              to="/shop"
              className="rounded-md border border-text-primary bg-transparent px-8 py-3 font-raleway text-sm font-medium text-text-primary transition-colors hover:bg-text-primary hover:text-cream"
            >
              continue shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-center">
              <div className={`grid gap-6 ${getGridCols()}`}>
                {wishlistItems.map((item) => (
                  <WishlistCard
                    key={item.id}
                    id={item.id}
                    image={item.variantImage || item.image}
                    title={item.name}
                    subtitle="default title"
                    price={item.price}
                    onRemove={handleRemoveFromWishlist}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>

            {wishlistItems.length > 0 && (
              <div className="flex justify-center">
                <button
                  onClick={handleAddAllToCart}
                  className="rounded-md border border-[#E8A5A5] bg-[#E8A5A5] px-16 py-3 font-raleway text-sm font-normal text-white transition-colors hover:border-black hover:bg-transparent hover:text-black"
                >
                  add to cart all items - ${getTotalPrice()}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist
