import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CategoryGrid() {
  const [hoveredIndex, setHoveredIndex] = useState(2)
  const [expandedMobileIndex, setExpandedMobileIndex] = useState(-1)
  const navigate = useNavigate()

  const categories = [
    {
      name: 'CLOTHING',
      image: '/assets/images/clothing.jpg',
      description:
        'Stylish CLOTHING, comfort first. Perfect for every adventure.',
      button: 'SHOP NOW'
    },
    {
      name: 'BATH TIME',
      image: '/assets/images/bathTime4.jpg',
      description: 'Fun BATH TIME, splash and play. Make every wash magical.',
      button: 'SHOP NOW'
    },
    {
      name: 'GIFTS',
      image: '/assets/images/gifts.jpg',
      description: 'Cool GIFTS, zero effort. Just throw on and go.',
      button: 'SHOP NOW'
    },
    {
      name: 'MATERNITY',
      image: '/assets/images/maternity.jpg',
      description:
        'Beautiful MATERNITY, comfort meets style. For every moment.',
      button: 'SHOP NOW'
    },
    {
      name: 'TOYS',
      image: '/assets/images/toys.jpg',
      description: 'Amazing TOYS, endless fun. Spark imagination and joy.',
      button: 'SHOP NOW'
    }
  ]

  return (
    <section className="bg-cream py-8 sm:py-12 lg:py-16 xl:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:gap-3 md:h-96 md:flex-row md:gap-2 lg:h-[500px] lg:gap-3 xl:h-[600px] xl:gap-4">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className={`relative overflow-hidden rounded-lg transition-all duration-500 ease-in-out ${
                expandedMobileIndex === index ? 'h-64 sm:h-80' : 'h-16 sm:h-20'
              } md:h-auto ${
                hoveredIndex === index ? 'md:flex-[3]' : 'md:flex-1'
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() =>
                setExpandedMobileIndex(
                  expandedMobileIndex === index ? -1 : index
                )
              }
              style={{
                backgroundImage: `url(${category.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black/30"></div>

              <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-6">
                <div className="text-white">
                  <h3 className="mb-2 font-rubik text-lg font-bold tracking-wider text-cream sm:text-xl md:hidden">
                    {category.name}
                  </h3>

                  <div
                    className={`transition-opacity duration-500 ${
                      expandedMobileIndex === index
                        ? 'opacity-100'
                        : 'opacity-0'
                    } ${
                      hoveredIndex === index ? 'md:opacity-100' : 'md:opacity-0'
                    }`}
                  >
                    <h3 className="mb-2 hidden font-rubik text-lg font-bold tracking-wider text-cream sm:text-xl md:block md:text-2xl lg:text-3xl xl:text-4xl">
                      {category.name}
                    </h3>
                    <div className="mb-4 h-px w-full bg-white"></div>

                    <div className="mb-4">
                      <div className="mb-3 flex">
                        {[...Array(5)].map((_, i) => (
                          <img
                            key={i}
                            src="/assets/icons/rating-star.svg"
                            alt="star"
                            className="size-3 sm:size-4 md:size-5"
                          />
                        ))}
                      </div>
                      <p className="mb-4 text-sm sm:text-base md:mb-6">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative text-white">
                  <div
                    className={`transition-opacity duration-500 ${
                      expandedMobileIndex === index
                        ? 'opacity-100'
                        : 'opacity-0'
                    } ${
                      hoveredIndex === index ? 'md:opacity-100' : 'md:opacity-0'
                    }`}
                  >
                    <button
                      className=" cursor-pointer rounded-full bg-button-hover px-3 py-1.5 text-xs font-medium text-white  sm:px-4 sm:py-2 sm:text-sm md:px-6 md:py-3 md:text-base"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(
                          `/shop?category=${category.name
                            .toLowerCase()
                            .replace(/\s+/g, '-')}`
                        )
                      }}
                    >
                      SHOP ALL
                    </button>
                  </div>

                  <div
                    className={`flex items-end justify-center transition-all duration-500 ${
                      expandedMobileIndex === index
                        ? 'translate-y-full opacity-0'
                        : 'translate-y-0 opacity-100'
                    } md:absolute md:inset-x-0 md:bottom-4 md:flex md:items-end md:justify-center ${
                      hoveredIndex === index
                        ? 'md:translate-y-[130%] md:opacity-0'
                        : 'md:translate-y-0 md:opacity-100'
                    }`}
                  >
                    <h3 className="font-raleway text-base font-bold tracking-wider text-cream sm:text-lg md:text-lg md:[text-orientation:mixed] md:[writing-mode:vertical-rl]">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryGrid
