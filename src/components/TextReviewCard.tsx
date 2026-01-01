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
    return Array.from({ length: 5 }).map((_, index) => {
      const fillPercentage = Math.min(Math.max(rating - index, 0), 1)
      return (
        <div key={index} className="relative inline-block">
          <Star filled={false} />
          {fillPercentage > 0 && (
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercentage * 100}%` }}
            >
              <Star filled={true} />
            </div>
          )}
        </div>
      )
    })
  }

  return (
    <div className="h-80 w-full rounded-2xl bg-text-primary p-6 text-white sm:h-full">
      <div className="mb-4 flex gap-1">{renderStars(rating)}</div>

      <h3 className="mb-4 font-rubik text-xl font-semibold leading-tight">
        {title}
      </h3>

      <p className="mb-4 font-raleway text-base leading-relaxed">{review}</p>

      <div className="mb-[30%]">
        <p className="font-raleway text-sm font-semibold">{author}</p>
        {location && (
          <p className="font-raleway text-sm text-white/50">{location}</p>
        )}
      </div>
    </div>
  )
}

export default TextReviewCard
