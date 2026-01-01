import { Link, useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

  if (products.length === 0) {
    return null
  }

  return (
    <div className="mt-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-rubik text-sm font-bold text-text-primary">
          Recently viewed
        </h2>
        <Link
          to="/shop"
          className="font-raleway text-xs font-bold text-[#2E2E2E] underline hover:underline"
        >
          Clear History
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => {
              const cleanId = product.id
                .toString()
                .includes('gid://shopify/Product/')
                ? product.id.toString().split('/').pop()
                : product.id.toString()

              navigate(`/product/${cleanId}`)
            }}
            className="w-[200px] cursor-pointer"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={product.mainImage}
                alt={product.title}
                className="size-full object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <p className="mb-4 font-raleway text-sm font-medium text-text-primary">
                {product.price} - $32
              </p>
              <button className="mt-1 w-full cursor-pointer bg-white p-2 font-raleway text-xs font-bold text-gray-600">
                Today
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentlyViewed
