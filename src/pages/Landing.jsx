import { useEffect } from "react";
import TopBar from "../components/TopBar";
const Landing = () => {
  function fadeout() {
    if (document.querySelector(".preloader")) {
      document.querySelector(".preloader").style.opacity = "0";
      document.querySelector(".preloader").style.display = "none";
    }
  }
  useEffect(() => {
    setTimeout(fadeout, 500);
  }, []);
  return (
    <div>
      <div>
        {/*====== PRELOADER PART START ======*/}
        <div className="preloader">
          <div className="loader">
            <div className="spinner">
              <div className="spinner-container">
                <div className="spinner-rotator">
                  <div className="spinner-left">
                    <div className="spinner-circle" />
                  </div>
                  <div className="spinner-right">
                    <div className="spinner-circle" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*====== PRELOADER PART ENDS ======*/}

        {/*====== HEADER PART START ======*/}
        <header className="header-area">
          {/* navbar area */}
          <div id="home" className="header-hero bg_cover" style={{}}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="header-hero-content text-center">
                    <h3
                      className="header-sub-title wow fadeInUp"
                      data-wow-duration="1.3s"
                      data-wow-delay="0.2s"
                    >
                      Build Beautiful Websites. Instantly.
                    </h3>
                    <h2
                      className="header-title wow fadeInUp"
                      data-wow-duration="1.3s"
                      data-wow-delay="0.5s"
                    >
                      No Code. No Limits. Just Create.
                    </h2>
                    <p
                      className="text wow fadeInUp"
                      data-wow-duration="1.3s"
                      data-wow-delay="0.8s"
                    >
                      Launch your dream website in minutes with our powerful,
                      intuitive website builder. Whether you're a freelancer,
                      business owner, or creative—designing your online presence
                      has never been easier.
                    </p>
                    <a
                      href="#"
                      className="main-btn wow fadeInUp"
                      data-wow-duration="1.3s"
                      data-wow-delay="1.1s"
                    >
                      Get Started
                    </a>
                  </div>
                  {/* header hero content */}
                </div>
              </div>
              {/* row */}
              <div className="row">
                <div className="col-lg-12">
                  <div
                    className="header-hero-image text-center wow fadeIn"
                    data-wow-duration="1.3s"
                    data-wow-delay="1.4s"
                  >
                    <img
                      src="assets/images/header/header-hero.png"
                      alt="hero"
                    />
                  </div>
                  {/* header hero image */}
                </div>
              </div>
              {/* row */}
            </div>
            {/* container */}
            <div id="particles-1" className="particles" />
          </div>
          {/* header hero */}
        </header>
        {/*====== HEADER PART ENDS ======*/}

        {/*====== BRAND PART START ======*/}
        <div className="brand-area pt-90">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div
                  className="
          brand-logo
          d-flex
          align-items-center
          justify-content-center justify-content-md-between
        "
                >
                  <div
                    className="single-logo mt-30 wow fadeIn"
                    data-wow-duration="1s"
                    data-wow-delay="0.2s"
                  >
                    {/* <img src="#" alt="brand" /> */}
                  </div>
                  {/* single logo */}
                  <div
                    className="single-logo mt-30 wow fadeIn"
                    data-wow-duration="1.5s"
                    data-wow-delay="0.2s"
                  >
                    <img src="assets/images/brands/ayroui.svg" alt="brand" />
                  </div>
                  {/* single logo */}
                  <div
                    className="single-logo mt-30 wow fadeIn"
                    data-wow-duration="1.5s"
                    data-wow-delay="0.3s"
                  >
                    <img src="assets/images/brands/graygrids.svg" alt="brand" />
                  </div>
                  {/* single logo */}
                  <div
                    className="single-logo mt-30 wow fadeIn"
                    data-wow-duration="1.5s"
                    data-wow-delay="0.4s"
                  >
                    <img src="assets/images/brands/lineicons.svg" alt="brand" />
                  </div>
                  {/* single logo */}
                  <div
                    className="single-logo mt-30 wow fadeIn"
                    data-wow-duration="1.5s"
                    data-wow-delay="0.5s"
                  >
                    <img
                      src="assets/images/brands/ecommerce-html.svg"
                      alt="brand"
                    />
                  </div>
                  {/* single logo */}
                </div>
                {/* brand logo */}
              </div>
            </div>
            {/* row */}
          </div>
          {/* container */}
        </div>
        {/*====== BRAND PART ENDS ======*/}
        {/*====== SERVICES PART START ======*/}
        <section id="features" className="services-area pt-120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="section-title text-center pb-40">
                  <div className="line m-auto" />
                  <h3 className="title">
                    Clean and simple design,
                    <span> Comes with everything you need to get started!</span>
                  </h3>
                </div>
                {/* section title */}
              </div>
            </div>
            {/* row */}
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-7 col-sm-8">
                <div
                  className="single-services text-center mt-30 wow fadeIn"
                  data-wow-duration="1s"
                  data-wow-delay="0.2s"
                >
                  <div className="services-icon">
                    <img
                      className="shape"
                      src="assets/images/services/services-shape.svg"
                      alt="shape"
                    />
                    <img
                      className="shape-1"
                      src="assets/images/services/services-shape-1.svg"
                      alt="shape"
                    />
                    <i className="lni lni-baloon"> </i>
                  </div>
                  <div className="services-content mt-30">
                    <h4 className="services-title">
                      <a href="#">Drag & Drop</a>
                    </h4>
                    <p className="text">
                      Build pages visually — no tech skills needed.
                    </p>
                    <a className="more" href="javascript:void(0)">
                      Learn More <i className="lni lni-chevron-right"> </i>
                    </a>
                  </div>
                </div>
                {/* single services */}
              </div>
              <div className="col-lg-4 col-md-7 col-sm-8">
                <div
                  className="single-services text-center mt-30 wow fadeIn"
                  data-wow-duration="1s"
                  data-wow-delay="0.5s"
                >
                  <div className="services-icon">
                    <img
                      className="shape"
                      src="assets/images/services/services-shape.svg"
                      alt="shape"
                    />
                    <img
                      className="shape-1"
                      src="assets/images/services/services-shape-2.svg"
                      alt="shape"
                    />
                    <i className="lni lni-cog"> </i>
                  </div>
                  <div className="services-content mt-30">
                    <h4 className="services-title">
                      <a href="javascript:void(0)">Built-in SEO Tools</a>
                    </h4>
                    <p className="text">
                      Rank higher and get discovered faster.
                    </p>
                    <a className="more" href="javascript:void(0)">
                      Learn More <i className="lni lni-chevron-right"> </i>
                    </a>
                  </div>
                </div>
                {/* single services */}
              </div>
              <div className="col-lg-4 col-md-7 col-sm-8">
                <div
                  className="single-services text-center mt-30 wow fadeIn"
                  data-wow-duration="1s"
                  data-wow-delay="0.8s"
                >
                  <div className="services-icon">
                    <img
                      className="shape"
                      src="assets/images/services/services-shape.svg"
                      alt="shape"
                    />
                    <img
                      className="shape-1"
                      src="assets/images/services/services-shape-3.svg"
                      alt="shape"
                    />
                    <i className="lni lni-bolt-alt"> </i>
                  </div>
                  <div className="services-content mt-30">
                    <h4 className="services-title">
                      <a href="javascript:void(0)">Mobile-Responsive</a>
                    </h4>
                    <p className="text">
                      Your site will look great on every screen, automatically.
                    </p>
                    <a className="more" href="javascript:void(0)">
                      Learn More <i className="lni lni-chevron-right"> </i>
                    </a>
                  </div>
                </div>
                {/* single services */}
              </div>
            </div>
            {/* row */}
          </div>
          {/* container */}
        </section>
        {/*====== SERVICES PART ENDS ======*/}
        <section id="about">
          {/*====== ABOUT PART START ======*/}
          <div className="about-area pt-70">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div
                    className="about-content mt-50 wow fadeInLeftBig"
                    data-wow-duration="1s"
                    data-wow-delay="0.5s"
                  >
                    <div className="section-title">
                      <div className="line" />
                      <h3 className="title">
                        We believe
                        <br />{" "}
                        <span>
                          website creation should be simple, powerful, and fun.
                        </span>
                        {/* Quick  Easy to Use Bootstrap Template */}
                      </h3>
                    </div>
                    {/* section title */}
                    <p className="text">
                      Founded by a team of designers, developers, and dreamers,
                      our mission is to empower anyone to build a professional
                      online presence — without the hassle or cost of hiring an
                      agency. We’re here to put creativity and control back in
                      your hands — whether you're launching a startup, personal
                      brand, or online store.
                    </p>
                    <a href="javascript:void(0)" className="main-btn">
                      Try it Free
                    </a>
                  </div>
                  {/* about content */}
                </div>
                <div className="col-lg-6">
                  <div
                    className="about-image text-center mt-50 wow fadeInRightBig"
                    data-wow-duration="1s"
                    data-wow-delay="0.5s"
                  >
                    <img src="assets/images/about/about1.svg" alt="about" />
                  </div>
                  {/* about image */}
                </div>
              </div>
              {/* row */}
            </div>
            {/* container */}
            <div className="about-shape-1">
              <img src="assets/images/about/about-shape-1.svg" alt="shape" />
            </div>
          </div>
          {/*====== ABOUT PART ENDS ======*/}
          {/*====== ABOUT PART START ======*/}
          <div className="about-area pt-70">
            <div className="about-shape-2">
              <img src="assets/images/about/about-shape-2.svg" alt="shape" />
            </div>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 order-lg-last">
                  <div
                    className="about-content ms-lg-auto mt-50 wow fadeInLeftBig"
                    data-wow-duration="1s"
                    data-wow-delay="0.5s"
                  >
                    <div className="section-title">
                      <div className="line" />
                      <h3 className="title">
                        Modern design <span> with Essential Features</span>
                      </h3>
                    </div>
                    {/* section title */}
                    <p className="text">
                      Modern design prioritizes minimalism, clarity, and
                      purpose-driven aesthetics. It embraces clean lines, ample
                      white space, and a neutral or subdued color palette,
                      creating a visually appealing and distraction-free
                      interface. This design philosophy is not just about
                      appearance but also about function — ensuring that every
                      element serves a clear purpose.
                    </p>
                    <a href="javascript:void(0)" className="main-btn">
                      Try it Free
                    </a>
                  </div>
                  {/* about content */}
                </div>
                <div className="col-lg-6 order-lg-first">
                  <div
                    className="about-image text-center mt-50 wow fadeInRightBig"
                    data-wow-duration="1s"
                    data-wow-delay="0.5s"
                  >
                    <img src="assets/images/about/about2.svg" alt="about" />
                  </div>
                  {/* about image */}
                </div>
              </div>
              {/* row */}
            </div>
            {/* container */}
          </div>
          {/*====== ABOUT PART ENDS ======*/}
          {/*====== ABOUT PART START ======*/}
          <div className="about-area pt-70">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div
                    className="about-content mt-50 wow fadeInLeftBig"
                    data-wow-duration="1s"
                    data-wow-delay="0.5s"
                  >
                    <div className="section-title">
                      <div className="line" />
                      <h3 className="title">
                        <span>Crafted for</span> SaaS, App and Software Landing
                        Page
                      </h3>
                    </div>
                    {/* section title */}
                    <p className="text">
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      seiam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                      gubergren, no sea takimata sanctus est Lorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing.
                    </p>
                    <a href="javascript:void(0)" className="main-btn">
                      Try it Free
                    </a>
                  </div>
                  {/* about content */}
                </div>
                <div className="col-lg-6">
                  <div
                    className="about-image text-center mt-50 wow fadeInRightBig"
                    data-wow-duration="1s"
                    data-wow-delay="0.5s"
                  >
                    <img src="assets/images/about/about3.svg" alt="about" />
                  </div>
                  {/* about image */}
                </div>
              </div>
              {/* row */}
            </div>
            {/* container */}
            <div className="about-shape-1">
              <img src="assets/images/about/about-shape-1.svg" alt="shape" />
            </div>
          </div>
          {/*====== ABOUT PART ENDS ======*/}
        </section>
        {/*====== VIDEO COUNTER PART START ======*/}
        <section id="facts" className="video-counter pt-70">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 order-lg-last">
                <div
                  className="counter-wrapper mt-50 wow fadeIn"
                  data-wow-duration="1s"
                  data-wow-delay="0.8s"
                >
                  <div className="counter-content">
                    <div className="section-title">
                      <div className="line" />
                      <h3 className="title">Why Choose Us</h3>
                    </div>
                    {/* section title */}
                    <p className="text">
                      Drag. Drop. Done. Go from idea to live site in under an
                      hour.
                    </p>
                  </div>
                  {/* counter content */}
                  <div className="row no-gutters">
                    <div className="col-4">
                      <div
                        className="
                single-counter
                counter-color-1
                d-flex
                align-items-center
                justify-content-center
              "
                      >
                        <div className="counter-items text-center">
                          <span
                            className="count countup text-uppercase"
                            cup-end={125}
                          />
                          <p className="text">
                            Launch <br />
                            Faster
                          </p>
                        </div>
                      </div>
                      {/* single counter */}
                    </div>
                    <div className="col-4">
                      <div
                        className="
                single-counter
                counter-color-2
                d-flex
                align-items-center
                justify-content-center
              "
                      >
                        <div className="counter-items text-center">
                          <span
                            className="count countup text-uppercase"
                            cup-end={87}
                          />
                          <p className="text">
                            Smart Tools,
                            <br /> Smarter Sites
                          </p>
                        </div>
                      </div>
                      {/* single counter */}
                    </div>
                    <div className="col-4">
                      <div className="single-counter counter-color-3 d-flex align-items-center justify-content-center">
                        <div className="counter-items text-center">
                          <span
                            className="count countup text-uppercase"
                            cup-end={59}
                          />
                          <p className="text">
                            Secure &<br /> Scalable
                          </p>
                        </div>
                      </div>
                      {/* single counter */}
                    </div>
                  </div>
                  {/* row */}
                </div>
                {/* counter wrapper */}
              </div>
              <div className="col-lg-6">
                <div
                  className="video-content mt-50 wow fadeIn"
                  data-wow-duration="1s"
                  data-wow-delay="0.5s"
                >
                  <img
                    className="dots"
                    src="assets/images/video/dots.svg"
                    alt="dots"
                  />
                  <div className="video-wrapper">
                    <div className="video-image">
                      <img src="assets/images/video/video.png" alt="video" />
                    </div>
                    <div className="video-icon">
                      <a
                        href="https://www.youtube.com/watch?v=r44RKWyfcFw"
                        className="video-popup glightbox"
                      >
                        <i className="lni lni-play"> </i>
                      </a>
                    </div>
                  </div>
                  {/* video wrapper */}
                </div>
                {/* video content */}
              </div>
            </div>
            {/* row */}
          </div>
          {/* container */}
        </section>
        {/*====== VIDEO COUNTER PART ENDS ======*/}
        {/*====== FOOTER PART START ======*/}
        <footer id="footer" className="footer-area pt-120">
          <div className="container">
            <div
              className="subscribe-area wow fadeIn"
              data-wow-duration="1s"
              data-wow-delay="0.5s"
            >
              <div className="row">
                <div className="col-lg-6">
                  <div className="subscribe-content mt-45">
                    <h2 className="subscribe-title">
                      Subscribe Our Newsletter <span>get reguler updates</span>
                    </h2>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="subscribe-form mt-50">
                    <form action="#">
                      <input type="text" placeholder="Enter eamil" />
                      <button className="main-btn">Subscribe</button>
                    </form>
                  </div>
                </div>
              </div>
              {/* row */}
            </div>
            {/* subscribe area */}
            <div className="footer-widget pb-100">
              <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-8">
                  <div
                    className="footer-about mt-50 wow fadeIn"
                    data-wow-duration="1s"
                    data-wow-delay="0.2s"
                  >
                    <a className="logo" href="javascript:void(0)">
                      <img src="assets/images/logo/logo.svg" alt="logo" />
                    </a>
                    <p className="text">
                      Create stunning websites with zero coding. Whether you're a creator, business owner, or entrepreneur, our powerful builder helps you go live — in minutes.
                    </p>
                    <ul className="social">
                      <li>
                        <a
                          target="_blank"
                          href="https://twitter.com/Kerry14066781"
                        >
                          <i className="lni lni-twitter-filled"> </i>
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          href="https://www.instagram.com/bestpicturesinweb/"
                        >
                          <i className="lni lni-instagram-filled"> </i>
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          href="https://www.linkedin.com/in/dada-khalandar/"
                        >
                          <i className="lni lni-linkedin-original"> </i>
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="https://github.com/kerrybli">
                          <i className="lni lni-github-original"> </i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* footer about */}
                </div>
                <div className="col-lg-5 col-md-7 col-sm-12">
                  <div className="footer-link d-flex mt-50 justify-content-sm-between">
                    <div
                      className="link-wrapper wow fadeIn"
                      data-wow-duration="1s"
                      data-wow-delay="0.4s"
                    >
                      <div className="footer-title">
                        <h4 className="title">Quick Link</h4>
                      </div>
                      <ul className="link">
                        <li>
                          <a href="javascript:void(0)">Road Map</a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">Privacy Policy</a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">Refund Policy</a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">Terms of Service</a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">Pricing</a>
                        </li>
                      </ul>
                    </div>
                    {/* footer wrapper */}
                    <div
                      className="link-wrapper wow fadeIn"
                      data-wow-duration="1s"
                      data-wow-delay="0.6s"
                    >
                      <div className="footer-title">
                        <h4 className="title">Resources</h4>
                      </div>
                      <ul className="link">
                        <li>
                          <a href="javascript:void(0)">Home</a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">Page</a>
                        </li>
                        <li>
                          <a href="https://dada-khalandar-portfolio.vercel.app/#/">
                            Portfolio
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">Blog</a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">Contact</a>
                        </li>
                      </ul>
                    </div>
                    {/* footer wrapper */}
                  </div>
                  {/* footer link */}
                </div>
                <div className="col-lg-3 col-md-5 col-sm-12">
                  <div
                    className="footer-contact mt-50 wow fadeIn"
                    data-wow-duration="1s"
                    data-wow-delay="0.8s"
                  >
                    <div className="footer-title">
                      <h4 className="title">Contact Us</h4>
                    </div>
                    <ul className="contact">
                      <li>+809272561823</li>
                      <li>info@gmail.com</li>
                      <li>www.yourweb.com</li>
                      <li>
                        123 Street Guntakal City , India <br />
                      </li>
                    </ul>
                  </div>
                  {/* footer contact */}
                </div>
              </div>
              {/* row */}
            </div>
            {/* footer widget */}
            <div className="footer-copyright">
              <div className="row">
                <div className="col-lg-12">
                  <div className="copyright d-sm-flex justify-content-between">
                    <div className="copyright-content">
                      <p className="text">
                          © {new Date().getFullYear()} My App. All Rights Reserved.
                      </p>
                    </div>
                    {/* copyright content */}
                  </div>
                  {/* copyright */}
                </div>
              </div>
              {/* row */}
            </div>
            {/* footer copyright */}
          </div>
          {/* container */}
          <div id="particles-2" />
        </footer>
        {/*====== FOOTER PART ENDS ======*/}
        {/*====== BACK TOP TOP PART START ======*/}
        <a href="#" className="back-to-top">
          {" "}
          <i className="lni lni-chevron-up"> </i>{" "}
        </a>
        {/*====== BACK TOP TOP PART ENDS ======*/}
      </div>
    </div>
  );
};

export default Landing;
