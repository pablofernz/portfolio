import Spline from "@splinetool/react-spline";
import style from "./section1.module.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setLoaded } from "../../../../Redux/actions";
import useViewportWidth from "../../../../Components/Hooks/useViewportSize";
const Section1 = ({ setLoading }) => {
  const width = useViewportWidth();
  const dispatch = useDispatch();

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.4]);
  const rotateX = useTransform(scrollYProgress, [0, 0.2], [0, 30]);
  const rotate = useTransform(scrollYProgress, [0, 0.2], [0, -20]);

  const borderRadius = useTransform(scrollYProgress, [0, 0.1], [0, 30]);
  return (
    <div className={style.test}>
      <motion.section
        ref={targetRef}
        style={{
          scale,
          rotateX,
          rotate,
          borderRadius,
        }}
        className={style.section1}
      >
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
                    <h2 className={style.headerText2Aux}>
                      Efficient Back-End Developer
                    </h2>
                  </div>
                </div>
              </div>

              <div className={style.text3Container}>
                {width > 1100 && (
                  <h3 className={style.headerText3}>
                    I create projects that are visually appealing and work
                    seamlessly behind the scenes. Let’s work together to create
                    something that stands out.
                  </h3>
                )}
                {width < 1100 && width > 800 && (
                  <h3 className={style.headerText3}>
                    Specializing in visually captivating and user-friendly
                    designs, I ensure every project shines on the front-end and
                    operates seamlessly on the back&#8209;end. Let's collaborate
                    to create something that achieves impactful results
                    together.
                  </h3>
                )}
                {width < 800 && (
                  <div className={style.headerText3Aux}>
                    <h3 className={style.headerText3}>
                      I make eye-catching web designs and rock-solid back-end
                      solutions. Let's make your project stand out.
                    </h3>
                  </div>
                )}
              </div>

              <div className={style.buttonContainer}>
                <button
                  onClick={() => {
                    setLoading(true);
                  }}
                  className={style.button}
                >
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
                  </p>
                </button>

                <a
                  style={{ textDecoration: "none" }}
                  href="https://drive.google.com/file/d/1yOUL-DI4ns4JNnq1fQfGoMwL0VBPMSB0/view?usp=drive_link"
                  className={style.button2}
                  target="blank"
                >
                  Read my CV
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={style.section1Background}>
          <Spline
            className={style.Spline}
            scene="https://prod.spline.design/Y-QUYxldOQgyp3mN/scene.splinecode"
            onLoad={() => dispatch(setLoaded())}
          />
        </div>
      </motion.section>
    </div>
  );
};

export default Section1;
