function AboutBanner() {
  return (
    <section className="relative h-96 w-full overflow-hidden sm:h-[500px] lg:h-[600px]">
      <img
        src="/assets/images/about-banner.webp"
        alt="Children playing with toys - Our Story"
        className="size-full object-cover"
      />

      <div className="absolute inset-0">
        <div className="flex h-full items-center justify-center">
          <div className="rounded-none bg-black/40 px-8 py-4 sm:px-5 sm:py-2">
            <h1 className="font-raleway text-4xl font-semibold text-white sm:text-5xl md:text-5xl lg:text-6xl">
              OUR STORY
            </h1>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutBanner
