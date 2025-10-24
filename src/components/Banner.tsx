import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Banner() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [showLoader, setShowLoader] = useState(true)
  const [animationComplete, setAnimationComplete] = useState(false)

  const websiteName = 'MAISON BABY & KIDS'
  const letters = websiteName.split('')

  useEffect(() => {
    // Animation timing: each letter appears with 100ms delay
    const animationDuration = letters.length * 100 + 500 // extra 500ms for completion

    const animationTimer = setTimeout(() => {
      setAnimationComplete(true)
    }, animationDuration)

    return () => clearTimeout(animationTimer)
  }, [letters.length])

  useEffect(() => {
    if (animationComplete && isVideoLoaded) {
      // Hide loader after animation completes and video is loaded
      const timer = setTimeout(() => {
        setShowLoader(false)
      }, 300) // Small delay for smooth transition

      return () => clearTimeout(timer)
    } else if (animationComplete && !isVideoLoaded) {
      // If animation completes but video not loaded, wait for video
      // Loader will hide when video loads
    }
  }, [animationComplete, isVideoLoaded])

  const handleVideoLoad = () => {
    setIsVideoLoaded(true)
    if (animationComplete) {
      setTimeout(() => {
        setShowLoader(false)
      }, 300)
    }
  }

  return (
    <div className="relative">
      {/* Animated Text Loader */}
      {showLoader && (
        <div
          className={`absolute inset-0 z-50 flex items-center justify-center bg-cream transition-all duration-700 ${
            animationComplete && isVideoLoaded
              ? '-translate-y-full opacity-0'
              : 'translate-y-0 opacity-100'
          }`}
        >
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-1 font-rubik text-4xl font-bold text-text-primary md:text-5xl lg:text-6xl">
              {letters.map((letter, index) => (
                <span
                  key={index}
                  className={`inline-block animate-slideInUp opacity-0 ${
                    letter === ' ' ? 'w-4' : ''
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="relative h-[700px] overflow-hidden bg-cream">
        <video
          src="/assets/images/banner-video-comp.mp4"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={handleVideoLoad}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10  flex h-full items-end justify-center pb-[5%]">
          <div className="text-center text-cream">
            <h1 className="mb-4 font-rubik text-5xl font-semibold md:text-6xl">
              Always By Your
            </h1>
            <h1 className="mb-8 font-rubik text-5xl font-semibold md:text-6xl">
              Side
            </h1>

            <Link
              to="/shop"
              className={`inline-block rounded-md border-2 px-5 py-2 font-inter text-xs font-medium transition-all duration-300 ${
                isHovered
                  ? 'border-button-hover bg-button-hover text-white'
                  : 'border-white bg-transparent text-white hover:border-button-hover hover:bg-button-hover'
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              SHOP ALL
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-banner-lower py-2">
        <p className="font-inter text-xs font-medium text-text-primary">
          NEW ARRIVALS IN -{' '}
          <Link
            to="/shop"
            className="cursor-pointer underline hover:text-button-hover"
          >
            Shop Now
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Banner
