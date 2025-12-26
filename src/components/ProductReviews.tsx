interface Review {
  id: number
  author: string
  location?: string
  rating: number
  comment: string
  date: string
  color?: string
  verified?: boolean
  image?: string
}

interface ProductReviewsProps {
  overallRating: number
  totalReviews: number
  reviews: Review[]
}

import { useState } from 'react'

function ProductReviews({
  overallRating,
  totalReviews,
  reviews
}: ProductReviewsProps) {
  const [displayCount, setDisplayCount] = useState(3)
  const hasReviews = reviews && reviews.length > 0
  const displayedReviews = reviews.slice(0, displayCount)
  const hasMoreReviews = reviews.length > displayCount

  return (
    <div className="mt-8 md:mt-12 bg-cream py-8 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* CENTERED HEADER */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-rubik text-xl md:text-2xl font-bold text-text-primary mb-3 md:mb-4">
            REVIEWS
          </h2>
          
          {/* STARS AND RATING */}
          <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="size-4 md:size-5"
                  fill={star <= Math.round(overallRating) ? '#444B59' : '#E5E7EB'}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="font-inter text-xs md:text-sm text-gray-600">({totalReviews})</span>
          </div>

          {/* WRITE REVIEW BUTTON */}
          <button className="border-2 border-gray-800 px-4 md:px-6 py-2 font-inter text-xs font-bold text-black hover:bg-[#E9908E] transition-colors">
            WRITE A REVIEW
          </button>
        </div>

        {/* REVIEWS LIST */}
        {hasReviews && (
          <div>
            <div className="space-y-6 md:space-y-8 ">
              {displayedReviews.map((review) => (
                <div key={review.id} className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 border-b border-gray-300 pb-6">
                  {/* LEFT SIDE - REVIEW CONTENT */}
                  <div className="flex-1">
                    {/* STARS */}
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="size-3 md:size-4"
                          fill={star <= review.rating ? '#444B59' : '#E5E7EB'}
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>

                    {/* TITLE */}
                    <h3 className="font-inter text-base md:text-lg font-normal text-text-primary italic mb-2">
                      {review.comment.split('\n')[0]}
                    </h3>

                    {/* COMMENT */}
                    <p className="font-light text-xs md:text-sm text-gray-700 mb-3">
                      {review.comment}
                    </p>

                    {/* AUTHOR INFO */}
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="font-inter text-xs font-bold text-text-primary">
                        {review.author}
                      </span>
                      {review.verified && (
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="font-inter text-xs text-gray-600">
                            Verified buyer
                          </span>
                        </div>
                      )}
                    </div>

                    {/* DATE */}
                    <p className="font-light text-xs md:text-sm text-gray-600 mb-3 font-inter">
                      {review.date}
                    </p>

                    {/* HELPFUL BUTTONS */}
                    <div className="flex gap-4 md:gap-6 font-inter text-xs md:text-sm text-gray-600">
                      <button className="flex items-center gap-2 hover:text-text-primary transition-colors">
                        <span>0</span>
                         <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                      </button>
                      <button className="flex items-center gap-2 hover:text-text-primary transition-colors">
                        <span>0</span>
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                          </svg>
                      </button>
                    </div>
                  </div>

                  {/* RIGHT SIDE - PRODUCT IMAGE */}
                  {review.image && (
                    <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                      <div className="w-full h-full bg-white rounded overflow-hidden shadow-sm">
                        <img
                          src={review.image}
                          alt="Product"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* LOAD MORE BUTTON */}
            {hasMoreReviews && (
              <div className="flex justify-center mt-6 md:mt-8">
                <button
                  onClick={() => setDisplayCount(displayCount + 3)}
                  className="border-2 border-gray-800 px-6 md:px-8 py-2 font-inter text-xs font-light text-black hover:bg-[#E9908E] transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        )}

        {/* NO REVIEWS */}
        {!hasReviews && (
          <div className="text-center py-10">
            <p className="font-inter text-sm text-gray-600">
              No reviews yet. Be the first to review this product!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductReviews
