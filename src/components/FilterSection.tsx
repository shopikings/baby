import { useState } from 'react'

interface FilterSectionProps {
  onFilterChange?: (filters: any) => void
}

function FilterSection({ onFilterChange }: FilterSectionProps) {
  const [showMoreFilters, setShowMoreFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    sale: false,
    newIn: false,
    gender: '',
    size: '',
    category: '',
    brand: '',
    sort: '',
    colour: '',
    pattern: '',
    use: '',
    length: '',
    style: ''
  })

  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

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
  const brandOptions = [
    'JELLY CAT',
    'RYLE + CRU',
    'BAREFOOT DREAMS',
    'KYTE BABY',
    'MAGNETIC ME',
    'QUINCY MAE',
    'ENEWTON',
    'NUNA',
    'UPPABABY'
  ]
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

  const handleCheckboxChange = (filterType: 'sale' | 'newIn') => {
    const newFilters = {
      ...selectedFilters,
      [filterType]: !selectedFilters[filterType]
    }
    setSelectedFilters(newFilters)
    if (onFilterChange) {
      onFilterChange(newFilters)
    }
  }

  const handleDropdownChange = (filterType: string, value: string) => {
    const newFilters = { ...selectedFilters, [filterType]: value }
    setSelectedFilters(newFilters)
    if (onFilterChange) {
      onFilterChange(newFilters)
    }
    setOpenDropdown(null)
  }

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown)
  }

  return (
    <div className="border-y border-gray-200 py-6">
      <div className="flex flex-wrap items-center justify-start gap-4 md:gap-6 xl:justify-between">
        <label className="flex cursor-pointer items-center gap-2 bg-white px-4 py-2.5 font-raleway text-sm text-black transition-all hover:border-gray-400">
          <input
            type="checkbox"
            checked={selectedFilters.sale}
            onChange={() => handleCheckboxChange('sale')}
            className="size-4 rounded border-gray-300 text-button-hover focus:ring-button-hover"
          />
          <span>Sale (6)</span>
        </label>

        <label className="flex cursor-pointer items-center gap-2 bg-white px-4 py-2.5 font-raleway text-sm text-black transition-all hover:border-gray-400">
          <input
            type="checkbox"
            checked={selectedFilters.newIn}
            onChange={() => handleCheckboxChange('newIn')}
            className="size-4 rounded border-gray-300 text-button-hover focus:ring-button-hover"
          />
          <span>New In (5)</span>
        </label>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <button
              onClick={() => toggleDropdown('gender')}
              className="group relative flex min-w-[120px] items-center justify-between gap-2 overflow-hidden rounded-md border border-[#949494] bg-white px-4 py-2.5 font-raleway text-sm text-black transition-all hover:border-gray-400"
            >
              <div className="absolute left-0 top-0 h-0.5 w-full scale-x-0 bg-button-hover transition-transform duration-300 group-hover:scale-x-100" />
              <span>{selectedFilters.gender || 'Gender'}</span>
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
                    className="block w-full px-4 py-2 text-left font-raleway text-sm text-black first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => toggleDropdown('size')}
              className="group relative flex min-w-[120px] items-center justify-between gap-2 overflow-hidden rounded-md border border-[#949494] bg-white px-4 py-2.5 font-raleway text-sm text-black transition-all hover:border-gray-400"
            >
              <div className="absolute left-0 top-0 h-0.5 w-full scale-x-0 bg-button-hover transition-transform duration-300 group-hover:scale-x-100" />
              <span>{selectedFilters.size || 'Size'}</span>
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
                    className="block w-full px-4 py-2 text-left font-raleway text-sm text-black first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => toggleDropdown('category')}
              className="group relative flex min-w-[120px] items-center justify-between gap-2 overflow-hidden rounded-md border border-[#949494] bg-white px-4 py-2.5 font-raleway text-sm text-black transition-all hover:border-gray-400"
            >
              <div className="absolute left-0 top-0 h-0.5 w-full scale-x-0 bg-button-hover transition-transform duration-300 group-hover:scale-x-100" />
              <span>{selectedFilters.category || 'Category'}</span>
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
                    className="block w-full px-4 py-2 text-left font-raleway text-sm text-black first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => toggleDropdown('brand')}
              className="group relative flex min-w-[120px] items-center justify-between gap-2 overflow-hidden rounded-md border border-[#949494] bg-white px-4 py-2.5 font-raleway text-sm text-black transition-all hover:border-gray-400"
            >
              <div className="absolute left-0 top-0 h-0.5 w-full scale-x-0 bg-button-hover transition-transform duration-300 group-hover:scale-x-100" />
              <span>{selectedFilters.brand || 'Brand'}</span>
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
              <div className="absolute left-0 top-full z-10 mt-2 min-w-[120px] rounded-lg border border-gray-300 bg-white shadow-lg">
                {brandOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleDropdownChange('brand', option)}
                    className="block w-full px-4 py-2 text-left font-raleway text-sm text-black first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('sort')}
              className="group relative flex min-w-[120px] items-center justify-between gap-2 overflow-hidden rounded-md border border-[#949494] bg-white px-4 py-2.5 font-raleway text-sm text-black transition-all hover:border-gray-400"
            >
              <div className="absolute left-0 top-0 h-0.5 w-full scale-x-0 bg-button-hover transition-transform duration-300 group-hover:scale-x-100" />
              <span>{selectedFilters.sort || 'Sort'}</span>
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
                    className="block w-full px-4 py-2 text-left font-raleway text-sm text-black first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showMoreFilters && (
        <div className="mt-4 flex flex-wrap items-center gap-2 md:gap-3">
          {/* Colour Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('colour')}
              className="group relative flex min-w-[120px] items-center justify-between gap-2 overflow-hidden rounded-md border border-[#949494] bg-white px-4 py-2.5 font-raleway text-sm text-black transition-all hover:border-gray-400"
            >
              <div className="absolute left-0 top-0 h-0.5 w-full scale-x-0 bg-button-hover transition-transform duration-300 group-hover:scale-x-100" />
              <span>{selectedFilters.colour || 'Colour'}</span>
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
                    className="block w-full px-4 py-2 text-left font-raleway text-sm text-black first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pattern Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('pattern')}
              className="group relative flex min-w-[120px] items-center justify-between gap-2 overflow-hidden rounded-md border border-[#949494] bg-white px-4 py-2.5 font-raleway text-sm text-black transition-all hover:border-gray-400"
            >
              <div className="absolute left-0 top-0 h-0.5 w-full scale-x-0 bg-button-hover transition-transform duration-300 group-hover:scale-x-100" />
              <span>{selectedFilters.pattern || 'Pattern'}</span>
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
                    className="block w-full px-4 py-2 text-left font-raleway text-sm text-black first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Use Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('use')}
              className="group relative flex min-w-[120px] items-center justify-between gap-2 overflow-hidden rounded-md border border-[#949494] bg-white px-4 py-2.5 font-raleway text-sm text-black transition-all hover:border-gray-400"
            >
              <div className="absolute left-0 top-0 h-0.5 w-full scale-x-0 bg-button-hover transition-transform duration-300 group-hover:scale-x-100" />
              <span>{selectedFilters.use || 'Use'}</span>
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
                    className="block w-full px-4 py-2 text-left font-raleway text-sm text-black first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Length Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('length')}
              className="group relative flex min-w-[120px] items-center justify-between gap-2 overflow-hidden rounded-md border border-[#949494] bg-white px-4 py-2.5 font-raleway text-sm text-black transition-all hover:border-gray-400"
            >
              <div className="absolute left-0 top-0 h-0.5 w-full scale-x-0 bg-button-hover transition-transform duration-300 group-hover:scale-x-100" />
              <span>{selectedFilters.length || 'Length'}</span>
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
                    className="block w-full px-4 py-2 text-left font-raleway text-sm text-black first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Style Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('style')}
              className="group relative flex min-w-[120px] items-center justify-between gap-2 overflow-hidden rounded-md border border-[#949494] bg-white px-4 py-2.5 font-raleway text-sm text-black transition-all hover:border-gray-400"
            >
              <div className="absolute left-0 top-0 h-0.5 w-full scale-x-0 bg-button-hover transition-transform duration-300 group-hover:scale-x-100" />
              <span>{selectedFilters.style || 'Style'}</span>
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
                    className="block w-full px-4 py-2 text-left font-raleway text-sm text-black first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterSection
