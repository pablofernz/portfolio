import { useDispatch } from "react-redux";
import style from "./section3.module.css";
import { motion } from "framer-motion";
import { setSection, updateCursorOptions } from "../../../../Redux/actions";
import IconComponent from "../../../../assets/icons/iconsImg";
import { useEffect, useRef } from "react";
import useViewportWidth from "../../../../Components/Hooks/useViewportSize";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(ScrollTrigger);
const Section3 = () => {
  const dispatch = useDispatch();

  const viewportWidth = useViewportWidth();

  const skills = [
    "GitHub",
    "Firebase",
    "Express",
    "MongoDB",
    "Typescript",
    "HTML",
    "FramerMotion",
    "Sequelize",
    "Slack",
    "Git",
    "PostgreSQL",
    "Javascript",
    "Mongoose",
    "React",
    "Node",
    "Jest",
    "CSS",
    "Redux",
  ];

  // const skillsSorted = skills.sort(() => Math.random() - 0.5);

  const skillsContainer = useRef(null);

  useEffect(() => {
// This timeline changes the section value of their respective page
    gsap.timeline({
      scrollTrigger: {
        trigger: `.${style.section3}`,
        start: "top top", 
        end: "bottom top", 
        scrub: 1,
        onEnter: () => {
          dispatch(setSection("Stack"));
        },
      },
    });

    gsap.set(`.${style.test}`, { scale: 60, opacity: 1, rotate: "0deg" });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: `.${style.section3}`,
        start: "top bottom", // Cuando el top del contenedor toca el bottom del viewport
        end: "bottom top", // Cuando el bottom del contenedor toca el top del viewport
        scrub: 1,
        // markers: true,
      },
    });

    const bigCardTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: `.${style.bigCard}`,
        start: "top 10%", // Cuando el top del contenedor toca el bottom del viewport
        end: "300vh", // Cuando el bottom del contenedor toca el top del viewport
        scrub: 1,
        // markers: true,
      },
    });

    // This timeline manage the increase of the size of the big card
    bigCardTimeline.to(
      `.${style.test}`,
      { scale: 1, opacity: 1, rotate: "30deg" },
      0
    );

    // This two timelines manage the movement at the left and right of the skills line elements
    timeline.to(`.${style.right}`, { x: "-100%" }, 0);
    timeline.to(`.${style.left}`, { x: "100%" }, 0);

    // This timeline will manage the pinned movement of the allSkillsContainer
    const text = gsap.timeline({
      scrollTrigger: {
        trigger: `.${style.section3}`,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
        pin: `.${style.allSkillsContainer}`,
      },
    });

    text
      .to(`.${style.textContent}`, { scale: 0, opacity: 0, rotate: "40deg" }, 0)
      .to(`.${style.textContent}`, {}, "50%");

    // ANIMATIONS FOR THE WHITE CIRCLE TRANSITION
    gsap.set(`.${style.circle}`, { scale: 0 });

    const circle = gsap.timeline({
      scrollTrigger: {
        trigger: `.${style.section3}`,
        start: "center bottom",
        end: "bottom center",
        scrub: 1,
        // markers: true,
      },
    });

    circle
      .to(`.${style.circle}`, { scale: 0 }, 0)
      .to(`.${style.circle}`, { scale: 380 }, "100%");

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <motion.section id="stackSection" className={style.section3}>
      <div className={style.allSkillsContainer} ref={skillsContainer}>
        <div className={style.bigCard}>
          <div className={style.textContent}>
            <div className={style.top}>
              <p>{viewportWidth > 600 && "USING"}</p>
            </div>
            <div className={style.center}>
              <p>{viewportWidth > 600 ? "THESE" : "USING THESE TOOLS"}</p>
            </div>

            <div className={style.bottom}>
              <p>{viewportWidth > 600 && "TOOLS"}</p>
            </div>
          </div>

          <div
            className={style.circle}
            onMouseEnter={() => {
              dispatch(
                updateCursorOptions({
                  isVisible: true,
                  width: 90,
                  height: 90,
                  textContent: "SCROLL <br/>DOWN",
                })
              );
            }}
            onMouseLeave={() => {
              dispatch(
                updateCursorOptions({
                  isVisible: false,
                })
              );
            }}
          ></div>

          <div className={style.test}>
            <motion.div
              className={`${style.skillsContainer} ${style.right}`}
              key="row1"
            >
              {skills.map((skill, index) => (
                <IconComponent
                  icon={skill}
                  reference="iconsContainer"
                  key={`row1-1-${index}`}
                />
              ))}
              {skills.map((skill, index) => (
                <IconComponent
                  icon={skill}
                  reference="iconsContainer"
                  key={`row1-2-${index}`}
                />
              ))}
            </motion.div>

            <motion.div
              className={`${style.skillsContainer} ${style.left}`}
              animate={{ marginLeft: "780px" }}
              key="row2"
            >
              {skills.map((skill, index) => (
                <IconComponent
                  icon={skill}
                  reference="iconsContainer"
                  key={`row2-1-${index}`}
                />
              ))}
              {skills.map((skill, index) => (
                <IconComponent
                  icon={skill}
                  reference="iconsContainer"
                  key={`row2-2-${index}`}
                />
              ))}
            </motion.div>

            <motion.div
              className={`${style.skillsContainer} ${style.right}`}
              animate={{ marginRight: "780px" }}
              key="row3"
            >
              {skills.map((skill, index) => (
                <IconComponent
                  icon={skill}
                  reference="iconsContainer"
                  key={`row3-1-${index}`}
                />
              ))}
              {skills.map((skill, index) => (
                <IconComponent
                  icon={skill}
                  reference="iconsContainer"
                  key={`row3-2-${index}`}
                />
              ))}
            </motion.div>

            <motion.div
              className={`${style.skillsContainer} ${style.left}`}
              animate={{ marginLeft: "940px" }}
              key="row4"
            >
              {skills.map((skill, index) => (
                <IconComponent
                  icon={skill}
                  reference="iconsContainer"
                  key={`row4-1-${index}`}
                />
              ))}
              {skills.map((skill, index) => (
                <IconComponent
                  icon={skill}
                  reference="iconsContainer"
                  key={`row4-2-${index}`}
                />
              ))}
            </motion.div>

            <motion.div
              className={`${style.skillsContainer} ${style.right}`}
              animate={{ marginRight: "340px" }}
              key="row5"
            >
              {skills.map((skill, index) => (
                <IconComponent
                  icon={skill}
                  reference="iconsContainer"
                  key={`row5-1-${index}`}
                />
              ))}
              {skills.map((skill, index) => (
                <IconComponent
                  icon={skill}
                  reference="iconsContainer"
                  key={`row5-2-${index}`}
                />
              ))}
            </motion.div>

            <motion.div
              className={`${style.skillsContainer} ${style.left}`}
              key="row6"
            >
              {skills.map((skill, index) => (
                <IconComponent
                  icon={skill}
                  reference="iconsContainer"
                  key={`row6-1-${index}`}
                />
              ))}
              {skills.map((skill, index) => (
                <IconComponent
                  icon={skill}
                  reference="iconsContainer"
                  key={`row6-2-${index}`}
                />
              ))}
            </motion.div>

            <motion.div
              className={`${style.skillsContainer} ${style.right}`}
              key="row7"
            >
              {skills.map((skill, index) => (
                <IconComponent
                  icon={skill}
                  reference="iconsContainer"
                  key={`row7-1-${index}`}
                />
              ))}
              {skills.map((skill, index) => (
                <IconComponent
                  icon={skill}
                  reference="iconsContainer"
                  key={`row7-2-${index}`}
                />
              ))}
            </motion.div>

            <motion.div
              className={`${style.skillsContainer} ${style.left}`}
              key="row8"
            >
              {skills.map((skill, index) => (
                <IconComponent
                  icon={skill}
                  reference="iconsContainer"
                  key={`row8-1-${index}`}
                />
              ))}
              {skills.map((skill, index) => (
                <IconComponent
                  icon={skill}
                  reference="iconsContainer"
                  key={`row8-2-${index}`}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Section3;
