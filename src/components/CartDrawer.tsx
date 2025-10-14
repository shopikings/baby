import { useState, useEffect, useRef } from 'react'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [isOrderNotesOpen, setIsOrderNotesOpen] = useState(false)
  const [isGiftNoteOpen, setIsGiftNoteOpen] = useState(false)
  const [isQuantityOpen, setIsQuantityOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [orderNotes, setOrderNotes] = useState('')
  const [giftNote, setGiftNote] = useState('')

  const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const quantityRef = useRef<HTMLDivElement>(null)

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

  const itemPrice = 30.0
  const freeShippingThreshold = 20.0
  const currentTotal = itemPrice * quantity
  const remainingForFreeShipping = Math.max(
    0,
    freeShippingThreshold - currentTotal
  )
  const progressPercentage = Math.min(
    100,
    (currentTotal / freeShippingThreshold) * 100
  )

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed right-0 top-0 z-50 h-full w-96 bg-cream shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <h2 className="font-rubik text-2xl font-medium text-text-primary">
              CART <span className="text-xs text-text-primary">(1 ITEM)</span>
            </h2>
            <button
              onClick={onClose}
              className="text-text-primary hover:text-gray-600"
            >
              <svg
                className="size-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-6">
              <p className="mb-2 text-center font-raleway text-xs font-medium text-black">
                SPEND ${remainingForFreeShipping.toFixed(2)} MORE FOR FREE
                SHIPPING.
              </p>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-button-hover transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="mb-6 border-y border-[#444B59A8] bg-cream p-4">
              <div className="flex gap-4">
                <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-blue-100">
                  <img
                    src="/assets/images/product1.png"
                    alt="Kids Organic Cotton Girl Power Short Sleeve T-Shirt"
                    className="size-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-rubik text-xs font-semibold text-black">
                    KIDS ORGANIC COTTON GIRL POWER SHORT SLEEVE T-SHIRT IN
                    NATURAL
                  </h3>
                  <p className="mt-1 font-rubik text-xs text-black">SIZE: 2T</p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="relative" ref={quantityRef}>
                      <button
                        onClick={() => setIsQuantityOpen(!isQuantityOpen)}
                        className="flex items-center justify-between rounded border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50 focus:border-button-hover focus:outline-none"
                      >
                        <span>{quantity}</span>
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
                                  setQuantity(option)
                                  setIsQuantityOpen(false)
                                }}
                                className={`block w-full px-3 py-2 text-left text-sm hover:bg-gray-50 ${
                                  quantity === option ? 'bg-gray-100' : ''
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <button className="font-raleway text-sm text-black underline hover:text-text-primary">
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-raleway text-sm font-medium text-black">
                    ${itemPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="">
              <div
                className={`rounded-lg transition-colors duration-300 ${
                  isOrderNotesOpen ? 'bg-white' : 'bg-cream'
                }`}
              >
                <button
                  onClick={() => setIsOrderNotesOpen(!isOrderNotesOpen)}
                  className="flex w-full items-center justify-between px-4 py-2  text-left"
                >
                  <span className="font-raleway text-sm font-medium text-text-primary">
                    ADD ORDER NOTES
                  </span>
                  <svg
                    className={`size-4 transition-transform ${
                      isOrderNotesOpen ? 'rotate-180' : ''
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
                {isOrderNotesOpen && (
                  <div className="px-4 pb-4">
                    <label className="mb-2 block font-raleway text-xs font-medium text-text-primary">
                      SPECIAL INSTRUCTIONS FOR SELLER
                    </label>
                    <textarea
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="w-full rounded border border-gray-300 p-3 font-raleway text-sm focus:border-button-hover focus:outline-none"
                      rows={4}
                      placeholder="Add your special instructions here..."
                    />
                  </div>
                )}
              </div>

              <div
                className={`rounded-lg transition-colors duration-300 ${
                  isGiftNoteOpen ? 'bg-white' : 'bg-cream'
                }`}
              >
                <button
                  onClick={() => setIsGiftNoteOpen(!isGiftNoteOpen)}
                  className="flex w-full items-center justify-between px-4 py-2 text-left"
                >
                  <span className="font-raleway text-sm font-medium text-text-primary">
                    IS THIS A GIFT? ADD A NOTE.
                  </span>
                  <svg
                    className={`size-4 transition-transform ${
                      isGiftNoteOpen ? 'rotate-180' : ''
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
                {isGiftNoteOpen && (
                  <div className="px-4 pb-4">
                    <label className="mb-2 block font-raleway text-xs font-medium text-text-primary">
                      ADD A NOTE FOR RECIPIENT
                    </label>
                    <textarea
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      className="w-full rounded border border-gray-300 p-3 font-raleway text-sm focus:border-button-hover focus:outline-none"
                      rows={4}
                      placeholder="Add your gift message here..."
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 p-4">
            <button className="mb-4 w-full rounded-lg bg-button-hover py-3 font-raleway text-base font-semibold text-white transition-colors hover:bg-pink-500">
              CHECKOUT • ${currentTotal.toFixed(2)}
            </button>
            <p className="text-center font-raleway text-sm font-semibold text-black">
              SHIPPING & TAXES CALCULATED AT CHECKOUT
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartDrawer
