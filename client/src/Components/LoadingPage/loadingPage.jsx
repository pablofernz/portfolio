import style from "./loadingPage.module.css";
import { motion } from "framer-motion";

export function Animation({ animation, width }) {
  const opacityValue = animation === false ? 0 : 1;
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{
        y: animation === false && "-100vh",
      }}
      transition={{
        duration: 0,
        type: "spring",
        delay: animation === false && 3,
      }}
      className={style.background}
    >
      <div className={style.backgroundsContainer}>
        <motion.div
          initial={{ y: 0 }}
          animate={{
            y: animation === false && "-100vh",
          }}
          transition={{
            duration: 2,
            type: "spring",
            delay: animation === false && 1.2,
          }}
          className={style.backgroundSection1}
        ></motion.div>
        <motion.div
          initial={{ y: 0 }}
          animate={{
            y: animation === false && "-100vh",
          }}
          transition={{
            duration: 2,
            type: "spring",
            delay: animation === false && 1.4,
          }}
          className={style.backgroundSection2}
        ></motion.div>
        <motion.div
          initial={{ y: 0 }}
          animate={{
            y: animation === false && "-100vh",
          }}
          transition={{
            duration: 2,
            type: "spring",
            delay: animation === false && 1.6,
          }}
          className={style.backgroundSection3}
        ></motion.div>
        <motion.div
          initial={{ y: 0 }}
          animate={{
            y: animation === false && "-100vh",
          }}
          transition={{
            duration: 2,
            type: "spring",
            delay: animation === false && 1.8,
          }}
          className={style.backgroundSection4}
        ></motion.div>
        <motion.div
          initial={{ y: 0 }}
          animate={{
            y: animation === false && "-100vh",
          }}
          transition={{
            duration: 2,
            type: "spring",
            delay: animation === false && 2,
          }}
          className={style.backgroundSection5}
        ></motion.div>
      </div>
      <motion.div
        initial={{ scale: width < 800 ? 0.8 : 1 }}
        className={style.loader}
      >
        <div className={style.left}>
          <div className={style.containerLeftTop}>
            <motion.div
              initial={{ y: 0, opacity: 1 }}
              animate={{
                y: animation === false && -20,
                opacity: opacityValue,
              }}
              transition={{
                duration: 1,
                delay: 0.6,
                type: "spring",
              }}
              className={style.leftTopOne}
            ></motion.div>
            <motion.div
              initial={{ y: 0, opacity: 1 }}
              animate={{
                y: animation === false && -20,
                opacity: opacityValue,
              }}
              transition={{
                duration: 1,
                delay: 1,
                type: "spring",
              }}
              className={style.leftTopTwo}
            ></motion.div>
            <motion.div
              initial={{ y: 0, opacity: 1 }}
              animate={{
                y: animation === false && -20,
                opacity: opacityValue,
              }}
              transition={{
                duration: 1,
                delay: 0.6,
                type: "spring",
              }}
              className={style.leftTopThree}
            ></motion.div>
            <motion.div
              initial={{ y: 0, opacity: 1 }}
              animate={{
                y: animation === false && -20,
                opacity: opacityValue,
              }}
              transition={{
                duration: 1,
                delay: 1,
                type: "spring",
              }}
              className={style.testfour}
            >
              <div className={style.leftTopFour}></div>
            </motion.div>
          </div>

          <div className={style.containerLeftBottom}>
            <motion.div
              initial={{ y: 0, opacity: 1 }}
              animate={{
                y: animation === false && -20,
                opacity: opacityValue,
              }}
              transition={{
                duration: 1,
                delay: 0.6,
                type: "spring",
              }}
              className={style.leftBottomOne}
            ></motion.div>
            <motion.div
              initial={{ y: 0, opacity: 1 }}
              animate={{
                y: animation === false && -20,
                opacity: opacityValue,
              }}
              transition={{
                duration: 1,
                delay: 0.7,
                type: "spring",
              }}
              className={style.leftBottomTwo}
            ></motion.div>
            <motion.div
              initial={{ y: 0, opacity: 1 }}
              animate={{
                y: animation === false && -20,
                opacity: opacityValue,
              }}
              transition={{
                duration: 1,
                delay: 0.8,
                type: "spring",
              }}
              className={style.leftBottomThree}
            ></motion.div>
            <motion.div
              initial={{ y: 0, opacity: 1 }}
              animate={{
                y: animation === false && -20,
                opacity: opacityValue,
              }}
              transition={{
                duration: 1,
                delay: 1,
                type: "spring",
              }}
              className={style.leftBottomFour}
            ></motion.div>
          </div>
        </div>

        <div className={style.right}>
          <div className={style.containerRightTop}>
            <motion.div
              initial={{ y: 0, opacity: 1 }}
              animate={{
                y: animation === false && -20,
                opacity: opacityValue,
              }}
              transition={{
                duration: 1,
                delay: 1,
                type: "spring",
              }}
              className={style.rightTopfive}
            ></motion.div>
            <motion.div
              initial={{ y: 0, opacity: 1 }}
              animate={{
                y: animation === false && -20,
                opacity: opacityValue,
              }}
              transition={{
                duration: 1,
                delay: 1.1,
                type: "spring",
              }}
              className={style.rightTopsix}
            ></motion.div>

            <div className={style.rightTopeight}></div>
          </div>

          <div className={style.containerRightBottom}></div>
        </div>
      </motion.div>
    </motion.div>
  );
}
