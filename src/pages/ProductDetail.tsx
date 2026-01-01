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
import StickyDiscountBanner from 'components/StickyDiscountBanner'
import test1 from '../assets/test1.png'
import test2 from '../assets/test2.png'
import StickyDiscountTag from 'components/StickyDiscountTag'

function ProductDetail() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

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

  // Extract images
  const thumbnails = product.images?.map((i: any) => i.url) || []

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
            hex: getColorHex(colorName)
          })
        }
      }
    })
  })

  function getColorHex(colorName: string): string {
    const colorMap: { [key: string]: string } = {
      'red': '#EF4444',
      'blue': '#3B82F6',
      'green': '#10B981',
      'black': '#000000',
      'white': '#FFFFFF',
      'pink': '#EC4899',
      'yellow': '#FBBF24',
      'purple': '#A855F7',
      'orange': '#F97316',
      'gray': '#6B7280',
      'grey': '#6B7280',
      'brown': '#92400E',
      'navy': '#001F3F',
      'beige': '#D2B48C',
      'cream': '#FFFDD0',
      'teal': '#14B8A6',
      'cyan': '#06B6D4',
      'indigo': '#4F46E5',
      'rose': '#F43F5E',
      'amber': '#F59E0B',
      'lime': '#84CC16',
      'emerald': '#50C878',
      'sky': '#0EA5E9',
      'violet': '#8B5CF6',
      'fuchsia': '#D946EF',
      'slate': '#64748B',
      'stone': '#78716C',
      'zinc': '#71717A',
      'neutral': '#737373',
      'red-dark': '#991B1B',
      'blue-dark': '#1E3A8A',
      'green-dark': '#065F46',
      'light-gray': '#D1D5DB',
      'light-blue': '#DBEAFE',
      'light-pink': '#FCE7F3',
      'light-green': '#DCFCE7',
      'light-purple': '#EDE9FE',
      'light-yellow': '#FEFCE8',
      'light-orange': '#FFEDD5',
      'dark-gray': '#374151',
      'dark-blue': '#1F2937',
      'dark-green': '#1F2937',
      'charcoal': '#36454F',
      'silver': '#C0C0C0',
      'gold': '#FFD700',
      'bronze': '#CD7F32',
      'copper': '#B87333',
      'maroon': '#800000',
      'olive': '#808000',
      'khaki': '#F0E68C',
      'turquoise': '#40E0D0',
      'coral': '#FF7F50',
      'salmon': '#FA8072',
      'peach': '#FFDAB9',
      'lavender': '#E6E6FA',
      'mint': '#98FF98',
      'ivory': '#FFFFF0',
      'off-white': '#F5F5F0',
      'off white': '#F5F5F0',
      'bright-pink': '#FF1493',
      'bright pink': '#FF1493',
      'hot-pink': '#FF69B4',
      'hot pink': '#FF69B4',
      'cobalt': '#0047AB',
      'cobalt-blue': '#0047AB',
      'cobalt blue': '#0047AB',
      'deep-blue': '#00008B',
      'deep blue': '#00008B',
      'royal-blue': '#4169E1',
      'royal blue': '#4169E1',
      'steel-blue': '#4682B4',
      'steel blue': '#4682B4',
      'powder-blue': '#B0E0E6',
      'powder blue': '#B0E0E6',
      'baby-blue': '#89CFF0',
      'baby blue': '#89CFF0',
      'sky-blue': '#87CEEB',
      'sky blue': '#87CEEB',
      'light blue': '#ADD8E6',
      'dark-pink': '#C71585',
      'dark pink': '#C71585',
      'light pink': '#FFB6C1',
      'pale-pink': '#FADADD',
      'pale pink': '#FADADD',
      'deep-pink': '#FF1493',
      'deep pink': '#FF1493',
      'magenta': '#FF00FF',
      'crimson': '#DC143C',
      'scarlet': '#FF2400',
      'vermillion': '#E34234',
      'burgundy': '#800020',
      'wine': '#722F37',
      'rust': '#B7410E',
      'tan': '#D2B48C',
      'taupe': '#B38B6D',
      'sand': '#C2B280',
      'linen': '#FAF0E6',
      'antique-white': '#FAEBD7',
      'antique white': '#FAEBD7',
      'sepia': '#704214',
      'chocolate': '#D2691E',
      'coffee': '#6F4E37',
      'espresso': '#6F4E37',
      'mocha': '#967969',
      'caramel': '#C68642',
      'honey': '#FFB700',
      'mustard': '#FFDB58',
      'sage': '#9DC183',
      'moss': '#8A9A5B',
      'forest': '#228B22',
      'pine': '#01796F',
      'seafoam': '#93E9BE',
      'aqua': '#00FFFF',
      'petrol': '#004B87',
      'gunmetal': '#2C3E50',
      'pewter': '#899499',
      'platinum': '#E5E4E2',
      'pearl': '#EAE0C8',
      'champagne': '#F7E7CE',
      'rose-gold': '#B76E79',
      'rose gold': '#B76E79',
      'brass': '#B5A642',
      'steel': '#70798C',
      'iron': '#4A4A4A',
      'canary': '#FFFF99',
      'canary-yellow': '#FFFF99',
      'canary yellow': '#FFFF99',
      'lemon': '#FFFACD',
      'lemon-yellow': '#FFFACD',
      'lemon yellow': '#FFFACD',
      'banana': '#FFE135',
      'banana-yellow': '#FFE135',
      'banana yellow': '#FFE135',
      'butter': '#FFFACD',
      'buttercup': '#FDDA24',
      'daffodil': '#FFFF31',
      'sunflower': '#FFC20E',
      'sunshine': '#FFC20E',
      'goldenrod': '#DAA520',
      'marigold': '#F0A000',
      'saffron': '#F4C430',
      'tangerine': '#F28500',
      'apricot': '#FBCEB1',
      'persimmon': '#EC5800',
      'pumpkin': '#FF7F00',
      'terracotta': '#E2725B',
      'burnt-orange': '#CC5500',
      'burnt orange': '#CC5500',

      'sienna': '#A0522D',
      'umber': '#635147',
      'ochre': '#CC7000',
      'ochre-yellow': '#CC7000',
      'ochre yellow': '#CC7000'
    }
    const hex = colorMap[colorName.toLowerCase()] || '#CCCCCC'
    if (!colorMap[colorName.toLowerCase()]) {
      console.log('Color not found in map:', colorName, '- using default gray')
    }
    return hex
  }

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
          />
        </div>
        {/* RIGHT PRODUCT INFO */}
        <div className="lg:w-[42%] pt-4 md:pt-5">
          <ProductInfo {...productData} />
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