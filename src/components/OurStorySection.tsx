import { useState } from 'react'

function OurStorySection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section 
      className="bg-cream py-12 sm:py-16 lg:py-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
     <div className="bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[11em] items-center">
            {/* LEFT SIDE - OVERLAPPING IMAGES */}
            <div 
              className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full flex items-center justify-center"
            >
              {/* Background Image - Larger, positioned left */}
              <div className={`absolute top-[60%] transform -translate-y-1/2 w-[200px] h-[280px] sm:w-[280px] sm:h-[380px] md:w-[320px] md:h-[420px] lg:w-[380px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl z-50 transition-all duration-500 ease-out ${
                isHovered ? 'left-[-30px] sm:left-[-40px] md:left-[-50px] lg:left-[-60px]' : 'left-0'
              }`}>
                <img
                  src="/assets/images/story2.png"
                  alt="Story image 1"
                  className="w-full h-full bg-gray-300"
                  onError={(e) => {
                    e.currentTarget.style.backgroundColor = '#D1D5DB'
                  }}
                />
              </div>

              {/* Foreground Image - Smaller, positioned right and top */}
              <div className={`absolute -top-[30px] sm:-top-[40px] md:-top-[50px] w-[200px] h-[280px] sm:w-[280px] sm:h-[380px] md:w-[320px] md:h-[420px] lg:w-[380px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl z-20 transition-all duration-500 ease-out ${
                isHovered ? 'right-[-30px] sm:right-[-40px] md:right-[-50px] lg:right-[-60px]' : 'right-0'
              }`}>
                <img
                  src="/assets/images/story1.png"
                  alt="Story image 2"
                  className="w-full h-full bg-gray-300"
                  onError={(e) => {
                    e.currentTarget.style.backgroundColor = '#D1D5DB'
                  }}
                />
              </div>
            </div>

            {/* RIGHT SIDE - TEXT CONTENT */}
            <div className="space-y-2 md:space-y-3">
              <h2 className="font-rubik text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase text-text-primary">
                OUR STORY
              </h2>
              
              <p className="font-raleway text-lg md:text-md text-gray-700 leading-relaxed">
                Maison Baby & Kids - Curated Comfort for Tiny Humans
              </p>

              <p className="font-light text-md md:text-md text-gray-600 leading-relaxed">
                We believe in providing the best for your little ones. At Maison Baby & Kids, we are dedicated to offering a curated selection of high-quality, safe, and beautifully designed baby and toddler products. From essential gear to unique toys and stylish clothing, our mission is to make your parenting journey a little easier and a lot more joyful.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurStorySection
