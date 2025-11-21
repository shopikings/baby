import { useState } from 'react'
import ShopTheLookCard from './ShopTheLookCard'

interface Product {
  id: number
  name: string
  price: string
  image: string
  buttonText: string
}

function ShopTheLook() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 })

  const products = [
    {
      id: 1,
      name: 'Boys Outdoor Multi-Stripe Long Sleeve Hoodie',
      price: '$40.00',
      image: '/assets/images/blogOne.png',
      buttonText: 'Boys Outdoor Multi-Stripe Long Sleeve Hoodie'
    },
    {
      id: 2,
      name: 'Boys JAY Cotton Twill Trousers in Charcoal Grey',
      price: '$35.00',
      image: '/assets/images/blogOne.png',
      buttonText: 'Boys JAY Cotton Twill Trousers in Charcoal Grey'
    },
    {
      id: 3,
      name: 'Kids No-Logo Trucker Hat in Olive & Black',
      price: '$25.00',
      image: '/assets/images/blogOne.png',
      buttonText: 'Kids No-Logo Trucker Hat in Olive & Black'
    }
  ]

  const handleProductClick = (product: Product, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const newPosition = {
      top: rect.top - 30,
      left: rect.right - 100
    }
    console.log('Button clicked:', product.name, 'Position:', newPosition)
    setCardPosition(newPosition)
    setSelectedProduct(product)
  }

  const closeModal = () => {
    setSelectedProduct(null)
  }
  return (
    <section className="bg-cream py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12">
          <h3 className="mb-4 font-rubik text-3xl font-bold capitalize text-text-primary sm:text-4xl md:text-5xl lg:text-6xl">
            Shop the Look
          </h3>
          <p className="font-inter text-lg text-text-primary/70 sm:text-xl">
            Style made simple—curated looks for little originals.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden bg-white">
        <img
          src="/assets/images/shop-the-look.jpg"
          alt="Shop the Look - Children wearing coordinated winter outfits"
          className="h-[500px] w-full object-cover sm:h-[600px] lg:h-[700px] xl:h-[800px]"
        />

        <div className="absolute inset-0">
          <div className="absolute left-[23%] top-[45%] hidden sm:block">
            <div className="relative">
              <img
                src="/assets/icons/tilted-line-pointer.svg"
                alt=""
                className="absolute right-[-8%] top-[-140%] size-12"
              />
              <img
                src="/assets/icons/pointer.svg"
                alt=""
                className="absolute right-[-12%] top-[-220%] size-8"
              />
              <button
                className="cursor-pointer rounded-lg bg-cream px-3 py-2 shadow-lg transition-all hover:shadow-xl"
                onClick={(e) => handleProductClick(products[0], e)}
              >
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-text-primary">
                    {products[0].buttonText}
                  </p>
                  <svg
                    className="size-3"
                    fill="none"
                    stroke="#444B59"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          <div className="absolute bottom-[15%] left-[57%] hidden sm:block">
            <div className="relative">
              <img
                src="/assets/icons/straight-line-pointer.svg"
                alt=""
                className="absolute -bottom-full right-1/4 size-8"
              />
              <img
                src="/assets/icons/pointer.svg"
                alt=""
                className="absolute bottom-[-190%] right-1/4 size-8"
              />
              <button
                className="cursor-pointer rounded-lg bg-cream px-3 py-2 shadow-lg transition-all hover:shadow-xl"
                onClick={(e) => handleProductClick(products[1], e)}
              >
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-text-primary">
                    {products[1].buttonText}
                  </p>
                  <svg
                    className="size-3"
                    fill="none"
                    stroke="#444B59"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          <div className="absolute right-1/4 top-[10%] hidden sm:block">
            <div className="relative">
              <img
                src="/assets/icons/straight-line-pointer.svg"
                alt=""
                className="absolute -bottom-full right-2/4 size-8"
              />
              <img
                src="/assets/icons/pointer.svg"
                alt=""
                className="absolute bottom-[-190%] right-2/4 size-8"
              />
              <button
                className="cursor-pointer rounded-lg bg-cream px-3 py-2 shadow-lg transition-all hover:shadow-xl"
                onClick={(e) => handleProductClick(products[2], e)}
              >
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-text-primary">
                    {products[2].buttonText}
                  </p>
                  <svg
                    className="size-3"
                    fill="none"
                    stroke="#444B59"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ShopTheLookCard
          isOpen={!!selectedProduct}
          onClose={closeModal}
          product={selectedProduct}
          position={cardPosition}
        />
      )}
    </section>
  )
}

export default ShopTheLook
