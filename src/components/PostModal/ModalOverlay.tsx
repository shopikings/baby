interface ModalOverlayProps {
  onClick: () => void
  isVisible: boolean
}

function ModalOverlay({ onClick, isVisible }: ModalOverlayProps) {
  return (
    <div
      className={`fixed inset-0 z-50 bg-black transition-opacity duration-300 ${
        isVisible ? 'bg-opacity-75' : 'bg-opacity-0'
      }`}
      onClick={onClick}
    />
  )
}

export default ModalOverlay
