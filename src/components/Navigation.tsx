import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <nav className="hidden flex-1 items-center justify-start gap-8 lg:flex">
      <Link
        to="/collection"
        className="font-inter text-xs font-semibold uppercase text-text-primary transition-colors hover:text-gray-600"
      >
        Shop
      </Link>
      <Link
        to="/about"
        className="font-inter text-xs font-semibold uppercase text-text-primary transition-colors hover:text-gray-600"
      >
        About
      </Link>
      <Link
        to="/brands"
        className="font-inter text-xs font-semibold uppercase text-text-primary transition-colors hover:text-gray-600"
      >
        Our Brands
      </Link>
    </nav>
  )
}

export default Navigation
