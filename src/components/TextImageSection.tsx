interface TextImageSectionProps {
  title: string
  description: string
  image: string
  imageAlt: string
  reverse?: boolean
  backgroundColor?: 'white' | 'cream'
}

function TextImageSection({
  title,
  description,
  image,
  imageAlt,
  reverse = false,
  backgroundColor = 'white'
}: TextImageSectionProps) {
  const bgClass = backgroundColor === 'cream' ? 'bg-cream' : 'bg-white'

  return (
    <section className={`${bgClass} py-12 sm:py-16 lg:py-20`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16 ${
            reverse ? 'lg:grid-flow-col-dense' : ''
          }`}
        >
          <div
            className={`overflow-hidden rounded-xl ${
              reverse ? 'lg:col-start-1' : 'lg:order-2'
            }`}
          >
            <img
              src={image}
              alt={imageAlt}
              className="h-[400px] w-full object-cover sm:h-96 lg:h-[650px]"
            />
          </div>

          <div
            className={`flex flex-col justify-center ${
              reverse ? 'lg:col-start-2' : 'lg:order-1'
            }`}
          >
            <h2 className="mb-6 font-rubik text-2xl font-bold text-text-primary sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p className="font-raleway text-xs leading-relaxed text-text-primary/80 sm:text-sm lg:text-base">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TextImageSection
