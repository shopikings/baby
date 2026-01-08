/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect, useMemo } from 'react'
import {
  BlogCard,
  Pagination,
  FeaturesSection,
  StoreCreditModal
} from 'components/Blog'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'

// --- Data Types for Component ---
type TabType = 'all' | 'news' | 'training-tips'

// A simpler post type for the UI, derived from ShopifyBlogArticle
type BlogPostType = {
  id: string
  image: string | null
  date: string
  title: string
  excerpt: string
  category: TabType
  slug: string // Using 'handle' for routing
}

const tabs = [
  { id: 'all' as TabType, label: 'All posts' },
  { id: 'news' as TabType, label: 'News' },
  { id: 'training-tips' as TabType, label: 'Training Tips' }
]

// Function to get category from blog handle
const getCategoryFromBlogHandle = (blogHandle: string): TabType => {
  if (blogHandle === 'news') return 'news'
  if (blogHandle === 'training-tips') return 'training-tips'
  return 'all' // Default fallback
}

// Transform article function
const transformArticleToBlogPost = (
  article: any,
  blogHandle: string
): BlogPostType => {
  // 1. Extract Excerpt - use excerpt if available, otherwise extract from content
  let excerptText = article.excerpt || ''
  if (!excerptText && article.content) {
    // Remove HTML tags and limit length
    excerptText = article.content.replace(/<[^>]*>/g, '').substring(0, 150)
    if (excerptText.length === 150 && article.content.length > 150) {
      excerptText += '...'
    }
  }

  if (!excerptText) {
    excerptText = article.title // Fallback to title
  }

  // 2. Format Date (SEP 20, 2025)
  const formattedDate = new Date(article.publishedAt)
    .toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
    .toUpperCase()
    .replace(/\./g, '')

  return {
    id: article.id,
    image: article.image?.url || '/assets/images/blogDefault.png',
    date: formattedDate,
    title: article.title,
    excerpt: excerptText,
    category: getCategoryFromBlogHandle(blogHandle),
    slug: article.handle
  }
}

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false)
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false)
  const creditButtonRef = useRef<HTMLButtonElement>(null)
  const postsPerPage = 4

  // State for fetched data
  const [fetchedPosts, setFetchedPosts] = useState<BlogPostType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadBlogPosts() {
      try {
        setIsLoading(true)
        setError(null)

        const resp = await fetch(
          import.meta.env.VITE_BACKEND_API_URL + `/blogs`
        )

        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`)
        }

        const data = await resp.json()

        // Flatten all articles from all blogs into one list
        const allArticles: BlogPostType[] = data.data.flatMap((blog: any) =>
          blog.articles.map((article: any) =>
            transformArticleToBlogPost(article, blog.handle)
          )
        )

        setFetchedPosts(allArticles)
      } catch (error) {
        console.error('Failed to fetch blog posts:', error)
        setError('Failed to load blog posts. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    loadBlogPosts()
  }, []) // Empty dependency array means this runs once on mount

  // Reset pagination when the active tab changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab])

  // Memoize filtered posts for performance
  const filteredPosts = useMemo(() => {
    if (activeTab === 'all') {
      return fetchedPosts
    }
    return fetchedPosts.filter((post) => post.category === activeTab)
  }, [activeTab, fetchedPosts])

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <p className="font-rubik text-xl text-text-primary">
          Loading blog posts...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <p className="font-rubik text-xl text-red-600">Error: {error}</p>
      </div>
    )
  }

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
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <BlogCard
                key={post.id}
                image={post.image || '/assets/images/palceholder.webp'} // Use a default image if the fetched one is null
                date={post.date}
                title={post.title}
                excerpt={post.excerpt}
                slug={post.slug} // Pass the slug for routing
              />
            ))
          ) : (
            <p className="col-span-full py-10 text-center text-xl text-gray-500">
              No blog posts found for "
              {activeTab === 'all'
                ? 'All Posts'
                : tabs.find((t) => t.id === activeTab)?.label}
              ".
            </p>
          )}
        </div>
      </div>

      <div className="relative mb-8 w-full lg:px-0 2xl:mx-auto 2xl:max-w-[1400px]">
        <img
          src="/assets/images/blogMain.png"
          alt="Banner"
          className="h-[650px] w-full object-cover md:h-[600px]"
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
              image={post.image || '/assets/images/blogOne.png'}
              date={post.date}
              title={post.title}
              excerpt={post.excerpt}
              slug={post.slug} // Pass the slug here too
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

      {/* ... (Fixed Subscription and Credit Modal buttons remain the same) */}

      <div className="fixed right-2 top-[30vh] z-50 sm:right-4 md:right-8 xl:right-8 2xl:right-[calc((100vw-1400px)/2+24px)]">
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

      <div className="fixed right-2 top-[90vh] z-50 sm:right-4 md:right-8 xl:right-8 2xl:right-[calc((100vw-1400px)/2+24px)]">
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
