import { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import FilterSection from 'components/FilterSection'
import ShopProductCard from 'components/ShopProductCard'

interface VariantInfo {
  id: string
  price: string
  image: string
  title?: string
}

interface ShopifyProductImage {
  id: string
  url: string
  altText: string | null
}

interface ShopifyProductVariant {
  id: string
  title: string
  price: number
  compareAtPrice: number | null
  currency: string
  available: boolean
  image: ShopifyProductImage | null
}

interface ShopifyProduct {
  id: string
  handle: string
  title: string
  description: string
  productType: string | null
  vendor: string
  tags: string[]
  images: ShopifyProductImage[]
  variants: ShopifyProductVariant[]
  instock: boolean
  metafields: Record<string, any>
  createdAt: string
}

interface ShopProductCardProps {
  id: number
  title: string
  price: string
  mainImage: string
  variantImages: string[]
  rating: number
  handle: string
  className?: string // Optional className prop
  tags?: any[]
  brand?: string
  category?: string
  variants?: any[]
}

function Shop() {
  const [filters, setFilters] = useState<Record<string, string | boolean>>({})
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()

  const brand = searchParams.get('brand')
  const category = searchParams.get('category')
  const urlTag = searchParams.get('tag')

  const [products, setProducts] = useState<ShopProductCardProps[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)
  const [pageLoading, setPageLoading] = useState<boolean>(false)

  const isBrandPage = Boolean(brand)

  // Transform Shopify product to ShopProductCardProps format
  const mapShopifyToCardProps = (
    shopifyProduct: ShopifyProduct
  ): ShopProductCardProps => {
    let category = ''

    // Extract numeric ID from Shopify GID
    const idMatch = shopifyProduct.id.match(/\/Product\/(\d+)/)
    const numericId = idMatch ? parseInt(idMatch[1], 10) : 0

    // Get all product images for the main display (non-variant specific)
    const productImages = shopifyProduct.images || []

    // Get variant-specific images - only from variants that have unique images
    // Group variants by their image URL to avoid duplicate thumbnails
    const variantImageMap = new Map<string, ShopifyProductImage>()

    shopifyProduct.variants.forEach((variant) => {
      if (variant.image && variant.image.url) {
        // Use image URL as key to avoid duplicates
        variantImageMap.set(variant.image.url, variant.image)
      }
    })

    // Convert to array of unique variant images
    const variantImages = Array.from(variantImageMap.values())

    // Get the first variant image OR first product image for main display
    const firstAvailableVariant = shopifyProduct.variants.find(
      (v) => v.available
    )

    // Priority for main image:
    // 1. First available variant's image
    // 2. First product image
    // 3. Default placeholder
    const mainImage =
      firstAvailableVariant?.image?.url ||
      productImages[0]?.url ||
      '/assets/images/product1.png'

    // Get the price from first available variant or first variant
    const displayVariant = firstAvailableVariant || shopifyProduct.variants[0]
    const price = displayVariant ? `$${displayVariant.price}` : '$0'

    // For variantImages array: show variant-specific images first, then product images
    // This ensures thumbnails represent actual variants
    const variantImageUrls = variantImages.map((img) => img.url)

    // If no variant-specific images, use product images as fallback
    const allVariantImageUrls =
      variantImageUrls.length > 0
        ? variantImageUrls
        : productImages.map((img) => img.url)

    const mappedVariants: VariantInfo[] = shopifyProduct.variants.map((v) => ({
      id: v.id,
      price: `$${v.price}`,
      image:
        v.image?.url || productImages[0]?.url || '/assets/images/product1.png',
      title: v.title
    }))

    return {
      id: numericId,
      title: shopifyProduct.title || 'No title',
      price: price,
      mainImage: mainImage,
      // Show variant-specific images as thumbnails, or product images as fallback
      variantImages:
        allVariantImageUrls.length > 0
          ? allVariantImageUrls.slice(0, 5) // Limit to 5 thumbnails max
          : [mainImage], // Fallback to main image if no other images
      rating: 4, // Default rating
      handle: shopifyProduct.handle, // For navigation to product detail page
      tags: shopifyProduct.tags,
      brand: shopifyProduct.vendor,
      category: shopifyProduct.metafields?.category,
      variants: mappedVariants
    }
  }

  // Add this helper function to check if a product is on sale
  const isProductOnSale = (product: ShopifyProduct): boolean => {
    // Check if product has any variant with compareAtPrice > price
    const hasSaleVariant = product.variants.some((variant) => {
      return variant.compareAtPrice && variant.compareAtPrice > variant.price
    })

    // OR check if tags contain "sale" (case-insensitive)
    const hasSaleTag = product.tags.some(
      (tag) =>
        tag.toLowerCase().includes('sale') ||
        tag.toLowerCase().includes('discount')
    )

    return hasSaleVariant || hasSaleTag
  }

  const getProductPrice = (product: ShopifyProduct): number => {
    const variant =
      product.variants.find((v) => v.available) || product.variants[0]

    return variant?.price ?? 0
  }

  const normalizeAgeGroups = (raw: any): string[] => {
    if (!raw) {
      console.log('No raw age group data')
      return []
    }

    console.log('Raw age group:', raw, 'Type:', typeof raw)

    // Already array
    if (Array.isArray(raw)) {
      console.log('Is array, returning:', raw)
      return raw
    }

    // Shopify metafield object
    if (typeof raw === 'object' && raw !== null) {
      // Check for Shopify 2.0 metafield structure
      if (raw.value && Array.isArray(raw.value)) {
        console.log('Shopify metafield array value:', raw.value)
        return raw.value
      }
      if (raw.value && typeof raw.value === 'string') {
        console.log('Shopify metafield string value:', raw.value)
        // Try to parse as JSON if it looks like a JSON string
        if (raw.value.startsWith('[') || raw.value.startsWith('{')) {
          try {
            const parsed = JSON.parse(raw.value)
            if (Array.isArray(parsed)) return parsed
          } catch (e) {
            console.log('Failed to parse as JSON:', e)
          }
        }
        return [raw.value]
      }
    }

    // Single string - try to split by commas or other delimiters
    if (typeof raw === 'string') {
      console.log('String value, splitting:', raw)
      // Try to parse as JSON first
      if (raw.startsWith('[')) {
        try {
          const parsed = JSON.parse(raw)
          if (Array.isArray(parsed)) return parsed
        } catch (e) {
          // Not JSON, continue
        }
      }
      // Split by common delimiters
      return raw
        .split(/[,|;]/)
        .map((s) => s.trim())
        .filter(Boolean)
    }

    console.log('Could not parse age group, returning empty array')
    return []
  }

  const normalizeText = (value: string) =>
    value
      .toLowerCase()
      .replace(/–/g, '-') // replace EN DASH with hyphen
      .replace(/\s+/g, '') // remove all whitespace for better matching
      .trim()

  // Update your fetchProductsFromAPI function to handle filters
  const fetchProductsFromAPI = async (
    page: number = 1,
    filters?: Record<string, string | boolean>
  ): Promise<{ data: ShopifyProduct[] }> => {
    let url = `${import.meta.env.VITE_BACKEND_API_URL}`

    if (brand) {
      url += `/brands/${encodeURIComponent(brand)}/products?page=${page}`
    } else if (category) {
      url += `/collections/${encodeURIComponent(
        category
      )}/products?page=${page}`
    } else {
      url += `/products?page=${page}`
    }

    const resp = await fetch(url)

    if (!resp.ok) {
      throw new Error(`Failed to fetch products: ${resp.statusText}`)
    }

    const response = await resp.json()

    // Apply client-side filtering if needed
    if (filters) {
      let filteredProducts = response.data

      // Apply sale filter
      if (filters.sale === true) {
        filteredProducts = filteredProducts.filter(isProductOnSale)
      }

      if (filters.newIn === true) {
        filteredProducts = [...filteredProducts].sort((a, b) => {
          const aDate = new Date(a.createdAt || a.id).getTime()
          const bDate = new Date(b.createdAt || b.id).getTime()
          return bDate - aDate
        })
      }

      // Apply other filters as needed
      if (filters.brand && typeof filters.brand === 'string') {
        filteredProducts = filteredProducts.filter(
          (product: ShopifyProduct) =>
            product.vendor.toLowerCase() ===
            filters.brand!.toString().toLowerCase()
        )
      }

      // ✅ GENDER FILTER
      if (filters.gender && typeof filters.gender === 'string') {
        filteredProducts = filteredProducts.filter(
          (product: ShopifyProduct) => {
            const productGender = product.metafields?.gender

            if (!productGender) return false

            return (
              productGender.toLowerCase() ===
              (filters.gender as string).toLowerCase()
            )
          }
        )
      }

      // CATEGORY FILTER
      if (filters.category && typeof filters.category === 'string') {
        filteredProducts = filteredProducts.filter(
          (product: ShopifyProduct) => {
            const productCategory = product.metafields?.category

            if (!productCategory) return false

            return (
              productCategory.toLowerCase() ===
              (filters.category as string).toLowerCase()
            )
          }
        )
      }

      // ✅ SIZE / AGE GROUP FILTER (FIXED)
      if (filters.size && typeof filters.size === 'string') {
        console.log('Size filter active:', filters.size)
        const selectedSize = normalizeText(filters.size)

        filteredProducts = filteredProducts.filter(
          (product: ShopifyProduct) => {
            const rawAgeGroup = product.metafields?.age_group
            console.log('Product:', product.title, 'Age Group:', rawAgeGroup)

            const ageGroups = normalizeAgeGroups(rawAgeGroup)
            console.log('Normalized Age Groups:', ageGroups)

            const hasMatch = ageGroups.some(
              (age) => normalizeText(age) === selectedSize
            )
            console.log('Has match?', hasMatch)

            return hasMatch
          }
        )
      }

      // 🔥 PRICE SORT (THIS IS THE KEY PART)
      if (filters.sort === 'Price: Low to High') {
        filteredProducts.sort(
          (a: ShopifyProduct, b: ShopifyProduct) =>
            getProductPrice(a) - getProductPrice(b)
        )
      }

      if (filters.sort === 'Price: High to Low') {
        filteredProducts.sort(
          (a: ShopifyProduct, b: ShopifyProduct) =>
            getProductPrice(b) - getProductPrice(a)
        )
      }

      return { data: filteredProducts }
    }

    return response
  }

  const brandOptions = useMemo(() => {
    const options = Array.from(
      new Set(
        products.map((p) => p.brand).filter((b): b is string => !!b) // <-- type guard here
      )
    ).sort()

    return options
  }, [products])

  // Initial load
  useEffect(() => {
    let cancelled = false

    const loadProducts = async () => {
      try {
        setLoading(true)
        setProducts([])
        setCurrentPage(1)

        const response = await fetchProductsFromAPI(1, filters)

        if (cancelled) return

        // console.log('API Response data:', response.data)

        const mappedProducts = response.data.map(mapShopifyToCardProps)
        // console.log('Mapped products:', mappedProducts)

        setProducts(mappedProducts)

        // Assume there's more if we got products
        setHasNextPage(response.data.length > 0)
      } catch (err) {
        console.error('Failed to load products:', err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadProducts()

    return () => {
      cancelled = true
    }
  }, [category, urlTag, brand, filters])

  // Load more products
  const loadMore = useCallback(async () => {
    if (!hasNextPage || pageLoading) return

    try {
      setPageLoading(true)
      const nextPage = currentPage + 1

      const response = await fetchProductsFromAPI(nextPage)

      const newProducts = response.data.map(mapShopifyToCardProps)

      setProducts((prev) => [...prev, ...newProducts])
      setCurrentPage(nextPage)
      setHasNextPage(response.data.length > 0)
    } catch (err) {
      console.error('Load more failed:', err)
    } finally {
      setPageLoading(false)
    }
  }, [currentPage, hasNextPage, pageLoading])

  // Add this function to handle filter changes
  const handleFilterChange = (newFilters: Record<string, string | boolean>) => {
    setFilters(newFilters)

    // Re-fetch products with new filters
    const applyFilters = async () => {
      try {
        setLoading(true)
        const response = await fetchProductsFromAPI(1, newFilters)
        const mappedProducts = response.data.map(mapShopifyToCardProps)
        setProducts(mappedProducts)
        setCurrentPage(1)
        setHasNextPage(response.data.length > 0)
      } catch (err) {
        console.error('Failed to apply filters:', err)
      } finally {
        setLoading(false)
      }
    }

    applyFilters()
  }

  const getHeading = () => {
    if (urlTag) return urlTag
    if (brand) return brand
    if (!category) return 'Shop All'

    return category
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  if (loading && products.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mb-4 inline-block size-12 animate-spin rounded-full border-4 border-solid border-button-hover border-r-transparent"></div>
          <p className="font-raleway text-lg text-gray-600">
            Loading products...
          </p>
        </div>
      </div>
    )
  }

  console.log(products)

  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-center font-rubik text-xl font-bold uppercase text-text-primary">
            {getHeading()}
          </h1>
          <p className="text-center font-raleway text-sm text-gray-600 mt-2">
            Showing {products.length} products
          </p>
        </div>

        <FilterSection
          filters={filters}
          onFilterChange={handleFilterChange}
          hideCategory={isBrandPage}
          hideBrand={isBrandPage}
          brandOptions={brandOptions}
        />

        {products.length === 0 ? (
          <div className="py-12 text-center">
            <p className="font-raleway text-lg text-gray-600">
              No products found
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {products.map((product) => (
                <ShopProductCard
                  key={product.id}
                  {...product}
                  className="scale-90"
                />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={loadMore}
                disabled={!hasNextPage || pageLoading}
                className={`rounded-none px-8 py-3 font-raleway text-sm font-medium uppercase text-white transition-colors ${
                  !hasNextPage
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-button-hover hover:bg-[#7d969a]'
                }`}
              >
                {pageLoading
                  ? 'Loading...'
                  : hasNextPage
                    ? 'Load More'
                    : 'No more products'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Shop
