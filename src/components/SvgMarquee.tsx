function SvgMarquee() {
  const svgs = [
    { name: 'Bazzar', src: '/assets/icons/bazzar.svg' },
    { name: 'Dazed', src: '/assets/icons/dazed.svg' },
    { name: 'Glamour', src: '/assets/icons/glamour.svg' },
    { name: 'Vogue', src: '/assets/icons/vogue.svg' }
  ]

  const duplicatedSvgs = Array(8).fill(svgs).flat()

  return (
    <section style={{ backgroundColor: '#E9908E' }} className="py-6">
      <div className="overflow-hidden">
        <div className="flex animate-scroll items-center gap-12">
          {duplicatedSvgs.map((svg, index) => (
            <img
              key={`${svg.name}-${index}`}
              src={svg.src}
              alt={svg.name}
              className="h-8 w-auto shrink-0 object-contain sm:h-10"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SvgMarquee
