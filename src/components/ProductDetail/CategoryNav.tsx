import { useRef } from 'react'

const categories = [
  { id: 'new-arrivals', name: 'NEW IN' },
  { id: 'clothing', name: 'CLOTHING' },
  { id: 'jewelry', name: 'JEWELRY' },
  { id: 'shoes', name: 'SHOES' },
  { id: 'activities-toys', name: 'ACTIVITIES & TOYS' },
  { id: 'feeding-nursing', name: 'FEEDING & NURSING' },
  { id: 'bath-time', name: 'BATH TIME' },
  { id: 'gear', name: 'GEAR' },
  { id: 'gifts', name: 'GIFTS' },
  { id: 'books', name: 'BOOKS' },
  { id: 'maternity', name: 'MATERNITY' },
  { id: 'nursery-favorites', name: 'NURSERY FAVORITES' },
  { id: 'sale', name: 'SALE' }
]

function CategoryNav() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="bg-cream border-b border-gray-200">
      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto px-8 py-6"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="flex gap-4">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/shop?category=${category.id}`}
              className="px-16 py-3 rounded-full font-raleway tracking-wide text-xs border-black border font-light transition-all bg-[#E9908E] uppercase text-white hover:bg-[#d88d9a] flex-shrink-0 inline-block"
            >
              {category.name}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        div::-webkit-scrollbar {
          height: 4px;
        }
        div::-webkit-scrollbar-track {
          background: #f5f5f5;
        }
        div::-webkit-scrollbar-thumb {
          background: #E89FAC;
          border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: #d88d9a;
        }
      `}</style>
    </div>
  )
}

export default CategoryNav
