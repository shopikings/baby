import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <nav className="hidden flex-1 items-center justify-start gap-8 lg:flex">
      <Link
        to="/shop"
        className="font-inter text-xs font-semibold uppercase text-text-primary hover:text-gray-600 transition-colors"
      >
        Shop
      </Link>
      <Link
        to="/about"
        className="font-inter text-xs font-semibold uppercase text-text-primary hover:text-gray-600 transition-colors"
      >
        About
      </Link>
      <Link
        to="/brands"
        className="font-inter text-xs font-semibold uppercase text-text-primary hover:text-gray-600 transition-colors"
      >
        Our Brands
      </Link>
    </nav>
  )
}

export default Navigation
