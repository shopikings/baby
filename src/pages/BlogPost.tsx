import { useParams } from 'react-router-dom'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import BlogSocialShare from 'components/BlogSocialShare'
import BlogCommentForm from 'components/BlogCommentForm'
import BlogReadMore from 'components/BlogReadMore'
import { StoreCreditModal } from 'components/Blog'

function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false)
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false)
  const creditButtonRef = useRef<HTMLButtonElement>(null)

  console.log('Blog slug:', slug)

  const blogPost = {
    title: 'The Ultimate Guide to Baby Fashion Trends 2024',
    author: 'Sarah Johnson',
    date: 'Oct 11, 2025',
    readTime: '5 min read',
    category: 'Fashion',
    image: '/assets/images/blogOne.png',
    content: [
      {
        type: 'paragraph',
        content:
          'Welcome to our comprehensive guide on the latest **baby fashion trends** for 2024. As parents, we all want our little ones to look adorable while staying **comfortable and safe**.'
      },
      {
        type: 'heading',
        level: 1,
        content: 'Sustainable Materials Take Center Stage'
      },
      {
        type: 'paragraph',
        content:
          "This year, we're seeing a significant shift towards **eco-friendly and sustainable materials** in baby fashion. **Organic cotton**, **bamboo fiber**, and **recycled materials** are becoming the go-to choices for conscious parents."
      },
      {
        type: 'link',
        text: 'Learn more about sustainable baby fashion',
        url: '/blog/sustainable-baby-fashion',
        external: false
      },
      {
        type: 'heading',
        level: 1,
        content: 'Color Trends for 2024'
      },
      {
        type: 'paragraph',
        content:
          'Soft, muted tones continue to dominate the baby fashion landscape. Think **sage green**, **dusty pink**, **warm beige**, and **gentle lavender**. These colors not only look beautiful but also photograph wonderfully for those precious baby moments.'
      },
      {
        type: 'heading',
        level: 1,
        content: 'Why November Shopping Still Matters for Parents'
      },
      {
        type: 'paragraph',
        content:
          '**"Last chance" deals** — With holiday sales approaching, November offers final opportunities for pre-winter shopping. **Lower competition** — Big sales events earlier in the year draw huge crowds; in November you might enjoy more selection and better customer service. **Holiday preparation** — Many parents shift toward preparing for family gatherings and gift-giving as the holidays approach. **Seasonal transitions** — In many regions, late-fall weather requires layering pieces that work for both warm days and cool evenings.'
      },
      {
        type: 'heading',
        level: 1,
        content: 'Must-Have Pieces'
      },
      {
        type: 'paragraph',
        content: "Every baby's wardrobe should include these essential pieces:"
      },
      {
        type: 'list',
        items: [
          '**Organic cotton onesies** — Perfect for layering and everyday wear',
          '**Knit cardigans** — Essential for warmth and adding style',
          '**Comfortable rompers** — Ideal for active babies who love to explore',
          '**Soft sleepwear** — Ensures peaceful nights for better rest'
        ]
      },
      {
        type: 'link',
        text: 'Shop our baby essentials collection',
        url: '/shop?category=essentials',
        external: false
      },
      {
        type: 'heading',
        level: 1,
        content: 'Shopping Tips for Parents'
      },
      {
        type: 'paragraph',
        content: 'When shopping for baby clothes, keep these tips in mind:'
      },
      {
        type: 'list',
        items: [
          '**Size up strategy** — Buy a size up because babies grow quickly!',
          '**Quality over quantity** — Invest in fewer, better-made pieces',
          '**Care instructions** — Always check washing and care requirements',
          '**Seasonal planning** — Consider the season when your baby will wear the item'
        ]
      },
      {
        type: 'paragraph',
        content:
          "At Maison Baby and Kids, we're committed to providing stylish, comfortable, and safe clothing for your little ones."
      }
    ]
  }

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

  const renderContentBlock = (
    block: {
      type: string
      content?: string
      level?: number
      items?: string[]
      text?: string
      url?: string
      external?: boolean
    },
    index: number
  ) => {
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
        const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements
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
              headingClasses[block.level as keyof typeof headingClasses]
            }
          >
            {block.content}
          </HeadingTag>
        )
      }
      case 'list':
        return (
          <ul
            key={index}
            className="mb-6 ml-6 list-disc space-y-2 font-raleway text-base leading-relaxed text-[#2E2E2E]"
          >
            {block?.items?.map((item: string, itemIndex: number) => (
              <li key={itemIndex}>{parseRichText(item)}</li>
            ))}
          </ul>
        )
      case 'link':
        return (
          <div key={index} className="mb-4">
            {block.external ? (
              <a
                href={block.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-raleway text-base font-medium text-button-hover underline hover:text-banner-lower"
              >
                {block.text}
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
                href={block.url}
                className="inline-flex items-center gap-2 font-raleway text-base font-medium text-button-hover underline hover:text-banner-lower"
              >
                {block.text}
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

  return (
    <div className="min-h-screen bg-cream py-14">
      <div className="flex h-96 ">
        <div className="w-1/2">
          <img
            src={blogPost.image}
            alt={blogPost.title}
            className="size-full object-cover"
          />
        </div>

        <div className="flex w-1/2 items-center bg-cream px-8 lg:px-12">
          <div className="w-full">
            <div className="mb-4 flex items-center gap-2">
              <div className="size-2 rounded-full bg-button-hover"></div>
              <span className=" font-rubik text-xs font-medium capitalize tracking-wide text-button-hover">
                {blogPost.date}
              </span>
            </div>
            <h1 className="mb-6 font-rubik text-2xl font-bold leading-tight text-text-primary sm:text-3xl lg:text-4xl">
              {blogPost.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <article className="max-w-none">
          {blogPost.content.map((block, index) =>
            renderContentBlock(block, index)
          )}
        </article>

        <div className="mx-auto mt-14 max-w-xl">
          <BlogSocialShare />
          <BlogCommentForm />
        </div>

        <BlogReadMore />
      </div>

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
