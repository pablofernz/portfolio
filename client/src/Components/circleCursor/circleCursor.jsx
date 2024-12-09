import { useEffect, useState } from "react";
import style from "./circleCursor.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

const CircleCursor = () => {
  const cursorData = useSelector((state) => state.cursor);

  const [pointerData, setPointerData] = useState({ x: "", y: "" });
  const handleMouseMove = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    setPointerData({ x, y });
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      <motion.div
        className={style.cursorPointer}
        initial={{ opacity: 0, scale: 0 }}
        exit={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: cursorData.isVisible == true ? 1 : 0,
          scale: 1,
          y: pointerData.y - (cursorData.textContent ? 43 : 3),
          x: pointerData.x - (cursorData.textContent ? 43 : 3),
          height: cursorData.height,
          width: cursorData.width,
        }}
        transition={{
          type: "spring",
          damping: 100,
          stiffness: 900,
        }}
      >
        <AnimatePresence>
          <motion.p
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.2,
            }}
            className={style.cursorText}
            dangerouslySetInnerHTML={{ __html: cursorData.textContent }}
          ></motion.p>
        </AnimatePresence>
      </motion.div>
      {/* <AnimatePresence>
        {projectOpen == "none" && width > 800 && (
          <motion.div
            className={style.cursorPointer}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              top:
                projectHovered === "title"
                  ? projectTitle.current.getBoundingClientRect().top
                  : pointerData.y + (projectHovered !== "none" ? -45 : -3),
              left:
                projectHovered === "title"
                  ? projectTitle.current.getBoundingClientRect().left
                  : pointerData.x + (projectHovered !== "none" ? -45 : -3),
              height:
                projectHovered === "title"
                  ? projectTitle.current.getBoundingClientRect().height
                  : projectHovered !== "none"
                  ? 90
                  : 8,
              width:
                projectHovered === "title"
                  ? projectTitle.current.getBoundingClientRect().width
                  : projectHovered !== "none"
                  ? 90
                  : 8,
            }}
            transition={{
              type: "spring",
              damping: 100, // Ajusta el valor para un movimiento más suave
              stiffness: 900, // Baja la rigidez para suavizar el rebote
            }}
          >
            <AnimatePresence>
              {projectHovered !== "none" && projectHovered !== "title" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.2,
                  }}
                  className={style.cursorText}
                >
                  CLICK TO <br /> SEE MORE
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
};

export default CircleCursor;
