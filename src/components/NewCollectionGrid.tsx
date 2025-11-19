import { useNavigate } from 'react-router-dom'

function NewCollectionGrid() {
  const navigate = useNavigate()

  const collections = [
    {
      name: 'JELLYCAT',
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
    },
    {
      name: 'KYTE BABY',
      image: '/assets/images/Kyte-baby.png'
    },
    {
      name: 'MAGNETIC ME',
      image: '/assets/images/magnatic.png'
    },
    {
      name: 'QUNICY MAE',
      image: '/assets/images/qunicy.png'
    },
    {
      name: 'RYLE + CRU',
      image: '/assets/images/ryle-+-cru.png'
    },
    {
      name: 'BAREFOOT DREAMS',
      image: '/assets/images/dreams.png'
    }
  ]

  return (
    <section className="bg-cream py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center font-rubik text-2xl font-bold text-text-primary sm:mb-12 sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl">
          COLLECTIONS
        </h2>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-5">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="group relative cursor-pointer overflow-hidden rounded-lg bg-gray-200"
              onClick={() =>
                navigate(
                  `/shop?category=${collection.name
                    .toLowerCase()
                    .replace(/\s+/g, '-')}`
                )
              }
            >
              <div className="aspect-square w-full">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="size-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/blogOne.png'
                  }}
                />
              </div>

              <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-all duration-300 ease-in-out hover:bg-black/20">
                <h3 className="font-raleway text-xs font-medium tracking-wider text-white sm:text-sm md:text-base">
                  {collection.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewCollectionGrid
