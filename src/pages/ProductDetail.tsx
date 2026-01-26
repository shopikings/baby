import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductImageGallery from '../components/ProductImageGallery'
import ProductInfo from '../components/ProductDetail/ProductInfo'
import ProductReviews from '../components/ProductReviews'
import YouMayAlsoLike from '../components/YouMayAlsoLike'
import Marquee from 'components/Marquee'
import CategoryNav from 'components/ProductDetail/CategoryNav'
import Services from 'components/Services'
import OurStorySection from 'components/OurStorySection'
import test1 from '../assets/test1.png'
import test2 from '../assets/test2.png'

function ProductDetail() {
  const { handle } = useParams()
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedVariant, setSelectedVariant] = useState<any>(null)
  const [selectedSize, setSelectedSize] = useState<string>('')

  // Function to transform Shopify API response to your component's expected format
  const transformShopifyProduct = (shopifyProduct: any) => {
    if (!shopifyProduct) return null

    // Extract images - deduplicate them
    const thumbnails: string[] = Array.from(
      new Set(shopifyProduct.images?.map((i: any) => i.url) || [])
    )

    let colorsSet = new Set<string>()
    let sizesSet = new Set<string>()
    let hasMultipleVariants = shopifyProduct.variants?.length > 1
    let hasColorVariants = false
    let hasSizeVariants = false

    shopifyProduct.variants?.forEach((v: any) => {
      // if (!v.available) return

      if (v.title.includes('/')) {
        const [color, size] = v.title.split('/').map((s: any) => s.trim())
        colorsSet.add(color)
        sizesSet.add(size)
      } else {
        colorsSet.add(v.title)
        sizesSet.add('Default')
      }
    })

    let colorsList = Array.from(colorsSet).map((c) => ({
      name: c,
      hex: '#CCCCCC'
    }))
    let sizesList = Array.from(sizesSet)

    // For products with variants but no explicit color/size options
    if (hasMultipleVariants && !hasColorVariants && !hasSizeVariants) {
      // Check if variants have different titles (like "Pink/White", "Red" in your example)
      const variantTitles = shopifyProduct.variants.map((v: any) => v.title)
      if (variantTitles.length > 1) {
        // Treat these as colors if they sound like colors
        variantTitles.forEach((title: string) => {
          const colorName = title
          if (!colorsList.find((c) => c.name === colorName)) {
            colorsList.push({
              name: colorName,
              hex: '#CCCCCC'
            })
          }
        })
      }
    }

    // If no colors detected but we have multiple variants, create a default list
    if (colorsList.length === 0 && hasMultipleVariants) {
      shopifyProduct.variants?.forEach((v: any, index: number) => {
        colorsList.push({
          name: v.title || `Option ${index + 1}`,
          hex: '#CCCCCC'
        })
      })
    }

    if (colorsList.length === 0) colorsList = []
    if (sizesList.length === 0) sizesList = ['Default']

    // Find the first available variant for default price and availability
    const firstAvailableVariant =
      shopifyProduct.variants?.find((v: any) => v.available) ||
      shopifyProduct.variants?.[0]

    // Calculate overall availability - product is available if ANY variant is available
    const overallAvailable =
      shopifyProduct.variants?.some((v: any) => v.available) || false

    // Get price range if multiple variants
    let price = firstAvailableVariant?.price || 0
    let priceRange = price
    if (shopifyProduct.variants?.length > 1) {
      const prices = shopifyProduct.variants.map((v: any) => v.price)
      const minPrice = Math.min(...prices)
      const maxPrice = Math.max(...prices)
      if (minPrice !== maxPrice) {
        priceRange = `$${minPrice} - $${maxPrice}`
        price = minPrice // Set to min price for display
      }
    }

    // Find default variant (first available or first variant)
    const defaultVariant =
      shopifyProduct.variants?.find((v: any) => v.available) ||
      shopifyProduct.variants?.[0]

    // Transform the product to match your component's structure
    return {
      // Original Shopify fields (kept for compatibility)
      ...shopifyProduct,

      // Your component's expected fields
      title: shopifyProduct.title,
      description: shopifyProduct.description,
      productType: shopifyProduct.productType,
      vendor: shopifyProduct.vendor,
      tags: shopifyProduct.tags || [],
      images: shopifyProduct.images || [],
      variants: shopifyProduct.variants || [],

      // Required fields for ProductInfo component
      price: price,
      priceRange: priceRange, // For displaying price range

      // Reviews
      reviews: shopifyProduct.reviews || [],

      // Calculated fields for your components
      thumbnails,
      sizesList,
      colorsList,

      // Additional fields that might be needed
      id: shopifyProduct.id,
      handle: shopifyProduct.handle,
      available: overallAvailable, // Use overall availability
      instock: overallAvailable,
      compareAtPrice: firstAvailableVariant?.compareAtPrice || null,
      currency: firstAvailableVariant?.currency || 'USD',

      // Helper fields
      hasMultipleVariants,
      hasColorVariants,
      hasSizeVariants,
      defaultVariantId: firstAvailableVariant?.id,
      defaultVariant
    }
  }

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        setError(null)

        const resp = await fetch(
          import.meta.env.VITE_BACKEND_API_URL + `/product/${handle}`
        )

        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`)
        }

        const data = await resp.json()

        // Transform the Shopify API response
        const transformedProduct = transformShopifyProduct(data.data)
        setProduct(transformedProduct)

        // Set initial selected variant
        if (transformedProduct?.defaultVariant) {
          const variant = transformedProduct.defaultVariant
          setSelectedVariant(variant)

          // Split color/size from title
          if (variant.title.includes('/')) {
            const [color, size] = variant.title
              .split('/')
              .map((s: any) => s.trim())
            setSelectedColor(color)
            setSelectedSize(size)
          } else {
            setSelectedColor(variant.title)
            setSelectedSize('Default')
          }
        }
      } catch (err) {
        console.error('Failed to load product:', err)
        setError('Failed to load product')
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    if (handle) {
      fetchProduct()
    }
  }, [handle])

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

  const handleColorChange = (color: string) => {
    setSelectedColor(color)

    // Find first available variant for selected color
    const availableVariants = product.variants.filter(
      (v: any) => v.available && v.title.includes(color)
    )

    let variant = availableVariants.find((v: any) => {
      const [, size] = v.title.split('/').map((s: any) => s.trim())
      return size === selectedSize
    })

    if (!variant) variant = availableVariants[0] // fallback to first available color variant

    if (variant) {
      setSelectedVariant(variant)
      if (variant.title.includes('/')) {
        const [, size] = variant.title.split('/').map((s: any) => s.trim())
        setSelectedSize(size)
      }
    }
  }

  const productData = {
    name: product?.title || '',
    rating: product?.reviews
      ? product.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) /
        product.reviews.length
      : 0,
    reviewCount: product?.reviews ? product.reviews.length : 0,
    price: selectedVariant?.price || product?.price || 0,
    originalPrice:
      Number(selectedVariant?.compareAtPrice || product?.price || 0) + 100,
    colors: product?.colorsList || [],
    sizes: product?.sizesList || ['Default'],
    variantId: selectedVariant?.id,
    description: product?.description || '',
    productInfo: [
      'Material: 100% Cotton',
      'Care: Machine wash cold, tumble dry low',
      'Made in USA'
    ],
    image: product?.thumbnails?.[0] || '',
    brand: product?.vendor,
    variants: product?.variants || [],
    selectedVariant: selectedVariant,
    available: selectedVariant?.available || product?.available || false
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
            thumbnails={product.thumbnails || []}
            productName={productData.name}
            selectedColor={selectedColor}
            variants={product.variants || []}
          />
        </div>
        {/* RIGHT PRODUCT INFO */}
        <div className="lg:w-[42%] pt-4 md:pt-5">
          <ProductInfo
            {...productData}
            // selectedSize={selectedSize}
            onColorChange={handleColorChange}
            // onSizeChange={handleSizeChange}
            onVariantChange={(variant) => setSelectedVariant(variant)}
          />
        </div>
      </div>
      <YouMayAlsoLike brandName={productData?.brand} />
      {/* REVIEWS */}
      <ProductReviews
        overallRating={productData.rating}
        totalReviews={productData.reviewCount}
        reviews={product.reviews || []}
      />

      <OurStorySection />
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
      <Services />
    </div>
  )
}

export default ProductDetail
