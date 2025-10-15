import { useState } from 'react'
import FilterSection from 'components/FilterSection'
import ShopProductCard from 'components/ShopProductCard'

function Shop() {
  const [filters, setFilters] = useState<any>({})

  const products = [
    {
      id: 1,
      mainImage: '/assets/images/product1.png',
      variantImages: [
        '/assets/images/product1.png',
        '/assets/images/product5.png',
        '/assets/images/product6.png'
      ],
      title: 'Kids Organic Cotton Long Sleeve Mix Floral Sweatshirt',
      price: '$43 - $63',
      rating: 4
    },
    {
      id: 2,
      mainImage: '/assets/images/product2.png',
      variantImages: [
        '/assets/images/product2.png',
        '/assets/images/product5.png',
        '/assets/images/product6.png'
      ],
      title: 'Kids Waterproof Hooded Fleece Zip Through Jacket',
      price: '$40+',
      rating: 5
    },
    {
      id: 3,
      mainImage: '/assets/images/product3.png',
      variantImages: [
        '/assets/images/product3.png',
        '/assets/images/product7.png',
        '/assets/images/product8.png',
        '/assets/images/product9.png'
      ],
      title: 'Kids Stand Collar Zip Flocked Fleece Jacket',
      price: '$47',
      rating: 3
    },
    {
      id: 4,
      mainImage: '/assets/images/product4.png',
      variantImages: [
        '/assets/images/product4.png',
        '/assets/images/product10.png',
        '/assets/images/product2.png'
      ],
      title: 'Kids Textured Multicolor Socks (Multiple Pack)',
      price: '$43',
      rating: 4
    },
    {
      id: 5,
      mainImage: '/assets/images/product5.png',
      variantImages: [
        '/assets/images/product5.png',
        '/assets/images/product3.png'
      ],
      title: 'Kids Organic Cotton Zip Panel Sweatshirt',
      price: '$45 - $65',
      rating: 5
    },
    {
      id: 6,
      mainImage: '/assets/images/product6.png',
      variantImages: [
        '/assets/images/product6.png',
        '/assets/images/product4.png',
        '/assets/images/product1.png'
      ],
      title: 'Kids Essential Anti-Fungal Socks (Multiple Pack)',
      price: '$25+',
      rating: 4
    },
    {
      id: 7,
      mainImage: '/assets/images/product7.png',
      variantImages: [
        '/assets/images/product7.png',
        '/assets/images/product9.png'
      ],
      title: 'Kids Slim Joggers (Multiple Pack)',
      price: '$93 - $93',
      rating: 3
    },
    {
      id: 8,
      mainImage: '/assets/images/product8.png',
      variantImages: [
        '/assets/images/product8.png',
        '/assets/images/product2.png',
        '/assets/images/product5.png'
      ],
      title: 'Kids Colour Block Iconic Raglan T-Shirt',
      price: '$43 - $43',
      rating: 5
    },
    {
      id: 9,
      mainImage: '/assets/images/product9.png',
      variantImages: [
        '/assets/images/product9.png',
        '/assets/images/product10.png'
      ],
      title: 'Kids Quilted Bomber Windproof Jacket',
      price: '$63',
      rating: 4
    },
    {
      id: 10,
      mainImage: '/assets/images/product10.png',
      variantImages: [
        '/assets/images/product10.png',
        '/assets/images/product1.png',
        '/assets/images/product6.png'
      ],
      title: 'Kids Organic Cotton Joggers (Multiple Pack)',
      price: '$93 - $93',
      rating: 5
    },
    {
      id: 11,
      mainImage: '/assets/images/product3.png',
      variantImages: [
        '/assets/images/product3.png',
        '/assets/images/product7.png'
      ],
      title: 'Kids Organic Cotton All Over Printed T-Shirt',
      price: '$25 - $25',
      rating: 3
    },
    {
      id: 12,
      mainImage: '/assets/images/product4.png',
      variantImages: [
        '/assets/images/product4.png',
        '/assets/images/product8.png',
        '/assets/images/product9.png'
      ],
      title: 'Kids Teal Tie Dye Flared Rib Tights',
      price: '$43 - $43',
      rating: 4
    }
  ]

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-center font-rubik text-xl font-bold text-text-primary">
            KIDS AUTUMN TOP PICKS <span className="text-xl">(243)</span>
          </h1>
        </div>

        <FilterSection onFilterChange={handleFilterChange} />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ShopProductCard
              key={product.id}
              mainImage={product.mainImage}
              variantImages={product.variantImages}
              title={product.title}
              price={product.price}
              rating={product.rating}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="rounded-lg border-2 border-button-hover bg-white px-8 py-3 font-raleway text-base font-semibold text-button-hover transition-colors hover:bg-button-hover hover:text-white">
            LOAD MORE
          </button>
        </div>
      </div>
    </div>
  )
}

export default Shop
