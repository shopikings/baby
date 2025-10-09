import Banner from 'components/Banner'
import FeaturesSection from 'components/FeaturesSection'
import Marquee from 'components/Marquee'
import CategoryGrid from 'components/CategoryGrid'
import FeaturedBrands from 'components/FeaturedBrands'
import RecommendationsSlider from 'components/RecommendationsSlider'
import OurStorySection from 'components/OurStorySection'

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
    </div>
  )
}

export default Home
