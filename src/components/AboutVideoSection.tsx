function AboutVideoSection() {
  return (
    <section className="bg-cream py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-24">
          <div className="overflow-hidden rounded-2xl">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-80 w-full object-cover sm:h-96 lg:h-[700px] "
            >
              <source src="/assets/images/about-video.mp4" type="video/mp4" />
              <source src="/assets/images/about-video.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="mb-6 font-rubik text-3xl font-bold text-text-primary sm:text-4xl lg:text-[40px]">
              ABOUT US
            </h2>
            <p className="font-raleway text-xs font-medium leading-relaxed text-text-primary/80 sm:text-sm lg:text-base">
              At Maison Baby & Kids, we believe every child deserves comfort,
              care, and a touch of style. Our mission is to provide parents with
              thoughtfully curated baby and kids essentials that are safe,
              high-quality and beautifully designed. From cozy newborn wear to
              playful outfits and accessories, each piece is chosen with love
              and attention to detail. We partner with trusted brands that share
              our values of comfort, quality, and sustainability.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutVideoSection
