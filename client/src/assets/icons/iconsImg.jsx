import style from "./iconsImg.module.css";
import { useEffect, useRef } from "react";
import useViewportWidth from "../../Components/Hooks/useViewportSize";
import { motion } from "framer-motion";
import iconsData from "./iconsData";

const IconComponent = ({ icon, reference }) => {
  const viewportWidth = useViewportWidth();

  const chosedData = iconsData.filter(
    (iconChosed) => iconChosed.name.toLowerCase() == icon.toLowerCase()
  )[0];
  const hasLowBrightness = Math.random() < 0.5;
  return (
    <a
      href={
        icon.toLowerCase() === "github" ? "https://github.com/pablofernz" : null
      }
      target="blank"
    >
      <motion.div
        style={{
          backgroundImage: `url(${chosedData.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: viewportWidth > 600 ? "10svw" : "80px",
          width: viewportWidth > 600 ? "10svw" : "80px",
          borderRadius: viewportWidth > 600 ? "30px" : "20px",
          filter: hasLowBrightness ? "brightness(40%)" : "brightness(100%)",
        }}
        className={style.card}
      ></motion.div>
    </a>
  );
};

export default IconComponent;
