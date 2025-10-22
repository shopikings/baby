function BlogSocialShare() {
  return (
    <div className=" mb-8 flex items-center gap-4">
      <span className="font-rubik text-base font-normal text-text-primary">
        SHARE
      </span>
      <div className="flex items-center gap-3">
        <a href="#">
          <img
            src="/assets/icons/twitter.svg"
            alt="Twitter"
            className="size-5"
          />
        </a>
        <a href="#">
          <img
            src="/assets/icons/facebook-fill.svg"
            alt="Facebook"
            className="size-5"
          />
        </a>
        <a href="#">
          <img
            src="/assets/icons/pinterest.svg"
            alt="Pinterest"
            className="size-5"
          />
        </a>
        <a href="#">
          <img src="/assets/icons/gmail.svg" alt="Gmail" className="size-5" />
        </a>
      </div>
    </div>
  )
}

export default BlogSocialShare
