import style from "./iconsImg.module.css";
import { useEffect, useRef } from "react";
import useViewportWidth from "../../Components/Hooks/useViewportSize";
import { motion } from "framer-motion";
import iconsData from "./iconsData";

const IconComponent = ({ icon, reference }) => {
  const width = useViewportWidth();

  const chosedData = iconsData.filter(
    (iconChosed) => iconChosed.name == icon
  )[0];

  const ref = useRef(reference);
  return (
    <div>
      <motion.div
        dragConstraints={ref}
        ref={ref}
        drag
        style={{
          backgroundImage: `url(${chosedData.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height:
            chosedData.size == "large"
              ? "70px"
              : chosedData.size == "medium"
              ? "50px"
              : chosedData.size == "small" && "40px",
          width:
            chosedData.size == "large"
              ? "70px"
              : chosedData.size == "medium"
              ? "50px"
              : chosedData.size == "small" && "40px",

          borderRadius:
            chosedData.size == "large"
              ? "20px"
              : chosedData.size == "medium"
              ? "15px"
              : chosedData.size == "small" && "15px",

          cursor: "grab",
        }}
      >
        {" "}
      </motion.div>
    </div>
  );
};

export default { IconComponent };
