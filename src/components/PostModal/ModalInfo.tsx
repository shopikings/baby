interface ModalInfoProps {
  title: string
  description: string
}

function ModalInfo({ title, description }: ModalInfoProps) {
  return (
    <div className="flex w-full flex-col bg-white p-6 md:w-2/5 md:p-8">
      <h2 className="font-rubik text-xl font-semibold text-text-primary sm:text-2xl md:text-3xl">
        {title}
      </h2>
      <p className="mt-3 font-raleway text-sm leading-relaxed text-gray-600 md:mt-4 md:text-base">
        {description}
      </p>
    </div>
  )
}

export default ModalInfo
