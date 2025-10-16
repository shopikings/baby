interface ModalImageProps {
  image: string
  alt: string
}

function ModalImage({ image, alt }: ModalImageProps) {
  return (
    <div className="flex w-full items-center justify-center bg-black md:w-3/5">
      <img
        src={image}
        alt={alt}
        className="max-h-[50vh] w-full object-contain p-4 md:max-h-[600px] md:p-8"
      />
    </div>
  )
}

export default ModalImage
