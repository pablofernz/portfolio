import style from "./Landing.module.css";
import { useEffect, useRef, lazy, Suspense } from "react";
import { useSelector } from "react-redux";

import { motion, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";

const Animation = lazy(() =>
  import("../../Components/LoadingPage/loadingPage")
);

import useViewportWidth from "../../Components/Hooks/useViewportSize";
const CircleCursor = lazy(() =>
  import("../../Components/circleCursor/circleCursor")
);
const Section1 = lazy(() => import("./Sections/section1/section1"));
const Section2 = lazy(() => import("./Sections/section2/section2"));
const Section3 = lazy(() => import("./Sections/section3/section3"));
const Section4 = lazy(() => import("./Sections/section4/section4"));
const Section5 = lazy(() => import("./Sections/section5/section5"));
const Footer = lazy(() => import("./Sections/Footer/footer"));
// const Chatbox = lazy(() => import("./Sections/Chatbox/chatbox"));

const Landing = () => {
  const width = useViewportWidth();
  const sectionsLoaded = useSelector((state) => state.sectionLoaded);
  const isLoading = useSelector((state) => state.isLoading);
  const modalsOpen = useSelector((state) => state.modalOpen);
  const backgroundModalNeeded = useSelector(
    (state) => state.backgroundModalNeeded
  );
  const lenisRef = useRef(null);

  useEffect(() => {
    if (width > 900) {
      if (!lenisRef.current) {
        lenisRef.current = new Lenis({
          duration: 2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: "vertical",
          gestureDirection: "both",
          smooth: true,
          smoothTouch: false,
          touchMultiplier: 2,
        });

        const lenis = lenisRef.current;

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
      }

      if (modalsOpen) {
        lenisRef.current.stop();
      } else if (sectionsLoaded) {
        lenisRef.current.start();
      }
    }

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [width, modalsOpen, sectionsLoaded]);

  return (
    <div className={style.background}>
      <div className={style.test}></div>

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
      
      {useViewportWidth() > 900 && (
        <div className={style.cursorContainer}>
          <CircleCursor />
        </div>
      )}
      <Suspense fallback={<div></div>}>
        {width > 900 ? (
          isLoading === true ? (
            <Animation animation={true} />
          ) : (
            <Animation animation={false} />
          )
        ) : null}
      </Suspense>

      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Footer />
      {/* <Section5 /> */}
    </div>
  );
};

export default Landing;
