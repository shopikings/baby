interface Review {
  id: number
  author: string
  location?: string
  rating: number
  comment: string
  date: string
  color?: string
  verified?: boolean
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
    { stars: 5, count: 0 },
    { stars: 4, count: 0 },
    { stars: 3, count: 0 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 }
  ]

  return (
    <div className="mt-12 bg-cream py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
        <h2 className="mb-6 font-rubik text-sm font-bold text-text-primary">
          Reviews
        </h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/images/product1.png"
                  alt="Product"
                  className="size-16 rounded object-cover"
                />
                <div>
                  <div className="flex items-center gap-0">
                    <span className="font-rubik text-sm font-bold text-text-primary">
                      {overallRating}
                    </span>
                    <span className="font-rubik text-sm text-text-primary">
                      / 5
                    </span>
                  </div>
                  <div className="mt-1 flex gap-0">
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
                    <span className="ml-1 font-inter text-xs text-gray-600">
                      ({totalReviews})
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-inter text-sm font-bold text-text-primary">
                  Review Summary
                </h3>
                <div className="mt-4 space-y-2">
                  {ratingDistribution.map((rating) => (
                    <div key={rating.stars} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-inter text-xs text-gray-600">
                          {rating.stars} Stars
                        </span>
                        <span className="font-inter text-xs text-gray-600">
                          ({rating.count})
                        </span>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full bg-text-primary"
                          style={{
                            width: `${
                              totalReviews > 0
                                ? (rating.count / totalReviews) * 100
                                : 0
                            }%`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="p-4 sm:p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <div className="flex gap-0">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className="size-4"
                              fill={
                                star <= review.rating ? '#444B59' : '#E5E7EB'
                              }
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>
                        <p className="mt-1 font-inter text-xs text-gray-600">
                          {review.date}
                        </p>
                      </div>
                      <div className="space-y-1 sm:space-y-2 sm:text-right">
                        <p className="font-inter text-xs font-bold text-text-primary">
                          {review.author}
                        </p>
                        {review.location && (
                          <p className="font-inter text-xs text-gray-600">
                            {review.location}
                          </p>
                        )}
                        {review.verified && (
                          <div className="mt-1 flex items-center sm:justify-end">
                            <img
                              src="/assets/icons/feefo.svg"
                              alt="Feefo verified"
                              className="h-4"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="mt-3 font-inter text-sm text-text-primary sm:-mt-3">
                      {review.comment}
                    </p>

                    {review.color && (
                      <p className="mt-2 font-inter text-xs text-gray-600">
                        Colour: {review.color}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-inter text-sm text-gray-500">
                No reviews yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductReviews
