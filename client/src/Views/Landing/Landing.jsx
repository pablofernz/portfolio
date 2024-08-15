import style from "./Landing.module.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Lenis from "@studio-freight/lenis";
import useViewportWidth from "../../Components/Hooks/useViewportSize";
import { Animation } from "../../Components/LoadingPage/loadingPage";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "./Sections/Navbar/navbar";

import Section1 from "./Sections/section1/section1";
import Section2 from "./Sections/section2/section2";
import Section3 from "./Sections/section3/section3";
import Section4 from "./Sections/section4/section4";
import Section5 from "./Sections/section5/section5";
import Chatbox from "./Sections/Chatbox/chatbox";

const Landing = () => {
  const width = useViewportWidth();
  const isLoading = useSelector((state) => state.isLoading);

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

    return () => {
      lenis.destroy();
    };
  }, []);

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

      {/* <Navbar />
      <Chatbox />

      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 /> */}
      <Section5 />

      {test && <h1>Hola amigos</h1>}
    </div>
  );
};

export default Landing;
