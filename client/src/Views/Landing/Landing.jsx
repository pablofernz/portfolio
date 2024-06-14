import style from "./Landing.module.css";
import Spline from "@splinetool/react-spline";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { Animation } from "../../Components/LoadingPage/loadingPage";
import useViewportWidth from "../../Components/Hooks/useViewportSize";

const Landing = () => {
  const width = useViewportWidth();
  const [isMobileNavbarOpen, setMobileNavbar] = useState(false);
  const [navBarOption, setNavBarOption] = useState("home");

  const [isLoading, setLoading] = useState(true);
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "center start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical", // vertical, horizontal
      gestureDirection: "both", // vertical, horizontal, both
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className={style.background}>
      {isLoading === true ? (
        <Animation animation={true} width={width} />
      ) : (
        <Animation animation={false} width={width} />
      )}
      {width > 800 ? (
        <div className={style.navBarContainer}>
          <div className={style.navBar}>
            <div className={style.logoSpace}>
              <picture className={style.logoContainer}>
                <img
                  className={style.logo}
                  src="https://res.cloudinary.com/dnrprmypf/image/upload/v1718250070/Logo-portfolio_jxapuu.png"
                  alt=""
                  onClick={() => setNavBarOption("home")}
                />
              </picture>
            </div>

            <div className={style.textSpace}>
              <a
                className={`${style.navText} ${
                  navBarOption == "about" && style.navTextActive
                }`}
                onClick={() => setNavBarOption("about")}
              >
                About
              </a>
              <a
                className={`${style.navText} ${
                  navBarOption == "works" && style.navTextActive
                }`}
                onClick={() => setNavBarOption("works")}
              >
                Works
              </a>
              <a
                className={`${style.navText} ${
                  navBarOption == "products" && style.navTextActive
                }`}
                onClick={() => setNavBarOption("products")}
              >
                Products
              </a>
              <a
                className={`${style.navText} ${
                  navBarOption == "contact" && style.navTextActive
                }`}
                onClick={() => setNavBarOption("contact")}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className={style.navBarContainer2}>
          <motion.div
            initial={{ height: 50 }}
            animate={{ height: isMobileNavbarOpen === true ? 275 : 50 }}
            transition={{ duration: 0.5, type: "spring" }}
            className={style.navBarModal}
          >
            <div className={style.navBarMobile}>
              <div className={style.logoSpace}>
                <picture className={style.logoContainer}>
                  <img
                    className={style.logo}
                    src="https://res.cloudinary.com/dnrprmypf/image/upload/v1718250070/Logo-portfolio_jxapuu.png"
                    alt=""
                    onClick={() => setNavBarOption("home")}
                  />
                </picture>
              </div>

              <div className={style.iconMenuNavbar}>
                <button
                  onClick={() => {
                    setMobileNavbar(!isMobileNavbarOpen);
                  }}
                  className={style.iconMenuNavbarButton}
                >
                  <p>
                    <svg
                      style={{ rotate: "0deg" }}
                      viewBox="0 0 24 24"
                      width="25"
                      height="25"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </p>
                </button>
              </div>
            </div>
            <div className={style.navTextModalContainer}>
              <div className={style.textModalContainer}>
                <a
                  onClick={() => {
                    setNavBarOption("about");
                    setTimeout(() => {
                      setMobileNavbar(false);
                    }, 500);
                  }}
                  className={`${style.navTextModal} ${
                    navBarOption == "about" && style.navTextModalActive
                  }`}
                >
                  About
                </a>
              </div>
              <div className={style.textModalContainer}>
                <a
                  onClick={() => {
                    setNavBarOption("works");
                    setTimeout(() => {
                      setMobileNavbar(false);
                    }, 500);
                  }}
                  className={`${style.navTextModal} ${
                    navBarOption == "works" && style.navTextModalActive
                  }`}
                >
                  Works
                </a>
              </div>
              <div className={style.textModalContainer}>
                <a
                  onClick={() => {
                    setNavBarOption("products");
                    setTimeout(() => {
                      setMobileNavbar(false);
                    }, 500);
                  }}
                  className={`${style.navTextModal} ${
                    navBarOption == "products" && style.navTextModalActive
                  }`}
                >
                  Products
                </a>
              </div>
              <div className={style.textModalContainer}>
                <a
                  onClick={() => {
                    setNavBarOption("contact");
                    setTimeout(() => {
                      setMobileNavbar(false);
                    }, 500);
                  }}
                  className={`${style.navTextModal} ${
                    navBarOption == "contact" && style.navTextModalActive
                  }`}
                >
                  Contact me
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <motion.section className={style.section1}>
        <div className={style.section1Background}>
          <Spline
            className={style.Spline}
            scene="https://prod.spline.design/nHIP8O8JfrR8GePB/scene.splinecode"
            onLoad={() => setLoading(false)}
          />
        </div>
        <div className={style.leftSide}>
          <div className={style.leftTop}>
            <div className={style.mainContainer}>
              <motion.div
                viewport={{ once: true, amount: 1 }}
                className={style.pictureContainer}
              >
                <img
                  className={style.img}
                  src="https://res.cloudinary.com/dnrprmypf/image/upload/v1718074229/sss_livrub.png"
                  alt=""
                />
              </motion.div>
              <div className={style.text1Container}>
                <h1 className={style.headerText1}>
                  Hi, I'm <label className={style.myName}>Pablo</label>
                </h1>
              </div>
              <div className={style.text2Container}>
                <div className={style.text2RevealContainer}>
                  <div className={style.textReveal}>
                    <h2 className={style.headerText2}>Skilled Web Developer</h2>
                    <h2 className={style.headerText2}>
                      Creative <label className={style.highlight}>UX/UI</label>{" "}
                      Designer
                    </h2>
                    <h2 className={style.headerText2}>Back-End Developer</h2>
                  </div>
                </div>
              </div>

              <div className={style.text3Container}>
                {width > 800 ? (
                  <h3 className={style.headerText3}>
                    Specializing in creating visually appealing and intuitive
                    designs, I ensure every project is eye-catching on the
                    front-end and rock-solid on the back-end. Let's join forces
                    to develop designs that stand out and deliver results.
                  </h3>
                ) : (
                  <div className={style.headerText3Aux}>
                    <h3 className={style.headerText3}>
                      Creating eye-catching web designs and rock-solid back-end
                      solutions. Let's make your project stand out.
                    </h3>
                  </div>
                )}
              </div>

              <div className={style.buttonContainer}>
                <button className={style.button}>
                  See my works
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      height="25"
                      width="25"
                      strokeWidth="2"
                      stroke="black"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </p>{" "}
                </button>
              </div>
            </div>
          </div>
          {/* <div className={style.leftBottom}>xxxxxxxxxxxxxxxxxxx</div> */}
        </div>
        {/* <div className={style.rightSide}>
          <div className={style.imgContainer}>
           
          </div>
        </div> */}
      </motion.section>
      <motion.section
        className={style.section2}
        onViewportEnter={() => setNavBarOption("about")}
        viewport={{ once: true, amount: 1.0 }}
      >
        <motion.footer
          style={{ opacity }}
          ref={targetRef}
          className={style.footer}
        >
          <motion.div
            animate={{
              x: ["0%", "-89.8%"],
            }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
            className={style.carousel}
          >
            <p className={style.textCarousel}>LETS TALK AND LETS CREATE</p>
            <p>
              <svg
                className={style.svgFooter}
                style={{ marginTop: "-6px" }}
                width="35"
                height="35"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L14.012 7.23109C14.294 7.96432 14.435 8.33093 14.6542 8.63931C14.8486 8.91262 15.0874 9.15141 15.3607 9.34575C15.6691 9.56503 16.0357 9.70603 16.7689 9.98804L22 12L16.7689 14.012C16.0357 14.294 15.6691 14.435 15.3607 14.6542C15.0874 14.8486 14.8486 15.0874 14.6542 15.3607C14.435 15.6691 14.294 16.0357 14.012 16.7689L12 22L9.98804 16.7689C9.70603 16.0357 9.56503 15.6691 9.34575 15.3607C9.15141 15.0874 8.91262 14.8486 8.63931 14.6542C8.33093 14.435 7.96432 14.294 7.23109 14.012L2 12L7.23108 9.98804C7.96431 9.70603 8.33093 9.56503 8.63931 9.34575C8.91262 9.15141 9.15141 8.91262 9.34575 8.63931C9.56503 8.33093 9.70603 7.96431 9.98804 7.23108L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
            <p className={style.textCarousel}>AVAILABLE FOR WORK</p>
            <p>
              <svg
                className={style.svgFooter}
                style={{ marginTop: "0px" }}
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2V22M19.0711 4.92893L4.92893 19.0711M22 12H2M19.0711 19.0711L4.92893 4.92893"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>

            <p className={style.textCarousel}>LETS TALK AND LETS CREATE</p>
            <p>
              <svg
                className={style.svgFooter}
                style={{ marginTop: "-6px" }}
                width="35"
                height="35"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L14.012 7.23109C14.294 7.96432 14.435 8.33093 14.6542 8.63931C14.8486 8.91262 15.0874 9.15141 15.3607 9.34575C15.6691 9.56503 16.0357 9.70603 16.7689 9.98804L22 12L16.7689 14.012C16.0357 14.294 15.6691 14.435 15.3607 14.6542C15.0874 14.8486 14.8486 15.0874 14.6542 15.3607C14.435 15.6691 14.294 16.0357 14.012 16.7689L12 22L9.98804 16.7689C9.70603 16.0357 9.56503 15.6691 9.34575 15.3607C9.15141 15.0874 8.91262 14.8486 8.63931 14.6542C8.33093 14.435 7.96432 14.294 7.23109 14.012L2 12L7.23108 9.98804C7.96431 9.70603 8.33093 9.56503 8.63931 9.34575C8.91262 9.15141 9.15141 8.91262 9.34575 8.63931C9.56503 8.33093 9.70603 7.96431 9.98804 7.23108L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
            <p className={style.textCarousel}>AVAILABLE FOR WORK</p>
            <p>
              <svg
                className={style.svgFooter}
                style={{ marginTop: "0px" }}
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2V22M19.0711 4.92893L4.92893 19.0711M22 12H2M19.0711 19.0711L4.92893 4.92893"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
            {/* -------------------------------------------------- */}
            <p className={style.textCarousel}>LETS TALK AND LETS CREATE</p>
            <p>
              <svg
                className={style.svgFooter}
                style={{ marginTop: "-6px" }}
                width="35"
                height="35"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L14.012 7.23109C14.294 7.96432 14.435 8.33093 14.6542 8.63931C14.8486 8.91262 15.0874 9.15141 15.3607 9.34575C15.6691 9.56503 16.0357 9.70603 16.7689 9.98804L22 12L16.7689 14.012C16.0357 14.294 15.6691 14.435 15.3607 14.6542C15.0874 14.8486 14.8486 15.0874 14.6542 15.3607C14.435 15.6691 14.294 16.0357 14.012 16.7689L12 22L9.98804 16.7689C9.70603 16.0357 9.56503 15.6691 9.34575 15.3607C9.15141 15.0874 8.91262 14.8486 8.63931 14.6542C8.33093 14.435 7.96432 14.294 7.23109 14.012L2 12L7.23108 9.98804C7.96431 9.70603 8.33093 9.56503 8.63931 9.34575C8.91262 9.15141 9.15141 8.91262 9.34575 8.63931C9.56503 8.33093 9.70603 7.96431 9.98804 7.23108L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
            <p className={style.textCarousel}>AVAILABLE FOR WORK</p>
            <p>
              <svg
                className={style.svgFooter}
                style={{ marginTop: "0px" }}
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2V22M19.0711 4.92893L4.92893 19.0711M22 12H2M19.0711 19.0711L4.92893 4.92893"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>

            <p className={style.textCarousel}>LETS TALK AND LETS CREATE</p>
            <p>
              <svg
                className={style.svgFooter}
                style={{ marginTop: "-6px" }}
                width="35"
                height="35"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L14.012 7.23109C14.294 7.96432 14.435 8.33093 14.6542 8.63931C14.8486 8.91262 15.0874 9.15141 15.3607 9.34575C15.6691 9.56503 16.0357 9.70603 16.7689 9.98804L22 12L16.7689 14.012C16.0357 14.294 15.6691 14.435 15.3607 14.6542C15.0874 14.8486 14.8486 15.0874 14.6542 15.3607C14.435 15.6691 14.294 16.0357 14.012 16.7689L12 22L9.98804 16.7689C9.70603 16.0357 9.56503 15.6691 9.34575 15.3607C9.15141 15.0874 8.91262 14.8486 8.63931 14.6542C8.33093 14.435 7.96432 14.294 7.23109 14.012L2 12L7.23108 9.98804C7.96431 9.70603 8.33093 9.56503 8.63931 9.34575C8.91262 9.15141 9.15141 8.91262 9.34575 8.63931C9.56503 8.33093 9.70603 7.96431 9.98804 7.23108L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
            <p className={style.textCarousel}>AVAILABLE FOR WORK</p>
            <p>
              <svg
                className={style.svgFooter}
                style={{ marginTop: "0px" }}
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2V22M19.0711 4.92893L4.92893 19.0711M22 12H2M19.0711 19.0711L4.92893 4.92893"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
            <p className={style.textCarousel}>LETS TALK AND LETS CREATE</p>
            <p>
              <svg
                className={style.svgFooter}
                style={{ marginTop: "-6px" }}
                width="35"
                height="35"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L14.012 7.23109C14.294 7.96432 14.435 8.33093 14.6542 8.63931C14.8486 8.91262 15.0874 9.15141 15.3607 9.34575C15.6691 9.56503 16.0357 9.70603 16.7689 9.98804L22 12L16.7689 14.012C16.0357 14.294 15.6691 14.435 15.3607 14.6542C15.0874 14.8486 14.8486 15.0874 14.6542 15.3607C14.435 15.6691 14.294 16.0357 14.012 16.7689L12 22L9.98804 16.7689C9.70603 16.0357 9.56503 15.6691 9.34575 15.3607C9.15141 15.0874 8.91262 14.8486 8.63931 14.6542C8.33093 14.435 7.96432 14.294 7.23109 14.012L2 12L7.23108 9.98804C7.96431 9.70603 8.33093 9.56503 8.63931 9.34575C8.91262 9.15141 9.15141 8.91262 9.34575 8.63931C9.56503 8.33093 9.70603 7.96431 9.98804 7.23108L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
          </motion.div>
        </motion.footer>
      </motion.section>
      <motion.section className={style.section3}>sess</motion.section>
    </div>
  );
};

export default Landing;
