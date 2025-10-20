import { useState } from 'react'
import { Link } from 'react-router-dom'
import WishlistCard from 'components/WishlistCard'

interface WishlistItem {
  id: number
  image: string
  title: string
  subtitle: string
  price: string
}

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      image: '/assets/images/wishlistOne.png',
      title: 'kids t-shirts',
      subtitle: 'default title',
      price: '$19'
    },
    {
      id: 2,
      image: '/assets/images/wishlistTwo.png',
      title: 'boys core set',
      subtitle: 'default title',
      price: '$39'
    }
  ])

  const handleRemoveFromWishlist = (id: number) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id))
  }

  const handleAddToCart = (id: number) => {
    console.log('Adding item to cart:', id)
  }

  const handleAddAllToCart = () => {
    console.log('Adding all items to cart')
  }

  const getTotalPrice = () => {
    return wishlistItems.reduce((total, item) => {
      const price = parseInt(item.price.replace('$', ''))
      return total + price
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
              className="rounded-md border border-text-primary bg-transparent px-8 py-3 font-inter text-sm font-medium text-text-primary transition-colors hover:bg-text-primary hover:text-cream"
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
                    image={item.image}
                    title={item.title}
                    subtitle={item.subtitle}
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
                  className="rounded-md border border-[#E8A5A5] bg-[#E8A5A5] px-16 py-3 font-inter text-sm font-normal text-white transition-colors hover:border-black hover:bg-transparent hover:text-black"
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
