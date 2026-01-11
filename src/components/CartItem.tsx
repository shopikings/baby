import { useState, useEffect, useRef } from 'react'
import { useCart } from 'contexts/CartContext'

interface CartItemProps {
  item: {
    id: string
    name: string
    price: string
    image: string
    quantity: number
    color?: string
    size?: string
  }
}

function CartItem({ item }: CartItemProps) {
  const { removeFromCart, updateQuantity } = useCart()
  const [isQuantityOpen, setIsQuantityOpen] = useState(false)
  const quantityRef = useRef<HTMLDivElement>(null)

  const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        quantityRef.current &&
        !quantityRef.current.contains(event.target as Node)
      ) {
        setIsQuantityOpen(false)
      }
    }

    if (isQuantityOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isQuantityOpen])

  return (
    <div className="mb-0 border-y border-[#444B59A8] bg-cream p-4">
      <div className="flex gap-4">
        <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-blue-100">
          <img
            src={item.image}
            alt={item.name}
            className="size-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h3 className="font-rubik text-xs font-semibold text-black">
            {item.name.toUpperCase()}
          </h3>

          {/* ✅ Render color and size dynamically */}
          {(item.color || item.size) && (
            <p className="mt-1 font-rubik text-xs text-black">
              {item.color && <span>Color: {item.color}</span>}
              {/* {item.color && item.size && <span> • </span>} */}
              <br />
              {item.size && <span>Size: {item.size}</span>}
            </p>
          )}

          <div className="mt-2 flex items-center justify-between">
            <div className="relative" ref={quantityRef}>
              <button
                onClick={() => setIsQuantityOpen(!isQuantityOpen)}
                className="flex items-center justify-between rounded border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50 focus:border-button-hover focus:outline-none"
              >
                <span>{item.quantity}</span>
                <svg
                  className={`ml-2 size-4 transition-transform ${
                    isQuantityOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isQuantityOpen && (
                <div className="absolute left-0 top-full z-10 mt-1 w-full rounded border border-gray-300 bg-white shadow-lg">
                  <div className="max-h-40 overflow-y-auto">
                    {quantityOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          updateQuantity(item.id, option)
                          setIsQuantityOpen(false)
                        }}
                        className={`block w-full px-3 py-2 text-left text-sm hover:bg-gray-50 ${
                          item.quantity === option ? 'bg-gray-100' : ''
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="font-raleway text-sm text-black underline hover:text-text-primary"
            >
              Remove
            </button>
          </div>
        </div>

        <div className="text-right">
          <p className="font-raleway text-sm font-medium text-black">
            ${item.price}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartItem
