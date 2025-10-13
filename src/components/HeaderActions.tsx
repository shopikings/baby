function HeaderActions() {
  return (
    <div className="flex flex-1 items-center justify-end gap-6">
      <button className="text-gray-900 hover:text-gray-600 transition-colors">
        <img src="/assets/icons/search.svg" alt="Search" className="size-6" />
      </button>
      <button className="hidden text-gray-900 hover:text-gray-600 transition-colors lg:block">
        <img src="/assets/icons/profile.svg" alt="Profile" className="size-6" />
      </button>
      <button className="text-gray-900 hover:text-gray-600 transition-colors">
        <img src="/assets/icons/cart.svg" alt="Cart" className="size-6" />
      </button>
    </div>
  )
}

export default HeaderActions
