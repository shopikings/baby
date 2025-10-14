import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-footer-bg font-raleway text-cream">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xs font-[500] uppercase">Our Mission</h3>
            <p className="text-base leading-relaxed">
              Thoughtful kidswear that empowers individuality, supports small
              makers, and creates a more sustainable future.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase">Shop</h3>
            <ul className="space-y-2 text-base">
              <li>
                <Link to="/collection" className="hover:underline">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/collection" className="hover:underline">
                  Our Brands
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Helpful Links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase">
              Helpful Links
            </h3>
            <ul className="space-y-2 text-base">
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:underline">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:underline">
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link to="/rewards" className="hover:underline">
                  Loyalty Rewards
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:underline">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Sign Up for Offers */}
          <div>
            <h3 className="mb-4 font-rubik text-xl font-semibold uppercase">
              Sign Up for Offers
            </h3>
            <p className="mb-4 text-base">
              Stay up to date with the new collections, products and exclusive
              offers.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded border border-cream bg-transparent px-4 py-2 pr-10 text-base font-medium text-cream placeholder:text-cream/70 focus:outline-none focus:ring-2 focus:ring-cream"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2">
                <img
                  src="/assets/icons/arrowRight.svg"
                  alt="Submit"
                  className="size-3"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Image */}
        <div className="my-8">
          <img
            src="/assets/images/footer-image.png"
            alt="Kids fashion"
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-6 border-t border-cream/30 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <img
                  src="/assets/icons/instagram.svg"
                  alt="Instagram"
                  className="size-5 sm:size-6"
                />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <img
                  src="/assets/icons/facebook.svg"
                  alt="Facebook"
                  className="size-5 sm:size-6"
                />
              </a>
            </div>
            <button className="flex items-center gap-2 overflow-hidden rounded-full bg-[#5433EB] px-3 py-2 text-xs text-white transition-opacity hover:opacity-90 sm:px-4">
              <img
                src="/assets/icons/heart.svg"
                alt="Heart"
                className="size-3 shrink-0 sm:size-4"
              />
              <span className="whitespace-nowrap text-xs">Follow on</span>
              <div className="-ml-1 flex h-3 w-8 shrink-0 items-center justify-center overflow-hidden sm:h-4 sm:w-10">
                <img
                  src="/assets/icons/shop.svg"
                  alt="Shop"
                  className="h-auto min-w-10 object-contain sm:min-w-12"
                />
              </div>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
            <img
              src="/assets/icons/gPay.svg"
              alt="Google Pay"
              className="h-5 sm:h-6"
            />
            <img
              src="/assets/icons/discover.png"
              alt="Discover"
              className="h-5 sm:h-6"
            />
            <img
              src="/assets/icons/amex.svg"
              alt="American Express"
              className="h-5 sm:h-6"
            />
            <img
              src="/assets/icons/shop.svg"
              alt="Shop Pay"
              className="h-5 sm:h-6"
            />
            <img
              src="/assets/icons/visa.svg"
              alt="Visa"
              className="h-5 sm:h-6"
            />
            <img
              src="/assets/icons/paypal.svg"
              alt="PayPal"
              className="h-5 sm:h-6"
            />
            <img
              src="/assets/icons/creditOne.svg"
              alt="Credit Card"
              className="h-5 sm:h-6"
            />
            <img
              src="/assets/icons/unionPay.svg"
              alt="UnionPay"
              className="h-5 sm:h-6"
            />
            <img
              src="/assets/icons/creditTwo.svg"
              alt="Credit Card"
              className="h-5 sm:h-6"
            />
          </div>
        </div>

        <div className="mt-4 text-center text-xs">
          © 2025, All Things Maison Baby & Kids. Powered by Shopify
        </div>
      </div>
    </footer>
  )
}

export default Footer
