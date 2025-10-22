import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const renderAnswerWithLinks = (answer: string) => {
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g
  const parts = answer.split(emailRegex)

  return parts.map((part, index) => {
    if (emailRegex.test(part)) {
      return (
        <a
          key={index}
          href={`mailto:${part}`}
          className="text-button-hover underline hover:text-banner-lower"
        >
          {part}
        </a>
      )
    }
    return part
  })
}

interface FAQCategory {
  id: string
  name: string
  items: FAQItem[]
}

function FAQ() {
  const [activeCategory, setActiveCategory] = useState('order-payment')
  const [openQuestions, setOpenQuestions] = useState<number[]>([])

  const categories: FAQCategory[] = [
    {
      id: 'order-payment',
      name: 'Order & Payment',
      items: [
        {
          question: 'Can I cancel my order?',
          answer:
            'Unfortunately, we are not able to cancel an order once it has been placed.'
        },
        {
          question: 'I put the wrong address in my order, what should I do?',
          answer:
            'Please be careful when entering your shipping address, Maison Baby & Kids will not be responsible for orders sent to the incorrect delivery address provided by the customer.'
        },
        {
          question:
            'I have not received my order confirmation, what should I do?',
          answer:
            'Sending order confirmations can sometimes take up to 24 hours due to high demand. If you have not received your order confirmation email after 24 hours, please contact us.'
        },
        {
          question: 'How can I track my order?',
          answer:
            'You can track your order using the tracking number you received in your mail.'
        },
        {
          question: 'How can I check the status of my order?',
          answer:
            'You can track your order using the tracking number you received in your mail.'
        },
        {
          question: 'My packages seem to have stopped moving?',
          answer:
            'If your package stops moving at any point, do not fret! It is still on its way to you and is likely just clearing customs. Occasionally, there may be delays due to customs or weather events. If this happens, your tracking page will be updated with the latest shipping status.'
        },
        {
          question: 'Do you offer returns?',
          answer:
            'We offer a 100% money back guarantee, if the product is not defective or damaged. We give you 30 days to send it back to us for a full refund. You must ship it back at your own expense, once we have received the product we will refund the full amount of your original purchase. Please Include all a name and order number on the returned parcels.'
        },
        {
          question: 'Do you offer exchanges?',
          answer:
            'Yes, we offer exchanges, get in touch with our customer care team at hello@maisonbabyandkids.com'
        },
        {
          question: 'I received incorrect items in my order, what should I do?',
          answer:
            'Please drop an email at hello@maisonbabyandkids.com within 48 hours of receiving your order, so that we can take care of this for you. Please provide your order number with your inquiry.'
        },
        {
          question: 'How can I contact support?',
          answer: 'please drop an email at hello@maisonbabyandkids.com'
        },
        {
          question: 'How long does it take to hear back from support?',
          answer: 'The customer care team will get back to you within 24 hours.'
        },
        {
          question: 'What forms of payment do you accept?',
          answer:
            "We accept online payments via visa, mastercard, american express, afterpay, discover, and paypal. If you are an international consumer, we also accept local payment providers. You'll see this list when you visit our checkout page."
        },
        {
          question: 'Why was I charged twice?',
          answer:
            'You will only be charged for what you purchased. If you see duplicate charges, please give it a few days until the issue falls off and gets rectified automatically. However, if it still remains and you are positive you only placed one order, please contact us at hello@maisonbabyandkids.com with a screenshot of the duplicate charge for further assistance.'
        }
      ]
    },
    {
      id: 'accounts',
      name: 'Accounts',
      items: [
        {
          question: 'Do I have to set up an account to place an order?',
          answer: 'No, you do not have to set up an account to place an order.'
        },
        {
          question: 'How do I create an account?',
          answer: 'You can create an account on the home page.'
        },
        {
          question: 'I forgot my password, what should I do?',
          answer:
            'To reset your password, click here. you will then be prompted to enter the e-mail address you used to create your account. Once you submit, you will receive an e-mail notification with a link to reset your password.'
        },
        {
          question:
            'How do I subscribe to emails or cancel my email subscription?',
          answer:
            'You can easily subscribe to emails by visiting maisonbabyandkids.com and using the sign up form located in the footer at the bottom of the page. If you want to cancel/unsubscribe, you can click unsubscribe by locating the "unsubscribe" link within your email.'
        }
      ]
    },
    {
      id: 'products',
      name: 'Products',
      items: [
        {
          question: 'How often do you restock?',
          answer:
            'Restock dates vary depending on product availability. please sign up for our emails or sms text alerts to find out when your favorite products will be back in stock!'
        },
        {
          question: 'Do you offer free samples or gifts?',
          answer:
            "Occasionally maisonbabyandkids.com will apply a gift with purchase to orders. Please note that unless otherwise stated, all free gifts redeemed alongside a customer's orders are included while supplies last and are therefore not guaranteed. All samples, packets, stickers, and other products or merchandise are subject to change and availability."
        },
        {
          question: 'Where are your products manufactured?',
          answer:
            'Our formulas are made in the usa and europe, with globally sourced ingredients.'
        },
        {
          question: 'What temperature do these products need to be stored at?',
          answer:
            'We recommend storing your products in a cool dry place, away from direct sunlight and excessive heat.'
        }
      ]
    },
    {
      id: 'shipping',
      name: 'Shipping',
      items: [
        {
          question: 'USA shipping',
          answer:
            'We offer complimentary standard shipping on all orders over $70 in the United States. For orders below $70 we charge for shipping.'
        },
        {
          question: 'International shipping',
          answer:
            'We offer complimentary express shipping for most international orders over $400, excluding duties & taxes. there may be product specific restrictions. For orders less than $400, we offer $50.00 flat rate shipping. Based on your shipping country, the rate may be higher to include duties & taxes and will be converted to your local currency. The exact shipping options for your country will be presented during checkout. International orders can experience delays, if your order has not arrived within 3 weeks of order placement, please contact our customer service team for updates via our contact us form.'
        }
      ]
    },
    {
      id: 'contact',
      name: 'Contact',
      items: [
        {
          question: 'How do I contact your customer support team?',
          answer: 'Please visit this page: contact us.'
        },
        {
          question:
            'I contacted your customer support team, when should I expect a response?',
          answer:
            'We respond to all emails as soon as possible. Our goal is to respond to all consumers within 24 hours, however we often experience delays over the weekend and during peak times.'
        },
        {
          question: 'How do I manage my personal data?',
          answer:
            'We care about your privacy, please click here to read our privacy policy.'
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
                    {renderAnswerWithLinks(item.answer)}
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
