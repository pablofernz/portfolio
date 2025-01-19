import style from "./section1Footer.module.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Section1Footer = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "center start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <motion.footer style={{ opacity }} ref={targetRef} className={style.footer}>
      <motion.div
        //
        className={style.carousel}
      >
        <div className={style.auxCarousel}>
          <div className={style.text1Carousel}>
            <p className={style.textCarousel}>LETS TALK AND LETS CREATE</p>
            <p>
              <svg
                className={style.svgFooter}
                style={{ marginTop: "5px", marginRight: "6px" }}
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
          </div>
          <div className={style.text2Carousel}>
            <p className={style.textCarousel}>AVAILABLE FOR WORK</p>
            <p>
              <svg
                className={style.svgFooter}
                style={{ marginTop: "5px", marginRight: "12px" }}
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
          </div>
        </div>

        <div className={style.auxCarousel}>
          <div className={style.text1Carousel}>
            <p className={style.textCarousel}>LETS TALK AND LETS CREATE</p>
            <p>
              <svg
                className={style.svgFooter}
                style={{ marginTop: "5px", marginRight: "6px" }}
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
          </div>
          <div className={style.text2Carousel}>
            <p className={style.textCarousel}>AVAILABLE FOR WORK</p>
            <p>
              <svg
                className={style.svgFooter}
                style={{ marginTop: "5px", marginRight: "12px" }}
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
          </div>
        </div>
        {/* -------------------------------------------------- */}
        <div className={style.auxCarousel}>
          <div className={style.text1Carousel}>
            <p className={style.textCarousel}>LETS TALK AND LETS CREATE</p>
            <p>
              <svg
                className={style.svgFooter}
                style={{ marginTop: "5px", marginRight: "6px" }}
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
          </div>
          <div className={style.text2Carousel}>
            <p className={style.textCarousel}>AVAILABLE FOR WORK</p>
            <p>
              <svg
                className={style.svgFooter}
                style={{ marginTop: "5px", marginRight: "12px" }}
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
          </div>
        </div>

        <div className={style.auxCarousel}>
          <div className={style.text1Carousel}>
            <p className={style.textCarousel}>LETS TALK AND LETS CREATE</p>
            <p>
              <svg
                className={style.svgFooter}
                style={{ marginTop: "5px", marginRight: "6px" }}
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
          </div>
          <div className={style.text2Carousel}>
            <p className={style.textCarousel}>AVAILABLE FOR WORK</p>
            <p>
              <svg
                className={style.svgFooter}
                style={{ marginTop: "5px", marginRight: "12px" }}
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
          </div>
        </div>
        <div className={style.auxCarousel}>
          <div className={style.text1Carousel}>
            <p className={style.textCarousel}>LETS TALK AND LETS CREATE</p>
            <p>
              <svg
                className={style.svgFooter}
                style={{ marginTop: "5px", marginRight: "6px" }}
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
          </div>
          <div className={style.text2Carousel}>
            <p className={style.textCarousel}>AVAILABLE FOR WORK</p>
            <p>
              <svg
                className={style.svgFooter}
                style={{ marginTop: "5px", marginRight: "12px" }}
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
          </div>
        </div>
        <div className={style.auxCarousel}>
          <div className={style.text1Carousel}>
            <p className={style.textCarousel}>LETS TALK AND LETS CREATE</p>
            <p>
              <svg
                className={style.svgFooter}
                style={{ marginTop: "5px", marginRight: "6px" }}
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
          </div>
          <div className={style.text2Carousel}>
            <p className={style.textCarousel}>AVAILABLE FOR WORK</p>
            <p>
              <svg
                className={style.svgFooter}
                style={{ marginTop: "5px", marginRight: "12px" }}
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
          </div>
        </div>
        <div className={style.auxCarousel}>
          <div className={style.text1Carousel}>
            <p className={style.textCarousel}>LETS TALK AND LETS CREATE</p>
            <p>
              <svg
                className={style.svgFooter}
                style={{ marginTop: "5px", marginRight: "6px" }}
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
          </div>
          <div className={style.text2Carousel}>
            <p className={style.textCarousel}>AVAILABLE FOR WORK</p>
            <p>
              <svg
                className={style.svgFooter}
                style={{ marginTop: "5px", marginRight: "12px" }}
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
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Section1Footer;
