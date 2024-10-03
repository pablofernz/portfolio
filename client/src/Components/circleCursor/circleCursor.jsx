import { useEffect, useState } from "react";
import style from "./circleCursor.module.css";
import { motion } from "framer-motion";
const CircleCursor = () => {
  const [mouseCords, setMouseCords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    setMouseCords({ x, y });
  };
  useEffect(() => {
    // Add the event listener to the document
    document.addEventListener("mousemove", handleMouseMove);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      className={style.circle}
      animate={{ x: mouseCords.x, y: mouseCords.y }}
    />
  );
};

export default CircleCursor;
