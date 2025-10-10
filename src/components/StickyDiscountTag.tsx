import { useState } from 'react'

function StickyDiscountTag() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed right-0 top-[40%] z-50 -translate-y-1/2">
      <div className="relative">
        <div className="flex h-48 w-16 flex-col items-center justify-center bg-button-hover text-cream shadow-lg">
          <div className="rotate-90 whitespace-nowrap font-rubik text-lg font-bold tracking-wider">
            GET 10% OFF
          </div>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="absolute -left-5 bottom-[-10%] flex size-6 items-center justify-center rounded-full bg-white p-0 shadow-lg transition-all hover:bg-gray-100"
        >
          <svg
            className="size-3 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ margin: 0 }}
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
    </div>
  )
}

export default StickyDiscountTag
