import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

interface StoreCreditModalProps {
  isOpen: boolean
  onClose: () => void
  buttonPosition: { top: number; right: number }
}

export default function StoreCreditModal({
  isOpen,
  onClose,
  buttonPosition
}: StoreCreditModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              bottom: `calc(100vh - ${buttonPosition.top}px)`,
              right: `${buttonPosition.right}px`
            }}
            className="fixed z-50 w-[90vw] max-w-md rounded-lg bg-white p-6 shadow-2xl md:w-96"
          >
            <h2
              className="mb-2 text-xl font-bold leading-7 text-[#111827]"
              style={{ fontFamily: 'Segoe UI, sans-serif' }}
            >
              Welcome To Our New Loyalty Program
            </h2>
            <p
              className="mb-6 text-sm font-normal leading-5 text-[#4B5563]"
              style={{ fontFamily: 'Segoe UI, sans-serif' }}
            >
              Earn Store Credit for every purchase and redeem it with your next
              order.
            </p>

            <button className="mb-6 w-full rounded-lg border border-gray-300 bg-white py-2 text-center font-medium text-black transition-colors hover:bg-gray-50">
              Login
            </button>

            <div className="mb-6 h-px w-full bg-[#E5E7EB]"></div>

            <h3
              className="mb-4 text-base font-semibold leading-6 text-[#212B36]"
              style={{ fontFamily: 'Segoe UI, sans-serif' }}
            >
              Get started with Store Credits
            </h3>

            <div className="mb-4 rounded-lg border border-[#E5E7EB] p-4">
              <h4 className="mb-1 text-sm font-bold text-[#212B36]">
                Cashback
              </h4>
              <p className="text-sm text-[#212B36]">
                Earn 3% credits with every purchase
              </p>
            </div>

            <button className="mb-4 flex w-full items-center justify-between rounded-lg border border-[#E5E7EB] p-4 text-left transition-colors hover:bg-gray-100">
              <span className="text-sm font-semibold text-black">
                How to use credit
              </span>
              <ChevronRight className="size-5 text-gray-600" />
            </button>

            <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
              <span>We reward with</span>
              <img
                src="/assets/icons/redeemly.svg"
                alt="Redeemly"
                className="h-3"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
