import { useState } from 'react'

interface ShopItem {
  id: string
  name: string
  price: string
  image: string
  category: string
  rating?: number
}

const shopItems: ShopItem[] = [
  {
    id: '1',
    name: 'Cozy Sherpa Fleece',
    price: '$45.00',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=300&fit=crop',
    category: 'TOPS & TEES',
    rating: 4.5
  },
  {
    id: '2',
    name: 'Organic Cotton Onesie',
    price: '$32.00',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop',
    category: 'TOPS & TEES',
    rating: 5
  },
  {
    id: '3',
    name: 'Knitted Baby Blanket',
    price: '$68.00',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
    category: 'OUTERWEAR',
    rating: 4
  },
  {
    id: '4',
    name: 'Canvas Backpack',
    price: '$55.00',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
    category: 'BAGS',
    rating: 4.5
  },
  {
    id: '5',
    name: 'Denim Jacket',
    price: '$72.00',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=300&h=300&fit=crop',
    category: 'OUTERWEAR',
    rating: 5
  },
  {
    id: '6',
    name: 'Graphic T-Shirt',
    price: '$28.00',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
    category: 'TOPS & TEES',
    rating: 4
  }
]

function ShopItemsDisplay() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(shopItems.map(item => item.category)))
  const filteredItems = selectedCategory 
    ? shopItems.filter(item => item.category === selectedCategory)
    : shopItems

  return (
    <div className="bg-white py-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h2 className="font-rubik text-2xl font-semibold text-text-primary mb-4">
            Shop Our Collection
          </h2>
          
          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-[#E89FAC] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Items
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[#E89FAC] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {filteredItems.map((item) => (
            <a
              key={item.id}
              href={`/product/${item.id}`}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-gray-500 font-raleway">{item.category}</p>
                <h3 className="font-raleway text-sm font-medium text-text-primary group-hover:text-[#E89FAC] transition-colors line-clamp-2">
                  {item.name}
                </h3>
                
                {/* Rating */}
                {item.rating && (
                  <div className="flex items-center gap-1">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(item.rating!) ? 'fill-yellow-400' : 'fill-gray-300'
                          }`}
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">{item.rating}</span>
                  </div>
                )}
                
                <p className="font-rubik text-sm font-semibold text-text-primary">
                  {item.price}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShopItemsDisplay
