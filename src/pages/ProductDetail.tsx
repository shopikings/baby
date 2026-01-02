import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductImageGallery from '../components/ProductImageGallery'
import ProductInfo from '../components/ProductDetail/ProductInfo'
import ProductReviews from '../components/ProductReviews'
import YouMayAlsoLike from '../components/YouMayAlsoLike'
import { fetchProductById } from '../utils/shopify'
import Marquee from 'components/Marquee'
import CategoryNav from 'components/ProductDetail/CategoryNav'
import Services from 'components/Services'
import OurStorySection from 'components/OurStorySection'
import test1 from '../assets/test1.png'
import test2 from '../assets/test2.png'

function ProductDetail() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>('')

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)

        const cleanId = id?.replace('gid://shopify/Product/', '')
        const gid = `gid://shopify/Product/${cleanId}`

        const data = await fetchProductById(gid)
    
        setProduct(data)
      } catch (e) {
        console.error('Error loading product:', e)
        setError('Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    if (id) load()
  }, [id])

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading product...
      </div>
    )

  if (error)
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    )

  if (!product)
    return (
      <div className="h-screen flex items-center justify-center">
        Product not found
      </div>
    )

  console.log('Reviews passed to ProductReviews:', product.reviews)

  // Extract images - deduplicate them
  const thumbnails: string[] = Array.from(new Set(product.images?.map((i: any) => i.url) || []))

  let sizesList: string[] = []
  let colorsList: { name: string; hex: string }[] = []

  product.variants?.forEach((v: any) => {
    v.selectedOptions?.forEach((opt: any) => {
      // SIZES
      if (opt.name.toLowerCase().includes('size')) {
        if (!sizesList.includes(opt.value)) {
          sizesList.push(opt.value)
        }
      }

      // COLORS
      if (opt.name.toLowerCase().includes('color')) {
        const colorName = opt.value
        if (!colorsList.find(c => c.name === colorName)) {
          colorsList.push({
            name: colorName,
            hex: '#CCCCCC'
          })
        }
      }
    })
  })

  if (colorsList.length === 0) colorsList = []
  if (sizesList.length === 0) sizesList = ['Default']

  const productData = {
    name: product.title,
    rating: product.reviews
      ? product.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) /
        product.reviews.length
      : 0,
    reviewCount: product.reviews ? product.reviews.length : 0,
    price: product.price,
    originalPrice: Number(product?.variants?.[0]?.price?.amount || 0) + 10,
    colors: colorsList,
    sizes: sizesList,
    variantId: product?.variants?.[0]?.id,
    description: product.description,
    productInfo: [
      'Material: 100% Cotton',
      'Care: Machine wash cold, tumble dry low',
      'Made in USA'
    ],
    image: thumbnails[0] || ''
  }

  return (
    <div className="bg-cream">
      <CategoryNav />
      <div className="bg-banner-lower py-1 md:py-2 mt-2 md:mt-3">
        <Marquee
          text="10% off on your first order when you sign up to newsletter."
          className="font-raleway text-xs md:text-sm font-medium text-black"
        />
      </div>

      <div className="mx-4 sm:mx-6 md:mx-10 px-2 sm:px-4 pt-6 md:pt-8 flex gap-8 md:gap-16 lg:gap-28 lg:flex-row flex-col">
        {/* LEFT IMAGES */}
        <div className="lg:w-1/2">
          <ProductImageGallery
            thumbnails={thumbnails}
            productName={productData.name}
            selectedColor={selectedColor}
            variants={product.variants}
          />
        </div>
        {/* RIGHT PRODUCT INFO */}
        <div className="lg:w-[42%] pt-4 md:pt-5">
          <ProductInfo 
            {...productData}
            onColorChange={(color) => {
              console.log('ProductDetail - onColorChange called with:', color)
              setSelectedColor(color)
            }}
          />
        </div>
      </div>

      {/* REVIEWS */}
      <ProductReviews
        overallRating={productData.rating}
        totalReviews={productData.reviewCount}
        reviews={product.reviews || []}
      />

      {/* CUSTOMER TESTIMONIALS SECTION */}
      <div className="mx-4 sm:mx-6 md:mx-8 px-2 sm:px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Testimonial Card 1 */}
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={test2}
              alt="Customer testimonial 1"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Testimonial Card 2 */}
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={test1}
              alt="Customer testimonial 2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <OurStorySection />

      

      {/* <RecentlyViewed
        products={[
          {
            id: 5,
            title: 'Brown jacket',
            price: '$60',
            mainImage: '/assets/images/product5.png',
            variantImages: ['/assets/images/product5.png'],
            rating: 5
          }
        ]}
      /> */}
      <YouMayAlsoLike />
      <Services />
    </div>
  )
}

export default ProductDetail