import { useState, useRef, useEffect } from 'react'

interface Color {
  name: string
  hex: string
}

interface ColorDropdownProps {
  colors: Color[]
  selectedColor: string
  onColorChange: (color: string) => void
}

function ColorDropdown({ colors, selectedColor, onColorChange }: ColorDropdownProps) {
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

  return (
    <div className="relative w-48" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border border-gray-600 bg-[#EFECDA] rounded px-4 py-2 font-raleway text-sm font-normal text-text-primary focus:outline-none focus:border-gray-800 flex items-center justify-between gap-2"
      >
        <span className="truncate">{selectedColor || 'Select a color'}</span>
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
        <div className="absolute top-full left-0 mt-1 bg-[#EFECDA] border border-gray-600 rounded shadow-lg z-50 w-48">
          <div className="max-h-64 overflow-y-auto">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => {
                  onColorChange(color.name)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-2 text-left font-raleway text-sm font-normal transition-colors ${
                  selectedColor === color.name
                    ? 'bg-[#E9908E] text-white'
                    : 'text-text-primary hover:bg-gray-200'
                }`}
              >
                {color.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ColorDropdown
