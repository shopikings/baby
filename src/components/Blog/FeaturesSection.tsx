import React from 'react'

const features = [
  {
    icon: '/assets/icons/customerService.svg',
    title: 'CUSTOMER SERVICE',
    description: 'Available M-F, 8:00am to 4:00pm (GMT)'
  },
  {
    icon: '/assets/icons/shippingCar.svg',
    title: 'FREE SHIPPING ON ORDERS OVER $100',
    description: 'Free US Domestic Shipping when you spend $60 or more!'
  },
  {
    icon: '/assets/icons/returnPolicy.svg',
    title: 'EASY RETURNS',
    description: 'Buy with confidence and enjoy painless, hassle-free returns!'
  },
  {
    icon: '/assets/icons/securePayment.svg',
    title: 'SECURE PAYMENT',
    description: 'Shop safely and securely knowing your experience is protected'
  }
]

export function FeaturesSection() {
  return (
    <div className="bg-cream pb-40 pt-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col items-center border border-gray-200 py-8 text-center lg:border-y lg:border-l-0 lg:py-14 ${
                index !== features.length - 1 ? 'lg:border-r' : 'lg:border-r-0'
              }`}
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="mb-4 size-6 select-none"
              />
              <h3 className="mb-3 font-rubik text-xs font-medium uppercase text-text-primary">
                {feature.title}
              </h3>
              <p className="font-raleway text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
