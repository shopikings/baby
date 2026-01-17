import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Banner from 'components/Banner'
import FeaturesSection from 'components/FeaturesSection'
import Marquee from 'components/Marquee'
import CategoryGrid from 'components/CategoryGrid'
import FeaturedBrands from 'components/FeaturedBrands'
import RecommendationsSlider from 'components/RecommendationsSlider'
import OurStorySection from 'components/OurStorySection'
import SvgMarquee from 'components/SvgMarquee'
import ReviewsSlider from 'components/ReviewsSlider'
import ShopTheLook from 'components/ShopTheLook'
import FAQSection from 'components/FAQSection'
import JoinMovementSlider from 'components/JoinMovementSlider'
import InfoBanner from 'components/InfoBanner'
import StickyDiscountTag from 'components/StickyDiscountTag'
import NewsletterModal from 'components/NewsletterModal'
import CategoryNav from 'components/ProductDetail/CategoryNav'

function Home() {
  const navigate = useNavigate()
  const [showNewsletterModal, setShowNewsletterModal] = useState(false)

  useEffect(() => {
    // check if user already saw the modal
    const hasSeen = localStorage.getItem('newsletter_seen')

    if (!hasSeen) {
      const timer = setTimeout(() => {
        setShowNewsletterModal(true)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleCloseNewsletter = () => {
    setShowNewsletterModal(false)
    localStorage.setItem('newsletter_seen', 'true') // mark as seen
  }

  return (
    <div className="bg-white">
      <div
        onClick={() => setShowNewsletterModal(true)}
        className="cursor-pointer"
      >
        <StickyDiscountTag />
      </div>

      <CategoryNav />
      <Banner />
      <FeaturesSection />

      <div className="bg-banner-lower py-4">
        <Marquee
          text="New collections just released - Shop now"
          className="font-raleway text-lg font-medium text-black"
          clickableText="Shop now"
          onClickableClick={() => navigate('/shop')}
        />
      </div>

      <CategoryGrid />
      <FeaturedBrands />
      <RecommendationsSlider />
      <OurStorySection />
      <SvgMarquee />
      <ReviewsSlider />
      <ShopTheLook />
      <FAQSection />
      <JoinMovementSlider />
      <InfoBanner />

      <NewsletterModal
        isOpen={showNewsletterModal}
        onClose={handleCloseNewsletter}
      />
    </div>
  )
}

export default Home
