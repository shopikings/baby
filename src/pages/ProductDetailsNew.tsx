import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductReviews from '../components/ProductReviews'
import YouMayAlsoLike from '../components/YouMayAlsoLike'
import Marquee from 'components/Marquee'
import Services from 'components/Services'
import OurStorySection from 'components/OurStorySection'
import test1 from '../assets/test1.png'
import test2 from '../assets/test2.png'
import { Plus, Minus, ChevronUp, ChevronDown } from 'lucide-react'

function ProductDetailNew() {
  const { handle } = useParams()
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // UI State
  const [selectedVariant, setSelectedVariant] = useState<any>(null)
  const [mainImage, setMainImage] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [isDescOpen, setIsDescOpen] = useState(true)

  const transformShopifyProduct = (shopifyProduct: any) => {
    if (!shopifyProduct) return null
    const thumbnails = shopifyProduct.images?.map((i: any) => i.url) || []
    const firstAvailableVariant =
      shopifyProduct.variants?.find((v: any) => v.available) ||
      shopifyProduct.variants?.[0]

    return {
      ...shopifyProduct,
      thumbnails,
      price: firstAvailableVariant?.price || 0,
      defaultVariant: firstAvailableVariant
    }
  }

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        const resp = await fetch(
          import.meta.env.VITE_BACKEND_API_URL + `/product/${handle}`
        )
        if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`)
        const data = await resp.json()
        const transformed = transformShopifyProduct(data.data)
        setProduct(transformed)
        setSelectedVariant(transformed?.defaultVariant)
        setMainImage(transformed?.thumbnails?.[0] || '')
      } catch (err) {
        setError('Failed to load product')
      } finally {
        setLoading(false)
      }
    }
    if (handle) fetchProduct()
  }, [handle])

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  if (error || !product)
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        {error || 'Not Found'}
      </div>
    )

  return (
    <div className="bg-white font-sans">
      <div className="bg-[#f8f8f8] py-2">
        <Marquee
          text="10% off on your first order when you sign up to newsletter."
          className="text-xs uppercase tracking-widest"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT: IMAGE GALLERY (Matching screencapture-magpiesnashville...jpg) */}
          <div className="lg:w-3/5 flex gap-4">
            {/* Vertical Thumbnails */}
            <div className="hidden md:flex flex-col gap-3 w-20">
              {product.thumbnails.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`border ${
                    mainImage === img ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-24 object-cover" />
                </button>
              ))}
            </div>
            {/* Main Image */}
            <div className="flex-1 bg-[#f9f9f9]">
              <img
                src={mainImage}
                alt={product.title}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="lg:w-2/5">
            <h1 className="text-2xl md:text-3xl font-light text-gray-800 mb-2">
              {product.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              ${selectedVariant?.price || product.price}.00
            </p>

            {/* STYLE / VARIANT SELECTOR */}
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest font-semibold block mb-3">
                Style: {selectedVariant?.title}
              </span>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant: any) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 text-xs border transition-all ${
                      selectedVariant?.id === variant.id
                        ? 'bg-[#333] text-white border-[#333]'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-black'
                    }`}
                  >
                    {variant.title.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* CUSTOM INPUTS */}
            <div className="space-y-4 mb-8">
              <div>
                <label className="text-xs uppercase tracking-widest font-semibold block mb-2">
                  Age & Gender
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-3 outline-none focus:border-gray-500"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest font-semibold block mb-2">
                  Interests & Favorite things
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-3 outline-none focus:border-gray-500"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest font-semibold block mb-2">
                  Special Requests or Additional Information
                </label>
                <textarea className="w-full border border-gray-300 p-3 outline-none focus:border-gray-500 h-20" />
              </div>
            </div>

            {/* QUANTITY & ADD TO BAG */}
            <div className="flex gap-4 mb-10">
              <div className="flex items-center border border-gray-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button className="flex-1 bg-[#9db2bf] text-white uppercase tracking-widest font-semibold hover:bg-[#8ca1ae] transition-colors">
                Add to Bag
              </button>
            </div>

            {/* ACCORDION DESCRIPTION */}
            <div className="border-t border-gray-200">
              <button
                onClick={() => setIsDescOpen(!isDescOpen)}
                className="w-full py-4 flex justify-between items-center uppercase tracking-widest text-xs font-bold"
              >
                Description
                {isDescOpen ? <Minus size={14} /> : <Plus size={14} />}
              </button>
              {isDescOpen && (
                <div
                  className="pb-6 text-gray-600 text-sm leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}
            </div>
            <div className="border-t border-b border-gray-200">
              <button className="w-full py-4 flex justify-between items-center uppercase tracking-widest text-xs font-bold">
                Have a Question?
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER SECTIONS */}
      <YouMayAlsoLike brandName={product.vendor} />
      <ProductReviews
        overallRating={
          product.reviews?.reduce((acc: number, r: any) => acc + r.rating, 0) /
            product.reviews?.length || 0
        }
        totalReviews={product.reviews?.length || 0}
        reviews={product.reviews || []}
      />
      <OurStorySection />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img src={test2} alt="Lifestyle 1" className="w-full rounded-sm" />
          <img src={test1} alt="Lifestyle 2" className="w-full rounded-sm" />
        </div>
      </div>
      <Services />
    </div>
  )
}

export default ProductDetailNew
