import { ReactNode } from 'react'

interface ModalContentProps {
  children: ReactNode
  onClose: () => void
  isVisible: boolean
}

function ModalContent({ children, onClose, isVisible }: ModalContentProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 transition-opacity duration-300 sm:p-4 ${
        isVisible
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className={`relative flex w-full max-w-6xl overflow-hidden rounded-lg bg-white shadow-2xl transition-transform duration-300 ${
          isVisible ? 'scale-100' : 'scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxHeight: '100dvh', // 🔥 Prevents modal from exceeding screen height
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <button
          onClick={onClose}
          className="absolute right-2 top-2 z-10 flex size-8 items-center justify-center rounded-full bg-white text-gray-600 shadow-lg transition-colors hover:bg-gray-100 hover:text-gray-900 sm:right-4 sm:top-4 sm:size-10"
        >
          <svg
            className="size-5 sm:size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div
          className="flex w-full flex-col md:flex-row"
          style={{
            overflowY: 'auto',
            maxHeight: '100dvh'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default ModalContent
