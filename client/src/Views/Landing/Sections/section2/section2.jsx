import { useEffect, useRef, useState } from "react";
import style from "./section2.module.css";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import Section1Footer from "../section1/Footer/section1Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Spline from "@splinetool/react-spline";
gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {
  const containerRef = useRef(null);
  const text2Ref = useRef(null);
  const childRef = useRef(null);
  const page1Ref = useRef(null);
  const detail1 = useRef(null);
  const upper = useRef(null);

  const i = useRef(null);
  const go = useRef(null);
  const beyond = useRef(null);
  const making = useRef(null);
  const websites = useRef(null);
  const i2 = useRef(null);
  const create = useRef(null);
  const digitalExperiences = useRef(null);

  const iView = useInView(i, {
    once: true,
    threshold: 1,
  });
  const goView = useInView(go, {
    once: true,
    threshold: 1,
  });

  const beyondView = useInView(beyond, {
    once: true,
    threshold: 1,
  });

  const makingView = useInView(making, {
    once: true,
    threshold: 1,
  });

  const websitesView = useInView(websites, {
    once: true,
    threshold: 1,
  });

  const i2View = useInView(i2, {
    once: true,
    threshold: 1,
  });

  const digitalExperiencesView = useInView(text2Ref, {
    once: true,
    threshold: 1,
  });

  const createView = useInView(create, {
    once: true,
    threshold: 1,
  });

  useEffect(() => {
    // Divide cada línea de texto en page1 individualmente
    window.scrollTo(0, 0);
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=4000", // Ajusta según la duración deseada
        scrub: 1, // Ajusta este valor para hacer las animaciones más lentas o más rápidas
        pin: true,
      },
    });

    // Animación de desplazamiento horizontal de childRef
    timeline.fromTo(
      childRef.current,
      {
        translateX: 0,
      },
      {
        translateX: "-200vw",
        ease: "ease",
        duration: 30, // Ajusta la duración según sea necesario
      }
    );

    // Agrandar el texto de page2 con el scroll
    timeline.fromTo(
      text2Ref.current,
      {
        color: "rgb(125, 225, 160)",

        scale: 1,
      },
      {
        color: "rgb(255, 255, 255)",

        scale: 180,
        ease: "power1.inOut",
        duration: 10,
      }
    );

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <motion.section ref={containerRef} className={style.section2}>
      <Section1Footer />

      <motion.main ref={childRef} className={style.main}>
        <div ref={page1Ref} className={style.page1}>
          <div ref={upper} className={style.upper}></div>
          <div className={style.med}>
            <p className={style.page1Text}>
              <motion.label
                animate={{
                  opacity: iView === true ? 1 : 0,
                  y: iView === true ? 0 : 50,
                }}
                ref={i}
                transition={{ duration: 1, type: "spring", delay: 0.2 }}
              >
                I
              </motion.label>
              <motion.label
                animate={{
                  opacity: goView === true ? 1 : 0,
                  y: goView === true ? 0 : 50,
                }}
                transition={{ duration: 1, type: "spring", delay: 0.2 }}
                ref={go}
              >
                go
              </motion.label>
              <AnimatePresence>
                <motion.label
                  animate={{
                    opacity: beyondView === true ? 1 : 0,
                    y: beyondView === true ? 0 : 50,
                  }}
                  transition={{ duration: 1, type: "spring", delay: 0.2 }}
                  ref={beyond}
                >
                  beyond
                </motion.label>
              </AnimatePresence>
              <motion.label
                animate={{
                  opacity: makingView === true ? 1 : 0,
                  y: makingView === true ? 0 : 50,
                }}
                transition={{ duration: 1, type: "spring", delay: 0.2 }}
                ref={making}
              >
                making
              </motion.label>
              <motion.div
                animate={{
                  opacity: websitesView === true ? 1 : 0,
                  y: websitesView === true ? 0 : 50,
                }}
                transition={{ duration: 1, type: "spring", delay: 0.2 }}
                ref={websites}
                className={style.websiteCard}
              >
                <label className={style.highlight}>websites.</label>
                <label className={style.detail1}>cool</label>
                <label ref={detail1} className={style.detail2}>
                  <motion.svg
                    animate={{ rotate: "360deg" }}
                    transition={{
                      duration: 5,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="black"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L14.012 7.23109C14.294 7.96432 14.435 8.33093 14.6542 8.63931C14.8486 8.91262 15.0874 9.15141 15.3607 9.34575C15.6691 9.56503 16.0357 9.70603 16.7689 9.98804L22 12L16.7689 14.012C16.0357 14.294 15.6691 14.435 15.3607 14.6542C15.0874 14.8486 14.8486 15.0874 14.6542 15.3607C14.435 15.6691 14.294 16.0357 14.012 16.7689L12 22L9.98804 16.7689C9.70603 16.0357 9.56503 15.6691 9.34575 15.3607C9.15141 15.0874 8.91262 14.8486 8.63931 14.6542C8.33093 14.435 7.96432 14.294 7.23109 14.012L2 12L7.23108 9.98804C7.96431 9.70603 8.33093 9.56503 8.63931 9.34575C8.91262 9.15141 9.15141 8.91262 9.34575 8.63931C9.56503 8.33093 9.70603 7.96431 9.98804 7.23108L12 2Z"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </label>
              </motion.div>
              <motion.label
                animate={{
                  opacity: i2View === true ? 1 : 0,
                  y: i2View === true ? 0 : 20,
                }}
                transition={{ duration: 1, type: "spring", delay: 0.2 }}
                ref={i2}
              >
                I
              </motion.label>
              <motion.label
                animate={{
                  opacity: createView === true ? 1 : 0,
                  y: createView === true ? 0 : 20,
                }}
                transition={{ duration: 1, type: "spring", delay: 0.2 }}
                ref={create}
              >
                create
              </motion.label>
              <motion.label
                animate={{
                  opacity: digitalExperiencesView === true ? 1 : 0,
                  y: digitalExperiencesView === true ? 0 : 20,
                }}
                transition={{ duration: 1, type: "spring", delay: 0.2 }}
                ref={text2Ref}
                className={style.highlight2}
              >
                digital experiences
              </motion.label>
            </p>
          </div>
          <div className={style.bottom}></div>
        </div>
        <motion.div
          animate={{
            opacity: iView === true ? 1 : 0,
            y: iView === true ? 0 : 50,
          }}
          className={style.section1Background}
        >
          <Spline
            className={style.Spline}
            scene="https://prod.spline.design/zudlawEHfLxJkfvR/scene.splinecode"
          />
        </motion.div>
      </motion.main>
    </motion.section>
  );
};

export default Section2;
