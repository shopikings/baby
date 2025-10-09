import { useState } from 'react'

function CategoryGrid() {
  const [hoveredIndex, setHoveredIndex] = useState(2)

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
        <div className="flex h-64 gap-1 sm:h-80 sm:gap-2 md:h-96 lg:h-[500px] lg:gap-3 xl:h-[600px] xl:gap-4">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className={`relative overflow-hidden rounded-lg transition-all duration-500 ease-in-out ${
                hoveredIndex === index ? 'flex-[3]' : 'flex-1'
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              style={{
                backgroundImage: `url(${category.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black/30"></div>

              <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-6">
                <div
                  className={`text-white transition-opacity duration-500 ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <h3 className="mb-2 font-rubik text-lg font-bold tracking-wider text-cream sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
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
                          className="size-4 sm:size-5"
                        />
                      ))}
                    </div>
                    <p className="mb-6 text-base sm:text-base">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="relative text-white">
                  <div
                    className={`transition-opacity duration-500 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <button className="rounded-full bg-button-hover px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-button-hover/80 sm:px-8 sm:text-base">
                      {category.button}
                    </button>
                  </div>

                  <div
                    className={`absolute bottom-0 transition-opacity duration-500 ${
                      hoveredIndex === index ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    <h3
                      className="font-raleway text-lg font-bold tracking-wider sm:text-xl"
                      style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed'
                      }}
                    >
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
