import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

type NavItem = {
  label: string
  href?: string
  dropdown?: {
    label: string
    href: string
  }[]
}

const navItems: NavItem[] = [
  {
    label: 'New Arrivals',
    href: '/shop?category=new-arrivals'
  },
  {
    label: 'Clothing',
    href: '/shop?category=clothing'
  },
  {
    label: 'Shoes',
    href: '/shop?category=shoes'
  },
  {
    label: 'Jewelry',
    href: '/shop?category=jewelry'
  },
  {
    label: 'Activities & Toys',
    href: '/shop?category=activities-toys'
  },
  {
    label: 'Brands',
    dropdown: [
      { label: 'Jellycat', href: '/shop?brand=jellycat' },
      { label: 'RYLEE + CRU', href: '/shop?brand=rylee%20%2B%20cru' },
      { label: 'BAREFOOT DREAMS', href: '/shop?brand=barefoot%20dreams' },
      { label: 'Nuna', href: '/shop?brand=nuna' },
      { label: 'KYTE BABY', href: '/shop?brand=kyte%20baby' },
      { label: 'MAGNETIC ME', href: '/shop?brand=magnetic%20me' },
      { label: 'QUINCY MAE', href: '/shop?brand=quincy%20mae' },
      { label: 'ENEWTON', href: '/shop?brand=enewton' },
      { label: 'UPPABABY', href: '/shop?brand=uppababy' },
      { label: 'View All', href: '/collection' }
    ]
  },
  {
    label: 'Books',
    href: '/shop?category=books'
  },
  {
    label: 'Sale',
    href: '/shop?category=sales'
  },
  {
    label: 'About',
    dropdown: [
      { label: 'About Us', href: '/about' },
      { label: 'FAQs & Help', href: '/faq' },
      { label: 'Contact Us', href: '/contact' }
    ]
  }
]

export default function NavMenu() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  return (
    <nav className="hidden w-full items-center justify-center lg:flex my-2">
      <div className="flex items-center gap-10">
        {navItems.map((item) => {
          const hasDropdown = item.dropdown?.length

          return (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => hasDropdown && handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              {item.href ? (
                <Link
                  to={item.href}
                  className="flex items-center gap-1 font-raleway text-sm font-medium uppercase tracking-wide text-text-primary transition-colors hover:text-gray-500"
                >
                  {item.label}
                </Link>
              ) : (
                <button className="flex items-center gap-1 font-raleway text-sm font-medium uppercase tracking-wide text-text-primary transition-colors hover:text-gray-500">
                  {item.label}
                </button>
              )}

              {/* DROPDOWN */}
              {hasDropdown && activeDropdown === item.label && (
                <div className="absolute left-0 top-full z-50 pt-2">
                  <div className="min-w-[220px] overflow-hidden rounded-md border border-gray-100 bg-white shadow-xl">
                    <div className="py-1">
                      {item.dropdown?.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          to={dropdownItem.href}
                          className="block px-3 py-2 text-left font-raleway text-sm uppercase tracking-wide text-black transition-colors hover:bg-gray-50 hover:text-gray-500"
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
}
