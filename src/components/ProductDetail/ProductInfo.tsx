import { useState } from 'react'
import { useCart } from '../../contexts/CartContext'
import toast from 'react-hot-toast'

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
}

function ProductInfo({
  name,
  price,
  originalPrice,
  rating,
  colors = [],
  sizes = [],
  image,
  description = ''
}: ProductInfoProps) {
  const { addToCart } = useCart()
  
  // Console log only the color names coming from API
  console.log('=== COLORS FROM API ===')
  colors.forEach((color, index) => {
    console.log(`${index + 1}. ${color.name}`)
  })
  console.log('=== END API COLORS ===')
  
  const [selectedColor, setSelectedColor] = useState(colors[0]?.name || '')
  const [selectedSize, setSelectedSize] = useState(sizes[0] || '')
  const [quantity, setQuantity] = useState(1)
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    shipping: false,
    returns: false,
    features: false
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleAddToCart = () => {
    const product = {
      id: `${name}-${selectedColor || 'default'}-${selectedSize || 'default'}`,
      name,
      price,
      image,
      color: selectedColor || undefined,
      size: selectedSize || undefined,
      quantity
    }

    addToCart(product)
    toast.success(`${name} added to cart!`)
  }

  return (
    <div className="space-y-4 md:space-y-7">
      {/* Product Title */}
      <h1 className="font-rubik text-xl md:text-2xl font-normal uppercase text-text-primary flex flex-col">
        <span>
             {name}
        </span>
     
         <span className="font-rubik text-base md:text-lg font-normal mb-2 md:mb-3 text-text-primary">
          ${price}
        </span>
         {/* Sizes */}
      {sizes.length > 0 && (
        <div>
           <p className="text-xs md:text-sm text-gray-700 font-light">by Brands</p>
          <h3 className="font-inter text-xs font-light text-text-primary mb-2 md:mb-3 tracking-wide">
            SIZE
          </h3>
          <div className="flex gap-2 flex-wrap">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 md:px-4 py-2 border rounded-lg text-xs md:text-sm font-light transition-all ${
                  selectedSize === size
                    ? 'border-gray-800 bg-[#d8d7d3]'
                    : 'border-gray-600 bg-[#EFECDA] hover:border-gray-900'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
      </h1>

  


     

      {/* Colors */}
      {colors.length > 0 && (
        <div className='mb-3'>
          <h3 className="font-inter text-xs font-light text-text-primary mb-3 tracking-wide">
            Colour: <span className="font-semibold">{selectedColor}</span>
          </h3>
          <div className="flex gap-3">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`size-10 rounded border-2 transition-all ${
                  selectedColor === color.name
                    ? 'border-gray-800'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <h3 className="text-xs font-light text-text-primary mb-3 tracking-wide">
          QUANTITY
        </h3>
        <div className="flex items-center gap-7 border border-gray-800 rounded-xl px-4 py-2 w-28">
          <span className="font-inter text-lg font0-light font-medium text-text-primary">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="ml-4 hover:opacity-70 transition-opacity"
          >
            <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-[#E9908E] text-white py-3 rounded-lg font-inter font-normal hover:bg-[#EFECDA] transition-colors text-sm hover:text-black hover:border hover:border-black"
      >
        ADD TO CART • £{price}
      </button>

 

      {/* Fit Large Section */}
      <div className="space-y-3 bg-[#EFECDA] rounded">
        <h3 className="font-inter text-xs font-bold text-text-primary tracking-wide">
          FIT
          <div className="space-y-3">
          {/* Visual Scale */}
          <div className="flex items-center gap-1">
            <div className="flex-1 h-[2px] bg-gray-400 rounded"></div>
            <div className="flex-1 h-[2px] bg-gray-400 rounded"></div>
            <div className="flex-1 h-[4px] bg-gray-800 rounded"></div>
            <div className="flex-1 h-[2px] bg-gray-400 rounded"></div>
            <div className="flex-1 h-[2px] bg-gray-400 rounded"></div>
          </div>
          
          {/* Labels */}
          <div className="flex justify-between text-xs text-gray-700 font-inter">
            <span>Small</span>
            <span>True to size</span>
            <span>Large</span>
          </div>
        </div>
        </h3>
        
        
      </div>

      {/* Shipping Info */}
      <div className="space-y-[2px] text-sm font-light text-gray-700 font-inter">
        <div className="flex items-start gap-1">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
          </svg>
          <span>Ships in 1-2 Days</span>
        </div>
        <div className="flex items-start gap-1">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Delivery From £4.25 or Free Over £50</span>
        </div>
        <div className="flex items-start gap-1">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>45 Days Easy Returns</span>
        </div>
         {/* Expandable Sections */}
      <div className="space-y-0">
        {/* Shipping */}
        <button
          onClick={() => toggleSection('shipping')}
          className="w-full flex items-center justify-between py-3 border-b border-black"
        >
          <span className="font-inter text-xs font-normal text-black tracking-wide">
            FREE STANDARD SHIPPING - MORE DETAILS
          </span>
          <svg className={`w-5 h-5 transition-transform ${expandedSections.shipping ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>

        {/* Returns */}
        <button
          onClick={() => toggleSection('returns')}
          className="w-full flex items-center justify-between py-3 border-b border-black"
        >
          <span className="font-inter text-xs font-normal text-black tracking-wide">
            EASY FREE RETURNS
          </span>
          <svg className={`w-5 h-5 transition-transform ${expandedSections.returns ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>

        {/* Returns Content */}
        {expandedSections.returns && (
          <div className="py-3 px-0 border-b border-black text-sm text-gray-700 font-inter leading-relaxed space-y-2">
            <p className="font-semibold text-text-primary">To qualify for a return, your item must:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-text-primary font-bold">•</span>
                <span>Be in the same condition as when received.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-text-primary font-bold">•</span>
                <span>Be unworn or unused, with tags attached.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-text-primary font-bold">•</span>
                <span>Be returned in its original packaging.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-text-primary font-bold">•</span>
                <span>Include the receipt or proof of purchase.</span>
              </li>
            </ul>
          </div>
        )}

        {/* Features */}
        <button
          onClick={() => toggleSection('features')}
          className="w-full flex items-center justify-between py-3 border-b border-black"
        >
          <span className="font-inter text-xs font-normal text-black tracking-wide">
            PRODUCT FEATURES
          </span>
          <svg className={`w-5 h-5 transition-transform ${expandedSections.features ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>

        {/* Features Content */}
        {expandedSections.features && description && (
          <div className="py-3 px-0 border-b border-black text-sm text-gray-700 font-inter leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        )}
      </div>
      </div>

     
    </div>
  )
}

export default ProductInfo
