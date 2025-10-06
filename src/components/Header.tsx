import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="w-full border-b border-gray-200">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <nav className="flex flex-1 items-center justify-start gap-8">
          <Link
            to="/shop"
            className="text-sm font-medium text-gray-900 hover:text-gray-600"
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-gray-900 hover:text-gray-600"
          >
            About
          </Link>
          <Link
            to="/brands"
            className="text-sm font-medium text-gray-900 hover:text-gray-600"
          >
            Our Brands
          </Link>
        </nav>

        <div className="absolute left-1/2 -translate-x-1/2">
          <Link to="/">
            <img
              src="/assets/icons/logo.svg"
              alt="Logo"
              className="h-12 w-auto"
            />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-6">
          <button className="text-gray-900 hover:text-gray-600">
            <img
              src="/assets/icons/search.svg"
              alt="Search"
              className="size-5"
            />
          </button>
          <button className="text-gray-900 hover:text-gray-600">
            <img
              src="/assets/icons/profile.svg"
              alt="Profile"
              className="size-5"
            />
          </button>
          <button className="text-gray-900 hover:text-gray-600">
            <img src="/assets/icons/cart.svg" alt="Cart" className="size-5" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
