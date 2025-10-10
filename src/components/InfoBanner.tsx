function InfoBanner() {
  const features = [
    {
      icon: '/assets/icons/shipping-outline.svg',
      title: 'Free Shipping',
      description: 'on all orders over $70'
    },
    {
      icon: '/assets/icons/intagram-outline.svg',
      title: 'Follow for latest',
      description: 'update on Instagram'
    },
    {
      icon: '/assets/icons/return-outline.svg',
      title: 'Free Easy Returns',
      description: 'within 45 days of purchase'
    },
    {
      icon: '/assets/icons/heart-outline.svg',
      title: 'Regular Donations',
      description: "to children's charities"
    }
  ]

  return (
    <section className="bg-black py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col divide-y divide-white/20 sm:grid sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:flex lg:flex-row">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex-1 px-4 py-6 text-center sm:px-6 sm:py-8 lg:px-8"
            >
              <div className="mb-3 flex justify-center sm:mb-4">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="size-5 sm:size-6 lg:size-7"
                />
              </div>
              <h3 className="mb-2 font-rubik text-base font-semibold text-white sm:text-lg lg:text-xl">
                {feature.title}
              </h3>
              <p className="font-raleway text-xs text-white/70 sm:text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InfoBanner
