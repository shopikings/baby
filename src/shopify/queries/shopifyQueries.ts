export type ShopifyQuery = string

// Get all collections (categories)
export const GET_COLLECTIONS: ShopifyQuery = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
` as const

// Get products from a specific collection
export const GET_PRODUCTS_BY_COLLECTION: ShopifyQuery = `
  query GetProductsByCollection($collectionHandle: String!, $first: Int!) {
    collection(handle: $collectionHandle) {
      id
      title
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
` as const

// CORRECTED query - fix any syntax issues
// queries/shopifyQueries.ts
export const GET_ALL_PRODUCTS: ShopifyQuery = `
  query GetAllProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
        node {
          id
          title
          handle
          description
          featuredImage {
            url
            altText
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          createdAt
          collections(first: 5) {
            edges {
              node {
                title
                handle
              }
            }
          }
          tags
          variants(first: 10) {
            edges {
              node {
                availableForSale
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
` as const

// Get single product details
export const GET_PRODUCT_BY_HANDLE: ShopifyQuery = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      featuredImage {
        url
        altText
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
          }
        }
      }
    }
  }
` as const

// MINIMAL WORKING QUERY - test if basic data comes through
export const GET_ALL_PRODUCTS_MINIMAL: ShopifyQuery = `
  query GetAllProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          collections(first: 5) {
            edges {
              node {
                title
                handle
              }
            }
          }
        }
      }
    }
  }
` as const
