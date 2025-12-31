import { useState, useEffect } from 'react'

function StickyDiscountBanner() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      // Banner stays visible while scrolling
      setIsVisible(true)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed left-0 top-1/2 transform -translate-x-1/2 z-40 hidden lg:block">
      <div className="bg-[#E9908E] text-white font-rubik font-bold text-lg md:text-xl writing-mode-vertical px-2 py-20 shadow-lg hover:shadow-xl transition-shadow duration-300 w-[70px] flex items-center justify-center">
        <div className="transform rotate-90 whitespace-nowrap">
          GET 10% OFF
        </div>
      </div>
    </div>
  )
}

export default StickyDiscountBanner
