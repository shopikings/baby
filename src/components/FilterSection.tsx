import { X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface FilterSectionProps {
  filters: Record<string, string | boolean>
  onFilterChange?: (filters: Record<string, string | boolean>) => void
  hideCategory?: boolean
  hideBrand?: boolean
  brandOptions?: string[]
}

function FilterSection({
  filters,
  onFilterChange,
  hideCategory = false,
  hideBrand = false,
  brandOptions = []
}: FilterSectionProps) {
  const location = useLocation()
  const [showMoreFilters, setShowMoreFilters] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // We can remove the local selectedFilters state and use the 'filters' prop directly,
  // but let's keep it simple and just reference the 'filters' prop for the display value.

  const genderOptions = ['Boy', 'Girl', 'Unisex']
  const sizeOptions = [
    '0-3M',
    '3-6M',
    '6-12M',
    '12-18M',
    '18-24M',
    '2T',
    '3T',
    '4T'
  ]
  const categoryOptions = [
    'Tops',
    'Bottoms',
    'Dresses',
    'Outerwear',
    'Accessories'
  ]
  // const brandOptions = [
  //   'JELLY CAT',
  //   'RYLE + CRU',
  //   'BAREFOOT DREAMS',
  //   'KYTE BABY',
  //   'MAGNETIC ME',
  //   'QUINCY MAE',
  //   'ENEWTON',
  //   'NUNA',
  //   'UPPABABY'
  // ]
  const sortOptions = ['Price: Low to High', 'Price: High to Low']
  const colourOptions = [
    'Red',
    'Blue',
    'Green',
    'Pink',
    'Yellow',
    'Black',
    'White',
    'Brown'
  ]
  const patternOptions = [
    'Solid',
    'Striped',
    'Floral',
    'Polka Dot',
    'Plaid',
    'Animal Print'
  ]
  const useOptions = ['Casual', 'Formal', 'Sports', 'Sleepwear', 'Outdoor']
  const lengthOptions = ['Short', 'Medium', 'Long', 'Full Length']
  const styleOptions = ['Classic', 'Modern', 'Vintage', 'Trendy', 'Bohemian']

  const handleDropdownChange = (filterType: string, value: string) => {
    // If the new value is the same as the current filter, we unselect/clear the filter
    const newValue = filters[filterType] === value ? '' : value

    const updated = {
      ...filters,
      [filterType]: newValue
    }

    // Remove the filter property if the value is cleared
    if (newValue === '') {
      delete updated[filterType]
    }

    if (onFilterChange) onFilterChange(updated)
    setOpenDropdown(null)
  }

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown)
  }

  // Helper to get the display value for the dropdown
  const getDropdownDisplay = (key: string, defaultLabel: string) => {
    const value = filters[key]
    return typeof value === 'string' && value.length > 0 ? value : defaultLabel
  }

  // 💡 Note on Checkboxes: Your original Shop.tsx only uses filter keys:
  // gender, brand, size, category, sale, newIn.
  // The filter value is either a string (for dropdowns) or a boolean (for checkboxes).

  return (
    <div className="border-y border-gray-200 py-6">
      <div className="flex flex-wrap items-center justify-start gap-4 md:gap-6 xl:justify-between">
        {/* Sale */}
        <label className="flex cursor-pointer items-center gap-2 bg-white px-4 py-2.5 font-raleway text-sm text-black transition-all hover:border-gray-400">
          <input
            type="checkbox"
            // ✅ Read the 'checked' state directly from the external 'filters' prop
            checked={filters.sale === true}
            onChange={() =>
              onFilterChange &&
              onFilterChange({
                ...filters,
                // Toggle boolean value
                sale: !filters.sale
              })
            }
          />
          <span>Sale</span>
        </label>

        {/* New In */}
        <label className="flex cursor-pointer items-center gap-2 bg-white px-4 py-2.5 font-raleway text-sm text-black transition-all hover:border-gray-400">
          <input
            type="checkbox"
            // ✅ Read the 'checked' state directly from the external 'filters' prop
            checked={filters.newIn === true}
            onChange={() =>
              onFilterChange &&
              onFilterChange({
                ...filters,
                // Toggle boolean value
                newIn: !filters.newIn
              })
            }
          />
          <span>New In</span>
        </label>

        {/* --- Dropdowns --- */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Gender */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('gender')}
              className="group relative flex min-w-[120px] items-center justify-between gap-2 overflow-hidden rounded-md border border-[#949494] bg-white px-4 py-2.5 font-raleway text-sm text-black transition-all hover:border-gray-400"
            >
              <div className="absolute left-0 top-0 h-0.5 w-full scale-x-0 bg-button-hover transition-transform duration-300 group-hover:scale-x-100" />
              {/* ✅ Use the helper to display current filter value from props */}
              <span>{getDropdownDisplay('gender', 'Gender')}</span>
              <svg
                className={`size-4 transition-transform ${
                  openDropdown === 'gender' ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openDropdown === 'gender' && (
              <div className="absolute left-0 top-full z-10 mt-2 min-w-[120px] rounded-lg border border-gray-300 bg-white shadow-lg">
                {genderOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleDropdownChange('gender', option)}
                    className={`block w-full px-4 py-2 text-left font-raleway text-sm text-black first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50 ${
                      // ✅ Highlight selected option
                      filters.gender === option ? 'bg-gray-200 font-bold' : ''
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* The rest of the dropdowns (Size, Category, Brand, Sort, Colour, etc.)
            should follow the same pattern as Gender:
            1. Use `getDropdownDisplay(key, 'Label')` for the button text.
            2. Use `filters[key] === option ? 'selected-styles'` for the selected option in the map.
            3. Use `handleDropdownChange(key, option)` for the click handler.
        */}

          {/* ... (Size, Category, Brand, Sort dropdowns - update as above) ... */}
          {/* Size */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('size')}
              className="group relative flex min-w-[120px] items-center justify-between gap-2 overflow-hidden rounded-md border border-[#949494] bg-white px-4 py-2.5 font-raleway text-sm text-black transition-all hover:border-gray-400"
            >
              <div className="absolute left-0 top-0 h-0.5 w-full scale-x-0 bg-button-hover transition-transform duration-300 group-hover:scale-x-100" />
              <span>{getDropdownDisplay('size', 'Size')}</span>
              <svg
                className={`size-4 transition-transform ${
                  openDropdown === 'size' ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openDropdown === 'size' && (
              <div className="absolute left-0 top-full z-10 mt-2 min-w-[120px] rounded-lg border border-gray-300 bg-white shadow-lg">
                {sizeOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleDropdownChange('size', option)}
                    className={`block w-full px-4 py-2 text-left font-raleway text-sm text-black first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50 ${
                      filters.size === option ? 'bg-gray-200 font-bold' : ''
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Category */}
          {!hideCategory && location.search === '?category=clothing' && (
            <div className="relative">
              <button
                onClick={() => toggleDropdown('category')}
                className="group relative flex min-w-[120px] items-center justify-between gap-2 overflow-hidden rounded-md border border-[#949494] bg-white px-4 py-2.5 font-raleway text-sm text-black transition-all hover:border-gray-400"
              >
                <div className="absolute left-0 top-0 h-0.5 w-full scale-x-0 bg-button-hover transition-transform duration-300 group-hover:scale-x-100" />
                <span>{getDropdownDisplay('category', 'Category')}</span>
                <svg
                  className={`size-4 transition-transform ${
                    openDropdown === 'category' ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openDropdown === 'category' && (
                <div className="absolute left-0 top-full z-10 mt-2 min-w-[120px] rounded-lg border border-gray-300 bg-white shadow-lg">
                  {categoryOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleDropdownChange('category', option)}
                      className={`block w-full px-4 py-2 text-left font-raleway text-sm text-black first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50 ${
                        filters.category === option
                          ? 'bg-gray-200 font-bold'
                          : ''
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          {/* Brand */}
          {!hideBrand && brandOptions.length > 0 && (
            <div className="relative">
              <button
                onClick={() => toggleDropdown('brand')}
                className="group relative flex min-w-[140px] items-center justify-between gap-2 overflow-hidden rounded-md border border-[#949494] bg-white px-4 py-2.5 font-raleway text-sm text-black transition-all hover:border-gray-400"
              >
                <div className="absolute left-0 top-0 h-0.5 w-full scale-x-0 bg-button-hover transition-transform duration-300 group-hover:scale-x-100" />
                <span>{getDropdownDisplay('brand', 'Brand')}</span>
                <svg
                  className={`size-4 transition-transform ${
                    openDropdown === 'brand' ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openDropdown === 'brand' && (
                <div className="absolute left-0 top-full z-10 mt-2 max-h-64 min-w-[180px] overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg">
                  {brandOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleDropdownChange('brand', option)}
                      className={`block w-full px-4 py-2 text-left font-raleway text-sm hover:bg-gray-50 ${
                        filters.brand === option ? 'bg-gray-200 font-bold' : ''
                      }`}
                    >
                      {filters.brand === option ? (
                        <div className="flex items-center justify-between">
                          {option} <X className="size-4 text-red-600" />
                        </div>
                      ) : (
                        option
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('sort')}
              className="group relative flex min-w-[120px] items-center justify-between gap-2 overflow-hidden rounded-md border border-[#949494] bg-white px-4 py-2.5 font-raleway text-sm text-black transition-all hover:border-gray-400"
            >
              <div className="absolute left-0 top-0 h-0.5 w-full scale-x-0 bg-button-hover transition-transform duration-300 group-hover:scale-x-100" />
              <span>{getDropdownDisplay('sort', 'Sort')}</span>
              <svg
                className={`size-4 transition-transform ${
                  openDropdown === 'sort' ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {openDropdown === 'sort' && (
              <div className="absolute left-0 top-full z-10 mt-2 min-w-[180px] rounded-lg border border-gray-300 bg-white shadow-lg">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleDropdownChange('sort', option)}
                    className={`block w-full px-4 py-2 text-left font-raleway text-sm text-black first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50 ${
                      filters.sort === option ? 'bg-gray-200 font-bold' : ''
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* More filters section - update like the dropdowns above */}
      {showMoreFilters && (
        <div className="mt-4 flex flex-wrap items-center gap-2 md:gap-3">
          {/* Colour */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('colour')}
              className="group relative flex min-w-[120px] items-center justify-between gap-2 overflow-hidden rounded-md border border-[#949494] bg-white px-4 py-2.5 font-raleway text-sm text-black transition-all hover:border-gray-400"
            >
              <div className="absolute left-0 top-0 h-0.5 w-full scale-x-0 bg-button-hover transition-transform duration-300 group-hover:scale-x-100" />
              <span>{getDropdownDisplay('colour', 'Colour')}</span>
              <svg
                className={`size-4 transition-transform ${
                  openDropdown === 'colour' ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {openDropdown === 'colour' && (
              <div className="absolute left-0 top-full z-10 mt-2 min-w-[120px] rounded-lg border border-gray-300 bg-white shadow-lg">
                {colourOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleDropdownChange('colour', option)}
                    className={`block w-full px-4 py-2 text-left font-raleway text-sm text-black first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50 ${
                      filters.colour === option ? 'bg-gray-200 font-bold' : ''
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pattern */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('pattern')}
              className="group relative flex min-w-[120px] items-center justify-between gap-2 overflow-hidden rounded-md border border-[#949494] bg-white px-4 py-2.5 font-raleway text-sm text-black transition-all hover:border-gray-400"
            >
              <div className="absolute left-0 top-0 h-0.5 w-full scale-x-0 bg-button-hover transition-transform duration-300 group-hover:scale-x-100" />
              <span>{getDropdownDisplay('pattern', 'Pattern')}</span>
              <svg
                className={`size-4 transition-transform ${
                  openDropdown === 'pattern' ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {openDropdown === 'pattern' && (
              <div className="absolute left-0 top-full z-10 mt-2 min-w-[120px] rounded-lg border border-gray-300 bg-white shadow-lg">
                {patternOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleDropdownChange('pattern', option)}
                    className={`block w-full px-4 py-2 text-left font-raleway text-sm text-black first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50 ${
                      filters.pattern === option ? 'bg-gray-200 font-bold' : ''
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Use */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('use')}
              className="group relative flex min-w-[120px] items-center justify-between gap-2 overflow-hidden rounded-md border border-[#949494] bg-white px-4 py-2.5 font-raleway text-sm text-black transition-all hover:border-gray-400"
            >
              <div className="absolute left-0 top-0 h-0.5 w-full scale-x-0 bg-button-hover transition-transform duration-300 group-hover:scale-x-100" />
              <span>{getDropdownDisplay('use', 'Use')}</span>
              <svg
                className={`size-4 transition-transform ${
                  openDropdown === 'use' ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {openDropdown === 'use' && (
              <div className="absolute left-0 top-full z-10 mt-2 min-w-[120px] rounded-lg border border-gray-300 bg-white shadow-lg">
                {useOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleDropdownChange('use', option)}
                    className={`block w-full px-4 py-2 text-left font-raleway text-sm text-black first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50 ${
                      filters.use === option ? 'bg-gray-200 font-bold' : ''
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Length */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('length')}
              className="group relative flex min-w-[120px] items-center justify-between gap-2 overflow-hidden rounded-md border border-[#949494] bg-white px-4 py-2.5 font-raleway text-sm text-black transition-all hover:border-gray-400"
            >
              <div className="absolute left-0 top-0 h-0.5 w-full scale-x-0 bg-button-hover transition-transform duration-300 group-hover:scale-x-100" />
              <span>{getDropdownDisplay('length', 'Length')}</span>
              <svg
                className={`size-4 transition-transform ${
                  openDropdown === 'length' ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {openDropdown === 'length' && (
              <div className="absolute left-0 top-full z-10 mt-2 min-w-[120px] rounded-lg border border-gray-300 bg-white shadow-lg">
                {lengthOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleDropdownChange('length', option)}
                    className={`block w-full px-4 py-2 text-left font-raleway text-sm text-black first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50 ${
                      filters.length === option ? 'bg-gray-200 font-bold' : ''
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Style */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('style')}
              className="group relative flex min-w-[120px] items-center justify-between gap-2 overflow-hidden rounded-md border border-[#949494] bg-white px-4 py-2.5 font-raleway text-sm text-black transition-all hover:border-gray-400"
            >
              <div className="absolute left-0 top-0 h-0.5 w-full scale-x-0 bg-button-hover transition-transform duration-300 group-hover:scale-x-100" />
              <span>{getDropdownDisplay('style', 'Style')}</span>
              <svg
                className={`size-4 transition-transform ${
                  openDropdown === 'style' ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {openDropdown === 'style' && (
              <div className="absolute left-0 top-full z-10 mt-2 min-w-[120px] rounded-lg border border-gray-300 bg-white shadow-lg">
                {styleOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleDropdownChange('style', option)}
                    className={`block w-full px-4 py-2 text-left font-raleway text-sm text-black first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50 ${
                      filters.style === option ? 'bg-gray-200 font-bold' : ''
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {/* Show/Hide More Filters button could go here */}
    </div>
  )
}

export default FilterSection
