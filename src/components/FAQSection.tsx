import Accordion from './Accordion'

function FAQSection() {
  const faqItems = [
    {
      question: 'WHAT MAKES ALL THINGS MAISON BABY & KIDS UNIQUE?',
      answer:
        "We curate premium, sustainable children's fashion from independent designers worldwide. Each piece is carefully selected for quality, style, and ethical production practices."
    },
    {
      question: 'ARE THE CLOTHES YOU CARRY SUSTAINABLE?',
      answer:
        'Yes, sustainability is at the heart of everything we do. We partner with brands that prioritize eco-friendly materials, ethical manufacturing, and responsible business practices.'
    },
    {
      question: 'HOW LONG DOES SHIPPING TAKE?',
      answer:
        'Standard shipping takes 3-5 business days within the UK. International shipping varies by location, typically 7-14 business days. Express options are available at checkout.'
    },
    {
      question: "WHAT'S YOUR RETURN POLICY?",
      answer:
        "Returns are accepted within 45 days on unworn items. It's quick, easy, and no stress."
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
