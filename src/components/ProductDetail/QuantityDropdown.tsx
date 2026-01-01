import { useState, useRef, useEffect } from 'react'

interface QuantityDropdownProps {
  quantity: number
  maxQuantity?: number
  onQuantityChange: (quantity: number) => void
}

function QuantityDropdown({ quantity, maxQuantity = 10, onQuantityChange }: QuantityDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const quantityOptions = Array.from({ length: maxQuantity }, (_, i) => i + 1)

  return (
    <div className="relative w-[30%]" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-1/2 border border-gray-600 bg-[#EFECDA] rounded px-4 py-2 font-raleway text-sm font-normal text-text-primary focus:outline-none focus:border-gray-800 flex items-center justify-between"
      >
        <span>{quantity}</span>
        <svg 
          className={`w-4 h-4 text-text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#EFECDA] border border-gray-600 rounded shadow-lg z-50">
          <div className="max-h-64 overflow-y-auto">
            {quantityOptions.map((qty) => (
              <button
                key={qty}
                onClick={() => {
                  onQuantityChange(qty)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-2 text-left font-raleway text-sm font-normal transition-colors ${
                  quantity === qty
                    ? 'bg-[#E9908E] text-white'
                    : 'text-text-primary hover:bg-gray-200'
                }`}
              > {qty}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default QuantityDropdown
