import { useEffect, useRef } from "react";
import style from "./section2.module.css";
import { motion } from "framer-motion";
import Section1Footer from "../section1/Footer/section1Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useViewportWidth from "../../../../Components/Hooks/useViewportSize";

gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {
  const width = useViewportWidth();
  const containerRef = useRef(null);
  const childRef = useRef(null);

  useEffect(() => {
    if (width >= 900) {
      gsap.set("#text1", { x: "-100svw" });
      gsap.set("#text2", { x: "100svw" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1000",
          scrub: 1,
          pin: true,
        },
      });

      timeline.to("#text1", {
        x: "0vw",
        ease: "power1.out",
      });

      timeline.to("#text2", {
        x: "0vw",
        ease: "power1.out",
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [width]);

  return (
    <motion.section ref={containerRef} className={style.section2}>
      <Section1Footer />

      <motion.main ref={childRef} className={style.main}>
        <div className={style.text100svh}>
          <div className={style.top}>
            <motion.p
              id="text1"
              animate={{
                color: "rgb(100,100,100)",
              }}
              className={style.text}
            >
              I GO BEYOND MAKING WEBSITES
            </motion.p>
          </div>
          <div className={style.bottom}>
            <motion.p
              id="text2"
              animate={{
                color: "rgb(255,255,255)",
              }}
              className={style.text}
            >
              I CREATE DIGITAL <label>EXPERIENCES.</label>
            </motion.p>
          </div>
        </div>
      </motion.main>
    </motion.section>
  );
};

export default Section2;
