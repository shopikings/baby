import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FramerMotionLoaderProps {
  onAnimationComplete: () => void
  isVideoLoaded: boolean
  show: boolean
}

function FramerMotionLoader({
  onAnimationComplete,
  isVideoLoaded,
  show
}: FramerMotionLoaderProps) {
  const [animationComplete, setAnimationComplete] = useState(false)
  const [shouldBounce, setShouldBounce] = useState(false)

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

  useEffect(() => {
    if (animationComplete && isVideoLoaded) {
      setShouldBounce(true)
    }
  }, [animationComplete, isVideoLoaded])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="absolute inset-0 z-50 flex items-center justify-center bg-cream"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: '-100%',
            transition: {
              duration: 0.7,
              delay: shouldBounce ? 0.5 : 0
            }
          }}
        >
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-1 font-rubik text-4xl font-normal text-text-primary md:text-5xl lg:text-6xl">
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  className={`inline-block ${letter === ' ' ? 'w-4' : ''}`}
                  initial={{
                    opacity: 0,
                    y: 30
                  }}
                  animate={
                    shouldBounce
                      ? {
                          y: [0, -12, 0],
                          transition: {
                            duration: 0.4,
                            delay: index * 0.03,
                            ease: 'easeOut'
                          }
                        }
                      : {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.6,
                            delay: index * 0.1,
                            ease: 'easeOut'
                          }
                        }
                  }
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FramerMotionLoader
