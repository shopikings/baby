import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  id: string
  name: string
  items: FAQItem[]
}

function FAQ() {
  const [activeCategory, setActiveCategory] = useState('orders')
  const [openQuestions, setOpenQuestions] = useState<number[]>([])

  const categories: FAQCategory[] = [
    {
      id: 'orders',
      name: 'Orders',
      items: [
        {
          question: 'Can I Cancel My Order?',
          answer:
            'Yes, you can cancel your order within 24 hours of placing it. After 24 hours, if the order has been processed, cancellation may not be possible.'
        },
        {
          question: 'I Put The Wrong Address In My Order, What Should I Do?',
          answer:
            "Please contact our customer support immediately. If the order hasn't shipped yet, we can update the address. Once shipped, you may need to contact the carrier directly."
        },
        {
          question:
            'I Have Not Received My Order Confirmation, What Should I Do?',
          answer:
            "Check your spam/junk folder. If you still can't find it, contact our support team with your order details and we'll resend the confirmation."
        },
        {
          question: 'How Can I Track My Order?',
          answer:
            "Once your order ships, you'll receive a tracking number via email. You can use this number on our tracking page or the carrier's website."
        },
        {
          question: 'How Can I Check The Status Of My Order?',
          answer:
            'Log into your account and go to "My Orders" to see the current status. You can also use the tracking number provided in your shipping confirmation.'
        },
        {
          question: 'My Packages Seem To Have Stopped Moving?',
          answer:
            "Sometimes tracking updates can be delayed. If your package hasn't moved in 5-7 business days, please contact our support team for assistance."
        },
        {
          question: 'Do You Offer Returns?',
          answer:
            'Yes, we offer returns within 30 days of delivery. Items must be unused and in original packaging. Some exclusions may apply.'
        },
        {
          question: 'Do You Offer Exchanges?',
          answer:
            'Yes, we offer exchanges for different sizes or colors within 30 days. Contact our support team to initiate an exchange.'
        },
        {
          question: 'I Received Incorrect Items In My Order, What Should I Do?',
          answer:
            "We apologize for the error. Please contact our support team immediately with photos of the items received, and we'll arrange for a replacement or refund."
        },
        {
          question: 'How Can I Contact Support?',
          answer:
            'You can reach us via email at support@example.com, through our contact form, or call us at 1-800-XXX-XXXX during business hours.'
        },
        {
          question: 'How Long Does It Take To Hear Back From Support?',
          answer:
            'We typically respond to all inquiries within 24-48 hours during business days. For urgent matters, please call our support line.'
        }
      ]
    },
    {
      id: 'payment',
      name: 'Payment',
      items: [
        {
          question: 'What Payment Methods Do You Accept?',
          answer:
            'We accept all major credit cards, PayPal, Apple Pay, and Google Pay.'
        }
      ]
    },
    {
      id: 'accounts',
      name: 'Accounts',
      items: [
        {
          question: 'How Do I Create An Account?',
          answer:
            'Click on "Sign Up" at the top of the page and fill in your details.'
        }
      ]
    },
    {
      id: 'products',
      name: 'Products',
      items: [
        {
          question: 'Are Your Products Safe For Babies?',
          answer:
            'Yes, all our products meet safety standards and are tested for baby safety.'
        }
      ]
    },
    {
      id: 'shipping',
      name: 'Shipping',
      items: [
        {
          question: 'How Long Does Shipping Take?',
          answer:
            'Standard shipping takes 5-7 business days. Express shipping is available for 2-3 day delivery.'
        }
      ]
    },
    {
      id: 'contact',
      name: 'Contact',
      items: [
        {
          question: 'How Can I Reach Customer Service?',
          answer:
            'You can contact us via email, phone, or through our contact form on the website.'
        }
      ]
    }
  ]

  const toggleQuestion = (index: number) => {
    setOpenQuestions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  const activeData = categories.find((cat) => cat.id === activeCategory)

  return (
    <div className="min-h-screen bg-[#EFE8DC] py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <div className="text-center">
          <h1 className="font-rubik text-2xl font-bold uppercase tracking-wide text-button-hover md:text-4xl">
            FAQ
          </h1>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded px-4 py-2 font-raleway text-sm font-semibold transition-colors ${
                activeCategory === category.id
                  ? 'bg-button-hover text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-3">
          {activeData?.items.map((item, index) => (
            <div key={index} className="border-b border-gray-300">
              <button
                onClick={() => toggleQuestion(index)}
                className="flex w-full items-center justify-between py-4 text-left"
              >
                <span className="font-raleway text-sm font-semibold text-button-hover md:text-base">
                  {item.question}
                </span>
                <span className="ml-4 text-xl font-bold text-gray-600 transition-opacity duration-300">
                  {openQuestions.includes(index) ? '−' : '+'}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openQuestions.includes(index)
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pb-4">
                  <p className="font-raleway text-sm text-gray-700">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQ
