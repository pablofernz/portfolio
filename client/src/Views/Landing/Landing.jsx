import style from "./Landing.module.css";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Lenis from "@studio-freight/lenis";
import useViewportWidth from "../../Components/Hooks/useViewportSize";
import { Animation } from "../../Components/LoadingPage/loadingPage";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "./Sections/Navbar/navbar";

import Section1 from "./Sections/section1/section1";
import Section2 from "./Sections/section2/section2";
import Section3 from "./Sections/section3/section3";

const Landing = () => {
  const width = useViewportWidth();
  const isLoading = useSelector((state) => state.isLoading);

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

  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll();
  return (
    <div className={style.background}
   >
      {isLoading === true ? (
        <Animation animation={true} width={width} />
      ) : (
        <Animation animation={false} width={width} />
      )}

      <motion.div
        ref={targetRef}
        style={{ scaleX: scrollYProgress }}
        className={style.topScrollIndicator}
      ></motion.div>
      <Navbar />
      <Section1 />
      <Section2 />
      <Section3 />
    </div>
  );
};

export default Landing;
