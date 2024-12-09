import style from "./Landing.module.css";
import { useEffect, useRef, lazy } from "react";
import { useSelector } from "react-redux";

import { useScroll, motion, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";

import useViewportWidth from "../../Components/Hooks/useViewportSize";
import { Animation } from "../../Components/LoadingPage/loadingPage";

// import Navbar from "./Sections/Navbar/navbar";
import { Metrics } from "../../Components/Hooks/metrics";
import CircleCursor from "../../Components/circleCursor/circleCursor";
const Section1 = lazy(() => import("./Sections/section1/section1"));
const Section2 = lazy(() => import("./Sections/section2/section2"));
const Section3 = lazy(() => import("./Sections/section3/section3"));
const Section4 = lazy(() => import("./Sections/section4/section4"));
const Section5 = lazy(() => import("./Sections/section5/section5"));
const Footer = lazy(() => import("./Sections/Footer/footer"));
// const Chatbox = lazy(() => import("./Sections/Chatbox/chatbox"));

const Landing = () => {
  const width = useViewportWidth();
  const isLoading = useSelector((state) => state.isLoading);
  const sectionLoader = useSelector((state) => state.sectionLoaded);
  const sectionViewed = useSelector((state) => state.section);

  const modalsOpen = useSelector((state) => state.modalOpen);
  const backgroundModalNeeded = useSelector(
    (state) => state.backgroundModalNeeded
  );
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

  Metrics();

  return (
    <div className={style.background}>
      <div className={style.test}></div>
      {/* <motion.div
        ref={targetRef}
        style={{ scaleX: scrollYProgress }}
        className={style.topScrollIndicator }
      ></motion.div> */}

      <AnimatePresence>
        {backgroundModalNeeded && (
          <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={style.backgroundModal}
          ></motion.div>
        )}
      </AnimatePresence>

      <div className={style.cursorContainer}>
        <CircleCursor />
      </div>
{/* 
      {isLoading === true ? (
        <Animation animation={true} width={width} />
      ) : (
        <Animation animation={false} width={width} />
      )} */}

      {/* <Navbar /> */}
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 /> 
      <Section5 />
      <Footer />
      {/* 
      {sectionViewed == "About" && (
        <Suspense fallback={<div>Loading...</div>}>
          <Section3 />
        </Suspense>
      )} */}
      {/* {sectionLoader.section4 && (
        <Suspense fallback={<div>Loading...</div>}>
          <Section4 />
        </Suspense>
      )} */}
      {/* {sectionLoader.section5 && (
        <Suspense fallback={<div>Loading...</div>}>
          <Section5 />
        </Suspense>
      )}
      {sectionLoader.footer && (
        <Suspense fallback={<div>Loading...</div>}>
          <Footer />
        </Suspense>
      )} */}

      {/* <Chatbox /> */}
    </div>
  );
};

export default Landing;
