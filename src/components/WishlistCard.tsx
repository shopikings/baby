interface WishlistCardProps {
  id: number
  image: string
  title: string
  subtitle: string
  price: string
  onRemove: (id: number) => void
  onAddToCart: (id: number) => void
}

function WishlistCard({
  id,
  image,
  title,
  subtitle,
  price,
  onRemove,
  onAddToCart
}: WishlistCardProps) {
  return (
    <div className="max-w-[200px] rounded-lg bg-white p-3 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 aspect-square overflow-hidden rounded-lg">
        <img src={image} alt={title} className="size-full object-cover" />
      </div>

      <div className="space-y-1">
        <h3 className="font-rubik text-sm font-semibold text-text-primary md:text-base">
          {title}
        </h3>
        <p className="font-rubik text-sm text-text-primary md:text-base">
          {subtitle}
        </p>
      </div>

      <button
        onClick={() => onAddToCart(id)}
        className="mt-3 w-full rounded-md border border-[#E8A5A5] bg-[#E8A5A5] px-3 py-2 font-inter text-xs font-medium text-white transition-colors hover:border-black hover:bg-transparent hover:text-black"
      >
        add - {price}
      </button>

      <button
        onClick={() => onRemove(id)}
        className="mt-2 w-full font-inter text-xs text-text-primary/60 transition-colors hover:text-text-primary"
      >
        remove from wishlist
      </button>
    </div>
  )
}

export default WishlistCard
