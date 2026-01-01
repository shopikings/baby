// --- inside Shop.tsx ---
import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterSection from 'components/FilterSection'
import ShopProductCard from 'components/ShopProductCard'
import { fetchProducts } from '../utils/shopify'

function Shop() {
  const [filters, setFilters] = useState<Record<string, string | boolean>>({})
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()

  // ✅ We NOW read BOTH: category + tag
  const category = searchParams.get('category')
  const urlTag = searchParams.get('tag') // <-- ⭐ FEATURED BRAND TAG

  const [allProducts, setAllProducts] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [cursor, setCursor] = useState<string | null>(null)
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)
  const [pageLoading, setPageLoading] = useState<boolean>(false)

  const getHeading = () => {
    if (urlTag) return urlTag // show "JELLY CAT" as page heading
    if (!category) return 'Shop All'

    return category
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const mapShopifyToUI = (items: any[]) =>
    items.map((p: any, index: number) => ({
      id: p.id || `shopify-${index}-${Math.random().toString(36).slice(2, 8)}`,
      mainImage:
        p.images && p.images.length > 0
          ? p.images[0]
          : '/assets/images/product1.png',
      variantImages:
        p.images && p.images.length > 0
          ? p.images
          : ['/assets/images/product1.png'],
      title: p.title || 'No title',
      price: p.price ? `$${p.price}` : '$0',
      tags: p.tags || [],
      rating: 4
    }))

  // ✅ Convert filter UI selections → Shopify tag
  const getTagFromFilters = () => {
    if (filters.gender) return filters.gender.toString()
    if (filters.brand) return filters.brand.toString()
    if (filters.size) return filters.size.toString()
    if (filters.category) return filters.category.toString()
    if (filters.sale) return 'sale'
    if (filters.newIn) return 'new-in'
    return null
  }

  // 🧠 FINAL TAG PRIORITY:
  // 1. URL TAG (Featured Brands)
  // 2. Filter sidebar tags (gender/brand/size)
  const activeTag = urlTag || getTagFromFilters()

  // ------------------------------------
  // 🔥 LOAD PRODUCTS ANYTIME:
  // category changes OR filters change OR URL tag changes
  // ------------------------------------
  useEffect(() => {
    let cancelled = false

    const loadProducts = async () => {
      try {
        setLoading(true)
        setCursor(null)
        setProducts([])
        setAllProducts([])

        const limit = 50

        const { products: fetched, pageInfo } = await fetchProducts({
          collectionHandle: category || null,
          tag: activeTag || null,
          limit,
          after: null
        })

        if (cancelled) return

        const mapped = mapShopifyToUI(fetched)
        setAllProducts(mapped)
        setProducts(mapped)
        setCursor(pageInfo?.endCursor ?? null)
        setHasNextPage(Boolean(pageInfo?.hasNextPage))
      } catch (err) {
        console.error('Failed to load Shopify products:', err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadProducts()

    return () => {
      cancelled = true
    }
  }, [category, filters, urlTag]) // <-- tag included here!

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...newFilters })
  }

  const loadMore = useCallback(async () => {
    if (!hasNextPage || pageLoading) return

    try {
      setPageLoading(true)
      const limit = 12

      const { products: fetched, pageInfo } = await fetchProducts({
        collectionHandle: category || null,
        tag: activeTag || null,
        limit,
        after: cursor
      })

      const mapped = mapShopifyToUI(fetched)
      setAllProducts((prev) => [...prev, ...mapped])
      setProducts((prev) => [...prev, ...mapped])
      setCursor(pageInfo?.endCursor ?? null)
      setHasNextPage(Boolean(pageInfo?.hasNextPage))
    } catch (err) {
      console.error('Load more failed:', err)
    } finally {
      setPageLoading(false)
    }
  }, [cursor, hasNextPage, pageLoading, category, activeTag])

  if (loading) {
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

  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-center font-rubik text-xl font-bold uppercase text-text-primary">
            {getHeading()}
          </h1>
        </div>

        <FilterSection
          filters={filters} // <-- NEW
          onFilterChange={handleFilterChange}
        />
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
      </div>
    </div>
  )
}

export default Shop
