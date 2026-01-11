import { FacebookIcon, InstagramIcon, MapPin } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
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

  const toggleAccordion = (name: string) => {
    setOpenAccordion((prev) => (prev === name ? null : name))
  }

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
          <div className="absolute right-0 top-0 flex items-center justify-between border-gray-200 px-2 py-1">
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

          <nav className="mt-4 flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              <Link
                to="/shop?category=new-arrivals"
                className="block py-2 font-raleway text-sm font-semibold uppercase text-text-primary transition-colors hover:text-gray-600"
                onClick={onClose}
              >
                New Arrivals
              </Link>

              <AccordionItem
                title="Collections"
                isOpen={openAccordion === 'collections'}
                onToggle={() => toggleAccordion('collections')}
                onClose={onClose}
                items={[
                  { label: 'Clothing', href: '/shop?category=clothing' },
                  { label: 'Jewelry', href: '/shop?category=jewelry' },
                  { label: 'Shoes', href: '/shop?category=shoes' },
                  {
                    label: 'Activities & Toy',
                    href: '/shop?category=activities-toys'
                  },
                  {
                    label: 'Feeding & Nursing',
                    href: '/shop?category=feeding-nursing'
                  },
                  { label: 'Bath Time', href: '/shop?category=bath-time' },
                  { label: 'Gear', href: '/shop?category=gear' },
                  { label: 'Gifts', href: '/shop?category=gifts' },
                  { label: 'Books', href: '/shop?category=books' },
                  { label: 'Maternity', href: '/shop?category=maternity' },
                  {
                    label: 'Nursing Favourite',
                    href: '/shop?category=nursing-favourite'
                  }
                ]}
              />

              <AccordionItem
                title="Our Brands"
                isOpen={openAccordion === 'brands'}
                onToggle={() => toggleAccordion('brands')}
                onClose={onClose}
                items={[
                  { label: 'JELLYCAT', href: '/shop?tag=jellycat' },
                  { label: 'RYLE + CRU', href: '/shop?tag=ryle%20%2B%20cru' },
                  {
                    label: 'BAREFOOT DREAMS',
                    href: '/shop?tag=barefoot%20dreams'
                  },
                  { label: 'KYTE BABY', href: '/shop?tag=kyte%20baby' },
                  { label: 'MAGNETIC ME', href: '/shop?tag=magnetic%20me' },
                  { label: 'QUINCY MAE', href: '/shop?tag=quincy%20mae' },
                  {
                    label: 'ENEWTON',
                    href: '/shop?tag=enewton'
                  },
                  { label: 'NUNA', href: '/shop?tag=nuna' },
                  { label: 'UPPABABY', href: '/shop?tag=uppababy' },
                  { label: 'VIEW ALL', href: '/collection' }
                ]}
              />

              <Link
                to="/shop?category=sale"
                className="block py-2 font-raleway text-sm font-semibold uppercase text-text-primary transition-colors hover:text-gray-600"
                onClick={onClose}
              >
                Sale
              </Link>

              <AccordionItem
                title="About"
                isOpen={openAccordion === 'about'}
                onToggle={() => toggleAccordion('about')}
                onClose={onClose}
                items={[
                  { label: 'About Us', href: '/about' },
                  { label: 'FAQs', href: '/faq' },
                  {
                    label: 'Blogs',
                    href: '/blog'
                  }
                ]}
              />

              <AccordionItem
                title="Helpful Links"
                isOpen={openAccordion === 'help'}
                onToggle={() => toggleAccordion('help')}
                onClose={onClose}
                items={[
                  { label: 'Contact', href: '/contact' },
                  { label: 'Terms and Conditions', href: '/terms' },
                  { label: 'Privacy Policy', href: '/privacy' },
                  { label: 'Shipping Policy', href: '/shipping' },
                  { label: 'Refund and Return', href: '/returns' },
                  { label: 'Wishlist', href: '/wishlist' }
                ]}
              />
            </div>

            <div className="absolute bottom-6 left-4 flex items-center justify-start gap-8 text-text-primary">
              <a
                href="https://www.facebook.com/MaisonBabyandKids/"
                target="_blank"
                rel="noreferrer"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.instagram.com/maisonbabyandkids/"
                target="_blank"
                rel="noreferrer"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://share.google/2vQ3lHDasPHhA6pn0"
                target="_blank"
                rel="noreferrer"
              >
                <MapPin />
              </a>
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
        className="flex w-full items-center justify-between py-2 font-raleway text-sm font-semibold uppercase text-text-primary transition-colors hover:text-gray-600"
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
          isOpen ? 'max-h-auto opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="ml-4 mt-2 space-y-2">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="block py-1 font-raleway text-sm uppercase text-text-primary/70 transition-colors hover:text-text-primary"
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
