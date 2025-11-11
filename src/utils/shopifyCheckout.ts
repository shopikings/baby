const API_VERSION = '2024-10'
const DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN
const TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN

async function shopifyRequest(query: string, variables: any = {}) {
  const res = await fetch(`https://${DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN
    },
    body: JSON.stringify({ query, variables })
  })
  const json = await res.json()
  if (json.errors) throw new Error(JSON.stringify(json.errors))
  return json.data
}

// Create a new cart
export async function createCart(lineItems: any[]) {
  const query = `
    mutation CreateCart($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    title
                    price {
                      amount
                    }
                    product {
                      title
                      images(first: 1) {
                        edges { node { src } }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `
  const data = await shopifyRequest(query, { lines: lineItems })
  return data.cartCreate.cart
}

// Add items to an existing cart
export async function addToCart(cartId: string, lineItems: any[]) {
  const query = `
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    title
                    price {
                      amount
                    }
                    product {
                      title
                      images(first: 1) {
                        edges { node { src } }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `
  const data = await shopifyRequest(query, { cartId, lines: lineItems })
  return data.cartLinesAdd.cart
}
