import style from "./Landing.module.css";
import { useEffect, useRef, useState, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import Lenis from "@studio-freight/lenis";
import useViewportWidth from "../../Components/Hooks/useViewportSize";
import { Animation } from "../../Components/LoadingPage/loadingPage";
import { useScroll } from "framer-motion";
import Navbar from "./Sections/Navbar/navbar";
import { Metrics } from "../../Components/Hooks/metrics";

const Section1 = lazy(() => import("./Sections/section1/section1"));
const Section2 = lazy(() => import("./Sections/section2/section2"));
const Section3 = lazy(() => import("./Sections/section3/section3"));
const Section4 = lazy(() => import("./Sections/section4/section4"));
const Section5 = lazy(() => import("./Sections/section5/section5"));
const Footer = lazy(() => import("./Sections/Footer/footer"));

// import Chatbox from "./Sections/Chatbox/chatbox";

const Landing = () => {
  const width = useViewportWidth();
  const isLoading = useSelector((state) => state.isLoading);
  const sectionLoader = useSelector((state) => state.sectionLoaded);

  const modalsOpen = useSelector((state) => state.modalOpen);
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
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

    if (modalsOpen) {
      lenis.stop();
    }
    return () => {
      lenis.destroy();
    };
  }, [modalsOpen]);

  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll();

  const [test, setTest] = useState(false);

  useEffect(() => {
    window.addEventListener("offline", () => {
      setTest(true);
    });

    window.addEventListener("online", () => {
      setTest(false);
    });
  });

  Metrics();

  return (
    <div className={style.background}>
      <div className={style.test}></div>
      {/* {isLoading === true ? (
        <Animation animation={true} width={width} />
      ) : (
        <Animation animation={false} width={width} />
      )} */}

      {/* <motion.div
        ref={targetRef}
        style={{ scaleX: scrollYProgress }}
        className={style.topScrollIndicator }
      ></motion.div> */}

      {/* <Section1 />
      <Navbar />
      <Section2 /> */}

      {sectionLoader.section3 && (
        <Suspense fallback={<div>Loading...</div>}>
          <Section3 />
        </Suspense>
      )}
      {sectionLoader.section4 && (
        <Suspense fallback={<div>Loading...</div>}>
          <Section4 />
        </Suspense>
      )}
      {sectionLoader.section5 && (
        <Suspense fallback={<div>Loading...</div>}>
          <Section5 />
        </Suspense>
      )}
      {sectionLoader.footer && (
        <Suspense fallback={<div>Loading...</div>}>
          <Footer />
        </Suspense>
      )}

      {/* <Chatbox />
       */}

      {test && <h1>Hola amigos</h1>}
    </div>
  );
};

export default Landing;
