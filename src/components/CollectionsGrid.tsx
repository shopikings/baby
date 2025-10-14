function CollectionsGrid() {
  const collections = [
    { name: 'BAGS', image: '/assets/icons/BAGS.svg', label: 'Bags' },
    {
      name: 'BELLABU BEAR',
      image: '/assets/icons/Bellabu-Bear.svg',
      label: 'Bellabu Bear'
    },
    {
      name: 'BESTSELLERS',
      image: '/assets/icons/Bestsellers.svg',
      label: 'Bestsellers'
    },
    { name: 'BOTTOMS', image: '/assets/icons/Bottoms.svg', label: 'Bottoms' },
    { name: 'BOYS', image: '/assets/icons/Boys.svg', label: 'Boys' },
    {
      name: 'CATALOGUE',
      image: '/assets/icons/Catalogue.svg',
      label: 'Catalogue'
    },
    {
      name: 'CINDER + SALT',
      image: '/assets/icons/Cinder-Salt.svg',
      label: 'Cinder + Salt'
    },
    {
      name: 'COLORED ORGANICS',
      image: '/assets/icons/Colored-Organics.svg',
      label: 'Colored Organics'
    },
    {
      name: 'DRESSES & SKIRTS',
      image: '/assets/icons/Dresses-Skirts.svg',
      label: 'Dresses & Skirts'
    }
  ]

  return (
    <section className="bg-cream py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="font-rubik text-3xl font-medium text-text-primary sm:text-4xl lg:text-5xl">
            COLLECTIONS
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="size-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-raleway text-base font-medium text-text-primary">
                  {collection.label}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CollectionsGrid
