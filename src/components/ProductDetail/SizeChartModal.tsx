import { useState } from 'react'

interface SizeChartModalProps {
  isOpen: boolean
  onClose: () => void
}

function SizeChartModal({ isOpen, onClose }: SizeChartModalProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/10">
      <div className="fixed right-0 top-0 h-full bg-cream w-full max-w-md max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 sticky top-0 bg-cream z-10">
          <h2 className="font-raleway text-sm md:text-base font-bold text-black">SIZE GUIDE - INCH SIZE CONVERSIONS</h2>
          <button
            onClick={onClose}
            className="text-black hover:text-black transition-colors flex-shrink-0 ml-4"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* How to Measure Section */}
          <div className="border-b border-gray-700">
            <button
              onClick={() => toggleSection('measure')}
              className="w-full flex items-center justify-between py-4 text-black hover:text-[#E9908E] transition-colors"
            >
              <span className="font-raleway text-sm font-bold">HOW TO MEASURE</span>
              <svg
                className={`w-5 h-5 transition-transform ${expandedSection === 'measure' ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
            {expandedSection === 'measure' && (
              <div className="pb-4 text-black text-sm font-raleway space-y-4">
        

                {/* Measurement Instructions */}
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="text-[#E9908E] font-bold flex-shrink-0">•</span>
                    <p><span className="font-bold">Waist:</span> Measure your waist at the narrowest point.</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#E9908E] font-bold flex-shrink-0">•</span>
                    <p><span className="font-bold">Low hip:</span> Measure your low hip around the fullest part of your hip.</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#E9908E] font-bold flex-shrink-0">•</span>
                    <p><span className="font-bold">Inside leg:</span> Inside leg is measured from the crotch to the floor.</p>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-cream p-3 rounded text-sm leading-relaxed">
                  <p>When no length is mentioned in the size name, it means it's a regular length. You can find further size information under length size 32". Jeans sizes are often given in inches, e.g. 33/32. The first number is the waist measurement and the second is the inner leg length.</p>
                </div>
              </div>
            )}
          </div>

          {/* Size Chart */}
          <div className="mt-6">
            <h3 className="font-raleway text-base font-bold text-black text-center mb-4">BOOTS SIZE CHART</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#8B3A3A]">
                    <th className="border border-gray-600 px-4 py-3 text-white font-raleway font-bold">SIZE</th>
                    <th className="border border-gray-600 px-4 py-3 text-white font-raleway font-bold">EUR</th>
                    <th className="border border-gray-600 px-4 py-3 text-white font-raleway font-bold">US</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { size: '5', eur: '36', us: '5' },
                    { size: '5.5', eur: '37', us: '5.5' },
                    { size: '6', eur: '38', us: '6' },
                    { size: '6.5', eur: '39', us: '6.5' },
                    { size: '7', eur: '40', us: '7' },
                    { size: '7.5', eur: '41', us: '7.5' },
                    { size: '8', eur: '42', us: '8' },
                    { size: '8.5', eur: '43', us: '8.5' },
                    { size: '9', eur: '44', us: '9' },
                    { size: '9.5', eur: '45', us: '9.5' },
                    { size: '10', eur: '46', us: '10' },
                    { size: '10.5', eur: '47', us: '10.5' },
                    { size: '11', eur: '48', us: '11' }
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-900' : 'bg-black'}>
                      <td className="border border-gray-600 px-4 py-3 text-white font-raleway text-center font-bold">{row.size}</td>
                      <td className="border border-gray-600 px-4 py-3 text-white font-raleway text-center font-bold">{row.eur}</td>
                      <td className="border border-gray-600 px-4 py-3 text-white font-raleway text-center font-bold">{row.us}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SizeChartModal
