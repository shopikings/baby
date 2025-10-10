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

function Home() {
  return (
    <div className="bg-white">
      <Banner />
      <FeaturesSection />

      <div className="bg-banner-lower py-4">
        <Marquee
          text="New collections just released - Shop now"
          className="font-inter text-lg font-medium text-black"
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
    </div>
  )
}

export default Home
