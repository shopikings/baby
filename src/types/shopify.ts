export interface ShopifyImage {
  url: string
  altText: string | null
}

export interface Price {
  amount: string
  currencyCode: string
}

export interface PriceRange {
  minVariantPrice: Price
  maxVariantPrice?: Price
}

export interface CompareAtPriceRange {
  maxVariantPrice?: Price
}

export interface Collection {
  id: string
  title: string
  handle: string
}

export interface ProductVariant {
  availableForSale: boolean
  price: Price
  compareAtPrice?: Price
  selectedOptions: Array<{
    name: string
    value: string
  }>
}

export interface ShopifyProduct {
  id: string
  title: string
  handle: string
  description: string
  featuredImage: ShopifyImage | null
  images: {
    edges: Array<{
      node: ShopifyImage
    }>
  }
  priceRange: PriceRange
  compareAtPriceRange: CompareAtPriceRange
  createdAt: string
  collections: {
    edges: Array<{
      node: Collection
    }>
  }
  tags: string[]
  variants: {
    edges: Array<{
      node: ProductVariant
    }>
  }
}

export interface TransformedProduct {
  id: string
  mainImage: string
  variantImages: string[]
  title: string
  price: string
  comparePrice?: string
  rating: number
  className: string
  handle: string
  shopifyData: {
    handle: string
    isOnSale: boolean
    isNew: boolean
    tags: string[]
    collections: string[]
    createdAt: string
    priceAmount: number
    comparePriceAmount?: number
    allImages: string[]
    availableForSale: boolean
    variants: ProductVariant[]
  }
}

// ADD THESE MISSING TYPES:
export interface Filters {
  sale: boolean
  newIn: boolean
  gender: string
  size: string
  category: string
  brand: string
  sort: string
  colour: string
  pattern: string
  use: string
  length: string
  style: string
}

// Add Product type for use in hooks
export interface Product {
  id: string
  title: string
  handle: string
  vendor?: string
  // Add other fields as needed
}
