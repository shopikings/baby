interface Review {
  id: number
  author: string
  initials: string
  rating: number
  comment: string
}

interface ProductReviewsProps {
  overallRating: number
  totalReviews: number
  reviews: Review[]
}

function ProductReviews({
  overallRating,
  totalReviews,
  reviews
}: ProductReviewsProps) {
  const ratingDistribution = [
    { stars: 5, percentage: 100 },
    { stars: 4, percentage: 0 },
    { stars: 3, percentage: 0 },
    { stars: 2, percentage: 0 },
    { stars: 1, percentage: 0 }
  ]

  return (
    <div className="mt-16">
      <h2 className="mb-6 font-rubik text-2xl font-medium text-text-primary">
        Reviews
      </h2>
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="flex items-start gap-8">
          <div className="text-center">
            <div className="font-rubik text-5xl font-semibold text-text-primary">
              {overallRating.toFixed(1)}
            </div>
            <div className="mt-2 flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="size-4"
                  fill={star <= overallRating ? '#444B59' : '#E5E7EB'}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="mt-1 font-inter text-sm text-gray-600">
              Based on {totalReviews} reviews
            </p>
          </div>

          <div className="flex-1">
            {ratingDistribution.map((rating) => (
              <div key={rating.stars} className="flex items-center gap-3">
                <span className="font-inter text-sm text-gray-600">
                  {rating.stars}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full bg-text-primary"
                    style={{ width: `${rating.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-6">
          {reviews.map((review, index) => (
            <div key={review.id} className={index > 0 ? 'border-t pt-6' : ''}>
              <div className="flex items-start gap-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-gray-200 font-inter text-sm font-medium">
                  {review.initials}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-inter text-sm font-medium">
                      {review.author}
                    </span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="size-3"
                          fill={star <= review.rating ? '#444B59' : '#E5E7EB'}
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 font-inter text-sm text-gray-600">
                    {review.comment}
                  </p>
                  <div className="mt-2 flex gap-4">
                    <button className="font-inter text-xs text-gray-500 hover:text-gray-700">
                      Helpful
                    </button>
                    <button className="font-inter text-xs text-gray-500 hover:text-gray-700">
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductReviews
