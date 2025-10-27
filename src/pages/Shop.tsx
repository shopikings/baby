import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterSection from 'components/FilterSection'
import ShopProductCard from 'components/ShopProductCard'
import { useProducts } from 'shopify/products/useShopify'
import type { ShopifyProduct, TransformedProduct, Filters } from 'types/shopify'
import {
  isProductNew,
  calculateProductRating,
  formatPrice
} from 'utils/shopifyHelpers'

function Shop() {
  const {
    products: shopifyProducts,
    loading: shopifyLoading,
    error,
    hasNextPage,
    loadMore
  } = useProducts(20)

  const [filters, setFilters] = useState<Filters>({
    sale: false,
    newIn: false,
    gender: '',
    size: '',
    category: '',
    brand: '',
    sort: '',
    colour: '',
    pattern: '',
    use: '',
    length: '',
    style: ''
  })
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [searchParams] = useSearchParams()

  const category = searchParams.get('category')

  const getHeading = () => {
    if (!category) return 'Shop All'
    return category
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Handle load more
  const handleLoadMore = async () => {
    if (loadingMore || !hasNextPage) return

    const currentScrollY = window.scrollY
    const currentCount = shopifyProducts.length

    setLoadingMore(true)
    try {
      await loadMore()

      setTimeout(() => {
        const newCount = shopifyProducts.length
        const productsAdded = newCount - currentCount

        if (productsAdded > 0) {
          const estimatedRowHeight = 600
          window.scrollTo({
            top: currentScrollY - estimatedRowHeight,
            behavior: 'smooth'
          })
        }
      }, 100)
    } catch (error) {
      console.error('Error loading more products:', error)
    } finally {
      setLoadingMore(false)
    }
  }

  // Enhanced product transformation
  const transformedProducts = useMemo((): TransformedProduct[] => {
    return shopifyProducts.map((product: ShopifyProduct) => {
      const mainImage =
        product.featuredImage?.url || '/assets/images/placeholder-product.png'

      const allImages =
        product.images?.edges?.map((edge) => edge.node.url) || []
      const variantImages = allImages.length > 0 ? allImages : [mainImage]

      const priceAmount = parseFloat(product.priceRange.minVariantPrice.amount)
      const comparePriceAmount = product.compareAtPriceRange?.maxVariantPrice
        ?.amount
        ? parseFloat(product.compareAtPriceRange.maxVariantPrice.amount)
        : undefined

      const price =
        priceAmount > 0 ? `$${priceAmount.toFixed(2)}` : 'Coming Soon'
      const comparePrice =
        comparePriceAmount && comparePriceAmount > priceAmount
          ? `$${comparePriceAmount.toFixed(2)}`
          : undefined

      const isOnSale = !!(
        comparePriceAmount && comparePriceAmount > priceAmount
      )
      const isNew = isProductNew(product.createdAt)
      const availableForSale =
        product.variants?.edges?.some((edge) => edge.node.availableForSale) ||
        false

      const productCollections =
        product.collections?.edges?.map((edge) => edge.node.title) || []
      const productTags = product.tags || []

      return {
        id: product.id,
        mainImage,
        variantImages,
        title: product.title,
        price,
        comparePrice,
        rating: calculateProductRating(product),
        className: 'scale-90',
        handle: product.handle,
        shopifyData: {
          handle: product.handle,
          isOnSale,
          isNew,
          tags: productTags,
          collections: productCollections,
          createdAt: product.createdAt,
          priceAmount,
          comparePriceAmount,
          allImages,
          availableForSale,
          variants: product.variants?.edges?.map((edge) => edge.node) || []
        }
      }
    })
  }, [shopifyProducts])

  // Real filtering with actual Shopify data - FIXED DEPENDENCIES
  const filteredProducts = useMemo(() => {
    let filtered = [...transformedProducts]

    // Filter by URL category
    if (category) {
      const categoryName = category
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      filtered = filtered.filter((product) =>
        product.shopifyData.collections.some((collection) =>
          collection.toLowerCase().includes(categoryName.toLowerCase())
        )
      )
    }

    // Real sale filter
    if (filters.sale) {
      filtered = filtered.filter((product) => product.shopifyData.isOnSale)
    }

    // Real new in filter
    if (filters.newIn) {
      filtered = filtered.filter((product) => product.shopifyData.isNew)
    }

    // Real category filter
    if (filters.category) {
      filtered = filtered.filter((product) =>
        product.shopifyData.collections.some((collection) =>
          collection.toLowerCase().includes(filters.category.toLowerCase())
        )
      )
    }

    // Real brand filter using tags
    if (filters.brand) {
      filtered = filtered.filter((product) =>
        product.shopifyData.tags.some((tag) =>
          tag.toLowerCase().includes(filters.brand.toLowerCase())
        )
      )
    }

    // Gender filter using tags or collections
    if (filters.gender) {
      filtered = filtered.filter(
        (product) =>
          product.shopifyData.tags.some((tag) =>
            tag.toLowerCase().includes(filters.gender.toLowerCase())
          ) ||
          product.shopifyData.collections.some((collection) =>
            collection.toLowerCase().includes(filters.gender.toLowerCase())
          )
      )
    }

    // Apply sorting
    if (filters.sort) {
      switch (filters.sort) {
        case 'Price: Low to High':
          filtered.sort(
            (a, b) => a.shopifyData.priceAmount - b.shopifyData.priceAmount
          )
          break
        case 'Price: High to Low':
          filtered.sort(
            (a, b) => b.shopifyData.priceAmount - a.shopifyData.priceAmount
          )
          break
        case 'Newest First':
          filtered.sort(
            (a, b) =>
              new Date(b.shopifyData.createdAt).getTime() -
              new Date(a.shopifyData.createdAt).getTime()
          )
          break
        case 'Best Selling':
          filtered.sort((a, b) => b.rating - a.rating)
          break
        default:
          break
      }
    }

    return filtered
  }, [transformedProducts, filters, category]) // ADDED MISSING DEPENDENCIES

  // Dynamic filter counts for FilterSection
  const filterCounts = useMemo(() => {
    const saleCount = transformedProducts.filter(
      (p) => p.shopifyData.isOnSale
    ).length
    const newInCount = transformedProducts.filter(
      (p) => p.shopifyData.isNew
    ).length

    return {
      sale: saleCount,
      newIn: newInCount
    }
  }, [transformedProducts])

  // Extract dynamic filter options from Shopify data - FIXED VENDOR REFERENCE
  const dynamicFilterOptions = useMemo(() => {
    const options = {
      gender: new Set<string>(),
      size: new Set<string>(),
      category: new Set<string>(),
      brand: new Set<string>(),
      colour: new Set<string>(),
      pattern: new Set<string>(),
      use: new Set<string>(),
      length: new Set<string>(),
      style: new Set<string>()
    }

    transformedProducts.forEach((product) => {
      // Extract from tags and collections
      product.shopifyData.tags.forEach((tag) => {
        const lowerTag = tag.toLowerCase()

        // Gender from tags
        if (
          lowerTag.includes('boy') ||
          lowerTag.includes('girl') ||
          lowerTag.includes('unisex')
        ) {
          options.gender.add(tag)
        }

        // Size from tags
        if (
          lowerTag.includes('month') ||
          lowerTag.includes('m') ||
          lowerTag.includes('t') ||
          lowerTag.match(/\d+m/) ||
          lowerTag.match(/\d+t/)
        ) {
          options.size.add(tag)
        }

        // Brand from tags - REMOVED VENDOR REFERENCE
        if (lowerTag.includes('brand')) {
          options.brand.add(tag)
        }

        // Colour from tags
        if (
          lowerTag.includes('red') ||
          lowerTag.includes('blue') ||
          lowerTag.includes('green') ||
          lowerTag.includes('pink') ||
          lowerTag.includes('yellow') ||
          lowerTag.includes('black') ||
          lowerTag.includes('white') ||
          lowerTag.includes('brown') ||
          lowerTag.includes('color')
        ) {
          options.colour.add(tag)
        }

        // Pattern from tags
        if (
          lowerTag.includes('striped') ||
          lowerTag.includes('floral') ||
          lowerTag.includes('polka') ||
          lowerTag.includes('plaid') ||
          lowerTag.includes('animal') ||
          lowerTag.includes('solid')
        ) {
          options.pattern.add(tag)
        }

        // Use from tags
        if (
          lowerTag.includes('casual') ||
          lowerTag.includes('formal') ||
          lowerTag.includes('sports') ||
          lowerTag.includes('sleep') ||
          lowerTag.includes('outdoor')
        ) {
          options.use.add(tag)
        }

        // Length from tags
        if (
          lowerTag.includes('short') ||
          lowerTag.includes('medium') ||
          lowerTag.includes('long') ||
          lowerTag.includes('full')
        ) {
          options.length.add(tag)
        }

        // Style from tags
        if (
          lowerTag.includes('classic') ||
          lowerTag.includes('modern') ||
          lowerTag.includes('vintage') ||
          lowerTag.includes('trendy') ||
          lowerTag.includes('bohemian')
        ) {
          options.style.add(tag)
        }
      })

      // Extract categories from collections
      product.shopifyData.collections.forEach((collection) => {
        options.category.add(collection)
      })
    })

    // Convert Sets to sorted arrays
    return {
      gender: Array.from(options.gender).sort(),
      size: Array.from(options.size).sort(),
      category: Array.from(options.category).sort(),
      brand: Array.from(options.brand).sort(),
      colour: Array.from(options.colour).sort(),
      pattern: Array.from(options.pattern).sort(),
      use: Array.from(options.use).sort(),
      length: Array.from(options.length).sort(),
      style: Array.from(options.style).sort(),
      sort: [
        'Price: Low to High',
        'Price: High to Low',
        'Newest First',
        'Best Selling'
      ]
    }
  }, [transformedProducts])

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters)
  }

  // Show loading state
  if (shopifyLoading || loading) {
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

  // Show error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <p className="font-inter text-lg text-red-600">
            Error loading products: {error}
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
          <p className="mt-2 text-center font-inter text-sm text-gray-600">
            {filteredProducts.length} products found
            {category && ` in ${getHeading()}`}
          </p>
        </div>

        <FilterSection
          onFilterChange={handleFilterChange}
          filterCounts={filterCounts}
          filterOptions={dynamicFilterOptions}
        />

        {filteredProducts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="font-inter text-lg text-gray-600">
              No products found matching your filters.
            </p>
            <button
              onClick={() =>
                setFilters({
                  sale: false,
                  newIn: false,
                  gender: '',
                  size: '',
                  category: '',
                  brand: '',
                  sort: '',
                  colour: '',
                  pattern: '',
                  use: '',
                  length: '',
                  style: ''
                })
              }
              className="mt-4 rounded-none bg-button-hover px-6 py-2 font-inter text-sm font-medium uppercase text-white transition-colors hover:bg-[#7d969a]"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {filteredProducts.map((product, index) => (
                <ShopProductCard
                  key={`${product.id}-${index}`}
                  id={product.id}
                  mainImage={product.mainImage}
                  variantImages={product.variantImages}
                  title={product.title}
                  price={product.price}
                  comparePrice={product.comparePrice}
                  rating={product.rating}
                  className={product.className}
                  isOnSale={product.shopifyData.isOnSale}
                />
              ))}
            </div>

            {hasNextPage && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="rounded-none bg-button-hover px-8 py-3 font-inter text-sm font-medium uppercase text-white transition-colors hover:bg-[#7d969a] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loadingMore ? (
                    <div className="flex items-center gap-2">
                      <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Loading...
                    </div>
                  ) : (
                    'Load More'
                  )}
                </button>
              </div>
            )}

            {!hasNextPage && filteredProducts.length > 0 && (
              <div className="mt-8 text-center">
                <p className="font-inter text-sm text-gray-500">
                  You've reached the end of products
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Shop
