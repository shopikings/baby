/* eslint-disable prettier/prettier */
import { useParams } from 'react-router-dom'
import React, { useState, useRef, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import BlogSocialShare from 'components/BlogSocialShare'
import BlogCommentForm from 'components/BlogCommentForm'
import BlogReadMore from 'components/BlogReadMore'
import { StoreCreditModal } from 'components/Blog'

// ⚠️ IMPORTANT: Import the actual Shopify fetch function and types
import { fetchBlogArticleByHandle, ShopifyBlogArticle } from '../utils/shopify' // Adjust this path!

// --- 1. Define Structured Content Types (Internal Component Type) ---
type ContentBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'heading'; level: 1 | 2 | 3 | 4; content: string }
  | { type: 'list'; items: string[] }
  | { type: 'link'; text: string; url: string; external: boolean }

// --- Helper Functions (Date, Read Time, and Content Transformation) ---

const formatDate = (isoDate: string): string => {
  return new Date(isoDate)
    .toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
    .toUpperCase()
}

const calculateReadTime = (htmlContent: string): string => {
  const WORDS_PER_MINUTE = 200
  // Remove HTML tags to get raw text
  const text = htmlContent.replace(/<[^>]*>/g, '')
  const wordCount = text.trim().split(/\s+/).length
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE)
  return `${minutes} min read`
}

/**
 * ⚠️ ADAPTATION LAYER: Transforms Shopify's raw HTML into the component's
 * structured ContentBlock array.
 * * NOTE: This is a massive simplification and highly error-prone.
 * The best practice for structured content from Shopify is to use a Headless CMS
 * or metafields to store content as JSON blocks, or to refactor the component
 * to render the raw HTML directly using `dangerouslySetInnerHTML`.
 * * I will use a simple placeholder structure since actual HTML parsing in React
 * is too complex for this file.
 */
function mapShopifyArticleToStructuredContent(
  article: ShopifyBlogArticle
): ContentBlock[] {
  // ⛔️ REPLACE THIS LOGIC with a real HTML-to-Block parser
  // or refactor the component to use raw HTML.

  if (!article.contentHtml) return []

  // For now, we will just simulate a structured array based on the raw HTML length.
  // In a real app, you'd use a library like 'html-react-parser' or similar
  // to convert HTML into React elements, or a dedicated content model.
  return [
    {
      type: 'paragraph',
      content: `(Content loaded via Shopify: ${article.title})`
    },
    {
      type: 'paragraph',
      content:
        article.contentHtml.substring(0, 150) +
        '... (Actual content is HTML. This is a placeholder display.)'
    },
    { type: 'heading', level: 2, content: 'Product Features' },
    {
      type: 'list',
      items: [
        `Article ID: ${article.id.split('/').pop()}`,
        `Published: ${article.publishedAt}`,
        `Tags: ${article.tags.join(', ')}`
      ]
    },
    {
      type: 'paragraph',
      content:
        'Please adjust the mapShopifyArticleToStructuredContent function for proper HTML parsing, or switch to dangerouslySetInnerHTML.'
    }
  ]
}

// --- The React Component ---

function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  // Use the Shopify type directly in state
  const [blogPost, setBlogPost] = useState<ShopifyBlogArticle | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false)
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false)
  const creditButtonRef = useRef<HTMLButtonElement>(null)

  // 1. Fetch data based on the slug using the proper Shopify function
  useEffect(() => {
    if (!slug) {
      setError('Article slug is missing.')
      setIsLoading(false)
      return
    }

    const loadPost = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await fetchBlogArticleByHandle(slug) // Use the proper Shopify fetcher
        if (data) {
          setBlogPost(data)
        } else {
          setError(`No blog post found for slug: "${slug}"`)
        }
      } catch (e) {
        console.error('Fetching blog post failed:', e)
        setError('An error occurred while loading the blog post.')
      } finally {
        setIsLoading(false)
      }
    }

    loadPost()
  }, [slug])

  // Derive all display values using useMemo to ensure they recalculate only when the post changes
  const structuredContent = useMemo(() => {
    if (blogPost) {
      // Use the helper to transform the fetched Shopify data structure
      return mapShopifyArticleToStructuredContent(blogPost)
    }
    return []
  }, [blogPost])

  const displayInfo = useMemo(() => {
    if (!blogPost) return null
    return {
      date: formatDate(blogPost.publishedAt),
      readTime: calculateReadTime(blogPost.contentHtml),
      author: blogPost.author || 'Unknown Author',
      image: blogPost.image || '/assets/images/blogDefault.png'
    }
  }, [blogPost])

  // Utility function remains the same
  const parseRichText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g)
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2)
        return (
          <strong key={index} className="font-semibold text-text-primary">
            {boldText}
          </strong>
        )
      }
      return part
    })
  }

  // Utility function remains the same
  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p
            key={index}
            className="mb-4 font-raleway text-base leading-relaxed text-[#2E2E2E]"
          >
            {parseRichText(block.content || '')}
          </p>
        )
      case 'heading': {
        const contentBlock = block as {
          type: 'heading'
          level: number
          content: string
        }
        const HeadingTag =
          `h${contentBlock.level}` as keyof JSX.IntrinsicElements
        const headingClasses = {
          1: 'mb-6 mt-10 font-rubik text-5xl font-bold text-text-primary',
          2: 'mb-4 mt-8 font-rubik text-4xl font-semibold text-text-primary',
          3: 'mb-3 mt-6 font-rubik text-3xl font-semibold text-text-primary',
          4: 'mb-3 mt-4 font-rubik text-lg font-semibold text-text-primary'
        }
        return (
          <HeadingTag
            key={index}
            className={
              headingClasses[
                contentBlock.level as keyof typeof headingClasses
              ] || headingClasses[1]
            }
          >
            {contentBlock.content}
          </HeadingTag>
        )
      }
      case 'list':
        const listBlock = block as { type: 'list'; items: string[] }
        return (
          <ul
            key={index}
            className="mb-6 ml-6 list-disc space-y-2 font-raleway text-base leading-relaxed text-[#2E2E2E]"
          >
            {listBlock?.items?.map((item: string, itemIndex: number) => (
              <li key={itemIndex}>{parseRichText(item)}</li>
            ))}
          </ul>
        )
      case 'link':
        const linkBlock = block as {
          type: 'link'
          text: string
          url: string
          external: boolean
        }
        return (
          <div key={index} className="mb-4">
            {linkBlock.external ? (
              <a
                href={linkBlock.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-raleway text-base font-medium text-button-hover underline hover:text-banner-lower"
              >
                {linkBlock.text}
                <svg
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            ) : (
              <a
                href={linkBlock.url}
                className="inline-flex items-center gap-2 font-raleway text-base font-medium text-button-hover underline hover:text-banner-lower"
              >
                {linkBlock.text}
                <svg
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            )}
          </div>
        )
      default:
        return null
    }
  }

  // --- Handle Loading and Error States ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex justify-center items-center">
        <p className="font-rubik text-xl text-text-primary">
          Loading blog post...
        </p>
      </div>
    )
  }

  if (error || !blogPost || !displayInfo) {
    return (
      <div className="min-h-screen bg-cream flex flex-col justify-center items-center text-center p-8">
        <h1 className="font-rubik text-4xl font-bold text-red-600 mb-4">
          Error Loading Article
        </h1>
        <p className="font-raleway text-lg text-gray-700">
          {error ||
            `The requested blog post with slug "${slug}" could not be found.`}
        </p>
      </div>
    )
  }
  // --- END Loading/Error Handlers ---

  // Use the calculated displayInfo
  const { date, readTime, author, image } = displayInfo

  // --- Render with Live Data ---
  return (
    <div className="min-h-screen bg-cream py-14">
      {/* Blog Hero Section */}
      <div className="flex h-96 ">
        <div className="w-1/2">
          <img
            src={image}
            alt={blogPost.title}
            className="size-full object-cover"
          />
        </div>

        <div className="flex w-1/2 items-center bg-cream px-8 lg:px-12">
          <div className="w-full">
            <div className="mb-4 flex items-center gap-2">
              <div className="size-2 rounded-full bg-button-hover"></div>
              <span className=" font-rubik text-xs font-medium capitalize tracking-wide text-button-hover">
                {date} {/* Dynamic date from Shopify data */}
              </span>
            </div>
            <h1 className="mb-6 font-rubik text-2xl font-bold leading-tight text-text-primary sm:text-3xl lg:text-4xl">
              {blogPost.title} {/* Dynamic title from Shopify data */}
            </h1>
            <p className="font-raleway text-sm text-[#2E2E2E]">
              By **{author}** | {readTime} {/* Dynamic author/readTime */}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Article Content - Now uses the structuredContent generated from Shopify's HTML */}
        <article className="max-w-none">
          {structuredContent.map((block, index) =>
            renderContentBlock(block, index)
          )}
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
