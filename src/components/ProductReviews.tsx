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
  const hasReviews = reviews && reviews.length > 0

  return (
    <div className="mt-12 bg-cream py-10">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-6 font-rubik text-sm font-bold text-text-primary">
          Reviews
        </h2>

        {/* If NO REVIEWS */}
        {!hasReviews && (
          <div className="text-center py-10 bg-white rounded-lg shadow">
            <p className="font-inter text-sm text-gray-600">
              No review found on this product.
            </p>
          </div>
        )}

        {/* If REVIEWS exist */}
        {hasReviews && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* LEFT SUMMARY BOX */}
            <div className="lg:col-span-1">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/images/product1.png"
                    alt="Product"
                    className="size-16 rounded object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-rubik text-sm font-bold text-text-primary">
                        {overallRating}
                      </span>
                      <span className="font-rubik text-sm text-text-primary">
                        / 5
                      </span>
                    </div>

                    <div className="mt-1 flex">
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
                      <span className="ml-2 font-inter text-xs text-gray-600">
                        ({totalReviews})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT REVIEW LIST */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-lg bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex">
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
                        <p className="mt-1 text-xs text-gray-600">
                          {review.date}
                        </p>
                      </div>

                      <div className="text-right space-y-1">
                        <p className="font-inter text-xs font-bold text-text-primary">
                          {review.author}
                        </p>
                        {review.location && (
                          <p className="font-inter text-xs text-gray-600">
                            {review.location}
                          </p>
                        )}
                        {review.verified && (
                          <img
                            src="/assets/icons/feefo.svg"
                            className="h-4 ml-auto"
                            alt="verified"
                          />
                        )}
                      </div>
                    </div>

                    <p className="mt-3 font-inter text-sm text-text-primary">
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
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductReviews
