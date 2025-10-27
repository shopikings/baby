// hooks/useShopify.ts
import { useState, useEffect, useCallback } from 'react'
import client from '../shopifyClient'
import {
  GET_COLLECTIONS,
  GET_ALL_PRODUCTS,
  GET_PRODUCTS_BY_COLLECTION,
  GET_PRODUCT_BY_HANDLE,
  GET_ALL_PRODUCTS_MINIMAL
} from '../queries/shopifyQueries'
import type { ShopifyProduct, Collection, Product } from 'types/shopify'

// ---------- Hooks ---------- //

export const useCollections = (first = 20) => {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true)
        const response = await client.request(GET_COLLECTIONS, {
          variables: { first }
        })

        // Use the correct path
        const collectionsList =
          response.data?.collections?.edges?.map((edge: any) => edge.node) ?? []

        setCollections(collectionsList)
      } catch (err: any) {
        setError(err.message)
        console.error('Error fetching collections:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [first])

  return { collections, loading, error }
}

interface UseProductsReturn {
  products: ShopifyProduct[]
  loading: boolean
  error: string | null
  hasNextPage: boolean
  loadMore: () => Promise<void>
  refetch: (first?: number) => Promise<void>
}

export const useProducts = (initialFirst = 20): UseProductsReturn => {
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [endCursor, setEndCursor] = useState<string | null>(null)

  // Initial fetch
  const fetchProducts = useCallback(
    async (first: number = initialFirst, after: string | null = null) => {
      try {
        setLoading(true)
        const response = await client.request(GET_ALL_PRODUCTS, {
          variables: { first, after }
        })

        if (response?.data?.products) {
          const newProducts = response.data.products.edges.map(
            (edge: any) => edge.node
          )
          const pageInfo = response.data.products.pageInfo

          if (after) {
            // Append new products for load more
            setProducts((prev) => [...prev, ...newProducts])
          } else {
            // Replace products for initial load or refetch
            setProducts(newProducts)
          }

          setEndCursor(pageInfo.endCursor)
          setHasNextPage(pageInfo.hasNextPage)
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    },
    [initialFirst]
  )

  // Load more products
  const loadMore = useCallback(async () => {
    if (!endCursor || !hasNextPage) return

    try {
      setLoading(true)
      const response = await client.request(GET_ALL_PRODUCTS, {
        variables: { first: 12, after: endCursor } // Load 12 more products
      })

      if (response?.data?.products) {
        const newProducts = response.data.products.edges.map(
          (edge: any) => edge.node
        )
        const pageInfo = response.data.products.pageInfo

        setProducts((prev) => [...prev, ...newProducts])
        setEndCursor(pageInfo.endCursor)
        setHasNextPage(pageInfo.hasNextPage)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      console.error('Error loading more products:', err)
    } finally {
      setLoading(false)
    }
  }, [endCursor, hasNextPage])

  // Refetch with different parameters
  const refetch = useCallback(
    async (first?: number) => {
      await fetchProducts(first || initialFirst, null)
    },
    [fetchProducts, initialFirst]
  )

  // Initial load
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return {
    products,
    loading,
    error,
    hasNextPage,
    loadMore,
    refetch
  }
}

export const useProductsByCollection = (
  collectionHandle: string,
  first = 20
) => {
  const [products, setProducts] = useState<Product[]>([])
  const [collection, setCollection] = useState<Collection | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProductsByCollection = async () => {
      try {
        setLoading(true)
        // REMOVE the generic type <{...}> from client.request
        const response = await client.request(GET_PRODUCTS_BY_COLLECTION, {
          variables: { collectionHandle, first }
        })

        // Access the data through response.data instead of data directly
        if (response.data?.collection) {
          setCollection(response.data.collection)
          const productsList = response.data.collection.products.edges.map(
            (edge: any) => edge.node
          )
          setProducts(productsList)
        }
      } catch (err: any) {
        setError(err.message)
        console.error('Error fetching products by collection:', err)
      } finally {
        setLoading(false)
      }
    }

    if (collectionHandle) {
      fetchProductsByCollection()
    }
  }, [collectionHandle, first])

  return { products, collection, loading, error }
}

export const useProductByHandle = (handle: string) => {
  const [product, setProduct] = useState<ShopifyProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) {
        console.log('❌ No handle provided')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        console.log('🔄 Fetching product with handle:', handle)

        const response = await client.request(GET_PRODUCT_BY_HANDLE, {
          variables: { handle }
        })

        console.log('📦 Full API response:', response)
        console.log('🎯 Product data:', response?.data?.product)

        if (response?.data?.product) {
          setProduct(response.data.product)
          console.log('✅ Product found:', response.data.product.title)
        } else {
          console.log('❌ Product not found in response')
          setError('Product not found')
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error'
        console.error('🚨 Error fetching product:', err)
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [handle])

  return { product, loading, error }
}
