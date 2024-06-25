import { useDispatch } from "react-redux";
import style from "./section3.module.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { setSection } from "../../../../Redux/actions";
import IconComponent from "../../../../assets/icons/iconsImg";
import { useEffect, useRef } from "react";
import useViewportWidth from "../../../../Components/Hooks/useViewportSize";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Section3 = () => {
  const dispatch = useDispatch();
  const iconsContainer = useRef(null);

  const viewportWidth = useViewportWidth();

  const { scrollYProgress } = useScroll({
    target: iconsContainer,
    offset: ["start end", "center start"],
  });
  const height = useTransform(
    scrollYProgress,
    [0, 0.6],
    [70, innerHeight - 30]
  );
  const width = useTransform(scrollYProgress, [0, 0.6], [70, innerWidth - 30]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: "#page2",
      start: "top top",
      endTrigger: "#container",
      end: "bottom bottom",
      pin: true,
      pinSpacing: false,
      markers: true,
      scrub: 2,
    });
  }, []);
  return (
    <motion.section id="container" className={style.section3}>
      <div id="page2" className={style.page2}>
        <div className={style.up} />
        <div className={style.iconsComponent}>
          <motion.div
            ref={iconsContainer}
            style={{ height, width, opacity }}
            transition={{ duration: 1, type: "spring" }}
            className={style.iconsContainer}
          >
            <motion.div
              name="HTML"
              animate={{
                y: [20, -20, 20],
              }}
              transition={{
                duration: 10,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              style={{
                position: "absolute",
                left: viewportWidth > 600 ? "5%" : "-10%",
                top: viewportWidth > 600 ? "7%" : "4%",
              }}
            >
              <IconComponent icon="HTML" reference="iconsContainer" />
            </motion.div>
            <motion.div
              animate={{
                y: [-30, 30, -30],
              }}
              transition={{
                duration: 12,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              style={{ position: "absolute", left: "92%", top: "47%" }}
            >
              <IconComponent icon="CSS" reference="iconsContainer" />
            </motion.div>

            <motion.div
              animate={{
                y: [10, -10, 10],
              }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              style={{ position: "absolute", left: "34%", top: "78%" }}
            >
              <IconComponent icon="Redux" reference="iconsContainer" />
            </motion.div>

            <div
              style={{
                position: "absolute",
                left: viewportWidth > 600 ? "83%" : "93%",
                top: viewportWidth > 600 ? "12%" : "15%",
              }}
            >
              <IconComponent icon="Git" reference="iconsContainer" />
            </div>

            <div style={{ position: "absolute", left: "0%", top: "85%" }}>
              <IconComponent icon="GitHub" reference="iconsContainer" />
            </div>

            <div style={{ position: "absolute", left: "78%", top: "72%" }}>
              <IconComponent icon="Node" reference="iconsContainer" />
            </div>

            <div style={{ position: "absolute", left: "9%", top: "42%" }}>
              <IconComponent icon="MongoDB" reference="iconsContainer" />
            </div>

            <div style={{ position: "absolute", left: "52%", top: "8%" }}>
              <IconComponent icon="Jest" reference="iconsContainer" />
            </div>

            <div
              style={{
                position: "absolute",
                left: viewportWidth > 600 ? "28%" : "18%",
                top: viewportWidth > 600 ? "16%" : "13%",
              }}
            >
              <IconComponent icon="PostgreSQL" reference="iconsContainer" />
            </div>

            <div style={{ position: "absolute", left: "58%", top: "86%" }}>
              <IconComponent icon="Sequelize" reference="iconsContainer" />
            </div>

            <div style={{ position: "absolute", left: "18%", top: "80%" }}>
              <IconComponent icon="FramerMotion" reference="iconsContainer" />
            </div>

            <motion.div
              animate={{
                y: [20, -20, 20],
              }}
              transition={{
                duration: 10,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              initial={{ left: "58%", top: "58%" }}
              style={{ position: "absolute" }}
            >
              <IconComponent icon="Javascript" reference="iconsContainer" />
            </motion.div>
            <motion.div
              animate={{
                y: [-40, 40, -40],
              }}
              transition={{
                duration: 10,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              style={{ position: "absolute", left: "38%", top: "38%" }}
            >
              <IconComponent icon="React" reference="iconsContainer" />
            </motion.div>

            <div style={{ position: "absolute", left: "68%", top: "28%" }}>
              <IconComponent icon="Express" reference="iconsContainer" />
            </div>

            <div style={{ position: "absolute", left: "88%", top: "80%" }}>
              <IconComponent icon="Firebase" reference="iconsContainer" />
            </div>

            <div
              style={{
                position: "absolute",
                left: viewportWidth > 600 ? "22%" : "-2%",
                top: "52%",
              }}
            >
              <IconComponent icon="Typescript" reference="iconsContainer" />
            </div>

            <motion.div
              animate={{
                y: [20, -80, 20],
              }}
              transition={{
                duration: 12,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              style={{ position: "absolute", left: "18%", top: "25%" }}
            >
              <IconComponent icon="Slack" reference="iconsContainer" />
            </motion.div>
          </motion.div>
        </div>
        <div className={style.pageContent}>
          <h1 className={style.text1}>My tech stack</h1>
        </div>
      </div>
    </motion.section>
  );
};

export default Section3;
