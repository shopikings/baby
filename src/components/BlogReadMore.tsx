import { ArrowRight } from 'lucide-react'
import { BlogCard } from './Blog'
import { useEffect, useState } from 'react'

// Define types for your data
interface ArticleImage {
  url: string
  altText: string | null
}

interface Article {
  id: string
  title: string
  handle: string
  excerpt: string
  content: string
  publishedAt: string
  image: ArticleImage
}

interface Blog {
  id: string
  title: string
  handle: string
  articles: Article[]
}

interface BlogData {
  data: Blog[]
}

function BlogReadMore() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRandomBlogs() {
      try {
        const resp = await fetch(
          import.meta.env.VITE_BACKEND_API_URL + `/blogs/random`
        )

        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`)
        }

        const data: BlogData = await resp.json()
        console.log('Fetched data:', data.data)

        // Extract all articles from all blogs
        const allArticles: Article[] = []
        data.data.forEach((blog) => {
          if (blog.articles && blog.articles.length > 0) {
            allArticles.push(...blog.articles)
          }
        })

        setArticles(allArticles)
      } catch (err) {
        console.error('Error fetching blogs:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch blogs')
      } finally {
        setLoading(false)
      }
    }

    fetchRandomBlogs()
  }, [])

  // Format date to "SEP 16, 2025" format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date
      .toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
      .toUpperCase()
  }

  // Estimate reading time based on content length
  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} MIN READ`
  }

  if (loading) {
    return (
      <div className="mx-auto mt-24 max-w-4xl">
        <div className="mb-8 flex items-center gap-3">
          <ArrowRight className="size-10 font-normal text-[#321E1E]" />
          <h3 className="font-rubik text-3xl font-normal text-[#321E1E] md:text-5xl">
            READ MORE
          </h3>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="mb-4 h-48 bg-gray-200"></div>
              <div className="h-4 w-24 bg-gray-200 mb-2"></div>
              <div className="h-6 bg-gray-200 mb-2"></div>
              <div className="h-4 bg-gray-200 mb-1"></div>
              <div className="h-4 bg-gray-200 mb-1"></div>
              <div className="h-4 w-3/4 bg-gray-200"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto mt-24 max-w-4xl">
        <div className="mb-8 flex items-center gap-3">
          <ArrowRight className="size-10 font-normal text-[#321E1E]" />
          <h3 className="font-rubik text-3xl font-normal text-[#321E1E] md:text-5xl">
            READ MORE
          </h3>
        </div>
        <div className="text-center text-red-500">
          Error loading blogs: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto mt-24 max-w-4xl">
      <div className="mb-8 flex items-center gap-3">
        <ArrowRight className="size-10 font-normal text-[#321E1E]" />
        <h3 className="font-rubik text-3xl font-normal text-[#321E1E] md:text-5xl">
          READ MORE
        </h3>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {articles.length > 0 ? (
          articles.slice(0, 2).map((article) => (
            <BlogCard
              key={article.id}
              image={article.image.url}
              date={`${formatDate(article.publishedAt)} | ${estimateReadingTime(
                article.content
              )}`}
              title={article.title}
              excerpt={
                article.excerpt ||
                // Fallback: extract first paragraph if excerpt is empty
                article.content.replace(/<[^>]*>/g, '').substring(0, 150) +
                  '...'
              }
              slug={article.handle}
            />
          ))
        ) : (
          <div className="col-span-2 text-center text-gray-500">
            No articles found
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogReadMore
