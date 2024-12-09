import { useEffect, useRef } from "react";
import style from "./section2.module.css";
import { motion } from "framer-motion";
import Section1Footer from "../section1/Footer/section1Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setSection } from "../../../../Redux/actions";
import { useDispatch } from "react-redux";

gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {
  const containerRef = useRef(null);
  const childRef = useRef(null);
  const dispatch = useDispatch()
  gsap.set("#text1", { x: "-100vw" });
  gsap.set("#text2", { x: "100vw" });

  useEffect(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: `.${style.section2}`,
        start: "top top", 
        end: "bottom top", 
        scrub: 1,
        onEnter: () => {
          dispatch(setSection("About"));
        },
      },
    });
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1000",
        scrub: 1,
        // markers: true,
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
  }, []);

  return (
    <motion.section ref={containerRef} className={style.section2}>
      <Section1Footer />

      <motion.main ref={childRef} className={style.main}>
        <div className={style.text100vh}>
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
