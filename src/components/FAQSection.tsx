import Accordion from './Accordion'

function FAQSection() {
  const faqItems = [
    {
      question: 'WHAT MAKES MAISON BABY & KIDS UNIQUE?',
      answer:
        'Maison Baby and Kids stands out for its carefully curated collection of premium, stylish, and comfortable products designed for babies and kids. We focus on exceptional quality, safe materials, and modern designs that parents love.'
    },
    {
      question: 'ARE THE CLOTHES YOU CARRY SUSTAINABLE?',
      answer:
        'At Maison Baby and Kids, we strive to offer a selection of clothing that’s as kind to the planet as it is to your little one. While not every item in our range is 100% “eco-certified,” many of our pieces are made from sustainable materials like organic cotton, which is grown without harmful pesticides.'
    },
    {
      question: 'HOW LONG DOES THE SHIPPING TAKE?',
      answer:
        'We use UPS for shipping, and typically it takes 6–8 business days from the time you place your order for in-stock items to be delivered.If an item is out of stock, we’ll notify you by email with an estimated delivery time.'
    },
    {
      question: "WHAT'S YOUR RETURN POLICY?",
      answer:
        'We accept returns of unused items within 30 days of when you received your order. Refunds cover only the cost of the merchandise, shipping charges are not refunded. You can read more at the Refund and Return page. \n Please note, all sales are final on sale and holiday/seasonal items and can not be returned or exchanged. \n Please note, all sales for Uppababy Vista V2 and Mesa Max are final and can not be returned or exchanged.'
    }
  ]

  return (
    <section className="bg-cream py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-rubik text-3xl font-bold text-text-primary sm:text-4xl md:text-5xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div>
            <Accordion items={faqItems} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
