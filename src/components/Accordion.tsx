import { useState } from 'react'

interface AccordionItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle
}: AccordionItemProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-banner-lower">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-banner-lower/80"
      >
        <h3 className="font-rubik text-sm font-semibold uppercase tracking-wide text-text-primary sm:text-sm">
          {question}
        </h3>
        <div className="ml-4 shrink-0">
          <svg
            className={`size-4 text-text-primary transition-transform duration-300${
              isOpen ? 'rotate-45' : 'rotate-0'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-text-primary/20 px-6 pb-6 pt-4">
          <p className="font-inter text-sm leading-relaxed text-text-primary sm:text-sm">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

interface AccordionProps {
  items: Array<{
    question: string
    answer: string
  }>
}

function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  )
}

export default Accordion
