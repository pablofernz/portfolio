import style from "./formRecommendation.module.css";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const FormRecommendation = ({ onClose }) => {
  const [exit, setExit] = useState(false);

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: exit ? 0 : 1 }}
        transition={{ duration: 0.5, delay: exit ? 0.5 : 0 }}
        className={style.component}
      >
        <motion.div
          initial={{ y: "100vh" }}
          animate={{ y: exit ? "100vh" : "0vh" }}
          transition={{ duration: 1.5, delay: exit ? 0 : 0.5, type: "spring" }}
          className={style.card}
        >
          <img
            className={style.meme}
            src="https://www.pintzap.com/storage/img/memegenerator/memes/t/500/7JXFpHsl.webp"
            alt=""
          />{" "}
          <button
            className={style.closeModalButton}
            onClick={() => {
              setExit(true);
              setTimeout(() => {
                onClose();
              }, 1500);
            }}
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.getElementById("formRecommendationModal")
  );
};
