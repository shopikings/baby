import StickyDiscountTag from 'components/StickyDiscountTag'

function RefundPolicy() {
  return (
    <div className="min-h-screen bg-cream py-12 sm:py-16 lg:py-20">
      <StickyDiscountTag />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-8 text-center font-rubik text-3xl font-normal text-text-primary sm:text-4xl lg:text-5xl">
            Refund & Return Policy
          </h1>
        </div>

        <div className="space-y-8">
          <section>
            <div className="mb-8">
              <p className="mb-6 font-raleway text-base font-normal leading-relaxed text-text-primary/80">
                At Maison Baby and Kids, we want you to be completely satisfied
                with your purchase. If for any reason you&apos;re not, we offer
                a 30-day return policy. This means you have 30 days from the
                date of receiving your order to request a return.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="mb-4 font-rubik text-3xl font-medium text-text-primary">
                Eligibility for Returns
              </h3>
              <p className="mb-4 font-raleway text-base font-normal leading-relaxed text-text-primary/80">
                To qualify for a return, your item must:
              </p>
              <ul className="mb-6 ml-6 list-disc space-y-2 font-raleway text-base font-normal leading-relaxed text-text-primary/80">
                <li>Be in the same condition as when received.</li>
                <li>Be unworn or unused, with tags attached.</li>
                <li>Be returned in its original packaging.</li>
                <li>Include the receipt or proof of purchase.</li>
              </ul>
              <p className="mb-6 font-raleway text-base font-normal leading-relaxed text-text-primary/80">
                To initiate a return, please contact us at{' '}
                <a
                  href="mailto:hello@maisonbabyandkids.com"
                  className="text-button-hover underline hover:text-banner-lower"
                >
                  hello@maisonbabyandkids.com
                </a>
                . If your request is approved, we&apos;ll provide you with a
                return shipping label and detailed instructions. Please note
                that items sent back without prior approval will not be
                accepted.
              </p>
              <p className="mb-6 font-raleway text-base font-normal leading-relaxed text-text-primary/80">
                You may contact us at any time with questions regarding returns
                at{' '}
                <a
                  href="mailto:hello@maisonbabyandkids.com"
                  className="text-button-hover underline hover:text-banner-lower"
                >
                  hello@maisonbabyandkids.com
                </a>
                .
              </p>
            </div>

            <div className="mb-8">
              <h3 className="mb-4 font-rubik text-3xl font-medium text-text-primary">
                Damages and Issues
              </h3>
              <p className="mb-6 font-raleway text-base font-normal leading-relaxed text-text-primary/80">
                Please inspect your order upon delivery. If your item is
                defective, damaged, or if you received the wrong product,
                contact us immediately so we can evaluate the issue and make it
                right.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="mb-4 font-rubik text-3xl font-medium text-text-primary">
                Exceptions and Non-Returnable Items
              </h3>
              <p className="mb-4 font-raleway text-base font-normal leading-relaxed text-text-primary/80">
                Certain items are not eligible for return, including:
              </p>
              <ul className="mb-6 ml-6 list-disc space-y-2 font-raleway text-base font-normal leading-relaxed text-text-primary/80">
                <li>Perishable goods (e.g., food, flowers, plants)</li>
                <li>Custom or personalized products</li>
                <li>Personal care items (e.g., beauty or hygiene products)</li>
                <li>Hazardous materials, flammable liquids, or gases</li>
              </ul>
              <p className="mb-6 font-raleway text-base font-normal leading-relaxed text-text-primary/80">
                Additionally, sale items and gift cards cannot be returned. If
                you&apos;re unsure whether your item qualifies for return,
                please reach out to us for clarification.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="mb-4 font-rubik text-3xl font-medium text-text-primary">
                Exchanges
              </h3>
              <p className="mb-6 font-raleway text-base font-normal leading-relaxed text-text-primary/80">
                The fastest way to receive a replacement item is to return your
                current item. Once your return is accepted, you can place a new
                order for the desired product.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="mb-4 font-rubik text-3xl font-medium text-text-primary">
                United States 14-Day Cooling-Off Period
              </h3>
              <p className="mb-6 font-raleway text-base font-normal leading-relaxed text-text-primary/80">
                If your order is being shipped to the United States, you have
                the right to cancel or return your purchase within 14 days, for
                any reason and without justification. The returned item must
                meet the same conditions outlined above.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="mb-4 font-rubik text-3xl font-medium text-text-primary">
                Refunds
              </h3>
              <p className="mb-6 font-raleway text-base font-normal leading-relaxed text-text-primary/80">
                Once we receive and inspect your return, we&apos;ll notify you
                of the approval status. If approved, your refund will be issued
                to your original payment method within 10 business days. Please
                note that processing times may vary depending on your bank or
                payment provider.
              </p>
              <p className="mb-6 font-raleway text-base font-normal leading-relaxed text-text-primary/80">
                If more than 15 business days have passed since your refund was
                approved and you haven&apos;t received your refund, please
                contact us at{' '}
                <a
                  href="mailto:hello@maisonbabyandkids.com"
                  className="text-button-hover underline hover:text-banner-lower"
                >
                  hello@maisonbabyandkids.com
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default RefundPolicy
