import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface NewsletterModalProps {
  isOpen: boolean
  onClose: () => void
}

function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail('')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-4xl overflow-hidden rounded-lg bg-cream shadow-2xl"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex size-8 cursor-pointer items-center justify-center"
            >
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x-icon lucide-x text-white"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="hidden md:block md:w-1/2">
                <img
                  src="/assets/images/newsletter.png"
                  alt="Child in nature"
                  className="size-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/blogOne.png'
                  }}
                />
              </div>

              <div className="flex flex-col justify-center p-8 md:w-1/2 md:p-12 bg-black">
                <div className="mb-8 flex justify-center">
                  <img
                    src="/assets/images/logo.png"
                    alt="Maison Baby & Kids"
                    className="h-12 w-auto"
                  />
                </div>

                <div className="mb-8 flex justify-center">
                  <img
                    src="/assets/images/newsletter-joinTheFun.png"
                    alt="Maison Baby & Kids"
                    className="h-28 w-auto"
                  />
                </div>

                <p className="mb-8 text-center font-raleway text-sm font-semibold leading-relaxed text-white">
                  Get 10% Off Your First Order And Be The First To Know When New
                  Collection Drop
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    placeholder="EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border-2 border-gray-500 bg-transparent px-4 py-3 font-raleway text-sm placeholder:text-gray-500 focus:border-button-hover focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full rounded-lg border-2 border-button-hover bg-button-hover py-3 font-raleway text-base font-semibold text-white transition-colors hover:border-black hover:bg-white hover:text-black"
                  >
                    Join In Advance
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default NewsletterModal
