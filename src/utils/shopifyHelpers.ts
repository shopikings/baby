// utils/shopifyHelpers.ts
export const isProductNew = (createdAt: string): boolean => {
  if (!createdAt) return false
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  return new Date(createdAt) > thirtyDaysAgo
}

export const calculateProductRating = (product: any): number => {
  const baseRating = 3
  const saleBonus = product.compareAtPriceRange?.maxVariantPrice ? 1 : 0
  const tagBonus = product.tags && product.tags.length > 2 ? 1 : 0
  const imageBonus = product.featuredImage ? 1 : 0
  return Math.min(5, baseRating + saleBonus + tagBonus + imageBonus)
}

export const formatPrice = (amount: string): string => {
  const priceAmount = parseFloat(amount)
  return priceAmount > 0 ? `$${priceAmount.toFixed(2)}` : 'Coming Soon'
}
