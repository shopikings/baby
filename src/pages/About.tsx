import AboutBanner from 'components/AboutBanner'
import AboutVideoSection from 'components/AboutVideoSection'
import JoinMovementSlider from 'components/JoinMovementSlider'
import RecommendationsSlider from 'components/RecommendationsSlider'
import SvgMarquee from 'components/SvgMarquee'
import TextImageSection from 'components/TextImageSection'
import AboutInfoBanner from 'components/AboutInfoBanner'

function About() {
  return (
    <div className="bg-white">
      <AboutBanner />
      <AboutVideoSection />

      <TextImageSection
        title="CURATION WITH A CAUSE"
        description="Every piece in our collection is curated from independent, women-owned or
premium-quality brands-ensuring our clothing not only stands out but also
aligns with values of sustainability and craftsmanship. We believe in the
power of buying less but buying better, with designs meant to last and be
cherished. Our playful, gender-neutral styles break stereotypes, allowing
children to express their unique personalities freely."
        image="/assets/images/about-caused.webp"
        imageAlt="Our mission - Quality products for children"
        backgroundColor="cream"
      />

      <TextImageSection
        title="THE EVERYDAY"
        description="At Maison Baby & Kids, you’ll find everything you need for your little ones, all in one place. From everyday clothing and cozy essentials to toys, feeding gear, and accessories — we’ve got you covered. Each item is handpicked for comfort, quality, and safety, making shopping for your baby or child simple and stress-free."
        image="/assets/images/about-everyday.webp"
        imageAlt="Quality and safety standards"
        reverse={true}
        backgroundColor="cream"
      />
      <SvgMarquee />
      <RecommendationsSlider />
      <AboutInfoBanner />
      <JoinMovementSlider />
    </div>
  )
}

export default About
