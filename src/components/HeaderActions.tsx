import { HeartIcon, MapPin, ShoppingBagIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface HeaderActionsProps {
  onCartClick?: () => void
}

function HeaderActions({ onCartClick }: HeaderActionsProps) {
  const navigation = useNavigate()
  return (
    <div className="flex flex-1 items-center justify-end gap-6 font-light">
      <button
        onClick={() => navigation('/wishlist')}
        className="text-gray-600 transition-colors hover:text-gray-600"
      >
        <HeartIcon className="size-5" />
      </button>
      <a
        href="https://share.google/2vQ3lHDasPHhA6pn0"
        target="_blank"
        className="hidden text-gray-600 transition-colors hover:text-gray-600 lg:block"
        rel="noreferrer"
      >
        <MapPin className="size-5" />
      </a>
      <button
        onClick={onCartClick}
        className="text-gray-600 transition-colors hover:text-gray-600"
      >
        <ShoppingBagIcon className="size-5" />
      </button>
    </div>
  )
}

export default HeaderActions
