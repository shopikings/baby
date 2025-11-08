export type ShopifyProduct = {
  id: string
  title: string
  tags: string[]
  description: string
  images: string[]
  price: string
}

const API_VERSION = '2024-10'

function domain() {
  return import.meta.env.VITE_SHOPIFY_DOMAIN || ''
}
function token() {
  return import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || ''
}

async function graphql(query: string, variables: Record<string, any> = {}) {
  const d = domain()
  const t = token()
  if (!d || !t)
    throw new Error(
      'Missing VITE_SHOPIFY_DOMAIN or VITE_SHOPIFY_STOREFRONT_TOKEN'
    )

  const res = await fetch(`https://${d}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': t
    },
    body: JSON.stringify({ query, variables })
  })

  const json = await res.json()
  if (json.errors) throw new Error(JSON.stringify(json.errors))
  return json.data
}

/**
 * Fetch products with optional collection, tag, limit and pagination cursor.
 */
export async function fetchProducts({
  collectionHandle = null,
  tag = null,
  limit = 12,
  after = null
}: {
  collectionHandle?: string | null
  tag?: string | null
  limit?: number
  after?: string | null
}): Promise<{
  products: ShopifyProduct[]
  pageInfo: { hasNextPage: boolean; endCursor: string | null }
}> {
  try {
    const afterPart = after ? `, after: "${after}"` : ''
    const tagQuery = tag ? `, query: "tag:${tag}"` : ''

    // ✅ If collectionHandle is provided, fetch products from that collection
    if (collectionHandle) {
      const query = `
        query ($handle: String!, $first: Int${
          after ? ', $after: String' : ''
        }) {
          collectionByHandle(handle: $handle) {
            products(first: $first${
              after ? ', after: $after' : ''
            }${tagQuery}) {
              edges {
                cursor
                node {
                  id
                  title
                  tags
                  description
                  images(first: 10) {
                    edges { node { src } }
                  }
                  variants(first: 1) {
                    edges { node { price { amount } } }
                  }
                }
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
        }
      `
      const variables: any = { handle: collectionHandle, first: limit }
      if (after) variables.after = after

      const data = await graphql(query, variables)
      const edges = data?.collectionByHandle?.products?.edges || []
      const pageInfo = data?.collectionByHandle?.products?.pageInfo || {
        hasNextPage: false,
        endCursor: null
      }

      const products = edges.map((e: any) => {
        const n = e.node
        return {
          id: n.id,
          title: n.title,
          tags: n.tags || [],
          description: n.description || '',
          images: (n.images?.edges || [])
            .map((ie: any) => ie.node?.src)
            .filter(Boolean),
          price: n.variants?.edges?.[0]?.node?.price?.amount || '0.00'
        } as ShopifyProduct
      })

      return { products, pageInfo }
    }

    // ✅ Otherwise, fallback to global product list
    const query = `
      query ($first: Int${after ? ', $after: String' : ''}) {
        products(first: $first${after ? ', after: $after' : ''}${tagQuery}) {
          edges {
            cursor
            node {
              id
              title
              tags
              description
              images(first: 10) {
                edges { node { src } }
              }
              variants(first: 1) {
                edges { node { price { amount } } }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `
    const variables: any = { first: limit }
    if (after) variables.after = after

    const data = await graphql(query, variables)
    const edges = data?.products?.edges || []
    const pageInfo = data?.products?.pageInfo || {
      hasNextPage: false,
      endCursor: null
    }

    const products = edges.map((e: any) => {
      const n = e.node
      return {
        id: n.id,
        title: n.title,
        tags: n.tags || [],
        description: n.description || '',
        images: (n.images?.edges || [])
          .map((ie: any) => ie.node?.src)
          .filter(Boolean),
        price: n.variants?.edges?.[0]?.node?.price?.amount || '0.00'
      } as ShopifyProduct
    })

    return { products, pageInfo }
  } catch (err) {
    console.error('shopify.fetchProducts error:', err)
    return { products: [], pageInfo: { hasNextPage: false, endCursor: null } }
  }
}
