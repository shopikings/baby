interface HeaderActionsProps {
  onCartClick?: () => void
}

function HeaderActions({ onCartClick }: HeaderActionsProps) {
  return (
    <div className="flex flex-1 items-center justify-end gap-6">
      <button className="text-gray-900 transition-colors hover:text-gray-600">
        <img src="/assets/icons/search.svg" alt="Search" className="size-6" />
      </button>
      <button className="hidden text-gray-900 transition-colors hover:text-gray-600 lg:block">
        <img src="/assets/icons/profile.svg" alt="Profile" className="size-6" />
      </button>
      <button
        onClick={onCartClick}
        className="text-gray-900 transition-colors hover:text-gray-600"
      >
        <img src="/assets/icons/cart.svg" alt="Cart" className="size-6" />
      </button>
    </div>
  )
}

export default HeaderActions
