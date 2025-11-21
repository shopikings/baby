import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'

interface NavigationProps {
  onCollectionSelect?: (slug: string) => void
}

function Navigation({ onCollectionSelect }: NavigationProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  // const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const navigate = useNavigate()

  // ✅ Make sure slugs exactly match Shopify collection handles
  const shopItems = [
    { name: 'New Arrivals', slug: 'new-arrivals' },
    { name: 'Clothing', slug: 'clothing' },
    { name: 'JEWELRY ', slug: 'jewelry' },
    { name: 'SHOES', slug: 'shoes' },
    { name: 'Activities & Toys', slug: 'activities-toys' },
    { name: 'Feeding & Nursing', slug: 'feeding-nursing' },
    { name: 'Bath Time', slug: 'bath-time' },
    { name: 'Gear', slug: 'gear' },
    { name: 'Gifts', slug: 'gifts' }, // ✅ not "gift"
    { name: 'BOOKS', slug: 'books' },
    { name: 'Maternity', slug: 'maternity' },
    { name: 'Nursing Favourite', slug: 'nursery-favorites' },
    { name: 'Sale', slug: 'sale' }
  ]

  const aboutItems = [
    { name: 'About Us', href: '/about' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'FAQs & Help', href: '/faqs' }
  ]

  const brandItems = [
    'JELLYCAT',
    'RYLE + CRU',
    'BAREFOOT DREAMS',
    'KYTE BABY',
    'MAGNETIC ME',
    'QUINCY MAE',
    'ENEWTON',
    'NUNA',
    'UPPABABY'
  ]

  const brandImages = [
    { image: '/assets/images/join-moment-one.jpg', title: 'KIDS CLOTHS' },
    { image: '/assets/images/join-moment-two.jpg', title: 'KIDS CLOTHS' },
    { image: '/assets/images/join-moment-three.jpg', title: 'KIDS CLOTHS' },
    { image: '/assets/images/join-moment-four.jpg', title: 'KIDS CLOTHS' }
  ]

  const handleMouseEnter = (dropdown: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(dropdown)
  }

  const handleMouseLeave = () => {
    // timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150)
  }

  const handleShopClick = (slug: string) => {
    // ✅ Ensure we use correct query param key
    const url = `/shop?category=${encodeURIComponent(slug)}`
    if (onCollectionSelect) {
      onCollectionSelect(slug)
    } else {
      navigate(url)
    }
    setActiveDropdown(null)
  }

  const handleBrandClick = (brand: string) => {
    const tag = brand.trim().toLowerCase() // Shopify tag must be lowercase

    navigate(`/shop?tag=${encodeURIComponent(tag)}`)
    setActiveDropdown(null)
  }

  return (
    <nav className="hidden flex-1 items-center justify-start gap-8 lg:flex">
      {/* SHOP DROPDOWN */}
      <div
        className="relative"
        onMouseEnter={() => handleMouseEnter('shop')}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          to="/shop"
          className="font-inter text-xs font-semibold uppercase text-text-primary transition-colors hover:text-gray-600"
        >
          Shop
        </Link>
        <div
          className={`absolute left-0 top-full z-50 pt-2 transition-all duration-300 ${
            activeDropdown === 'shop'
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-2 opacity-0'
          }`}
        >
          <div className="w-48 rounded-sm bg-cream shadow-lg">
            <div className="py-2">
              {shopItems.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => handleShopClick(item.slug)}
                  className="block w-full px-4 py-2 text-left font-inter text-sm uppercase text-black transition-colors hover:bg-gray-50 hover:text-gray-600"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT DROPDOWN */}
      <div
        className="relative"
        onMouseEnter={() => handleMouseEnter('about')}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          to="/about"
          className="font-inter text-xs font-semibold uppercase text-text-primary transition-colors hover:text-gray-600"
        >
          About
        </Link>
        <div
          className={`absolute left-0 top-full z-50 pt-2 transition-all duration-300 ${
            activeDropdown === 'about'
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-2 opacity-0'
          }`}
        >
          <div className="w-48 rounded-sm bg-cream shadow-lg">
            <div className="py-2">
              {aboutItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block px-4 py-2 font-inter text-sm uppercase text-black transition-colors hover:bg-gray-50 hover:text-gray-600"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* OUR BRANDS DROPDOWN */}
      <div
        className="relative"
        onMouseEnter={() => handleMouseEnter('brands')}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          to="/collection"
          className="font-inter text-xs font-semibold uppercase text-text-primary transition-colors hover:text-gray-600"
        >
          Our Brands
        </Link>
        <div
          className={`absolute left-0 top-full z-50 pt-2 transition-all duration-300 ${
            activeDropdown === 'brands'
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-2 opacity-0'
          }`}
        >
          <div className="w-screen rounded-sm bg-cream shadow-lg">
            <div className="flex">
              <div className="w-1/4 border-r border-gray-200 py-4">
                {brandItems.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => handleBrandClick(brand)}
                    className="block w-full px-6 py-2 text-left font-inter text-sm font-medium uppercase text-black transition-colors hover:bg-gray-50 hover:text-gray-600"
                  >
                    {brand}
                  </button>
                ))}
              </div>
              <div className="w-3/4 p-4">
                <div className="grid grid-cols-4 gap-4 xl:gap-6">
                  {brandImages.map((item, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className="overflow-hidden rounded-lg">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105 lg:h-48 xl:h-56 2xl:h-64"
                        />
                      </div>
                      <div className="mt-2 text-center">
                        <h4 className="font-inter text-xs font-semibold uppercase text-black">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
