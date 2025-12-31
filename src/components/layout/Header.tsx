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
            className="font-inter text-sm font-medium text-black"
          />
        </div>

        <div className="mx-auto flex max-w-7xl items-center px-4 py-5 sm:px-6 lg:px-8 lg:py-2 justify-between">
          {/* Left - Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="mr-4 flex items-center justify-center transition-colors hover:text-gray-600 lg:hidden"
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
          <div>
          <Navigation onCollectionSelect={handleCollectionSelect} />
          </div>

          {/* Left - Navigation */}
<div>
          <Link to="/" className="flex-shrink-0">
            <img
              src="/assets/images/logo.png"
              alt="Logo"
              className="h-10 w-auto"
            />
          </Link>
</div>


<div>
          <HeaderActions onCartClick={() => setIsCartOpen(true)} onSearchClick={() => setIsSearchOpen(true)} />
</div>
          {/* Right - Icons */}

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