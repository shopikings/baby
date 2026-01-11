import { HeartIcon, MapPin, ShoppingBagIcon, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from 'contexts/CartContext'

interface HeaderActionsProps {
  onCartClick?: () => void
  onSearchClick?: () => void
}

function HeaderActions({ onCartClick, onSearchClick }: HeaderActionsProps) {
  const navigation = useNavigate()
  const { getTotalItems } = useCart()
  return (
    <div className="flex items-center justify-end gap-4 md:gap-6 font-light">
      <button
        onClick={onSearchClick}
        className="text-text-primary transition-colors hover:text-gray-800 p-1 md:block hidden"
      >
        <Search className="size-5 md:size-6" strokeWidth={1.5} />
      </button>
      <button
        onClick={() => navigation('/wishlist')}
        className="text-text-primary transition-colors hover:text-gray-800 p-1"
      >
        <HeartIcon className="size-5 md:size-6" strokeWidth={1.5} />
      </button>
      <a
        href="https://share.google/2vQ3lHDasPHhA6pn0"
        target="_blank"
        className="hidden text-text-primary transition-colors hover:text-gray-800 p-1 lg:block"
        rel="noreferrer"
      >
        <MapPin className="size-5 md:size-6" strokeWidth={1.5} />
      </a>
      <button
        onClick={onCartClick}
        className="relative text-text-primary transition-colors hover:text-gray-800 p-1"
      >
        <ShoppingBagIcon className="size-5 md:size-6" strokeWidth={1.5} />
        {getTotalItems() > 0 && (
          <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-button-hover text-white text-xs font-semibold rounded-full">
            {getTotalItems()}
          </span>
        )}
      </button>
    </div>
  )
}

export default HeaderActions
