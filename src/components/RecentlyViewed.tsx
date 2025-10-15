import { Link } from 'react-router-dom'
import ShopProductCard from './ShopProductCard'

interface Product {
  id: number
  title: string
  price: string
  mainImage: string
  variantImages: string[]
  rating: number
}

interface RecentlyViewedProps {
  products: Product[]
}

function RecentlyViewed({ products }: RecentlyViewedProps) {
  if (products.length === 0) {
    return null
  }

  return (
    <div className="mt-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-rubik text-2xl font-medium text-text-primary">
          Recently viewed
        </h2>
        <Link
          to="/shop"
          className="font-inter text-sm font-medium text-text-primary hover:underline"
        >
          View History
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ShopProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}

export default RecentlyViewed
