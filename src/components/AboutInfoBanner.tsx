function AboutInfoBanner() {
  const features = [
    {
      icon: '/assets/icons/shipping-outline.svg',
      title: 'Free Shipping',
      description: 'on all orders over $50'
    },
    {
      icon: '/assets/icons/tickOutline.svg',
      title: 'Free Returns',
      description: 'within 45 days of purchase'
    },
    {
      icon: '/assets/icons/donations.svg',
      title: 'Frequent Donations',
      description: "to children's charities"
    }
  ]

  return (
    <section className="bg-black py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col divide-y divide-white/20 sm:grid sm:grid-cols-3 sm:divide-x sm:divide-y-0">
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

export default AboutInfoBanner
