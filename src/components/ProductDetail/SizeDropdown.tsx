import { useState, useRef, useEffect } from 'react'

interface SizeDropdownProps {
  sizes: string[]
  selectedSize: string
  onSizeChange: (size: string) => void
}

export default function SizeDropdown({
  sizes,
  selectedSize,
  onSizeChange
}: SizeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative w-48" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border border-gray-600 bg-[#EFECDA] rounded px-4 py-2 font-raleway text-sm font-normal text-text-primary focus:outline-none focus:border-gray-800 flex items-center justify-between gap-2"
      >
        <span>{selectedSize || 'Select size'}</span>
        <svg
          className={`w-4 h-4 text-text-primary transition-transform ${
            isOpen ? 'rotate-180' : ''
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

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-[#EFECDA] border border-gray-600 rounded shadow-lg z-50 w-48">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => {
                onSizeChange(size)
                setIsOpen(false)
              }}
              className={`w-full px-4 py-2 text-left font-raleway text-sm font-normal transition-colors ${
                selectedSize === size
                  ? 'bg-[#E9908E] text-white'
                  : 'text-text-primary hover:bg-gray-200'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
