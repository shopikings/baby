import SvgMarquee from 'components/SvgMarquee'
import RecommendationsSlider from 'components/RecommendationsSlider'
import NewCollectionGrid from 'components/NewCollectionGrid'
import StickyDiscountTag from 'components/StickyDiscountTag'

function Collection() {
  return (
    <div className="min-h-screen bg-cream">
      <StickyDiscountTag />
      <NewCollectionGrid />
      <SvgMarquee />
      <RecommendationsSlider bgWhite={true} />
    </div>
  )
}

export default Collection
