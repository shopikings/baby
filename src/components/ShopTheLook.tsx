function ShopTheLook() {
  return (
    <section className="bg-cream py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12">
          <h3 className="mb-4 font-rubik text-3xl font-bold text-text-primary sm:text-4xl md:text-5xl lg:text-6xl">
            Shop the Look
          </h3>
          <p className="font-inter text-lg text-text-primary/70 sm:text-xl">
            Style made simple—curated looks for little originals.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden bg-white">
        <img
          src="/assets/images/shop-the-look.jpg"
          alt="Shop the Look - Children wearing coordinated winter outfits"
          className="h-[500px] w-full object-cover sm:h-[600px] lg:h-[700px] xl:h-[800px]"
        />

        <div className="absolute inset-0">
          <div className="absolute left-[8%] top-[45%] hidden sm:block">
            <div className="relative">
              <img
                src="/assets/icons/tilted-line-pointer.svg"
                alt=""
                className="absolute right-[-8%] top-[-140%] size-12"
              />
              <img
                src="/assets/icons/pointer.svg"
                alt=""
                className="absolute right-[-12%] top-[-220%] size-8"
              />
              <button className="cursor-pointer rounded-lg bg-cream px-3 py-2 shadow-lg transition-all hover:shadow-xl">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-text-primary">
                    Boys Outdoor Multi-Stripe Long Sleeve Hoodie
                  </p>
                  <svg
                    className="size-3"
                    fill="none"
                    stroke="#444B59"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          <div className="absolute bottom-[15%] left-1/4 hidden sm:block">
            <div className="relative">
              <img
                src="/assets/icons/straight-line-pointer.svg"
                alt=""
                className="absolute -bottom-full right-1/4 size-8"
              />
              <img
                src="/assets/icons/pointer.svg"
                alt=""
                className="absolute bottom-[-190%] right-1/4 size-8"
              />
              <button className="cursor-pointer rounded-lg bg-cream px-3 py-2 shadow-lg transition-all hover:shadow-xl">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-text-primary">
                    Boys JAY Cotton Twill Trousers in Charcoal Grey
                  </p>
                  <svg
                    className="size-3"
                    fill="none"
                    stroke="#444B59"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          <div className="absolute right-1/4 top-[40%] hidden sm:block">
            <div className="relative">
              <img
                src="/assets/icons/straight-line-pointer.svg"
                alt=""
                className="absolute -bottom-full right-2/4 size-8"
              />
              <img
                src="/assets/icons/pointer.svg"
                alt=""
                className="absolute bottom-[-190%] right-2/4 size-8"
              />
              <button className="cursor-pointer rounded-lg bg-cream px-3 py-2 shadow-lg transition-all hover:shadow-xl">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-text-primary">
                    Kids No-Logo Trucker Hat in Olive & Black
                  </p>
                  <svg
                    className="size-3"
                    fill="none"
                    stroke="#444B59"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShopTheLook
