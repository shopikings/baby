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
          <div className="relative size-4">
            <svg
              className="absolute inset-0 text-text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 12h12"
              />
            </svg>
            <svg
              className={`absolute inset-0 text-text-primary transition-transform duration-300 ${
                isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v12"
              />
            </svg>
          </div>
        </div>
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="min-h-0">
          <div className="border-t border-text-primary/20 px-6 pb-6 pt-4">
            <p className="font-raleway text-sm leading-relaxed text-text-primary sm:text-sm">
              {answer.split('\n').map((line, i) => (
                <p key={i}>{line.trim()}</p>
              ))}
            </p>
          </div>
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
