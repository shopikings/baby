interface ImageReviewCardProps {
  image: string
  title: string
  author: string
}

function ImageReviewCard({ image, title, author }: ImageReviewCardProps) {
  return (
    <div className="h-80 w-full sm:h-96">
      <div className="mb-4 h-48 w-full overflow-hidden rounded-2xl sm:h-56 md:h-52 lg:h-48 xl:h-52">
        <img src={image} alt={title} className="size-full object-cover" />
      </div>
      <div className="mt-12">
        <h3 className="mb-2 font-rubik text-xl font-bold text-text-primary">
          {title}
        </h3>
        <p className="font-inter text-sm font-medium text-text-primary">
          {author}
        </p>
      </div>
    </div>
  )
}

export default ImageReviewCard
