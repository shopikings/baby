import { useNavigate } from 'react-router-dom'

function FeaturedBrands() {
  const navigate = useNavigate()
  const brands = [
    {
      name: 'JELLY CAT',
      image: '/assets/images/featured-brands-one.jpg'
    },
    {
      name: 'ENEWTON',
      image: '/assets/images/featured-brands-two.jpg'
    },
    {
      name: 'NUNA',
      image: '/assets/images/featured-brands-three.jpg'
    },
    {
      name: 'UPPABABY',
      image: '/assets/images/featured-brands-four.jpg'
    }
  ]

  return (
    <section className="bg-cream py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center font-rubik text-2xl font-bold text-text-primary sm:mb-12 sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl">
          FEATURED BRANDS
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="group relative cursor-pointer overflow-hidden rounded-lg bg-gray-200"
              onClick={() =>
                navigate(
                  `/shop?category=${brand.name
                    .toLowerCase()
                    .replace(/\s+/g, '-')}`
                )
              }
            >
              <div className="aspect-square w-full">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="size-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>

              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <h3 className="font-raleway text-base font-normal tracking-wider text-white md:text-lg">
                  {brand.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedBrands
