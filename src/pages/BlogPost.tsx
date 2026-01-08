/* eslint-disable prettier/prettier */
import { useParams } from 'react-router-dom'
import React, { useState, useRef, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import BlogSocialShare from 'components/BlogSocialShare'
import BlogCommentForm from 'components/BlogCommentForm'
import BlogReadMore from 'components/BlogReadMore'
import { StoreCreditModal } from 'components/Blog'

export type ShopifyBlogArticle = {
  id: string
  title: string
  handle: string
  excerpt: string
  content: string // ✅ HTML string
  publishedAt: string
  author?: string
  tags: string[]
  image: {
    url: string
    altText: string | null
  }
}

const formatDate = (isoDate: string): string => {
  return new Date(isoDate)
    .toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
    .toUpperCase()
}

const calculateReadTime = (content: string): string => {
  const WORDS_PER_MINUTE = 200
  const wordCount = content.trim().split(/\s+/).length
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE)
  return `${minutes} min read`
}

function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [blogPost, setBlogPost] = useState<ShopifyBlogArticle | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false)
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false)
  const creditButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    async function fetchBlogPost() {
      setIsLoading(true)
      setError(null)

      try {
        const resp = await fetch(
          import.meta.env.VITE_BACKEND_API_URL + `/blogs/article/${slug}`
        )

        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`)
        }

        const data = await resp.json()

        // Check if we have the expected data structure
        if (data && data.data) {
          // console.log('Fetched blog post data:', data.data)

          // Transform the API response
          const transformedArticle: ShopifyBlogArticle = {
            id: data.data.id,
            title: data.data.title,
            handle: data.data.handle,
            excerpt: data.data.excerpt,
            content: data.data.content, // 👈 HTML
            publishedAt: data.data.publishedAt,
            author: 'Maison Baby & Kids',
            tags: [],
            image: {
              url: data.data.image?.url || '/assets/images/blogDefault.png',
              altText: data.data.image?.altText || null
            }
          }

          setBlogPost(transformedArticle)
        } else {
          setError('No blog post data found')
        }
      } catch (e) {
        console.error('Fetching blog post failed:', e)
        setError('An error occurred while loading the blog post.')
      } finally {
        setIsLoading(false)
      }
    }

    if (slug) {
      fetchBlogPost()
    } else {
      setError('Article slug is missing.')
      setIsLoading(false)
    }
  }, [slug])

  const displayInfo = useMemo(() => {
    if (!blogPost) return null
    return {
      date: formatDate(blogPost.publishedAt),
      readTime: calculateReadTime(blogPost.content),
      author: blogPost.author || 'Unknown Author',
      image: blogPost.image.url
    }
  }, [blogPost])

  // --- Handle Loading and Error States ---
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <p className="font-rubik text-xl text-text-primary">
          Loading blog post...
        </p>
      </div>
    )
  }

  if (error || !blogPost || !displayInfo) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-cream p-8 text-center">
        <h1 className="mb-4 font-rubik text-4xl font-bold text-red-600">
          Error Loading Article
        </h1>
        <p className="font-raleway text-lg text-gray-700">
          {error ||
            `The requested blog post with slug "${slug}" could not be found.`}
        </p>
      </div>
    )
  }

  // Use the calculated displayInfo
  const { date, readTime, author, image } = displayInfo

  return (
    <div className="min-h-screen bg-cream py-14">
      {/* Blog Hero Section */}
      <div className="flex flex-col gap-2 lg:h-96 lg:flex-row">
        <div className="h-64 w-auto lg:h-full lg:w-1/2">
          <img
            src={image}
            alt={blogPost.title}
            className="size-full object-cover"
          />
        </div>

        <div className="flex w-full items-center bg-cream px-6 py-8 lg:w-1/2 lg:px-12">
          <div className="w-full">
            <div className="mb-4 flex items-center gap-2">
              <div className="size-2 rounded-full bg-button-hover"></div>
              <span className=" font-rubik text-xs font-medium capitalize tracking-wide text-button-hover">
                {date}
              </span>
            </div>
            <h1 className="mb-6 font-rubik text-2xl font-bold leading-tight text-text-primary sm:text-3xl lg:text-4xl">
              {blogPost.title}
            </h1>
            <p className="font-raleway text-sm text-[#2E2E2E]">
              By **{author}** | {readTime}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 font-raleway text-sm text-[#444b59]">
        {/* Article Content */}
        <article className="prose max-w-none prose-p:font-raleway prose-p:text-text-primary prose-h1:font-rubik prose-h1:text-3xl prose-h1:mt-8 prose-h2:font-rubik prose-h2:text-2xl prose-h3:font-rubik prose-h3:text-xl prose-hr:my-8 prose-strong:font-semibold">
          <div
            dangerouslySetInnerHTML={{
              __html: blogPost.content
            }}
          />
        </article>

        <div className="mx-auto mt-14 max-w-xl">
          <BlogSocialShare />
          <BlogCommentForm />
        </div>

        <BlogReadMore />
      </div>

      {/* Fixed Subscribe and Credit Modal buttons remain the same */}
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

export default BlogPost
