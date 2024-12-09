import Spline from "@splinetool/react-spline";
import style from "./section1.module.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoaded } from "../../../../Redux/actions";
import useViewportWidth from "../../../../Components/Hooks/useViewportSize";

const Section1 = ({ setLoading }) => {
  const width = useViewportWidth();
  const dispatch = useDispatch();
  const sectionActive = useSelector((state) => state.section);

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.4]);
  const rotateX = useTransform(scrollYProgress, [0, 0.4], [0, 30]);
  const rotate = useTransform(scrollYProgress, [0, 0.4], [0, -20]);

  const borderRadius = useTransform(scrollYProgress, [0, 0.1], [0, 30]);

  return (
    <div
      className={style.test}
      style={{
        position: sectionActive !== "Home" ? "relative" : "-webkit-sticky",
      }}
    >
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
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className={style.mouseicon}
                  >
                    <svg
                      width="15"
                      height="25"
                      viewBox="0 0 19 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.875 20.625V9.375C16.875 7.38588 16.0848 5.47822 14.6783 4.0717C13.2718 2.66518 11.3641 1.875 9.375 1.875C7.38588 1.875 5.47822 2.66518 4.0717 4.0717C2.66518 5.47822 1.875 7.38588 1.875 9.375V20.625C1.875 22.6141 2.66518 24.5218 4.0717 25.9283C5.47822 27.3348 7.38588 28.125 9.375 28.125C11.3641 28.125 13.2718 27.3348 14.6783 25.9283C16.0848 24.5218 16.875 22.6141 16.875 20.625ZM9.375 0C6.8886 0 4.50403 0.98772 2.74587 2.74587C0.98772 4.50403 0 6.8886 0 9.375V20.625C0 23.1114 0.98772 25.496 2.74587 27.2541C4.50403 29.0123 6.8886 30 9.375 30C11.8614 30 14.246 29.0123 16.0041 27.2541C17.7623 25.496 18.75 23.1114 18.75 20.625V9.375C18.75 6.8886 17.7623 4.50403 16.0041 2.74587C14.246 0.98772 11.8614 0 9.375 0Z"
                        fill="black"
                        className={style.mouse}
                      ></path>
                      <path
                        d="M10.0379 7.39959C9.8621 7.22377 9.62364 7.125 9.375 7.125C9.12636 7.125 8.8879 7.22377 8.71209 7.39959C8.53627 7.5754 8.4375 7.81386 8.4375 8.0625V11.8125C8.4375 12.0611 8.53627 12.2996 8.71209 12.4754C8.8879 12.6512 9.12636 12.75 9.375 12.75C9.62364 12.75 9.8621 12.6512 10.0379 12.4754C10.2137 12.2996 10.3125 12.0611 10.3125 11.8125V8.0625C10.3125 7.81386 10.2137 7.5754 10.0379 7.39959Z"
                        fill="black"
                        className={style.cursor}
                      ></path>
                    </svg>
                  </p>
                  Explore more
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
