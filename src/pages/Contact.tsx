import { useState } from 'react'
import { Link } from 'react-router-dom'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    helpType: 'product questions or issues',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-cream py-12 sm:py-16">
      <div className="mx-auto max-w-md px-6 sm:px-8">
        <div className="text-center">
          <h1 className="font-rubik text-base font-bold uppercase tracking-wide text-text-primary md:text-2xl">
            CONTACT US
          </h1>
          <p className="mx-auto mt-3 max-w-sm font-raleway text-sm leading-relaxed text-gray-700">
            We're happy to help! If you have order status-related questions,
            check our{' '}
            <Link to="/order-tracking" className="underline">
              Order Tracking
            </Link>{' '}
            page. If you have brand or website questions, check out our{' '}
            <Link to="/faq" className="underline">
              FAQ
            </Link>{' '}
            page. If you still need help, we'll respond to your message below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block font-raleway text-sm text-gray-600"
              >
                name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-md bg-white px-3 py-2 font-raleway text-sm text-gray-900 focus:outline-none"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-raleway text-sm text-gray-600"
              >
                email*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-md bg-white px-3 py-2 font-raleway text-sm text-gray-900 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="helpType"
              className="block font-raleway text-sm text-gray-600"
            >
              how can we help?
            </label>
            <div className="relative mt-1">
              <select
                id="helpType"
                name="helpType"
                value={formData.helpType}
                onChange={handleChange}
                className="w-full appearance-none rounded-md bg-white px-3 py-2 pr-8 font-raleway text-sm text-gray-900 focus:outline-none"
              >
                <option value="product questions or issues">
                  product questions or issues
                </option>
                <option value="order status">
                  tracking and delivery issues
                </option>
                <option value="shipping">damaged product</option>
                <option value="returns">health concern</option>
                <option value="returns">
                  website feedback, checkout or promotions issue
                </option>
                <option value="returns">website account</option>
                <option value="returns">
                  public relations and collaborations
                </option>
                <option value="returns">data privacy</option>
                <option value="other">other</option>
              </select>
              <svg
                className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-gray-600"
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
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block font-raleway text-sm text-gray-600"
            >
              message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="mt-1 w-full resize-none rounded-md bg-white px-3 py-2 font-raleway text-sm text-gray-900 focus:outline-none"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-lg border border-button-hover bg-transparent py-2.5 font-raleway text-sm text-gray-900 transition-colors hover:bg-button-hover hover:text-white"
            >
              send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact
