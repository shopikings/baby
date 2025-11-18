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
    const variables: any = { first: limit }
    if (after) variables.after = after

    // 🧠 CASE 0: BOTH tag AND collection → Use collection query with tag filter
    if (tag && collectionHandle) {
      const query = `
    query ($first: Int${after ? ', $after: String' : ''}) {
      products(
        first: $first
        ${after ? ', after: $after' : ''}
        , query: "collection:${collectionHandle} AND tag:${tag}"
      ) {
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
            variants(first: 10) {
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

      const data = await graphql(query, {
        first: limit,
        after: after || undefined
      })

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
    }

    // 🧠 CASE 1: Only tag → global tag search
    if (tag) {
      const query = `
        query ($first: Int${after ? ', $after: String' : ''}) {
          products(first: $first${
            after ? ', after: $after' : ''
          }, query: "tag:${tag}") {
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
    }

    // 🧠 CASE 2: Only collectionHandle → fetch collection
    if (collectionHandle) {
      const query = `
        query ($handle: String!, $first: Int${
          after ? ', $after: String' : ''
        }) {
          collectionByHandle(handle: $handle) {
            products(first: $first${after ? ', after: $after' : ''}) {
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

      const data = await graphql(query, {
        handle: collectionHandle,
        first: limit,
        after: after || undefined
      })

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

    // 🧠 CASE 3: No tag, no collection → fetch all products
    const query = `
      query ($first: Int${after ? ', $after: String' : ''}) {
        products(first: $first${after ? ', after: $after' : ''}) {
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

export async function fetchProductById(id: string) {
  const query = `
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        title
        description
        tags
        images(first: 10) {
          edges {
            node {
              url
            }
          }
        }
        variants(first: 5) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `

  const response = await fetch(
    `https://maison-drake.myshopify.com/api/2024-04/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': import.meta.env
          .VITE_SHOPIFY_STOREFRONT_TOKEN
      },
      body: JSON.stringify({
        query,
        variables: { id }
      })
    }
  )

  const { data, errors } = await response.json()
  if (errors) {
    console.error(errors)
    throw new Error('Shopify GraphQL error')
  }

  const product = data?.product
  if (!product) throw new Error('Product not found')

  return {
    ...product,
    images: product.images.edges.map((e: any) => e.node),
    variants: product.variants.edges.map((e: any) => e.node)
  }
}

export type ShopifyBlogArticle = {
  id: string
  title: string
  handle: string
  author: string
  image: string | null
  imageAlt?: string | null
  publishedAt: string
  contentHtml: string
  tags: string[]
}

export type ShopifyBlog = {
  id: string
  title: string
  handle: string
  articles: ShopifyBlogArticle[]
}

export async function fetchBlogs({
  limit = 1
}: {
  limit?: number
}): Promise<ShopifyBlog[]> {
  const query = `
    query GetAllBlogs($first: Int = 10) {
      blogs(first: $first) {
        edges {
          node {
            id
            title
            handle
            articles(first: 10) {
              edges {
                node {
                  id
                  title
                  handle
                  author { name }
                  image {
                    url
                    altText
                  }
                  publishedAt
                  contentHtml
                  tags
                }
              }
            }
          }
        }
      }
    }
  `

  try {
    const data = await graphql(query, { first: limit })

    const blogs = (data?.blogs?.edges || []).map((blogEdge: any) => {
      const blog = blogEdge.node

      const articles = (blog.articles?.edges || []).map((a: any) => {
        const n = a.node
        return {
          id: n.id,
          title: n.title,
          handle: n.handle,
          author: n.author?.name || 'Unknown',
          image: n.image?.url || null,
          imageAlt: n.image?.altText || null,
          publishedAt: n.publishedAt,
          contentHtml: n.contentHtml,
          tags: n.tags || []
        } as ShopifyBlogArticle
      })

      return {
        id: blog.id,
        title: blog.title,
        handle: blog.handle,
        articles
      } as ShopifyBlog
    })

    return blogs
  } catch (err) {
    console.error('fetchBlogs error:', err)
    return []
  }
}

export async function fetchBlogArticleByHandle(
  handle: string
): Promise<ShopifyBlogArticle | null> {
  if (!handle) return null // We use the global 'articles' connection and filter by the handle.
  // We request only the first matching article.

  const query = `
    query GetArticleByHandle($handle: String!) {
      articles(first: 1, query: $handle) {
        edges {
          node {
            id
            title
            handle
            author { name }
            image {
              url
              altText
            }
            publishedAt
            contentHtml
            tags
          }
        }
      }
    }
  `

  try {
    const data = await graphql(query, { handle })

    const articleNode = data?.articles?.edges?.[0]?.node
    if (!articleNode) {
      return null // Article not found
    } // Map the Shopify response to your defined type

    return {
      id: articleNode.id,
      title: articleNode.title,
      handle: articleNode.handle,
      author: articleNode.author?.name || 'Unknown',
      image: articleNode.image?.url || null,
      imageAlt: articleNode.image?.altText || null,
      publishedAt: articleNode.publishedAt,
      contentHtml: articleNode.contentHtml,
      tags: articleNode.tags || []
    } as ShopifyBlogArticle
  } catch (err) {
    console.error(`fetchBlogArticleByHandle error for handle ${handle}:`, err) // Return null or rethrow, depending on how you want to handle errors in the calling component
    return null
  }
}
