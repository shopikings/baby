import { useState } from 'react'

function CategoryGrid() {
  const [hoveredIndex, setHoveredIndex] = useState(2)

  const categories = [
    {
      name: 'CLOTHING',
      image: '/assets/images/clothing.jpg',
      description: ''
    },
    {
      name: 'BATH TIME',
      image: '/assets/images/bathTime4.jpg',
      description: ''
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
      description: ''
    },
    {
      name: 'TOYS',
      image: '/assets/images/toys.jpg',
      description: ''
    }
  ]

  return (
    <section className="bg-cream py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-96 gap-2">
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

              <div className="relative z-10 flex h-full flex-col justify-between p-6">
                <div></div>

                <div className="text-center text-white">
                  {hoveredIndex === index && category.description && (
                    <div className="mb-4 transition-opacity duration-300">
                      <div className="mb-2 flex justify-center">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400">
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="mb-4 text-sm">{category.description}</p>
                      {category.button && (
                        <button className="rounded-full bg-button-hover px-6 py-2 text-xs font-medium text-white transition-colors hover:bg-button-hover/80">
                          {category.button}
                        </button>
                      )}
                    </div>
                  )}

                  <h3
                    className={`font-raleway font-bold tracking-wider transition-all duration-300 ${
                      hoveredIndex === index ? 'text-2xl' : 'text-lg'
                    }`}
                    style={{
                      writingMode:
                        hoveredIndex === index
                          ? 'horizontal-tb'
                          : 'vertical-rl',
                      textOrientation:
                        hoveredIndex === index ? 'mixed' : 'mixed'
                    }}
                  >
                    {category.name}
                  </h3>
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
