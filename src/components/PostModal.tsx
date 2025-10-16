import { useState, useEffect } from 'react'
import ModalOverlay from './PostModal/ModalOverlay'
import ModalContent from './PostModal/ModalContent'
import ModalImage from './PostModal/ModalImage'
import ModalInfo from './PostModal/ModalInfo'

interface PostModalProps {
  isOpen: boolean
  onClose: () => void
  image: string
  title: string
  description: string
}

function PostModal({
  isOpen,
  onClose,
  image,
  title,
  description
}: PostModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10)
      document.body.style.overflow = 'hidden'
    } else {
      setIsVisible(false)
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose(), 300)
  }

  if (!isOpen) return null

  return (
    <>
      <ModalOverlay onClick={handleClose} isVisible={isVisible} />
      <ModalContent onClose={handleClose} isVisible={isVisible}>
        <ModalImage image={image} alt={title} />
        <ModalInfo title={title} description={description} />
      </ModalContent>
    </>
  )
}

export default PostModal
