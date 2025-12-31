import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AnimatedLoader from './AnimatedLoader'

function Banner() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [showLoader, setShowLoader] = useState(true)
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    if (animationComplete && isVideoLoaded) {
      const timer = setTimeout(() => {
        setShowLoader(false)
      }, 900)
      return () => clearTimeout(timer)
    }
  }, [animationComplete, isVideoLoaded])

  const handleVideoLoad = () => {
    setIsVideoLoaded(true)
    if (animationComplete) {
      setTimeout(() => {
        setShowLoader(false)
      }, 900)
    }
  }

  const handleAnimationComplete = () => {
    setAnimationComplete(true)
  }

  return (
    <div className="relative">
      <AnimatedLoader
        onAnimationComplete={handleAnimationComplete}
        isVideoLoaded={isVideoLoaded}
        show={showLoader}
      />

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
        <div className="relative z-10 flex h-full items-end pb-24 justify-center">
          <div className="text-center text-cream">
            <h1 className="mb-4 font-rubik text-5xl font-semibold md:text-6xl drop-shadow-lg">
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
