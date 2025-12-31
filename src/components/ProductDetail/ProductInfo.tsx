import { useState } from 'react'
import { useCart } from '../../contexts/CartContext'
import toast from 'react-hot-toast'
import box from "../../assets/box(black).svg"
import truck from "../../assets/truck.svg"
import email from "../../assets/email.svg"

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
          <img src={truck}/>
          <span>Ships in 1-2 Days</span>
        </div>
        <div className="flex items-start gap-1">
         <img src={email}/>
          <span>Delivery From $7 or Free Over $70</span>
        </div>
        <div className="flex items-start gap-1">
          <img src={box}/>
          <span>90 Days Easy Returns</span>
        </div>
         {/* Expandable Sections */}
      <div className="space-y-0">
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
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-text-primary font-bold">•</span>
                <span>Returns are accepted within go days of delivery for items that are new, unused, and in original packaging; used or opened baby gear items are not eligible for return due to safety reasons.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-text-primary font-bold">•</span>
                <span>Maison Baby covers return shipping for defective, incorrect, or error-related orders; customers are responsible for return shipping in all other cases, with refunds issued within 48 hours of return delivery.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-text-primary font-bold">•</span>
                <span>All sale, holiday/seasonal items, and Uppababy Vista V2 and Mesa Max products are final sale and cannot be returned or exchanged.</span>
              </li>
            </ul>
          </div>
        )}

              {/* Shipping */}
        <button
          onClick={() => toggleSection('shipping')}
          className="w-full flex items-center justify-between py-3 border-b border-black"
        >
          <span className="font-inter text-xs font-normal text-black tracking-wide">
            FAST SHIPPING 
          </span>
          <svg className={`w-5 h-5 transition-transform ${expandedSections.shipping ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>

        {expandedSections.shipping && (
          <div className="py-3 px-0 border-b border-black text-sm text-gray-700 font-inter leading-relaxed space-y-2">
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-text-primary font-bold">•</span>
                <span>Orders are typically processed within 1-3 business days (Monday to Friday, excluding U.S. federal holidays).</span>
              </li>
              <li className="flex gap-2">
                <span className="text-text-primary font-bold">•</span>
                <span>If we experience a high volume of orders (e.g., during seasonal sales), processing may take a little longer, we'll notify you via email if we expect a delay.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-text-primary font-bold">•</span>
                <span>Once your order is processed and shipped, you will receive a shipping confirmation email with a tracking number.</span>
              </li>
            </ul>
          </div>
        )}

      </div>
      </div>

     
    </div>
  )
}

export default ProductInfo
