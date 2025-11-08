import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterSection from 'components/FilterSection'
import ShopProductCard from 'components/ShopProductCard'
import { fetchProducts } from '../utils/shopify'

function Shop() {
  const [filters, setFilters] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category') // ← e.g. "activities-and-toys"

  const [products, setProducts] = useState<any[]>([])
  const [cursor, setCursor] = useState<string | null>(null)
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)
  const [pageLoading, setPageLoading] = useState<boolean>(false)

  const getHeading = () => {
    if (!category) return 'Shop All'
    return category
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const mapShopifyToUI = (items: any[]) => {
    return items.map((p: any, index: number) => ({
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
      rating: 4
    }))
  }

  // 🔹 Load products on first mount or when filters/category change
  useEffect(() => {
    let cancelled = false
    const loadFirst = async () => {
      try {
        setLoading(true)
        setCursor(null)
        setHasNextPage(false)
        setProducts([])

        const limit = 12
        const { products: fetched, pageInfo } = await fetchProducts({
          // 🟢 Collection support (category from URL)
          collectionHandle: category || null,
          tag: filters.tag || null,
          limit,
          after: null
        })

        if (cancelled) return
        setProducts(mapShopifyToUI(fetched))
        setCursor(pageInfo?.endCursor ?? null)
        setHasNextPage(Boolean(pageInfo?.hasNextPage))
      } catch (err) {
        console.error('Failed to load Shopify products:', err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadFirst()
    return () => {
      cancelled = true
    }
  }, [category, filters])

  // 🔹 Load more (pagination)
  const loadMore = useCallback(async () => {
    if (!hasNextPage || pageLoading) return
    try {
      setPageLoading(true)
      const limit = 12
      const { products: fetched, pageInfo } = await fetchProducts({
        collectionHandle: category || null,
        tag: filters.tag || null,
        limit,
        after: cursor
      })

      setProducts((prev) => [...prev, ...mapShopifyToUI(fetched)])
      setCursor(pageInfo?.endCursor ?? null)
      setHasNextPage(Boolean(pageInfo?.hasNextPage))
    } catch (err) {
      console.error('Load more failed:', err)
    } finally {
      setPageLoading(false)
    }
  }, [cursor, hasNextPage, pageLoading, category, filters])

  const handleFilterChange = (newFilters: unknown) => {
    setFilters(newFilters)
  }

  // 🔹 Loader
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mb-4 inline-block size-12 animate-spin rounded-full border-4 border-solid border-button-hover border-r-transparent"></div>
          <p className="font-inter text-lg text-gray-600">
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

        {/* 🧩 Filter Section (tags etc.) */}
        <FilterSection onFilterChange={handleFilterChange} />

        {/* 🛍️ Product Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {products.map((product) => (
            <ShopProductCard
              key={product.id}
              id={product.id}
              mainImage={product.mainImage}
              variantImages={product.variantImages}
              title={product.title}
              price={product.price}
              rating={product.rating}
              className="scale-90"
            />
          ))}
        </div>

        {/* 🔹 Load More Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMore}
            disabled={!hasNextPage || pageLoading}
            className={`rounded-none px-8 py-3 font-inter text-sm font-medium uppercase text-white transition-colors ${
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
