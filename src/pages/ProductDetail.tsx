import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductImageGallery from '../components/ProductImageGallery'
import ProductInfo from '../components/ProductInfo'
import ProductReviews from '../components/ProductReviews'
import RecentlyViewed from '../components/RecentlyViewed'
import YouMayAlsoLike from '../components/YouMayAlsoLike'
import { fetchProductById } from '../utils/shopify'

function ProductDetail() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    // 🧩 Extract only numeric part of Shopify GID
    const cleanId = id.includes('gid://shopify/Product/')
      ? id.replace('gid://shopify/Product/', '')
      : id

    const gid = `gid://shopify/Product/${cleanId}`

    const loadProduct = async () => {
      try {
        setLoading(true)
        const data = await fetchProductById(gid)
        setProduct(data)
      } catch (err: any) {
        console.error('Error fetching product:', err)
        setError('Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-lg text-gray-500">
        Loading product...
      </div>
    )

  if (error)
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        {error}
      </div>
    )

  if (!product)
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Product not found
      </div>
    )

  // 🧠 Extract data safely
  const thumbnails = product.images?.map((img: any) => img.url) || [
    '/assets/images/product1.png'
  ]

  const productData = {
    name: product.title || 'Untitled Product',
    rating: 5,
    reviewCount: 24,
    price: product.variants?.[0]?.price?.amount || '0.00',
    originalPrice: Number(product.variants?.[0]?.price?.amount || 0) + 10,
    colors: [
      { name: 'beige', hex: '#E5D4C1' },
      { name: 'blue', hex: '#6B9FBF' },
      { name: 'navy', hex: '#2C3E50' },
      { name: 'brown', hex: '#8B6F47' },
      { name: 'black', hex: '#000000' }
    ],
    description:
      product.description ||
      'This cozy sherpa fleece zip-up is perfect for keeping your little one warm.',
    productInfo: [
      'Material: 100% Cotton',
      'Care: Machine wash cold, tumble dry low',
      'Made in USA'
    ]
  }

  const reviews = product.reviews?.length
    ? product.reviews.map((rev: any, index: number) => ({
        id: index + 1,
        author: rev.author || 'Anonymous',
        location: rev.location || '',
        rating: rev.rating || 0,
        comment: rev.comment || '',
        date: rev.date || '',
        color: rev.color || '',
        verified: rev.verified || false
      }))
    : [] // <-- safe default empty array

  const recentlyViewed = [
    {
      id: 5,
      title: 'Brown jacket',
      price: '$60',
      mainImage: '/assets/images/product5.png',
      variantImages: [
        '/assets/images/product5.png',
        '/assets/images/product6.png'
      ],
      rating: 5
    }
  ]

  return (
    <div className="bg-cream">
      <YouMayAlsoLike />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch">
          <div className="lg:w-1/2">
            <div className="sticky top-0">
              <ProductImageGallery
                thumbnails={thumbnails}
                productName={productData.name}
              />
            </div>
          </div>
          <div className="pt-5 lg:w-1/2">
            <ProductInfo {...productData} image={thumbnails[0]} />
          </div>
        </div>

        <ProductReviews
          overallRating={productData.rating}
          totalReviews={productData.reviewCount}
          reviews={reviews}
        />

        <RecentlyViewed products={recentlyViewed} />
      </div>
    </div>
  )
}

export default ProductDetail
