import { useState } from 'react'
import { Link } from 'react-router-dom'
import Marquee from '../Marquee'
import MobileDrawer from '../MobileDrawer'
import Navigation from '../Navigation'
import HeaderActions from '../HeaderActions'

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="relative w-full border-b border-gray-200 bg-cream">
        <div className="bg-banner-lower py-2">
          <Marquee
            text="Join the VIP Club - 10% off first order"
            className="font-inter text-sm font-medium text-black"
          />
        </div>

        <div className="mx-auto flex max-w-7xl items-center px-4 py-5 sm:px-6 lg:px-8 lg:py-2">
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

          <Navigation />

          <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:left-auto lg:translate-x-0">
            <Link to="/">
              <img
                src="/assets/images/logo.png"
                alt="Logo"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          <HeaderActions />
        </div>
      </header>

      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}

export default Header
