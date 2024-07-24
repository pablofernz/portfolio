import style from "./formRecommendation.module.css";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const FormRecommendation = ({ onClose }) => {
  const [exit, setExit] = useState(false);
  const [steps, setSteps] = useState(1);

  const [form, setForm] = useState({
    name: "",
    lastname: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
  });

  // This function detect when "escape" key is pressed and close the modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setExit(true);
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleChange = (event) => {
    if (/\d/.test(event.target.value) === true) {
      setErrors({
        ...errors,
        [event.target.name]: "Can't contain a number",
      });
      setForm({
        ...form,
        [event.target.name]: "",
      });
    } else {
      setErrors({
        ...errors,
        [event.target.name]: "",
      });
    }
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    console.log(errors);
  }, [form]);
  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: exit ? 0 : 1 }}
        transition={{ duration: 0.5, delay: exit ? 0 : 0 }}
        className={style.component}
      >
        {/*
         <motion.div
          initial={{ y: "100vh" }}
          animate={{ y: exit ? "100vh" : "0vh" }}
          transition={{ duration: 1.5, delay: exit ? 0 : 0.5, type: "spring" }}
          className={style.card}
        >
          <main className={style.main}>
            <div className={style.row}>
              <div className={style.rowContent}>
                <h1 className={style.text}>Name and Lastname</h1>
                <input
                  type="text"
                  name="nameAndLastname"
                  placeholder="John Doe"
                  autoComplete="false"
                  className={style.input}
                />
              </div>
              <div className={style.email}>
                <h1 className={style.text}>Email</h1>
                <input type="text" name="email" className={style.input} />
              </div>
            </div>

            <div className={style.row}>
              <div className={style.rowContent}>
                <h1 className={style.text}>Ocuppation</h1>
                <input
                  type="text"
                  name="nameAndLastname"
                  placeholder="John Doe"
                  autoComplete="false"
                  className={style.input}
                />
              </div>
              <div className={style.email}>
                <h1 className={style.text}>Email</h1>
                <input type="text" name="email" className={style.input} />
              </div>
            </div>
          </main>
          <div className={style.buttonsContainer}>
            <button
              className={style.secondaryButton}
              onClick={() => {
                setExit(true);
                setTimeout(() => {
                  onClose();
                }, 1500);
              }}
              onKeyDown={(e) => {
                console.log(e.key == "c");
              }}
            >
              Cancel
            </button>

            <button className={style.primaryButton}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.4995 13.5001L20.9995 3.00005M10.6271 13.8281L13.2552 20.5861C13.4867 21.1815 13.6025 21.4791 13.7693 21.566C13.9139 21.6414 14.0862 21.6415 14.2308 21.5663C14.3977 21.4796 14.5139 21.1821 14.7461 20.587L21.3364 3.69925C21.5461 3.16207 21.6509 2.89348 21.5935 2.72185C21.5437 2.5728 21.4268 2.45583 21.2777 2.40604C21.1061 2.34871 20.8375 2.45352 20.3003 2.66315L3.41258 9.25349C2.8175 9.48572 2.51997 9.60183 2.43326 9.76873C2.35809 9.91342 2.35819 10.0857 2.43353 10.2303C2.52043 10.3971 2.81811 10.5128 3.41345 10.7444L10.1715 13.3725C10.2923 13.4195 10.3527 13.443 10.4036 13.4793C10.4487 13.5114 10.4881 13.5509 10.5203 13.596C10.5566 13.6468 10.5801 13.7073 10.6271 13.8281Z"
                  stroke="black"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p style={{ margin: "0", padding: "0" }}>Publish comment</p>
            </button>
          </div>
        </motion.div> */}

        <motion.div
          initial={{ y: "100vh" }}
          animate={{
            y: exit ? "100vh" : "0vh",
            width: steps == 1 ? "500px" : "500px",
            height: steps == 1 ? "250px" : "350px",
          }}
          transition={{
            duration: 1.5,
            // delay: exit ? 0 : 0,
            type: "spring",
            damping: 20,
            stiffness: 100,
          }}
          className={style.card}
        >
          <motion.main
            animate={{ x: steps == 1 ? "0%" : steps == 2 ? "-100%" : "0%" }}
            transition={{ duration: 1, type: "spring" }}
            className={style.main}
          >
            <AnimatePresence>
              {steps == 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className={style.section1}
                >
                  <header className={style.section1Header}>
                    <p>First of all</p>
                    <h1>What's your name?</h1>
                  </header>

                  <div className={style.section1Main}>
                    <div className={style.formContainer}>
                      <AnimatePresence>
                        {errors.name && (
                          <motion.label
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: 0.2,
                            }}
                            className={style.errorText}
                          >
                            {errors.name}
                          </motion.label>
                        )}
                      </AnimatePresence>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        placeholder="John"
                        autoComplete="new-password"
                        spellCheck="disable"
                        onChange={handleChange}
                        className={errors.name ? style.error : style.input}
                      />
                      <label>Name</label>
                    </div>

                    <div className={style.formContainer}>
                      <AnimatePresence>
                        {errors.lastname && (
                          <motion.label
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: 0.2,
                            }}
                            className={style.errorText}
                          >
                            {errors.lastname}
                          </motion.label>
                        )}
                      </AnimatePresence>
                      <input
                        type="text"
                        name="lastname"
                        value={form.lastname}
                        placeholder="Doe"
                        autoComplete="disable"
                        onChange={handleChange}
                        className={errors.lastname ? style.error : style.input}
                      />
                      <label>Lastname</label>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className={style.section2}></div>
          </motion.main>
          <AnimatePresence>
            {steps !== 1 && (
              <motion.button
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={style.previousButton}
                onClick={() => {
                  setSteps(steps >= 1 && steps - 1);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="white"
                  width="25"
                  height="25"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!errors.name &&
              !errors.lastname &&
              form.name &&
              form.lastname &&
              steps == 1 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={style.nextButton}
                  onClick={() => {
                    setSteps(steps >= 1 && steps + 1);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="black"
                    width="25"
                    height="25"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </motion.button>
              )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.getElementById("formRecommendationModal")
  );
};
