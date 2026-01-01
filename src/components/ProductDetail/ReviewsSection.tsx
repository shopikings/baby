interface Review {
  author: string
  initials: string
  rating: number
  comment: string
}

interface ReviewsSectionProps {
  averageRating: number
  totalReviews: number
  reviews: Review[]
}

function ReviewsSection({
  averageRating,
  totalReviews,
  reviews
}: ReviewsSectionProps) {
  return (
    <div className="mt-16">
      <h2 className="mb-6 font-rubik text-2xl font-medium text-text-primary">
        Reviews
      </h2>
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="flex items-start gap-8">
          <div className="text-center">
            <div className="font-rubik text-5xl font-semibold text-text-primary">
              {averageRating.toFixed(1)}
            </div>
            <div className="mt-2 flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="size-4"
                  fill="#444B59"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="mt-1 font-raleway text-sm text-gray-600">
              Based on {totalReviews} reviews
            </p>
          </div>

          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="font-raleway text-sm text-gray-600">
                  {rating}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full bg-[#444B59]"
                    style={{
                      width: rating === 5 ? '100%' : rating === 4 ? '0%' : '0%'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="border-t pt-6">
              <div className="flex items-start gap-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-gray-200 font-raleway text-sm font-medium">
                  {review.initials}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-raleway text-sm font-medium">
                      {review.author}
                    </span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="size-3"
                          fill="#444B59"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 font-raleway text-sm text-gray-600">
                    {review.comment}
                  </p>
                  <div className="mt-2 flex gap-4">
                    <button className="font-raleway text-xs text-gray-500 hover:text-gray-700">
                      Helpful
                    </button>
                    <button className="font-raleway text-xs text-gray-500 hover:text-gray-700">
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

export default ReviewsSection
