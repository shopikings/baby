import icon1 from "../assets/1.svg";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/box.svg";
import icon4 from "../assets/icon4.svg";

function Services() {
  const services = [
    {
      id: 1,
      icon: icon1,
      title: 'Free Shipping',
      description: 'on all orders over $70'
    },
    {
      id: 2,
      icon: icon4,
      title: 'Follow for latest',
      description: 'update on Instagram'
    },
    {
      id: 3,
      icon: icon3,
      title: 'Free Easy Returns',
      description: 'within 45 days of purchase'
    },
    {
      id: 4,
      icon: icon2,
      title: 'Regular Donations',
      description: "to children's charities"
    }
  ]

  return (
    <div className="bg-black text-white mb-0 pb-0">
      <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-4 pb-4">
        <div className="flex flex-col sm:flex-row items-stretch">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`flex-1 py-6 sm:py-8 md:py-10 lg:py-12 px-3 sm:px-4 md:px-5 lg:px-6 flex flex-col items-center justify-center ${
                index !== services.length - 1 ? 'md:border-r md:border-b-0 border-b md:border-t-0 border-cream' : ''
              }`}
            >
              <div className="mb-3 sm:mb-4"> 
                <img src={service.icon} className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"/> 
              </div>
              <h3 className="font-rubik text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white mb-1 sm:mb-2 text-center">
                {service.title}
              </h3>
              <p className="font-raleway text-xs sm:text-xs md:text-sm text-gray-300 font-light leading-relaxed text-center">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services
