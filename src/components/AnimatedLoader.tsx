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

  const websiteName = 'MAISON BABY & KIDS'
  const letters = websiteName.split('')

  useEffect(() => {
    const animationDuration = letters.length * 100 + 500

    const animationTimer = setTimeout(() => {
      setAnimationComplete(true)
      onAnimationComplete()
    }, animationDuration)

    return () => clearTimeout(animationTimer)
  }, [letters.length, onAnimationComplete])

  if (!show) return null

  return (
    <div
      className={`absolute inset-0 z-50 flex items-center justify-center bg-cream transition-all duration-700 ${
        animationComplete && isVideoLoaded
          ? '-translate-y-full opacity-0'
          : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="text-center">
        <div className="flex flex-wrap justify-center gap-1 font-rubik text-4xl font-normal text-text-primary md:text-5xl lg:text-6xl">
          {letters.map((letter, index) => (
            <span
              key={index}
              className={`inline-block animate-slideInUp opacity-0 ${
                letter === ' ' ? 'w-4' : ''
              }`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnimatedLoader
