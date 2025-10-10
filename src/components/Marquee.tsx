import { useEffect, useRef, useState } from 'react'

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
  const [translateX, setTranslateX] = useState(0)
  const [direction, setDirection] = useState(1)
  const [displayText, setDisplayText] = useState(text)
  const animationRef = useRef<number>()

  useEffect(() => {
    const processedText = clickableText
      ? text.replace(clickableText, `<CLICKABLE>${clickableText}</CLICKABLE>`)
      : text

    const duplicatedText = Array(8)
      .fill(processedText)
      .join(
        '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'
      )
    setDisplayText(duplicatedText)
  }, [text, clickableText])

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
        className="inline-block font-raleway text-sm font-normal transition-transform duration-75 ease-linear"
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
                      className="cursor-pointer hover:opacity-80"
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

export default Marquee
