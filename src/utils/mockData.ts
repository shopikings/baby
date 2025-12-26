export const mockProductImages = [
  'https://via.placeholder.com/400x400?text=Product+1',
  'https://via.placeholder.com/400x400?text=Product+2',
  'https://via.placeholder.com/400x400?text=Product+3',
  'https://via.placeholder.com/400x400?text=Product+4',
  'https://via.placeholder.com/400x400?text=Product+5',
  'https://via.placeholder.com/400x400?text=Product+6',
  'https://via.placeholder.com/400x400?text=Product+7',
  'https://via.placeholder.com/400x400?text=Product+8',
  'https://via.placeholder.com/400x400?text=Product+9',
  'https://via.placeholder.com/400x400?text=Product+10',
  'https://via.placeholder.com/400x400?text=Product+11',
  'https://via.placeholder.com/400x400?text=Product+12',
  'https://via.placeholder.com/400x400?text=Product+13',
  'https://via.placeholder.com/400x400?text=Product+14',
  'https://via.placeholder.com/400x400?text=Product+15',
  'https://via.placeholder.com/400x400?text=Product+16'
]

export const mockProduct = {
  id: 'gid://shopify/Product/mock-1',
  title: 'Sample Product',
  description: '<p>This is a sample product description</p>',
  price: '99.99',
  images: mockProductImages.map(url => ({ url })),
  variants: [
    {
      id: 'gid://shopify/ProductVariant/mock-1',
      title: 'Default',
      price: { amount: '99.99', currencyCode: 'USD' },
      selectedOptions: [
        { name: 'Size', value: 'M' },
        { name: 'Color', value: 'Blue' }
      ]
    }
  ],
  reviews: []
}
