import { useEffect, useRef } from 'react'

interface MarqueeProps {
  text: string
  className?: string
  speed?: number
  clickableText?: string
  onClickableClick?: () => void
}

function Marquee({
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
        let newTranslateX = stateRef.current.translateX + (stateRef.current.direction * speed) / 60

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

  const processedText = clickableText
    ? text.replace(clickableText, `<CLICKABLE>${clickableText}</CLICKABLE>`)
    : text

  const separator = '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'
  const duplicatedText = Array(6)
    .fill(processedText)
    .join(separator)

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
    >
      <div
        ref={textRef}
        className="inline-block font-raleway text-sm font-normal will-change-transform"
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
                      {clickablePart}
                    </button>
                    {rest}
                  </span>
                )
              }
              return part
            })
          : duplicatedText}
      </div>
    </div>
  )
}

export default Marquee
