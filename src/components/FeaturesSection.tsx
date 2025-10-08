function FeaturesSection() {
  const features = [
    {
      image: '/assets/images/home-curated.png',
      title: 'Curated to Stand Out',
      subtitle: 'Small-Batch, Forward, Never Boring'
    },
    {
      image: '/assets/images/home-conscious.png',
      title: 'Conscious, Not Conformist',
      subtitle: 'Sustainable Clothes with Soul'
    },
    {
      image: '/assets/images/home-messy-joy.png',
      title: 'Made for Messy Joy',
      subtitle: 'Playground Personality-Packed'
    },
    {
      image: '/assets/images/home-style-backbone.png',
      title: 'Style with a Backbone',
      subtitle: 'Retro Looks, Real Values'
    }
  ]

  return (
    <section className="bg-cream py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 flex justify-center">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="size-16 object-contain"
                />
              </div>
              <h3 className="mb-1 font-raleway text-base font-medium text-button-hover">
                {feature.title}
              </h3>
              <p className="font-inter text-sm text-text-primary">
                {feature.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
