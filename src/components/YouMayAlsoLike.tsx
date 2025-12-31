import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { fetchProducts } from '../utils/shopify'

interface Product {
  id: string
  title: string
  price: string
  image: string
}

function YouMayAlsoLike() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [animatedIndices, setAnimatedIndices] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const loadProducts = async () => {
      const { products } = await fetchProducts({
        tag: 'best-selling',
        limit: 4
      })

      const formatted = products.map((p) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        image: p.images[0] || '/no-image.png'
      }))

      setProducts(formatted)
      setLoading(false)
    }

    loadProducts()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && animatedIndices.length === 0) {
          // Trigger animations one by one
          products.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedIndices(prev => [...prev, index])
            }, index * 150)
          })
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [products, animatedIndices])

  const openProduct = (shopifyId: string) => {
    const cleanId = shopifyId.includes('gid://shopify/Product/')
      ? shopifyId.split('/').pop()
      : shopifyId

    navigate(`/product/${cleanId}`)
  }

  if (loading)
    return <p className="text-center py-10 text-gray-500">Loading...</p>

  return (
    <div ref={sectionRef} className="bg-cream py-12 md:py-16">
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-left {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        
        .animate-slide-right {
          animation: slideInRight 0.6s ease-out forwards;
        }
      `}</style>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="font-rubik text-2xl md:text-xl font-extralight text-gray-500">
            You May Also Like
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => {
            const isAnimated = animatedIndices.includes(index)
            const isEven = index % 2 === 0
            const animationClass = isAnimated 
              ? (isEven ? 'animate-slide-left' : 'animate-slide-right')
              : 'opacity-0'
            
            return (
              <div
                key={product.id}
                onClick={() => openProduct(product.id)}
                className={`cursor-pointer group ${animationClass}`}
              >
                {/* Image Container */}
                <div className="relative bg-white rounded-lg overflow-hidden mb-4 aspect-square">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Wishlist Icon */}
                  <button className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow opacity-0 group-hover:opacity-100">
                    <svg
                      className="w-5 h-5 text-text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Product Info */}
                <div>
                  <h3 className="font-inter text-sm md:text-base font-normal text-text-primary line-clamp-2 mb-2">
                    {product.title}
                  </h3>
                  <p className="font-inter text-base md:text-lg font-normal text-text-primary">
                    £{product.price}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default YouMayAlsoLike
