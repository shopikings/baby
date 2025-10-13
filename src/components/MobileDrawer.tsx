import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const [shopAccordionOpen, setShopAccordionOpen] = useState(false)
  const [brandsAccordionOpen, setBrandsAccordionOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true)
        })
      })
    } else {
      setIsAnimating(false)
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isAnimating ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      <div
        className={`absolute left-0 top-0 h-full w-80 bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isAnimating ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col bg-cream">
          <div className="flex items-center justify-between border-gray-200 p-4">
            <h2 className="font-rubik text-lg font-semibold text-text-primary"></h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 transition-colors hover:bg-gray-100"
            >
              <svg
                className="size-5 text-text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <AccordionItem
                title="Shop"
                isOpen={shopAccordionOpen}
                onToggle={() => setShopAccordionOpen(!shopAccordionOpen)}
                onClose={onClose}
                items={[
                  { label: 'Clothing', href: '/shop/clothing' },
                  { label: 'Toys', href: '/shop/toys' },
                  { label: 'Accessories', href: '/shop/accessories' }
                ]}
              />

              <AccordionItem
                title="Our Brands"
                isOpen={brandsAccordionOpen}
                onToggle={() => setBrandsAccordionOpen(!brandsAccordionOpen)}
                onClose={onClose}
                items={[
                  { label: 'Premium Brands', href: '/brands/premium' },
                  { label: 'Sustainable Brands', href: '/brands/sustainable' },
                  { label: 'Featured Brands', href: '/brands/featured' }
                ]}
              />

              <Link
                to="/about"
                className="block py-2 font-inter text-sm font-semibold uppercase text-text-primary transition-colors hover:text-gray-600"
                onClick={onClose}
              >
                About Us
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

interface AccordionItemProps {
  title: string
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
  items: Array<{ label: string; href: string }>
}

function AccordionItem({
  title,
  isOpen,
  onToggle,
  onClose,
  items
}: AccordionItemProps) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-2 font-inter text-sm font-semibold uppercase text-text-primary transition-colors hover:text-gray-600"
      >
        {title}
        <svg
          className={`size-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="ml-4 mt-2 space-y-2">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="block py-1 font-inter text-sm text-text-primary/70 transition-colors hover:text-text-primary"
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MobileDrawer
