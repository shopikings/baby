import { useEffect, useRef } from 'react'

interface MarqueeProps {
  text1?: string
  text2?: string
  text?: string
  className?: string
  speed?: number
  clickableText?: string
  onClickableClick?: () => void
}

const renderWithNumberFont = (text: string) => {
  return text.split(/(\d+)/).map((part, index) => {
    // If part is a number
    if (/^\d+$/.test(part)) {
      return (
        <span key={index} className="font-rubik">
          {part}
        </span>
      )
    }

    return <span key={index}>{part}</span>
  })
}

function Marquee2({
  text1,
  text2,
  text,
  className = '',
  speed = 50,
  clickableText,
  onClickableClick
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const stateRef = useRef({ translateX: 0, direction: 1 })

  useEffect(() => {
    const animate = () => {
      if (!containerRef.current || !textRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      const textWidth = textRef.current.offsetWidth
      const maxTranslate = Math.max(0, textWidth - containerWidth)

      if (maxTranslate > 0) {
        let newTranslateX =
          stateRef.current.translateX +
          (stateRef.current.direction * speed) / 60

        if (newTranslateX >= maxTranslate) {
          newTranslateX = maxTranslate
          stateRef.current.direction = -1
        } else if (newTranslateX <= 0) {
          newTranslateX = 0
          stateRef.current.direction = 1
        }

        stateRef.current.translateX = newTranslateX
        textRef.current.style.transform = `translateX(-${newTranslateX}px)`
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [speed])

  const separator =
    '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'
  const finalText = text1 && text2 ? `${text1}${separator}${text2}` : text || ''

  const processedText = clickableText
    ? finalText.replace(
        clickableText,
        `<CLICKABLE>${clickableText}</CLICKABLE>`
      )
    : finalText

  const duplicatedText = Array(6).fill(processedText).join(separator)

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
    >
      <div
        ref={textRef}
        className="inline-block font-raleway text-xs font-light uppercase will-change-transform text-white"
        style={{ transform: 'translateX(0px)' }}
      >
        {clickableText
          ? duplicatedText.split('<CLICKABLE>').map((part, index) => {
              if (part.includes('</CLICKABLE>')) {
                const [clickablePart, rest] = part.split('</CLICKABLE>')

                return (
                  <span key={index}>
                    <button
                      onClick={onClickableClick}
                      className="cursor-pointer underline hover:opacity-80"
                    >
                      {renderWithNumberFont(clickablePart)}
                    </button>

                    {renderWithNumberFont(rest)}
                  </span>
                )
              }

              return <span key={index}>{renderWithNumberFont(part)}</span>
            })
          : renderWithNumberFont(duplicatedText)}
      </div>
    </div>
  )
}

export default Marquee2
