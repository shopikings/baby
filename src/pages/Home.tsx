import { useNavigate } from 'react-router-dom'
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

function Home() {
  const navigate = useNavigate()
  return (
    <div className="bg-white">
      <StickyDiscountTag />
      <Banner />
      <FeaturesSection />

      <div className="bg-banner-lower py-4">
        <Marquee
          text="New collections just released - Shop now"
          className="font-inter text-lg font-medium text-black"
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
    </div>
  )
}

export default Home
