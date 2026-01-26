import { useEffect, useState } from 'react'
import { useCart } from '../../contexts/CartContext'
import toast from 'react-hot-toast'
import box from '../../assets/box(black).svg'
import truck from '../../assets/truck.svg'
import email from '../../assets/email.svg'
import ColorDropdown from './ColorDropdown'
import QuantityDropdown from './QuantityDropdown'
import SizeChartModal from './SizeChartModal'
import SizeDropdown from './SizeDropdown'

interface Color {
  name: string
  hex: string
}

interface ProductInfoProps {
  name: string
  price: string
  originalPrice: number
  rating: number
  colors?: Color[]
  sizes?: string[]
  image: string
  description?: string
  brand?: string
  variants?: any[]
  selectedVariant?: any
  available?: boolean
  onColorChange?: (color: string) => void
  onVariantChange?: (variant: any) => void
}

function ProductInfo({
  name,
  price,
  originalPrice,
  rating,
  colors = [],
  sizes = [],
  image,
  description = '',
  brand,
  variants = [],
  selectedVariant,
  available = true,
  onColorChange,
  onVariantChange
}: ProductInfoProps) {
  const { addToCart } = useCart()
  const [selectedColor, setSelectedColor] = useState(
    selectedVariant
      ? selectedVariant.title.includes('/')
        ? selectedVariant.title.split('/')[0].trim()
        : selectedVariant.title
      : colors[0]?.name || ''
  )

  const [selectedSize, setSelectedSize] = useState(
    selectedVariant
      ? selectedVariant.title.includes('/')
        ? selectedVariant.title.split('/')[1].trim()
        : 'Default'
      : sizes[0] || 'Default'
  )

  const [quantity, setQuantity] = useState(1)
  const [showSizeChart, setShowSizeChart] = useState(false)
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean
  }>({
    shipping: false,
    returns: false,
    features: false,
    question: false
  })

  const [questionForm, setQuestionForm] = useState({
    name: '',
    email: '',
    phone: '',
    comment: ''
  })

  // Initialize with selectedVariant if available
  useEffect(() => {
    if (!selectedColor || !selectedSize) return

    const variant = variants.find(
      (v: any) =>
        v.selectedOptions?.every((opt: any) => {
          if (opt.name.toLowerCase().includes('color')) {
            return opt.value === selectedColor
          }
          if (opt.name.toLowerCase().includes('size')) {
            return opt.value === selectedSize
          }
          return true
        })
    )

    if (variant && onVariantChange) {
      onVariantChange(variant)
    }
  }, [selectedColor, selectedSize, variants])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Question submitted:', questionForm)
    toast.success('Question submitted successfully!')

    // Reset form
    setQuestionForm({
      name: '',
      email: '',
      phone: '',
      comment: ''
    })

    // Close the section
    setExpandedSections((prev) => ({ ...prev, question: false }))
  }

  const handleQuestionFormChange = (field: string, value: string) => {
    setQuestionForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)

    // Find variant that matches the selected color
    const matchingVariant = variants.find((v: any) => {
      // Check variant title
      if (v.title === color) return true

      // Check selectedOptions
      if (v.selectedOptions) {
        return v.selectedOptions.some(
          (opt: any) =>
            (opt.name.toLowerCase().includes('color') ||
              opt.name.toLowerCase().includes('option')) &&
            opt.value === color
        )
      }

      return false
    })

    if (matchingVariant && onVariantChange) {
      onVariantChange(matchingVariant)
    }

    // Call parent handler if provided
    onColorChange?.(color)
  }

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
  }

  const handleAddToCart = () => {
    if (!selectedVariant?.id) {
      toast.error('Please select a variant')
      return
    }

    const product = {
      id: selectedVariant.id, // cart line id
      variantId: selectedVariant.id, // Shopify variant ID (GID)
      name,
      price: selectedVariant.price || price,
      image: selectedVariant.image?.url || image,
      color: selectedColor || undefined,
      size: selectedSize || undefined,
      quantity
    }

    console.log('Adding to cart:', product)

    addToCart(product)
    toast.success(`${name} added to cart!`)
  }

  // Calculate display price
  const displayPrice = typeof price === 'number' ? price : price
  // const isAvailable = selectedVariant?.available !== false && available

  // Find the variant that matches the current selected color and size
  const matchingVariant =
    variants.find((v: any) => {
      if (!v.title.includes('/')) return false
      const [vColor, vSize] = v.title.split('/').map((s: any) => s.trim())
      return vColor === selectedColor && vSize === selectedSize
    }) || selectedVariant

  // Set availability based on whether a matching variant exists AND is available
  const isAvailable = matchingVariant?.available === true

  return (
    <div className="space-y-4 md:space-y-5">
      {/* Product Title */}
      <h1 className="font-raleway text-xl md:text-2xl font-bold uppercase text-text-primary">
        {name}
      </h1>

      {/* Availability */}
      {!isAvailable && (
        <div className="text-red-600 text-sm font-raleway font-medium">
          Out of Stock
        </div>
      )}

      {/* Price */}
      <span className="font-raleway text-base md:text-lg font-normal text-text-primary">
        ${parseFloat(displayPrice).toFixed(2)}
        {selectedVariant?.compareAtPrice &&
          selectedVariant.compareAtPrice > price && (
            <span className="ml-2 line-through text-gray-500">
              ${selectedVariant.compareAtPrice}
            </span>
          )}
      </span>

      {brand && (
        <p className="text-xs md:text-sm text-black font-normal font-raleway">
          by <span className="uppercase">{brand}</span>
        </p>
      )}

      {/* Colors */}
      {colors.length > 0 &&
        colors.some(
          (c) =>
            c.name &&
            c.name.toLowerCase() !== 'default' &&
            c.name.toLowerCase() !== 'default title'
        ) && (
          <div>
            <h3 className="text-xs mb-2">COLOR</h3>
            <ColorDropdown
              colors={colors}
              selectedColor={selectedColor}
              onColorChange={handleColorSelect}
            />
          </div>
        )}

      {/* Sizes - Only show if there are size variants */}
      {sizes.length > 0 && sizes[0] !== 'Default' && (
        <div>
          <h3 className="text-xs mb-2">SIZE</h3>
          <SizeDropdown
            sizes={sizes}
            selectedSize={selectedSize}
            onSizeChange={handleSizeSelect}
          />
        </div>
      )}

      {/* Quantity */}
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <h3 className="text-xs font-raleway font-normal text-black mb-3 tracking-wide">
            QUANTITY
          </h3>
          <QuantityDropdown
            quantity={quantity}
            onQuantityChange={setQuantity}
            maxQuantity={selectedVariant?.quantityAvailable || 10}
          />
        </div>
        {sizes.length > 0 && sizes[0] !== 'Default' && (
          <button
            onClick={() => setShowSizeChart(true)}
            className="text-xs font-raleway text-[#E9908E] border border-[#E9908E] px-4 py-2 rounded hover:bg-[#E9908E] hover:text-white transition-colors whitespace-nowrap h-fit"
          >
            SIZE GUIDE
          </button>
        )}
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={!isAvailable}
        className={`w-full text-white py-3 px-6 rounded-lg font-raleway font-normal transition-colors text-sm ${
          isAvailable
            ? 'bg-[#E9908E] hover:bg-[#EFECDA] hover:text-black hover:border hover:border-black'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {isAvailable ? `ADD TO CART • $${displayPrice}` : 'OUT OF STOCK'}
      </button>

      {/* Size Chart Modal */}
      <SizeChartModal
        isOpen={showSizeChart}
        onClose={() => setShowSizeChart(false)}
      />

      {/* Shipping Info */}
      <div className="space-y-[2px] font-raleway text-sm font-light text-gray-700">
        <div className="flex items-start gap-2">
          <img src={truck} alt="truck" />
          <span>Ships in 1-2 Days</span>
        </div>
        <div className="flex items-start gap-2">
          <img src={email} alt="email" />
          <span>Delivery From $7 or Free Over $70</span>
        </div>
        <div className="flex items-start gap-2">
          <img src={box} alt="box" />
          <span>90 Days Easy Returns</span>
        </div>
      </div>

      {/* Expandable Sections */}
      <div className="space-y-0">
        {/* Features */}
        <button
          onClick={() => toggleSection('features')}
          className="w-full flex items-center justify-between py-3 border-b border-black"
        >
          <span className="font-raleway text-xs font-normal text-black tracking-wide">
            PRODUCT FEATURES
          </span>
          <svg
            className={`w-5 h-5 transition-transform ${
              expandedSections.features ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>

        {/* Features Content */}
        {expandedSections.features && description && (
          <div className="py-3 px-0 border-b text-primary border-black text-sm font-light font-raleway">
            <div
              dangerouslySetInnerHTML={{ __html: description }}
              style={{
                fontFamily: 'Raleway, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 300,
                lineHeight: '1.6',
                color: '#444B59'
              }}
              className="[&_p]:mb-3 [&_ul]:mb-3 [&_ol]:mb-3 [&_li]:mb-1 [&_*]:font-raleway [&_*]:font-light [&_p]:font-raleway [&_li]:font-raleway [&_strong]:font-semibold [&_b]:font-semibold"
            />
          </div>
        )}

        {/* Returns */}
        <button
          onClick={() => toggleSection('returns')}
          className="w-full flex items-center justify-between py-3 border-b border-black"
        >
          <span className="font-raleway text-xs font-normal text-black tracking-wide">
            EASY FREE RETURNS
          </span>
          <svg
            className={`w-5 h-5 transition-transform ${
              expandedSections.returns ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>

        {/* Returns Content */}
        {expandedSections.returns && (
          <div className="py-3 px-0 border-b border-black text-sm text-gray-700 font-raleway leading-relaxed space-y-2">
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-text-primary font-bold">•</span>
                <span>
                  Returns are accepted within 90 days of delivery for items that
                  are new, unused, and in original packaging; used or opened
                  baby gear items are not eligible for return due to safety
                  reasons.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-text-primary font-bold">•</span>
                <span>
                  Maison Baby covers return shipping for defective, incorrect,
                  or error-related orders; customers are responsible for return
                  shipping in all other cases, with refunds issued within 48
                  hours of return delivery.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-text-primary font-bold">•</span>
                <span>
                  All sale, holiday/seasonal items, and Uppababy Vista V2 and
                  Mesa Max products are final sale and cannot be returned or
                  exchanged.
                </span>
              </li>
            </ul>
          </div>
        )}

        {/* Have a Question */}
        <button
          onClick={() => toggleSection('question')}
          className="w-full flex items-center justify-between py-3 border-b border-black"
        >
          <span className="font-raleway text-xs font-normal text-black tracking-wide">
            HAVE A QUESTION?
          </span>
          <svg
            className={`w-5 h-5 transition-transform ${
              expandedSections.question ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>

        {/* Question Form Content */}
        {expandedSections.question && (
          <div className="py-4 px-0 border-b border-black">
            <form onSubmit={handleQuestionSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={questionForm.name}
                  onChange={(e) =>
                    handleQuestionFormChange('name', e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 bg-white font-raleway text-sm placeholder:text-gray-500 focus:border-gray-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email *"
                  value={questionForm.email}
                  onChange={(e) =>
                    handleQuestionFormChange('email', e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 bg-white font-raleway text-sm placeholder:text-gray-500 focus:border-gray-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={questionForm.phone}
                  onChange={(e) =>
                    handleQuestionFormChange('phone', e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 bg-white font-raleway text-sm placeholder:text-gray-500 focus:border-gray-500 focus:outline-none"
                />
              </div>

              <div>
                <textarea
                  placeholder="Comment"
                  value={questionForm.comment}
                  onChange={(e) =>
                    handleQuestionFormChange('comment', e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 bg-white font-raleway text-sm placeholder:text-gray-500 focus:border-gray-500 focus:outline-none resize-vertical"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-button-hover text-white px-8 py-3 font-raleway text-sm font-medium hover:bg-[#7d969a] transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        )}

        {/* Shipping */}
        <button
          onClick={() => toggleSection('shipping')}
          className="w-full flex items-center justify-between py-3 border-b border-black"
        >
          <span className="font-raleway text-xs font-normal text-black tracking-wide">
            FAST SHIPPING
          </span>
          <svg
            className={`w-5 h-5 transition-transform ${
              expandedSections.shipping ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>

        {expandedSections.shipping && (
          <div className="py-3 px-0 border-b border-black text-sm text-gray-700 font-raleway leading-relaxed space-y-2">
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-text-primary font-light">•</span>
                <span>
                  Orders are typically processed within 1-3 business days
                  (Monday to Friday, excluding U.S. federal holidays).
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-text-primary font-light">•</span>
                <span>
                  If we experience a high volume of orders (e.g., during
                  seasonal sales), processing may take a little longer, we'll
                  notify you via email if we expect a delay.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-text-primary font-light">•</span>
                <span>
                  Once your order is processed and shipped, you will receive a
                  shipping confirmation email with a tracking number.
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductInfo
