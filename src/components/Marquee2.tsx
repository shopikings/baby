import { useEffect, useRef, useState } from 'react'

interface MarqueeProps {
  text1?: string
  text2?: string
  text?: string
  className?: string
  speed?: number
  clickableText?: string
  onClickableClick?: () => void
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
  const [translateX, setTranslateX] = useState(0)
  const [direction, setDirection] = useState(1)
  const [displayText, setDisplayText] = useState('')
  const animationRef = useRef<number>()

  useEffect(() => {
    // Use text1 and text2 if provided, otherwise fall back to text
    const separator = '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'
    const finalText = text1 && text2 ? `${text1}${separator}${text2}` : text || ''
    
    const processedText = clickableText
      ? finalText.replace(clickableText, `<CLICKABLE>${clickableText}</CLICKABLE>`)
      : finalText

    const duplicatedText = Array(8)
      .fill(processedText)
      .join(separator)
    setDisplayText(duplicatedText)
  }, [text1, text2, text, clickableText])

  useEffect(() => {
    const animate = () => {
      if (!containerRef.current || !textRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      const textWidth = textRef.current.offsetWidth
      const maxTranslate = Math.max(0, textWidth - containerWidth)

      if (maxTranslate > 0) {
        setTranslateX((prev) => {
          let newTranslateX = prev + (direction * speed) / 60

          if (newTranslateX >= maxTranslate) {
            newTranslateX = maxTranslate
            setDirection(-1)
          } else if (newTranslateX <= 0) {
            newTranslateX = 0
            setDirection(1)
          }

          return newTranslateX
        })
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [direction, speed, displayText])

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
    >
      <div
        ref={textRef}
        className="inline-block font-raleway text-xs font-light uppercase transition-transform duration-75 ease-linear"
        style={{ transform: `translateX(-${translateX}px)` }}
      >
        {clickableText
          ? displayText.split('<CLICKABLE>').map((part, index) => {
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
          : displayText}
      </div>
    </div>
  )
}

export default Marquee2
