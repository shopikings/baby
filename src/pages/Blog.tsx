/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react'
import {
  BlogCard,
  Pagination,
  FeaturesSection,
  StoreCreditModal
} from 'components/Blog'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'

type TabType = 'all' | 'nutrition' | 'supplements' | 'training'

const tabs = [
  { id: 'all' as TabType, label: 'All posts' },
  { id: 'nutrition' as TabType, label: 'Nutrition' },
  { id: 'supplements' as TabType, label: 'Supplements' },
  { id: 'training' as TabType, label: 'Training Tips' }
]

const blogPosts = [
  {
    id: 1,
    image: '/assets/images/blogOne.png',
    date: 'SEP 20, 2025',
    title: 'THE SCIENCE OF RECOVERY: HOW TO MAXIMIZE GAINS BETWEEN WORKOUTS',
    excerpt:
      "Muscles don't grow in the gym—they grow during recovery. Discover science-backed strategies for better sleep, faster muscle repair, and smarter supplementation to maximize your gains.",
    category: 'training'
  },
  {
    id: 2,
    image: '/assets/images/blogOne.png',
    date: 'SEP 18, 2025',
    title: 'TOP 5 SUPPLEMENTS FOR MUSCLE GROWTH',
    excerpt:
      'Learn about the essential supplements that can help you build muscle faster and recover better from your workouts.',
    category: 'nutrition'
  },
  {
    id: 3,
    image: '/assets/images/blogOne.png',
    date: 'SEP 15, 2025',
    title: 'NUTRITION TIPS FOR ATHLETES',
    excerpt:
      'Proper nutrition is key to athletic performance. Discover the best foods and meal timing for optimal results.',
    category: 'nutrition'
  },
  {
    id: 4,
    image: '/assets/images/blogOne.png',
    date: 'SEP 12, 2025',
    title: 'STRENGTH TRAINING FUNDAMENTALS',
    excerpt:
      'Master the basics of strength training with these fundamental exercises and techniques for building muscle.',
    category: 'training'
  },
  {
    id: 5,
    image: '/assets/images/blogOne.png',
    date: 'SEP 10, 2025',
    title: 'HYDRATION FOR PEAK PERFORMANCE',
    excerpt:
      'Staying hydrated is crucial for athletic performance. Learn how much water you need and when to drink it.',
    category: 'supplements'
  },
  {
    id: 6,
    image: '/assets/images/blogOne.png',
    date: 'SEP 08, 2025',
    title: 'PRE-WORKOUT NUTRITION GUIDE',
    excerpt:
      'Fuel your workouts with the right nutrients. Discover what to eat before training for maximum energy.',
    category: 'nutrition'
  },
  {
    id: 7,
    image: '/assets/images/blogOne.png',
    date: 'SEP 06, 2025',
    title: 'BUILDING MUSCLE AFTER 40',
    excerpt:
      'Age is just a number. Learn how to build and maintain muscle mass as you get older.',
    category: 'training'
  },
  {
    id: 8,
    image: '/assets/images/blogOne.png',
    date: 'SEP 04, 2025',
    title: 'PROTEIN POWDER EXPLAINED',
    excerpt:
      'Not all protein powders are created equal. Find out which type is best for your goals.',
    category: 'supplements'
  },
  {
    id: 9,
    image: '/assets/images/blogOne.png',
    date: 'SEP 02, 2025',
    title: 'CARDIO VS STRENGTH TRAINING',
    excerpt:
      'Which is better for fat loss? Learn how to balance cardio and strength training for optimal results.',
    category: 'training'
  },
  {
    id: 10,
    image: '/assets/images/blogOne.png',
    date: 'AUG 30, 2025',
    title: 'MEAL PREP FOR ATHLETES',
    excerpt:
      'Save time and stay on track with your nutrition goals. Master the art of meal prepping.',
    category: 'nutrition'
  },
  {
    id: 11,
    image: '/assets/images/blogOne.png',
    date: 'AUG 28, 2025',
    title: 'CREATINE: THE COMPLETE GUIDE',
    excerpt:
      'One of the most researched supplements. Learn how creatine can boost your performance.',
    category: 'supplements'
  },
  {
    id: 12,
    image: '/assets/images/blogOne.png',
    date: 'AUG 26, 2025',
    title: 'FLEXIBILITY AND MOBILITY TRAINING',
    excerpt:
      'Improve your range of motion and prevent injuries with proper flexibility training.',
    category: 'training'
  },
  {
    id: 13,
    image: '/assets/images/blogOne.png',
    date: 'AUG 24, 2025',
    title: 'POST-WORKOUT RECOVERY MEALS',
    excerpt:
      'Maximize muscle growth and recovery with the right post-workout nutrition strategy.',
    category: 'nutrition'
  },
  {
    id: 14,
    image: '/assets/images/blogOne.png',
    date: 'AUG 22, 2025',
    title: 'BCAA SUPPLEMENTS GUIDE',
    excerpt:
      'Branch Chain Amino Acids can support muscle recovery. Learn when and how to use them.',
    category: 'supplements'
  },
  {
    id: 15,
    image: '/assets/images/blogOne.png',
    date: 'AUG 20, 2025',
    title: 'HIGH-INTENSITY INTERVAL TRAINING',
    excerpt:
      'HIIT workouts for maximum fat burning and cardiovascular health in minimal time.',
    category: 'training'
  },
  {
    id: 16,
    image: '/assets/images/blogOne.png',
    date: 'AUG 18, 2025',
    title: 'VITAMINS FOR ATHLETES',
    excerpt:
      'Essential vitamins and minerals that support athletic performance and overall health.',
    category: 'supplements'
  },
  {
    id: 17,
    image: '/assets/images/blogOne.png',
    date: 'AUG 16, 2025',
    title: 'SLEEP OPTIMIZATION FOR RECOVERY',
    excerpt:
      'Quality sleep is crucial for muscle recovery. Learn how to optimize your sleep for better gains.',
    category: 'training'
  },
  {
    id: 18,
    image: '/assets/images/blogOne.png',
    date: 'AUG 14, 2025',
    title: 'OMEGA-3 FATTY ACIDS GUIDE',
    excerpt:
      'Discover the benefits of omega-3s for reducing inflammation and supporting heart health.',
    category: 'supplements'
  },
  {
    id: 19,
    image: '/assets/images/blogOne.png',
    date: 'AUG 12, 2025',
    title: 'CARB CYCLING FOR FAT LOSS',
    excerpt:
      'Strategic carbohydrate manipulation to optimize fat loss while maintaining muscle mass.',
    category: 'nutrition'
  },
  {
    id: 20,
    image: '/assets/images/blogOne.png',
    date: 'AUG 10, 2025',
    title: 'PROGRESSIVE OVERLOAD TECHNIQUES',
    excerpt:
      'Master the principle of progressive overload to continuously build strength and muscle.',
    category: 'training'
  },
  {
    id: 21,
    image: '/assets/images/blogOne.png',
    date: 'AUG 08, 2025',
    title: 'ELECTROLYTE BALANCE',
    excerpt:
      'Maintain optimal electrolyte levels for peak performance and proper hydration.',
    category: 'supplements'
  },
  {
    id: 22,
    image: '/assets/images/blogOne.png',
    date: 'AUG 06, 2025',
    title: 'INTERMITTENT FASTING GUIDE',
    excerpt:
      'Learn how intermittent fasting can support fat loss and improve metabolic health.',
    category: 'nutrition'
  },
  {
    id: 23,
    image: '/assets/images/blogOne.png',
    date: 'AUG 04, 2025',
    title: 'DEADLIFT MASTERY',
    excerpt:
      'Perfect your deadlift technique for maximum strength gains and injury prevention.',
    category: 'training'
  },
  {
    id: 24,
    image: '/assets/images/blogOne.png',
    date: 'AUG 02, 2025',
    title: 'ZINC AND MAGNESIUM BENEFITS',
    excerpt:
      'Essential minerals for testosterone production, sleep quality, and recovery.',
    category: 'supplements'
  },
  {
    id: 25,
    image: '/assets/images/blogOne.png',
    date: 'JUL 30, 2025',
    title: 'MACRONUTRIENT RATIOS',
    excerpt:
      'Find the perfect balance of protein, carbs, and fats for your fitness goals.',
    category: 'nutrition'
  },
  {
    id: 26,
    image: '/assets/images/blogOne.png',
    date: 'JUL 28, 2025',
    title: 'BENCH PRESS TECHNIQUE',
    excerpt:
      'Build a powerful chest with proper bench press form and programming strategies.',
    category: 'training'
  },
  {
    id: 27,
    image: '/assets/images/blogOne.png',
    date: 'JUL 26, 2025',
    title: 'VITAMIN D FOR PERFORMANCE',
    excerpt:
      'The sunshine vitamin plays a crucial role in bone health and immune function.',
    category: 'supplements'
  },
  {
    id: 28,
    image: '/assets/images/blogOne.png',
    date: 'JUL 24, 2025',
    title: 'ANTI-INFLAMMATORY FOODS',
    excerpt:
      'Reduce inflammation and speed up recovery with these powerful foods.',
    category: 'nutrition'
  },
  {
    id: 29,
    image: '/assets/images/blogOne.png',
    date: 'JUL 22, 2025',
    title: 'SQUAT VARIATIONS',
    excerpt:
      'Explore different squat variations to target your legs from every angle.',
    category: 'training'
  },
  {
    id: 30,
    image: '/assets/images/blogOne.png',
    date: 'JUL 20, 2025',
    title: 'CAFFEINE AND PERFORMANCE',
    excerpt:
      'Learn how to use caffeine strategically to boost workout performance.',
    category: 'supplements'
  },
  {
    id: 31,
    image: '/assets/images/blogOne.png',
    date: 'JUL 18, 2025',
    title: 'MINDFUL EATING HABITS',
    excerpt:
      'Develop a healthy relationship with food and improve your nutrition consistency.',
    category: 'nutrition'
  },
  {
    id: 32,
    image: '/assets/images/blogOne.png',
    date: 'JUL 16, 2025',
    title: 'CORE STRENGTHENING',
    excerpt:
      'Build a strong, functional core with these essential exercises and techniques.',
    category: 'training'
  },
  {
    id: 33,
    image: '/assets/images/blogOne.png',
    date: 'JUL 14, 2025',
    title: 'COLLAGEN SUPPLEMENTATION',
    excerpt: 'Support joint health and skin quality with collagen peptides.',
    category: 'supplements'
  },
  {
    id: 34,
    image: '/assets/images/blogOne.png',
    date: 'JUL 12, 2025',
    title: 'NUTRIENT TIMING STRATEGIES',
    excerpt: 'Optimize when you eat to maximize muscle growth and fat loss.',
    category: 'nutrition'
  },
  {
    id: 35,
    image: '/assets/images/blogOne.png',
    date: 'JUL 10, 2025',
    title: 'PULL-UP PROGRESSIONS',
    excerpt:
      'From zero to hero - master the pull-up with these proven progressions.',
    category: 'training'
  },
  {
    id: 36,
    image: '/assets/images/blogOne.png',
    date: 'JUL 08, 2025',
    title: 'NOOTROPICS FOR FOCUS',
    excerpt:
      'Enhance mental clarity and focus during training with these supplements.',
    category: 'supplements'
  },
  {
    id: 37,
    image: '/assets/images/blogOne.png',
    date: 'JUL 06, 2025',
    title: 'CHEAT MEALS DONE RIGHT',
    excerpt: 'How to incorporate cheat meals without derailing your progress.',
    category: 'nutrition'
  },
  {
    id: 38,
    image: '/assets/images/blogOne.png',
    date: 'JUL 04, 2025',
    title: 'SHOULDER STABILITY',
    excerpt:
      'Prevent injuries and build strong, healthy shoulders with these exercises.',
    category: 'training'
  },
  {
    id: 39,
    image: '/assets/images/blogOne.png',
    date: 'JUL 02, 2025',
    title: 'ASHWAGANDHA BENEFITS',
    excerpt:
      'Reduce stress and support recovery with this powerful adaptogenic herb.',
    category: 'supplements'
  },
  {
    id: 40,
    image: '/assets/images/blogOne.png',
    date: 'JUN 30, 2025',
    title: 'CUTTING DIET STRATEGIES',
    excerpt:
      'Effective nutrition strategies for getting lean while preserving muscle mass.',
    category: 'nutrition'
  }
]

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false)
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false)
  const creditButtonRef = useRef<HTMLButtonElement>(null)
  const postsPerPage = 4

  const filteredPosts =
    activeTab === 'all'
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeTab)

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  return (
    <div
      className="min-h-screen bg-cream"
      style={{ fontFamily: 'Segoe UI, sans-serif' }}
    >
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className=" mb-20 text-center font-rubik text-6xl font-bold text-text-primary">
          Catch The Blog
        </h1>

        <div className="flex justify-start gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-rubik text-xs font-semibold uppercase text-[#2E2E2E] transition-all ${
                activeTab === tab.id ? 'border-b border-[#2E2E2E]' : ''
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="-mt-5 mb-3 border-t border-[#E6E0DD] 2xl:mx-auto 2xl:max-w-[1400px]"></div>

      <div className="mx-auto max-w-7xl px-4 py-5">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentPosts.map((post) => (
            <BlogCard
              key={post.id}
              image={post.image}
              date={post.date}
              title={post.title}
              excerpt={post.excerpt}
            />
          ))}
        </div>
      </div>

      <div className="relative mb-8 w-full lg:px-0 2xl:mx-auto 2xl:max-w-[1400px]">
        <img
          src="/assets/images/blogMain.png"
          alt="Banner"
          className="h-[600px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-x-0 bottom-0 w-4/5 px-4 pb-12 md:px-8 md:pb-16">
          <h2 className="mb-4 font-rubik text-6xl font-semibold text-white">
            The Hidden Benefits of Collagen for Athletes
          </h2>
          <p className="font-raleway text-base font-normal text-white">
            How collagen works in your body When you drink a scoop of collagen,
            it breaks down into tiny peptide fragments that show up in your
            bloodstream within 1–2 hours. Your body then uses those fragments...
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-5">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentPosts.map((post) => (
            <BlogCard
              key={post.id}
              image={post.image}
              date={post.date}
              title={post.title}
              excerpt={post.excerpt}
            />
          ))}
        </div>
        <div className="my-14">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <FeaturesSection />

      <div className="fixed right-2 top-[30vh] z-50 sm:right-4 md:right-6 xl:right-8 2xl:right-[calc((100vw-1400px)/2+24px)]">
        <motion.div
          initial={false}
          animate={{
            width: isSubscribeOpen ? 'auto' : '48px',
            height: isSubscribeOpen ? 'auto' : '48px'
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="flex items-center gap-0 overflow-hidden rounded-lg bg-button-hover shadow-lg"
        >
          <motion.button
            onClick={() => setIsSubscribeOpen(!isSubscribeOpen)}
            className="flex size-12 shrink-0 items-center justify-center transition-transform"
          >
            <img
              src="/assets/icons/bell.svg"
              alt="Notifications"
              className="size-6"
            />
          </motion.button>

          <motion.div
            initial={false}
            animate={{
              opacity: isSubscribeOpen ? 1 : 0,
              width: isSubscribeOpen ? 'auto' : 0,
              paddingRight: isSubscribeOpen ? '8px' : 0
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="flex max-w-[calc(100vw-4rem)] items-center gap-1 overflow-hidden sm:max-w-[calc(100vw-5rem)] md:max-w-none md:gap-1 md:whitespace-nowrap md:pr-4"
          >
            <span className="max-w-[160px] text-xs leading-tight text-white sm:max-w-none sm:whitespace-nowrap md:text-sm">
              Get Updated with Latest Offers and Products.
            </span>
            <button
              onClick={() => setIsSubscribeOpen(false)}
              className="ml-2 shrink-0 rounded-md bg-white px-2 py-1 text-xs font-medium text-black transition-colors hover:bg-gray-100 sm:px-3 md:ml-4 md:px-4 md:py-1.5 md:text-sm"
            >
              Subscribe
            </button>
            <button
              onClick={() => setIsSubscribeOpen(false)}
              className="shrink-0 transition-transform hover:scale-110"
            >
              <X className="size-4 text-white md:size-5" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      <div className="fixed right-2 top-[90vh] z-50 sm:right-4 md:right-6 xl:right-8 2xl:right-[calc((100vw-1400px)/2+24px)]">
        <button
          ref={creditButtonRef}
          onClick={() => setIsCreditModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-button-hover px-4 py-3 shadow-lg transition-all"
        >
          <span className="text-sm font-medium text-white">Store Credits</span>
          <img
            src="/assets/icons/creditStore.svg"
            alt="Store Credits"
            className="size-5"
          />
        </button>
      </div>

      <StoreCreditModal
        isOpen={isCreditModalOpen}
        onClose={() => setIsCreditModalOpen(false)}
        buttonPosition={{
          top: creditButtonRef.current?.getBoundingClientRect().top || 0,
          right: 24
        }}
      />
    </div>
  )
}
