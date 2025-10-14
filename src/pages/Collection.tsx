import SvgMarquee from 'components/SvgMarquee'
import RecommendationsSlider from 'components/RecommendationsSlider'
import CollectionsGrid from 'components/CollectionsGrid'
import StickyDiscountTag from 'components/StickyDiscountTag'

function Collection() {
  return (
    <div className="min-h-screen bg-cream">
      <StickyDiscountTag />
      <CollectionsGrid />
      <SvgMarquee />
      <RecommendationsSlider bgWhite={true} />
    </div>
  )
}

export default Collection
