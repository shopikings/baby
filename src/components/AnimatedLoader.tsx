import { useEffect, useState } from 'react'

interface AnimatedLoaderProps {
  onAnimationComplete: () => void
  isVideoLoaded: boolean
  show: boolean
}

function AnimatedLoader({
  onAnimationComplete,
  isVideoLoaded,
  show
}: AnimatedLoaderProps) {
  const [animationComplete, setAnimationComplete] = useState(false)
  const [shouldBounce, setShouldBounce] = useState(false)

  const websiteName = 'MAISON BABY & KIDS'
  const words = websiteName.split(' ')
  const letters = websiteName.split('')

  useEffect(() => {
    const animationDuration = letters.length * 100 + 500

    const animationTimer = setTimeout(() => {
      setAnimationComplete(true)
      onAnimationComplete()
    }, animationDuration)

    return () => clearTimeout(animationTimer)
  }, [letters.length, onAnimationComplete])

  useEffect(() => {
    if (animationComplete && isVideoLoaded) {
      setShouldBounce(true)
    }
  }, [animationComplete, isVideoLoaded])

  if (!show) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-cream transition-all duration-700 ${
        shouldBounce
          ? '-translate-y-full opacity-0 delay-500'
          : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="text-center">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 font-rubik text-3xl font-normal text-text-primary sm:text-4xl md:text-5xl lg:text-6xl">
          {words.map((word, wordIndex) => {
            const wordLetters = word.split('')
            const letterStartIndex =
              words.slice(0, wordIndex).join(' ').length +
              (wordIndex > 0 ? wordIndex : 0)

            return (
              <div key={wordIndex} className="flex whitespace-nowrap">
                {wordLetters.map((letter, letterIndex) => {
                  const globalIndex = letterStartIndex + letterIndex
                  return (
                    <span
                      key={`${wordIndex}-${letterIndex}`}
                      className={`inline-block ${
                        shouldBounce
                          ? 'animate-quickBounce'
                          : 'animate-slideInUp opacity-0'
                      }`}
                      style={{
                        animationDelay: shouldBounce
                          ? `${globalIndex * 30}ms`
                          : `${globalIndex * 100}ms`
                      }}
                    >
                      {letter}
                    </span>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AnimatedLoader
