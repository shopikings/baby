import StickyDiscountTag from 'components/StickyDiscountTag'

function Shipping() {
  return (
    <div className="min-h-screen bg-cream py-12 sm:py-16 lg:py-20">
      <StickyDiscountTag />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="font-rubik text-3xl font-normal text-text-primary sm:text-4xl lg:text-5xl">
            Shipping Policy
          </h1>
        </div>

        <div className="space-y-8">
          {/* Shipping Policy Section */}
          <section>
            <h2 className="mb-4 font-rubik text-base text-text-primary">
              <b>Last Updated:</b> November, 10, 2025
            </h2>
            <p className="mb-6 font-raleway text-base font-normal leading-relaxed text-text-primary/80">
              Welcome to Maison Baby & Kids! We strive to deliver your little
              one's new favorite pieces quickly and safely. Below is our
              shipping policy which explains how and when we ship orders, what
              you can expect, and how to reach us if there are any issues.
            </p>

            <div className="mb-8">
              <h3 className="mb-4 font-rubik text-base font-medium text-text-primary">
                1. Order Processing
              </h3>
              <ul className="list-disc space-y-2 pl-4 font-raleway text-base font-normal text-text-primary/80">
                <li>
                  Orders are typically processed within 1–3 business days
                  (Monday to Friday, excluding U.S. federal holidays).
                </li>
                <li>
                  If we experience a high volume of orders (e.g., during
                  seasonal sales), processing may take a little longer, we'll
                  notify you via email if we expect a delay.
                </li>
                <li>
                  Once your order is processed and shipped, you will receive a
                  shipping confirmation email with a tracking number.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="mb-4 font-rubik text-base font-medium text-text-primary">
                2. Shipping Methods & Rates
              </h3>
              <p className="mb-4 text-text-primary/80">
                We offer the following shipping options within the U.S.:
              </p>
              <div className="mb-4 overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left font-rubik text-sm font-medium text-text-primary">
                        Shipping Method
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-rubik text-sm font-medium text-text-primary">
                        Estimated Delivery Time
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-rubik text-sm font-medium text-text-primary">
                        Cost
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-raleway text-text-primary/80">
                        Standard Ground (e.g., USPS / UPS)
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-raleway text-text-primary/80">
                        3–7 business days
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-raleway text-text-primary/80">
                        Calculated at checkout based on weight and destination
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-raleway text-text-primary/80">
                        Expedited (e.g., 2-Day)
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-raleway text-text-primary/80">
                        2 business days
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-raleway text-text-primary/80">
                        Flat fee or calculated in checkout (depending on cart)
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-raleway text-text-primary/80">
                        Overnight / Next-Day
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-raleway text-text-primary/80">
                        1 business day
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-raleway text-text-primary/80">
                        Flat fee (if available)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ul className="list-disc space-y-2 pl-4 font-raleway text-base font-normal text-text-primary/80">
                <li>
                  All shipping costs are calculated and displayed at checkout,
                  based on the shipping address, the weight of the package, and
                  the selected shipping method.
                </li>
                <li>
                  For certain promotions, we may offer free shipping (e.g., on
                  orders over a certain amount) — these offers will be clearly
                  stated on our website.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="mb-4 font-rubik text-base font-medium text-text-primary">
                3. Shipping Destinations & Restrictions
              </h3>
              <ul className="list-disc space-y-2 pl-4 font-raleway text-base font-normal text-text-primary/80">
                <li>
                  We currently ship to all 50 U.S. states including Alaska and
                  Hawaii.
                </li>
                <li>
                  We do not ship to P.O. Boxes or APO/FPO addresses for certain
                  shipping methods – please check the shipping options at
                  checkout.
                </li>
                <li>
                  We do not currently offer international shipping, but this may
                  change in the future.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="mb-4 font-rubik text-base font-medium text-text-primary">
                4. Order Tracking
              </h3>
              <ul className="list-disc space-y-2 pl-4 font-raleway text-base font-normal text-text-primary/80">
                <li>
                  Once your order ships, we'll send you an email with a tracking
                  number.
                </li>
                <li>
                  You can use this tracking number to check the status of your
                  shipment directly on the carrier's website.
                </li>
                <li>
                  If you do not receive a tracking email (or can't locate it),
                  please contact us at support@maisonbabyandkids.com, and we'll
                  help you out.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="mb-4 font-rubik text-base font-medium text-text-primary">
                5. Delays, Missing or Damaged Items
              </h3>
              <ul className="list-disc space-y-2 pl-4 font-raleway text-base font-normal text-text-primary/80">
                <li>
                  While we do our best to meet delivery estimates, there may be
                  delays due to factors outside our control (e.g., weather,
                  carrier delays, high volume).
                </li>
                <li>
                  If for any reason we cannot ship your order within the
                  promised timeframe (or within 30 days, if no time was
                  promised), we will notify you immediately with a revised ship
                  date and offer you the option to cancel your order for a full
                  refund. This is in compliance with U.S. regulations. (Federal
                  Trade Commission)
                </li>
                <li>
                  If an item arrives damaged, please keep all packaging and
                  contact us at support@maisonbabyandkids.com within 7 days of
                  delivery. We will work with you to either replace the item or
                  issue a refund, depending on the situation.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="mb-4 font-rubik text-base font-medium text-text-primary">
                6. Cancellation Policy
              </h3>
              <ul className="list-disc space-y-2 pl-4 font-raleway text-base font-normal text-text-primary/80">
                <li>
                  Orders can be cancelled before they are shipped. Please
                  contact us as soon as possible at
                  support@maisonbabyandkids.com if you wish to cancel.
                </li>
                <li>
                  Once an order has shipped, it must be returned following our
                  Return Policy (if eligible), and any refund will be processed
                  once we receive the returned item.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="mb-4 font-rubik text-base font-medium text-text-primary">
                7. Customer Support
              </h3>
              <p className="mb-2 font-raleway text-base font-normal text-text-primary/80">
                For any shipping-related questions, you can reach us at:
              </p>
              <ul className="list-disc space-y-2 pl-4 font-raleway text-base font-normal text-text-primary/80">
                <li>Email: hello@maisonbabyandkids.com</li>
                <li>Phone: 888-805-5461</li>
                <li>Our customer service hours are Monday–Friday</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="mb-4 font-rubik text-base font-medium text-text-primary">
                9. Legal & Compliance
              </h3>
              <ul className="list-disc space-y-2 pl-4 font-raleway text-base font-normal text-text-primary/80">
                <li>
                  We comply with U.S. consumer protection rules, including the
                  FTC's Mail, Internet, or Telephone Order Merchandise Rule,
                  which requires that if we cannot ship within the promised
                  timeframe (or within 30 days if no timeframe is stated), we
                  notify you and offer a full refund if you do not agree to the
                  delay. (Federal Trade Commission)
                </li>
                <li>
                  By placing an order with Maison Baby & Kids, you acknowledge
                  that you have read and understood this Shipping Policy.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Shipping
