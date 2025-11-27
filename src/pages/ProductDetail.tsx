import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductImageGallery from '../components/ProductImageGallery'
import ProductInfo from '../components/ProductInfo'
import ProductReviews from '../components/ProductReviews'
import YouMayAlsoLike from '../components/YouMayAlsoLike'
import { fetchProductById } from '../utils/shopify'

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
        console.log('Fetched product:', data)
        setProduct(data)
      } catch (e) {
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

  // Extract images
  const thumbnails = product.images?.map((i: any) => i.url) || []

  let sizesList: string[] = []
  let colorsList: string[] = []

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
        if (!colorsList.includes(opt.value)) {
          colorsList.push(opt.value)
        }
      }
    })
  })

  if (colorsList.length === 0) colorsList = ['Default']
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
    <div className="bg-cream pb-8">
      <YouMayAlsoLike />

      <div className="max-w-7xl mx-auto px-4 pt-8 flex gap-10 lg:flex-row flex-col">
        {/* LEFT IMAGES */}
        <div className="lg:w-1/2">
          <ProductImageGallery
            thumbnails={thumbnails}
            productName={productData.name}
          />
        </div>
        RIGHT PRODUCT INFO
        <div className="lg:w-1/2 pt-5">
          <ProductInfo {...productData} />

          {/* DESCRIPTION */}
          <div className="mt-8 border-t border-gray-300 pt-6">
            <h2 className="text-lg font-semibold mb-3">Description</h2>
            <div
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: productData.description }}
            ></div>

            <ul className="mt-4 list-disc pl-4 text-gray-700">
              {/* {productData.productInfo.map((info, i) => (
                <li key={i}>{info}</li>
              ))} */}
            </ul>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <ProductReviews
        overallRating={productData.rating}
        totalReviews={productData.reviewCount}
        reviews={product.reviews || []}
      />

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
    </div>
  )
}

export default ProductDetail
