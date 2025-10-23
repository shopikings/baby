import { useNavigate } from 'react-router-dom'

interface BlogCardProps {
  image: string
  date: string
  title: string
  excerpt: string
  slug?: string
}

export function BlogCard({ image, date, title, excerpt, slug }: BlogCardProps) {
  const navigate = useNavigate()

  const handleCardClick = () => {
    const blogSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    navigate(`/blog/${blogSlug}`)
  }

  return (
    <div className="flex cursor-pointer flex-col" onClick={handleCardClick}>
      <div className="mb-4 aspect-video w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="size-full object-cover transition-transform duration-300 hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x300'
          }}
        />
      </div>
      <div className="mb-3 flex items-center gap-3">
        <div className="size-2 rounded-full bg-black"></div>
        <p
          className="font-raleway text-xs font-normal text-[#2E2E2E]"
          style={{ fontSize: '12px', fontWeight: 400 }}
        >
          {date}
        </p>
      </div>
      <h3 className="mb-3  font-raleway text-2xl font-semibold uppercase text-[#2E2E2E]">
        {title}
      </h3>
      <p className="font-raleway text-sm text-[#2E2E2E]">{excerpt}</p>
    </div>
  )
}
