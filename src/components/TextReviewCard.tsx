import Star from './Star'

interface TextReviewCardProps {
  rating: number
  title: string
  review: string
  author: string
  location?: string
}

function TextReviewCard({
  rating,
  title,
  review,
  author,
  location
}: TextReviewCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star key={index} filled={index < rating} />
    ))
  }

  return (
    <div className="h-80 w-full rounded-2xl bg-text-primary p-6 text-white sm:h-full">
      <div className="mb-4 flex gap-1">{renderStars(rating)}</div>

      <h3 className="mb-4 font-rubik text-xl font-semibold leading-tight">
        {title}
      </h3>

      <p className="mb-4 font-raleway text-base leading-relaxed">{review}</p>

      <div className="mb-[30%]">
        <p className="font-inter text-sm font-semibold">{author}</p>
        {location && (
          <p className="font-inter text-sm text-white/50">{location}</p>
        )}
      </div>
    </div>
  )
}

export default TextReviewCard
