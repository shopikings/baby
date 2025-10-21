import ProductImageGallery from '../components/ProductImageGallery'
import ProductInfo from '../components/ProductInfo'
import ProductReviews from '../components/ProductReviews'
import RecentlyViewed from '../components/RecentlyViewed'
import YouMayAlsoLike from '../components/YouMayAlsoLike'

function ProductDetail() {
  const thumbnails = [
    '/assets/images/product-gallery-1.png',
    '/assets/images/product-gallery-2.png',
    '/assets/images/product-gallery-3.png',
    '/assets/images/product-gallery-4.png'
  ]

  const colors = [
    { name: 'beige', hex: '#E5D4C1' },
    { name: 'blue', hex: '#6B9FBF' },
    { name: 'navy', hex: '#2C3E50' },
    { name: 'brown', hex: '#8B6F47' },
    { name: 'black', hex: '#000000' }
  ]

  const productData = {
    name: 'Quincy Mae Sherpa Fleece Zip Up',
    rating: 5,
    reviewCount: 24,
    price: 48,
    originalPrice: 60,
    colors: colors,
    description:
      'This cozy sherpa fleece zip-up is perfect for keeping your little one warm. Made with soft, high-quality materials that are gentle on delicate skin. Features a full zip closure and relaxed fit for easy movement.',
    productInfo: [
      'Material: 100% Polyester Sherpa Fleece',
      'Care: Machine wash cold, tumble dry low',
      'Made in USA'
    ]
  }

  const reviews = [
    {
      id: 1,
      author: 'John Doe',
      location: 'New York, US',
      rating: 5,
      comment:
        'Amazing quality! My baby loves this fleece. It&apos;s so soft and warm.',
      date: 'January 15, 2025',
      color: 'Beige',
      verified: true
    },
    {
      id: 2,
      author: 'Sarah Miller',
      location: 'London, UK',
      rating: 5,
      comment:
        'Perfect for cold weather. The zipper works smoothly and the fit is just right.',
      date: 'January 10, 2025',
      color: 'Navy',
      verified: true
    }
  ]

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
          <div className=" pt-5 lg:w-1/2">
            <ProductInfo {...productData} />
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
