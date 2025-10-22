import { useState } from 'react'

function BlogCommentForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Comment submitted:', formData)
  }

  return (
    <div className="border border-button-hover p-8">
      <h3 className="mb-6 font-rubik text-2xl font-normal text-[#2E2E2E]">
        LEAVE A COMMENT
      </h3>

      <div className="mb-6 space-y-2 font-raleway text-base text-text-primary/70">
        <p>All comments are moderated before being published.</p>
        <p>
          This site is protected by hCaptcha and the hCaptcha Privacy Policy and
          Terms of Service apply.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <input
              type="text"
              name="name"
              placeholder="NAME"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-full border border-button-hover bg-transparent px-4 py-3 font-raleway text-sm placeholder:text-text-primary/60 focus:outline-none"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="E-MAIL"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-full border border-button-hover bg-transparent px-4 py-3 font-raleway text-sm placeholder:text-text-primary/60 focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <textarea
            name="message"
            placeholder="MESSAGE"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="w-full resize-none rounded-xl border border-button-hover bg-transparent px-4 py-3 font-raleway text-sm placeholder:text-text-primary/60 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-button-hover px-8 py-3 font-raleway text-sm font-bold text-white transition-colors hover:bg-banner-lower"
        >
          SUBMIT
        </button>
      </form>
    </div>
  )
}

export default BlogCommentForm
