import { ArrowRight } from 'lucide-react'
import { BlogCard } from './Blog'

function BlogReadMore() {
  return (
    <div className="mx-auto mt-24 max-w-4xl">
      <div className="mb-8 flex items-center gap-3">
        <ArrowRight className="size-10 font-normal text-[#321E1E]" />
        <h3 className="font-rubik text-3xl font-normal text-[#321E1E] md:text-5xl">
          READ MORE
        </h3>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <BlogCard
          image="/assets/images/blogOne.png"
          date="SEP 16, 2025 | 2 MIN READ"
          title="HOW MUCH DOES MARKETING & INFLUENCERS DISTORT THE TRUTH ABOUT SUPPLEMENTS?"
          excerpt="Discover how marketing tactics and social media influencers distort the truth about supplements—and learn how to separate real science from hype when choosing your next product."
          slug="marketing-influencers-supplements-truth"
        />

        <BlogCard
          image="/assets/images/blogOne.png"
          date="OCT 2, 2025 | 2 MIN READ"
          title="GLUTAMINE: THE RECOVERY AMINO EVERY ATHLETE SHOULD KNOW ABOUT"
          excerpt="When it comes to supplements, most athletes focus on the big players—protein, creatine, pre-workouts. But one amino acid often flies under the radar despite playing a critical role in"
          slug="glutamine-recovery-amino-athletes"
        />
      </div>
    </div>
  )
}

export default BlogReadMore
