import { useState } from 'react'

function Banner() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative">
      <div className="relative h-[600px] overflow-hidden bg-cream">
        <img
          src="/assets/images/home-banner.jpg"
          alt="Kids fashion banner"
          className="absolute inset-0 size-full"
          style={{
            imageRendering: '-webkit-optimize-contrast',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
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

            <button
              className={`rounded-md border-2 px-5 py-2 font-inter text-xs font-medium transition-all duration-300 ${
                isHovered
                  ? 'border-button-hover bg-button-hover text-white'
                  : 'border-white bg-transparent text-white hover:border-button-hover hover:bg-button-hover'
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              SHOP ALL
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-banner-lower py-2">
        <p className="font-inter text-xs font-medium text-text-primary">
          NEW ARRIVALS IN - <span className="underline">Shop Now</span>
        </p>
      </div>
    </div>
  )
}

export default Banner
