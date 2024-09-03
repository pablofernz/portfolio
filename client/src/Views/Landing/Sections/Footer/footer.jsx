import { useEffect, useState } from "react";
import style from "./footer.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import axios from "axios";
import Spline from "@splinetool/react-spline";
import useViewportWidth from "../../../../Components/Hooks/useViewportSize";
const Footer = () => {
  const viewportWidth = useViewportWidth();
  const [isAvailable, setIsAvailable] = useState(true);
  const [email, setEmail] = useState({ email: "" });
  const [errors, setErrors] = useState({ email: "" });
  const [emailStatus, setEmailStatus] = useState("not send");

  const handleEmail = (event) => {
    if (errors.email) setErrors({ email: "" });
    setEmail({ email: event.target.value });
  };

  const handleSubmit = async () => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.email)) {
      setErrors({ email: "Enter a valid email" });
      return;
    }
    setEmailStatus("sending");
    await axios
      .post(
        "https://portfolio-back-production-9a9d.up.railway.app/data/send/email",
        // "https://portfolio-back-production-9a9d.up.railway.app/data/send/email",
        email
      )
      .then(
        () => setEmailStatus("sent"),
        setTimeout(() => {
          setEmail({ email: "" });
          setEmailStatus("not send");
        }, 5000)
      )
      .catch((error) => setEmailStatus("error"));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && email.email.length > 0) {
        handleSubmit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [email]);
  return (
    <footer className={style.footerComponent}>
      <div className={style.test}>
        <div className={style.leftSide}>
          <div className={style.socialMediaContainer}>
            <header>
              <h1>My social media</h1>
            </header>
            <main>
              <a
                href="https://www.linkedin.com/in/pablo-fz1/"
                style={{ color: "rgb(0, 148, 255)" }}
                target="_blank"
              >
                Linkedin
              </a>
              <a href="https://www.github.com/pablofernz" target="_blank">
                Github
              </a>
              <a
                href="https://es.fiverr.com/pablofz1"
                target="_blank"
                style={{ color: "seagreen" }}
              >
                Fiver
              </a>
              <a
                href="https://dribbble.com/pablofz"
                target="_blank"
                style={{ color: "rgb(253, 89, 163)" }}
              >
                Dribbble
              </a>

              <a
                href="https://wa.link/u5ibwj"
                target="_blank"
                style={{ color: "seagreen" }}
              >
                WhatsApp
              </a>
            </main>
          </div>
        </div>

        <div className={style.centerSide}>
          <AnimatePresence mode="popLayout">
            {emailStatus == "not send" && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 200,
                }}
                className={style.centerContainer}
              >
                <AnimatePresence>
                  {errors.email ? (
                    <motion.p
                      key="errorsEmail"
                      initial={{ opacity: 0, scale: 0 }}
                      exit={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        damping: 15,
                        stiffness: 200,
                      }}
                      className={style.emailErrors}
                    >
                      {errors.email}
                    </motion.p>
                  ) : (
                    <motion.p
                      key="readyForWork"
                      initial={{ opacity: 0, scale: 0 }}
                      exit={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        damping: 15,
                        stiffness: 200,
                      }}
                      className={style.statusCard}
                    >
                      Ready for work
                    </motion.p>
                  )}
                </AnimatePresence>
                <div className={style.textContainer2}>
                  <h1>Let's Connect!</h1>
                  <h2>Drop your email, and I'll reach out to you soon.</h2>
                </div>
                <div className={style.inputContainer}>
                  <motion.input
                    transition={{
                      type: "spring",
                      damping: 15,
                      stiffness: 200,
                    }}
                    type="text"
                    name="email"
                    placeholder="example@gmail.com"
                    value={email.email}
                    onChange={handleEmail}
                    layout
                    className={errors.email ? style.error : style.input}
                  />
                  <AnimatePresence mode="popLayout">
                    {email.email.length > 0 && (
                      <motion.button
                        layout
                        key="button"
                        initial={{ opacity: 0, scale: 0 }}
                        exit={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          type: "spring",
                          damping: 15,
                          stiffness: 200,
                        }}
                        onClick={handleSubmit}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          height="22"
                          width="22"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                          />
                        </svg>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence mode="popLayout">
            {emailStatus == "sending" && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 200,
                }}
              >
                <l-square
                  size="50"
                  stroke="5"
                  stroke-length="0.25"
                  bg-opacity="0.04"
                  speed="1.2"
                  color="rgb(197, 197, 197)"
                ></l-square>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence mode="popLayout">
            {emailStatus == "sent" && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 200,
                }}
                className={style.sentCenterContainer}
              >
                <picture className={style.pictureContainer}>
                  <img
                    className={style.sent}
                    src="https://res.cloudinary.com/dnrprmypf/image/upload/v1725142696/New_message-bro_o31rzc.png"
                    alt="sentImage"
                  />
                </picture>
                <p className={style.sentText}>
                  "I’ll be reaching out to you soon!"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={style.rightSide}>
          {viewportWidth > 800 ? (
            <Spline
              scene="https://prod.spline.design/fhj7cJ9IWLoGvFYy/scene.splinecode"
              onLoad={(spline) => {
                spline.scene.controls.enableZoom = false; // Desactivar zoom
                spline.scene.controls.enablePan = false; // Desactivar arrastre
              }}
            />
          ) : (
            <img
              src="https://res.cloudinary.com/dnrprmypf/image/upload/v1718494423/logo_white_juquqf.png"
              alt="portfolioLogo"
              className={style.logo}
            />
          )}
        </div>
      </div>
      <div className={style.bottom}>
        <p>
          Made with 💓 and{" "}
          <label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 1052 1052"
              style={{ borderRadius: "2px" }}
            >
              <path fill="#f0db4f" d="M0 0h1052v1052H0z" />
              <path
                d="M965.9 801.1c-7.7-48-39-88.3-131.7-125.9-32.2-14.8-68.1-25.399-78.8-49.8-3.8-14.2-4.3-22.2-1.9-30.8 6.9-27.9 40.2-36.6 66.6-28.6 17 5.7 33.1 18.801 42.8 39.7 45.4-29.399 45.3-29.2 77-49.399-11.6-18-17.8-26.301-25.4-34-27.3-30.5-64.5-46.2-124-45-10.3 1.3-20.699 2.699-31 4-29.699 7.5-58 23.1-74.6 44-49.8 56.5-35.6 155.399 25 196.1 59.7 44.8 147.4 55 158.6 96.9 10.9 51.3-37.699 67.899-86 62-35.6-7.4-55.399-25.5-76.8-58.4-39.399 22.8-39.399 22.8-79.899 46.1 9.6 21 19.699 30.5 35.8 48.7 76.2 77.3 266.899 73.5 301.1-43.5 1.399-4.001 10.6-30.801 3.199-72.101zm-394-317.6h-98.4c0 85-.399 169.4-.399 254.4 0 54.1 2.8 103.7-6 118.9-14.4 29.899-51.7 26.2-68.7 20.399-17.3-8.5-26.1-20.6-36.3-37.699-2.8-4.9-4.9-8.7-5.601-9-26.699 16.3-53.3 32.699-80 49 13.301 27.3 32.9 51 58 66.399 37.5 22.5 87.9 29.4 140.601 17.3 34.3-10 63.899-30.699 79.399-62.199 22.4-41.3 17.6-91.3 17.4-146.6.5-90.2 0-180.4 0-270.9z"
                fill="#323330"
              />
            </svg>
          </label>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
