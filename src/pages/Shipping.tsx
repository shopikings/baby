import StickyDiscountTag from 'components/StickyDiscountTag'

function Shipping() {
  return (
    <div className="min-h-screen bg-cream py-12 sm:py-16 lg:py-20">
      <StickyDiscountTag />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="font-rubik text-3xl font-normal text-text-primary sm:text-4xl lg:text-5xl">
            Shipping policy
          </h1>
        </div>

        <div className="space-y-8">
          {/* Shipping Policy Section */}
          <section>
            <h2 className="mb-4 font-rubik text-base font-medium text-text-primary">
              Shipping Policy
            </h2>
            <p className="mb-6 font-raleway text-base font-normal leading-relaxed text-text-primary/80">
              At Maison Baby and Kids, we know busy parents value simplicity,
              transparency, and reliability - especially when it comes to
              delivery. That&apos;s why we use Australia&apos;s most trusted and
              reliable couriers to make sure your sustainable children&apos;s
              pieces arrive smoothly and on time.
            </p>

            <div className="mb-8">
              <h3 className="mb-4 font-rubik text-base font-medium text-text-primary">
                Standard Delivery - $4.95
              </h3>
              <p className="mb-3 font-raleway text-base font-normal text-text-primary/70">
                Free on all orders over $50
              </p>
              <ul className="space-y-2 font-raleway text-base font-normal text-text-primary/80">
                <li>• Delivered within 2-4 working days via Royal Mail</li>
                <li>• Fully tracked for peace of mind</li>
                <li>• Free standard delivery when you spend $50 or more</li>
              </ul>
            </div>

            <p className="mb-6 font-raleway text-base font-normal leading-relaxed text-text-primary/80">
              Our standard delivery option is reliable, affordable, and perfect
              for everyday essentials or planned purchases.
            </p>

            <div className="mb-8">
              <h3 className="mb-4 font-rubik text-base font-medium text-text-primary">
                Express Delivery - $6.95
              </h3>
              <ul className="space-y-2 font-raleway text-base font-normal text-text-primary/80">
                <li>
                  • Delivered within 24 hours Monday to Friday via courier
                  service
                </li>
                <li>
                  • Order placed before 12 PM (local) are dispatched the same
                  day
                </li>
                <li>• Fully tracked and guaranteed for faster delivery</li>
              </ul>
            </div>

            <p className="mb-6 font-raleway text-base font-normal leading-relaxed text-text-primary/80">
              Ideal for last-minute gifts, priority items, or when you just
              can&apos;t wait to see your little one in something new.
            </p>

            <div className="mb-8">
              <h3 className="mb-4 font-rubik text-base font-medium text-text-primary">
                Additional Information
              </h3>
              <ul className="space-y-2 font-raleway text-base font-normal text-text-primary/80">
                <li>
                  • All orders are packed with care in eco-conscious packaging
                </li>
                <li>
                  • You&apos;ll receive a tracking number once your order has
                  been dispatched
                </li>
                <li>
                  • Currently we only ship within the UK. More regions are
                  scheduled
                </li>
              </ul>
            </div>
            {/* 
            <div className="rounded-lg bg-white/50 p-6">
              <h3 className="mb-3 font-rubik text-lg font-semibold text-text-primary">
                A-Mazing Care
              </h3>
              <p className="font-raleway text-base leading-relaxed text-text-primary/80">
                If you have any questions about your order or need support, feel
                free to get in touch via our contact page. We're always happy to
                help!
              </p>
            </div> */}
          </section>
        </div>
      </div>
    </div>
  )
}

export default Shipping
