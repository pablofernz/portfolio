import { useEffect, useState } from "react";
import style from "./section4.module.css";
import gsap from "gsap";
import { motion } from "framer-motion";
import useViewportWidth from "../../../../Components/Hooks/useViewportSize";

const Section4 = () => {
  const [mouseCords, setMouseCords] = useState({ x: 0, y: 0 });
  const width = useViewportWidth();

  const handleMouseMove = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    setMouseCords({ x, y });
  };

  return (
    <section className={style.section4} onMouseMove={handleMouseMove}>
      <div className={style.callToAction}>
        <motion.div className={style.mouse} />
        <div className={style.textContainer}>
          <h1 className={style.text1}>Ready to start your project?</h1>
          <h2 className={style.text2}>
            Let's work together to bring it to life!
          </h2>
        </div>

        <div className={style.buttonsContainer}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={style.emailButton}
          >
            <p className={style.emailButtonText}>Send a email</p>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={style.sendMessageButton}
          >
            <p className={style.buttonIcon}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.4995 13.5001L20.9995 3.00005M10.6271 13.8281L13.2552 20.5861C13.4867 21.1815 13.6025 21.4791 13.7693 21.566C13.9139 21.6414 14.0862 21.6415 14.2308 21.5663C14.3977 21.4796 14.5139 21.1821 14.7461 20.587L21.3364 3.69925C21.5461 3.16207 21.6509 2.89348 21.5935 2.72185C21.5437 2.5728 21.4268 2.45583 21.2777 2.40604C21.1061 2.34871 20.8375 2.45352 20.3003 2.66315L3.41258 9.25349C2.8175 9.48572 2.51997 9.60183 2.43326 9.76873C2.35809 9.91342 2.35819 10.0857 2.43353 10.2303C2.52043 10.3971 2.81811 10.5128 3.41345 10.7444L10.1715 13.3725C10.2923 13.4195 10.3527 13.443 10.4036 13.4793C10.4487 13.5114 10.4881 13.5509 10.5203 13.596C10.5566 13.6468 10.5801 13.7073 10.6271 13.8281Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
            <p className={style.buttonText}>Send a message</p>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Section4;
