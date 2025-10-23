import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'

function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const shopItems = [
    { name: 'New Arrivals', href: '/shop?category=new-arrivals' },
    { name: 'clothing', href: '/shop?category=clothing' },
    { name: 'Activities & Toys', href: '/shop?category=activities-toys' },
    { name: 'Feeding & Nursing', href: '/shop?category=feeding-nursing' },
    { name: 'Bath Time', href: '/shop?category=bath-time' },
    { name: 'Gear', href: '/shop?category=gear' },
    { name: 'Gift', href: '/shop?category=gift' },
    { name: 'Maternity', href: '/shop?category=maternity' },
    { name: 'Nursing Favourite', href: '/shop?category=nursing-favourite' },
    { name: 'Sale', href: '/shop?category=sale' }
  ]

  const aboutItems = [
    { name: 'About Us', href: '/about' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'FAQs & Help', href: '/faqs' }
  ]

  const brandItems = [
    'JELLY CAT',
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
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveDropdown(dropdown)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  return (
    <nav className="hidden flex-1 items-center justify-start gap-8 lg:flex">
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
              {shopItems.map((item, index) => (
                <Link
                  key={index}
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
              {aboutItems.map((item, index) => (
                <Link
                  key={index}
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
          <div className="w-[1200px] rounded-sm bg-cream shadow-lg">
            <div className="flex">
              <div className="w-1/4 border-r border-gray-200 py-4">
                {brandItems.map((brand, index) => (
                  <Link
                    key={index}
                    to={`/shop?category=${brand
                      .toLowerCase()
                      .replace(/\s+/g, '-')}`}
                    className="block px-6 py-2 font-inter text-sm font-medium uppercase text-black transition-colors hover:bg-gray-50 hover:text-gray-600"
                  >
                    {brand}
                  </Link>
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
