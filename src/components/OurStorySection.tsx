function OurStorySection() {
  return (
    <section className="bg-cream py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-72 sm:h-96 lg:h-[26rem]">
            <div className="absolute left-0 top-0 overflow-hidden rounded-3xl">
              <img
                src="/assets/images/ourStoryOne.png"
                alt="Mother and child"
                className="h-64 w-48 object-cover sm:h-80 sm:w-64 lg:h-96 lg:w-80"
              />
            </div>

            <div className="absolute right-0 top-2 overflow-hidden rounded-3xl sm:top-4">
              <img
                src="/assets/images/ourStoryTwo.png"
                alt="Child playing"
                className="h-64 w-48 object-cover sm:h-80 sm:w-64 lg:h-96 lg:w-80"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-rubik text-3xl font-bold text-text-primary sm:text-4xl md:text-5xl lg:text-6xl">
              OUR STORY
            </h2>

            <div className="space-y-4">
              <h3 className="font-inter text-lg font-semibold text-text-primary sm:text-xl">
                Maison Baby & Kids - Curated Comfort for Tiny Humans.
              </h3>

              <p className="font-inter text-base leading-relaxed text-text-primary/80 sm:text-lg">
                We believe in providing the best for your little ones. At Maison
                Baby & Kids, we are dedicated to offering a curated selection of
                high-quality, safe, and beautifully designed baby and toddler
                products. From essential gear to unique toys and stylish
                clothing, our mission is to make your parenting journey a little
                easier and a lot more joyful.
              </p>
            </div>

            <button className="rounded-full bg-button-hover px-8 py-3 font-inter text-sm font-medium text-white transition-colors hover:bg-button-hover/90 sm:text-base">
              READ MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurStorySection
