import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react'

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

interface WishlistContextType {
  wishlistItems: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
  clearWishlist: () => void
  getTotalWishlistItems: () => number
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToWishlist = (item: WishlistItem) => {
    console.log('WishlistContext - Adding item to wishlist:', item)
    setWishlistItems((prev) => {
      const existingItem = prev.find(
        (wishlistItem) => wishlistItem.id === item.id
      )
      if (existingItem) {
        console.log('WishlistContext - Item already in wishlist')
        return prev
      }
      const newWishlist = [...prev, item]
      console.log(
        'WishlistContext - Added new item, new wishlist:',
        newWishlist
      )
      return newWishlist
    })
  }

  const removeFromWishlist = (id: string) => {
    console.log('WishlistContext - Removing item from wishlist:', id)
    setWishlistItems((prev) => prev.filter((item) => item.id !== id))
  }

  const isInWishlist = (id: string) => {
    return wishlistItems.some((item) => item.id === id)
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const getTotalWishlistItems = () => {
    return wishlistItems.length
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        getTotalWishlistItems
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
