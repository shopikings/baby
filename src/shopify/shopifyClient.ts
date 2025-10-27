import { createStorefrontApiClient } from '@shopify/storefront-api-client'

const client = createStorefrontApiClient({
  storeDomain: import.meta.env.VITE_SHOPIFY_DOMAIN,
  apiVersion: '2025-10',
  publicAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN
})

export default client
