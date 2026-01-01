import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Marquee from '../Marquee'
import MobileDrawer from '../MobileDrawer'
import Navigation from '../Navigation'
import HeaderActions from '../HeaderActions'
import CartDrawer from '../CartDrawer'
import SearchModal from '../SearchModal'
import Marquee2 from 'components/Marquee2'

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const navigate = useNavigate()

  // ✅ No UI change — these are for consistent category linking
  const handleCollectionSelect = (slug: string) => {
    navigate(`/shop?category=${slug}`)
  }

  return (
    <>
      <header className="relative w-full border-b border-gray-200 bg-cream">
        <div className="bg-banner-lower py-2">
          <Marquee2
            text1="Free Easy Returns within 90 days of purchase"
            text2=" Free Shipping on all order above $70"
            className="font-raleway text-sm font-medium text-black"
          />
        </div>

        <div className="mx-auto flex max-w-7xl items-center px-4 py-4 sm:px-6 lg:px-8 justify-between gap-4">
          {/* Left - Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex items-center justify-center transition-colors hover:text-gray-600 lg:hidden flex-shrink-0"
          >
            <svg
              className="size-6 text-text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Left - Navigation (Desktop only) */}
          <div className="hidden lg:block">
            <Navigation onCollectionSelect={handleCollectionSelect} />
          </div>

          {/* Center - Logo */}
          <Link to="/" className="flex-shrink-0 mx-auto mb-4 md:mb-0 lg:mx-0">
            <img
              src="/assets/images/logo.png"
              alt="Logo"
              className="h-10 w-auto"
            />
          </Link>

          {/* Right - Header Actions */}
          <div className="flex-shrink-0">
            <HeaderActions onCartClick={() => setIsCartOpen(true)} onSearchClick={() => setIsSearchOpen(true)} />
          </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}

export default Header