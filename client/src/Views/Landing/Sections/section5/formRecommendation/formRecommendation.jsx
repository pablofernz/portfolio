import style from "./formRecommendation.module.css";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

export const FormRecommendation = ({ onClose }) => {
  const [exit, setExit] = useState(false);
  const [steps, setSteps] = useState(4);

  const [form, setForm] = useState({
    name: "",
    lastname: "",
    comment: "",
    occupation: "",
    placeOfWork: "",
    isFreelancer: false,
    siteLink: "",
    image: "",
    socialMedia: {
      linkedin: "",
      github: "",
      X: "",
      instagram: "",
    },
  });
  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    comment: "",
    image: "",
  });

  // This function detect when "escape" key is pressed and close the modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setExit(true);
        setTimeout(() => {
          onClose();
        }, 500);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // This function take the actual value of the inputs of section1 and save it at the form's local state, then will used to validate, render and send the data.
  const handleChangeSection1 = (event) => {
    if (/\d/.test(event.target.value) === true) {
      setErrors({
        ...errors,
        [event.target.name]: "Can't contain a number",
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

  // this function takes the value of the comment input and saves it in the "comment" property in the form's local state
  const handleChangeSection2 = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  // Still in progress :p
  const handleChangesection4 = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  // Sizes of the card for each step
  const sectionsSizes = {
    1: { width: "550px", height: "270px", position: "0%" },
    2: { width: "520px", height: "350px", position: "-100%" },
    3: { width: "550px", height: "270px", position: "-200%" },
    4: { width: "550px", height: "520px", position: "-300%" },
  };

  const handleButton = () => {
    if (steps == 2 || steps == 1) {
      setSteps(steps >= 1 && steps + 1);
    } else {
      console.log("enviado");
    }
  };
  const handleCheckbox = () => {
    setForm({ ...form, isFreelancer: !form.isFreelancer, siteLink: "" });
  };

  // Handler for the paste text button in "Personal or Company site"
  const [pasted, setPasted] = useState(false);
  const PasteButton = async () => {
    try {
      setForm({ ...form, siteLink: await navigator.clipboard.readText() });
      setPasted(true);
      setTimeout(() => {
        setPasted(false);
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const [sectionOpen, setSectionOpen] = useState(3);
  const handleSectionOpen = (section) => {
    if (sectionOpen == section) {
      setSectionOpen(0);
    } else {
      setSectionOpen(section);
    }
  };

  const [tooltipOpen, setTooltipOpen] = useState(false);

  // Handler for browse image section
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/tiff",
      ];
      if (!validImageTypes.includes(file.type)) {
        setErrors({
          ...errors,
          image: {
            type: {
              message:
                "Please select a valid image file (jpeg, png, webp, tiff)",
            },
          },
        });
        setTimeout(() => {
          setErrors({
            ...errors,
            image: "",
          });
        }, 4000);
        return;
      }

      // Verify size file (<= 10 MB)
      const maxSize = 10 * 1024 * 1024; // 10 MB en bytes
      if (file.size > maxSize) {
        setErrors({
          ...errors,
          image: {
            size: {
              message: "File size should be less than 10MB",
              actualSize: file.size.toString().slice(0, 2),
            },
          },
        });
        setTimeout(() => {
          setErrors({
            ...errors,
            image: "",
          });
        }, 4000);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setForm({ ...form, image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const [socialMediaActive, setSocialMediaActive] = useState("linkedin");
  const handleSocialMedia = (event) => {
    setForm((prevForm) => ({
      ...prevForm,
      socialMedia: {
        ...prevForm.socialMedia,
        [event.target.name]: event.target.value,
      },
    }));
  };
  
  // const [githubUserData, setGithubUserData] = useState("");
  // useEffect(() => {
  //   axios
  //     .get(`https://api.github.com/users/${form.socialMedia.github}`)
  //     .then((response) => {
  //       setGithubUserData(response.data);
  //       setForm({ ...form, image: githubUserData.avatar_url });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, [form.socialMedia.github]);
  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: exit ? 0 : 1 }}
        transition={{ duration: 0.5, delay: exit ? 0 : 0 }}
        className={style.component}
      >
        <motion.div
          initial={{ y: "100vh" }}
          animate={{
            y: exit ? "100vh" : "0vh",
            width: sectionsSizes[steps].width,
            height: sectionsSizes[steps].height,
          }}
          transition={{
            duration: 1.5,
            type: "spring",
            damping: 20,
            stiffness: 100,
          }}
          className={style.card}
        >
          <motion.main
            animate={{ x: sectionsSizes[steps].position }}
            transition={{ duration: 1, type: "spring" }}
            className={style.main}
          >
            {/*--------- Section1 -------- */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: steps == 2 ? 0 : 1 }}
              transition={{ duration: 0.2 }}
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
                    placeholder="Arnold"
                    autoComplete="new-password"
                    spellCheck="disable"
                    onChange={handleChangeSection1}
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
                    placeholder="Schwarzenegger"
                    autoComplete="new-password"
                    spellCheck="disable"
                    onChange={handleChangeSection1}
                    className={errors.lastname ? style.error : style.input}
                  />
                  <label>Lastname</label>
                </div>
              </div>
            </motion.div>

            {/*--------- Section2 -------- */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: steps == 2 ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className={style.section2}
            >
              <header className={style.section2Header}>
                <p>Hi {form.name}!👋🏻</p>
                <h1>What would you like to share?</h1>
              </header>
              <div className={style.section2Main}>
                <div className={style.textAreaContainer}>
                  <textarea
                    className={style.textArea}
                    name="comment"
                    autoComplete="off"
                    value={form.comment}
                    minLength="50"
                    maxLength="150"
                    spellCheck="false"
                    placeholder="Write something cool..."
                    onChange={handleChangeSection2}
                  />
                  {form.comment.length < 50 ? (
                    <p className={style.charCounter}>
                      Enter {50 - form.comment.length} more{" "}
                      {50 - form.comment.length === 1
                        ? "character"
                        : "characters"}
                    </p>
                  ) : (
                    <p
                      className={
                        form.comment.length !== 150
                          ? style.charCounter
                          : style.charCounterMax
                      }
                    >
                      {form.comment.length} / 150
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/*--------- Section3 -------- */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: steps !== 3 ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className={style.section3}
            >
              <header className={style.section3Header}>
                <h1>Before you finish...</h1>
                <p>
                  Do you want to add additional information? It will not be more
                  than 2-3 minutes{" "}
                  <label style={{ color: "rgb(161, 161, 161)" }}>
                    and I would be very grateful :)
                  </label>
                </p>
              </header>

              <div className={style.section3Main}>
                <button
                  className={style.moreInfo}
                  onClick={() => {
                    setSteps(4);
                  }}
                >
                  Yeah, why not?
                </button>

                <button className={style.submit}>No, submit</button>
              </div>
            </motion.div>

            {/*--------- section4 -------- */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: steps == 4 ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className={style.section4}
            >
              <header className={style.section4Header}>
                <h1>
                  Thank you for the{" "}
                  <label style={{ color: "rgb(123, 255, 180)" }}>
                    kindness!
                  </label>
                </h1>
                <p>Just a few more details and we're done (finally)</p>
              </header>
              <div className={style.section4Main}>
                {/*--------------------- Describe your job --------------------- */}
                <AnimatePresence mode="popLayout">
                  {sectionOpen == 3 ? null : (
                    <motion.div
                      layout
                      initial={{ height: "60px", scale: 0.8, opacity: 0 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      animate={{
                        height: sectionOpen == 1 ? "auto" : "60px",
                        scale: 1,
                        opacity: 1,
                      }}
                      transition={{
                        duration: 1,
                        type: "spring",
                        damping: 20,
                        stiffness: 200,
                      }}
                      className={style.test}
                    >
                      <div className={style.row1}>
                        <button
                          className={style.selector}
                          onClick={() => {
                            handleSectionOpen(1);
                          }}
                        >
                          <p className={style.selectorTitle}>
                            <label>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                width="25"
                                height="25"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                                />
                              </svg>
                            </label>
                            <label style={{ cursor: "pointer" }}>
                              Describe your job
                            </label>
                          </p>
                          <p>
                            <svg
                              style={{
                                rotate: sectionOpen == 1 ? "180deg" : "0deg",
                                transition: "all 0.2s ease",
                                marginTop: "5px",
                              }}
                              width="30"
                              height="30"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 9L12 15L18 9"
                                stroke="whitesmoke"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </p>
                        </button>
                        <div className={style.formSpace}>
                          <div className={style.formContainer}>
                            <div className={style.checkboxContainer}>
                              <label>
                                <input
                                  type="checkbox"
                                  onChange={handleCheckbox}
                                  className={style.checkbox}
                                />
                                <span className={style.customCheckbox}></span>
                              </label>
                              <p
                                className={
                                  form.isFreelancer == true
                                    ? style.textChecked
                                    : style.checkboxText
                                }
                              >
                                I'm Freelancer
                              </p>
                            </div>

                            <input
                              type="text"
                              name="occupation"
                              value={form.occupation}
                              placeholder="Job role/position"
                              autoComplete="new-password"
                              spellCheck="disable"
                              onChange={handleChangesection4}
                              className={style.inputOccupation}
                            />
                            <label className={style.occupation}>
                              <p>Occupation</p>

                              <div className={style.tooltip}>
                                <svg
                                  onMouseEnter={() => {
                                    setTooltipOpen(true);
                                  }}
                                  onMouseLeave={() => {
                                    setTooltipOpen(false);
                                  }}
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13M12 17H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                    stroke="rgb(29,29,29)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                {/* occupations examples tooltip */}
                                <AnimatePresence>
                                  {tooltipOpen === true && (
                                    <motion.p
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                      transition={{
                                        type: "spring",
                                        damping: 20,
                                        stiffness: 200,
                                      }}
                                      className={style.tooltipText}
                                    >
                                      Example: Developer, Designer, Student,
                                      Engineer, and a long etc...
                                    </motion.p>
                                  )}
                                </AnimatePresence>
                                {/* ------------------------ */}
                              </div>
                            </label>
                          </div>
                          <div className={style.formContainer}>
                            <label
                              style={{ opacity: 0 }}
                              className={style.checkboxContainer}
                            >
                              <input
                                type="checkbox"
                                className={style.checkbox}
                              />
                              I am Freelancer
                            </label>
                            <input
                              type="text"
                              name="placeOfWork"
                              value={
                                form.isFreelancer == true
                                  ? ""
                                  : form.placeOfWork
                              }
                              disabled={form.isFreelancer === true}
                              placeholder={
                                form.isFreelancer === true
                                  ? ""
                                  : "Example: Meta"
                              }
                              autoComplete="new-password"
                              spellCheck="disable"
                              onChange={handleChangesection4}
                              className={`${style.input} ${
                                form.isFreelancer && style.disabled
                              }`}
                            />
                            <label>Company/organization</label>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/*--------------------- Personal or company site --------------------- */}

                <AnimatePresence mode={"popLayout"}>
                  {sectionOpen == 3 ? null : (
                    <motion.div
                      layout
                      initial={{ height: "60px", scale: 0.8, opacity: 0 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      animate={{
                        height: sectionOpen == 2 ? "auto" : "60px",
                        scale: 1,
                        opacity: 1,
                      }}
                      transition={{
                        duration: 1,
                        type: "spring",
                        damping: 20,
                        stiffness: 200,
                      }}
                      className={style.test}
                    >
                      <div className={style.row1}>
                        <button
                          className={style.selector}
                          onClick={() => {
                            handleSectionOpen(2);
                          }}
                        >
                          <p className={style.selectorTitle}>
                            <label>
                              <svg
                                style={{ marginTop: "5px" }}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                width="25"
                                height="25"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                                />
                              </svg>
                            </label>
                            <label style={{ cursor: "pointer" }}>
                              Personal or company site
                            </label>
                          </p>
                          <p>
                            <svg
                              style={{
                                rotate: sectionOpen == 2 ? "180deg" : "0deg",
                                transition: "all 0.2s ease",
                                marginTop: "5px",
                              }}
                              width="30"
                              height="30"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 9L12 15L18 9"
                                stroke="whitesmoke"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </p>
                        </button>
                        <div className={style.formSpace2}>
                          <div className={style.formContainer2}>
                            <input
                              type="text"
                              name="siteLink"
                              value={form.siteLink}
                              placeholder="www.example.com"
                              autoComplete="new-password"
                              spellCheck="disable"
                              onChange={handleChangesection4}
                              className={style.input}
                            />

                            <label>
                              {form.isFreelancer === true
                                ? " Website/Portfolio"
                                : "Company site"}
                            </label>

                            {/* ----------Paste button-------- */}
                            <button
                              title="Paste from your clipboard"
                              className={style.primaryButton}
                              onClick={PasteButton}
                              disabled={pasted}
                            >
                              <motion.p
                                className={`${style.buttonsSvg} ${
                                  pasted && style.pasted
                                }`}
                              >
                                <motion.svg
                                  style={{ cursor: "pointer" }}
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  width="25"
                                  height="25"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                                  />
                                </motion.svg>

                                <motion.svg
                                  style={{ cursor: "pointer" }}
                                  width="25"
                                  height="25"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M16 4C16.93 4 17.395 4 17.7765 4.10222C18.8117 4.37962 19.6204 5.18827 19.8978 6.22354C20 6.60504 20 7.07003 20 8V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V8C4 7.07003 4 6.60504 4.10222 6.22354C4.37962 5.18827 5.18827 4.37962 6.22354 4.10222C6.60504 4 7.07003 4 8 4M9 15L11 17L15.5 12.5M9.6 6H14.4C14.9601 6 15.2401 6 15.454 5.89101C15.6422 5.79513 15.7951 5.64215 15.891 5.45399C16 5.24008 16 4.96005 16 4.4V3.6C16 3.03995 16 2.75992 15.891 2.54601C15.7951 2.35785 15.6422 2.20487 15.454 2.10899C15.2401 2 14.9601 2 14.4 2H9.6C9.03995 2 8.75992 2 8.54601 2.10899C8.35785 2.20487 8.20487 2.35785 8.10899 2.54601C8 2.75992 8 3.03995 8 3.6V4.4C8 4.96005 8 5.24008 8.10899 5.45399C8.20487 5.64215 8.35785 5.79513 8.54601 5.89101C8.75992 6 9.03995 6 9.6 6Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </motion.svg>
                              </motion.p>
                            </button>
                            {/* -------------------------------- */}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/*---------------------------- Social Media---------------------------- */}
                <AnimatePresence mode={"popLayout"}>
                  <motion.div
                    layout
                    initial={{ height: "60px" }}
                    exit={{ height: "60px" }}
                    animate={{
                      height: sectionOpen == 3 ? "320px" : "60px",
                    }}
                    transition={{
                      duration: 1,
                      type: "spring",
                      damping: 20,
                      stiffness: 200,
                    }}
                    className={style.test}
                  >
                    <div className={style.row1}>
                      <button
                        className={style.selector}
                        onClick={() => {
                          handleSectionOpen(3);
                        }}
                      >
                        <p className={style.selectorTitle}>
                          <label>
                            <svg
                              style={{ marginTop: "5px" }}
                              width="25"
                              height="25"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.7076 18.3639L11.2933 19.7781C9.34072 21.7308 6.1749 21.7308 4.22228 19.7781C2.26966 17.8255 2.26966 14.6597 4.22228 12.7071L5.63649 11.2929M18.3644 12.7071L19.7786 11.2929C21.7312 9.34024 21.7312 6.17441 19.7786 4.22179C17.826 2.26917 14.6602 2.26917 12.7076 4.22179L11.2933 5.636M8.50045 15.4999L15.5005 8.49994"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </label>
                          <label style={{ cursor: "pointer" }}>
                            Your social media
                          </label>
                        </p>
                        <p>
                          <svg
                            style={{
                              rotate: sectionOpen == 3 ? "180deg" : "0deg",
                              transition: "all 0.2s ease",
                              marginTop: "5px",
                            }}
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 9L12 15L18 9"
                              stroke="whitesmoke"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </p>
                      </button>
                      <div className={style.formSpace3}>
                        <header className={style.header}>
                          <div className={style.leftSide}>
                            {/* --------------Linkedin------------- */}
                            <button
                              className={style.socialButtons}
                              onClick={() => {
                                setSocialMediaActive("linkedin");
                              }}
                              style={{
                                opacity:
                                  socialMediaActive == "linkedin" ? 1 : 0.5,
                                filter:
                                  socialMediaActive !== "linkedin"
                                    ? "grayscale(100%)"
                                    : "grayscale(0%)",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="rgb(0, 120, 178)"
                                viewBox="0 0 16 16"
                              >
                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                              </svg>
                            </button>
                            {/* --------------Instagram-------------- */}
                            <button
                              className={style.socialButtons}
                              onClick={() => {
                                setSocialMediaActive("instagram");
                              }}
                              style={{
                                opacity:
                                  socialMediaActive == "instagram" ? 1 : 0.5,
                                filter:
                                  socialMediaActive !== "instagram"
                                    ? "grayscale(100%)"
                                    : "grayscale(0%)",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="rgb(251, 97, 97)"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                              </svg>
                            </button>
                            {/* -------------- X ---------------- */}
                            <button
                              className={style.socialButtons}
                              onClick={() => {
                                setSocialMediaActive("x");
                              }}
                              style={{
                                opacity: socialMediaActive == "x" ? 1 : 0.5,
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="white"
                                viewBox="0 0 16 16"
                              >
                                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                              </svg>
                            </button>
                            {/* ------------- GitHub -------------------- */}
                            <button
                              className={style.socialButtons}
                              style={{
                                opacity:
                                  socialMediaActive == "github" ? 1 : 0.5,
                              }}
                              onClick={() => {
                                setSocialMediaActive("github");
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="white"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                              </svg>
                            </button>
                          </div>
                          <div className={style.rightSide}>
                            <div className={style.formContainer3}>
                              <AnimatePresence mode={"popLayout"}>
                                {socialMediaActive == "linkedin" && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    exit={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                      type: "spring",
                                      damping: 20,
                                      stiffness: 150,
                                    }}
                                  >
                                    <input
                                      type="text"
                                      name="linkedin"
                                      value={form.socialMedia.linkedin}
                                      disabled={form.isFreelancer === true}
                                      placeholder="Username"
                                      autoComplete="new-password"
                                      spellCheck="disable"
                                      onChange={handleSocialMedia}
                                      className={style.input}
                                    />
                                    <label>Linkedin</label>
                                    <p className={style.inputIcon}>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        fill="rgb(0, 120, 178)"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                                      </svg>
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              <AnimatePresence mode={"popLayout"}>
                                {socialMediaActive == "instagram" && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    exit={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                      type: "spring",
                                      damping: 20,
                                      stiffness: 150,
                                    }}
                                  >
                                    <input
                                      type="text"
                                      name="instagram"
                                      value={form.socialMedia.instagram}
                                      disabled={form.isFreelancer === true}
                                      placeholder="Username"
                                      autoComplete="new-password"
                                      spellCheck="disable"
                                      onChange={handleSocialMedia}
                                      className={style.input}
                                    />
                                    <label>Instagram</label>
                                    <p className={style.inputIcon}>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        fill="rgb(251, 97, 97)"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                      </svg>
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              <AnimatePresence mode={"popLayout"}>
                                {socialMediaActive == "x" && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    exit={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                      type: "spring",
                                      damping: 20,
                                      stiffness: 150,
                                    }}
                                  >
                                    <input
                                      type="text"
                                      name="X"
                                      value={form.socialMedia.X}
                                      disabled={form.isFreelancer === true}
                                      placeholder="Username"
                                      autoComplete="new-password"
                                      spellCheck="disable"
                                      onChange={handleSocialMedia}
                                      className={style.input}
                                    />
                                    <label>X (ex Twitter)</label>
                                    <p className={style.inputIcon}>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="white"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                                      </svg>
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              <AnimatePresence mode={"popLayout"}>
                                {socialMediaActive == "github" && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    exit={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                      type: "spring",
                                      damping: 20,
                                      stiffness: 250,
                                    }}
                                  >
                                    <input
                                      type="text"
                                      name="github"
                                      value={form.socialMedia.github}
                                      disabled={form.isFreelancer === true}
                                      placeholder="Username"
                                      autoComplete="new-password"
                                      spellCheck="disable"
                                      onChange={handleSocialMedia}
                                      className={style.input}
                                    />
                                    <label>GitHub</label>
                                    <p className={style.inputIcon}>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        fill="white"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                                      </svg>
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </header>

                        <footer
                          className={`${style.footer} ${
                            errors.image && style.footerError
                          }`}
                        >
                          {/* visible if the file is not a image or the size is > 10mb */}
                          <AnimatePresence mode={"popLayout"}>
                            {errors.image && (
                              <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                exit={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  type: "spring",
                                  damping: 20,
                                  stiffness: 150,
                                }}
                                className={style.errorContainer}
                              >
                                <p className={style.imageError}>
                                  {errors.image.size ? (
                                    <>
                                      {errors.image.size.message}
                                      <br />
                                      <label
                                        style={{
                                          fontSize: "15px",
                                          opacity: 0.5,
                                        }}
                                      >
                                        Actual size:{" "}
                                        {errors.image.size.actualSize} MB
                                      </label>
                                    </>
                                  ) : (
                                    errors.image.type.message
                                  )}
                                </p>

                                <div className={style.progressBarContainer}>
                                  <div className={style.progressBar}></div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* visible when are not a selected image */}
                          <AnimatePresence mode={"popLayout"}>
                            {!form.image && !errors.image && (
                              <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                exit={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  type: "spring",
                                  damping: 20,
                                  stiffness: 150,
                                }}
                                style={{
                                  flexDirection:
                                    !form.image && "column-reverse",
                                }}
                              >
                                <input
                                  style={{
                                    opacity: 0,
                                    cursor: form.image ? "default" : "pointer",
                                  }}
                                  type="file"
                                  id="fileInput"
                                  accept="image/*"
                                  disabled={form.image}
                                  onChange={handleFileChange}
                                  className={style.uploadPhoto}
                                ></input>
                                <p style={{ fontSize: "15px", opacity: 0.5 }}>
                                  Max. file size: 10MB
                                </p>
                                <p>
                                  Click to upload or drag and drop your photo
                                </p>
                                <svg
                                  focusable="false"
                                  aria-hidden="true"
                                  viewBox="0 0 24 24"
                                  fill="rgb(85, 85, 85)"
                                  width="60"
                                  height="60"
                                >
                                  <path d="M21.02 5H19V2.98c0-.54-.44-.98-.98-.98h-.03c-.55 0-.99.44-.99.98V5h-2.01c-.54 0-.98.44-.99.98v.03c0 .55.44.99.99.99H17v2.01c0 .54.44.99.99.98h.03c.54 0 .98-.44.98-.98V7h2.02c.54 0 .98-.44.98-.98v-.04c0-.54-.44-.98-.98-.98M16 9.01V8h-1.01c-.53 0-1.03-.21-1.41-.58-.37-.38-.58-.88-.58-1.44 0-.36.1-.69.27-.98H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8.28c-.3.17-.64.28-1.02.28-1.09-.01-1.98-.9-1.98-1.99M15.96 19H6c-.41 0-.65-.47-.4-.8l1.98-2.63c.21-.28.62-.26.82.02L10 18l2.61-3.48c.2-.26.59-.27.79-.01l2.95 3.68c.26.33.03.81-.39.81"></path>
                                </svg>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* visible when are a selected image */}
                          <AnimatePresence mode={"popLayout"}>
                            {form.image && (
                              <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                exit={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  type: "spring",
                                  damping: 20,
                                  stiffness: 150,
                                }}
                                className={style.photoContainer}
                              >
                                <div className={style.deletePhoto}>
                                  <button
                                    onClick={() => {
                                      setForm({ ...form, image: "" });
                                    }}
                                  >
                                    <svg
                                      width="30px"
                                      height="30px"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </button>
                                </div>
                                <div className={style.photoPreviewContainer}>
                                  <img
                                    src={form.image}
                                    alt="userPhoto"
                                    className={style.userPhoto}
                                  />
                                </div>
                                <div
                                  className={style.editPhoto}
                                  style={{ opacity: 0 }}
                                >
                                  <button>
                                    <svg
                                      width="30px"
                                      height="30px"
                                      viewBox="0 0 24 24"
                                      fill="white"
                                    >
                                      <path d="M17 15h2V7c0-1.1-.9-2-2-2H9v2h8zM7 17V1H5v4H1v2h4v10c0 1.1.9 2 2 2h10v4h2v-4h4v-2z"></path>
                                    </svg>
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </footer>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.main>

          {/*--------- Step Indicator Dots and next/previous buttons -------- */}

          <motion.button
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={style.exitButton}
            onClick={() => {
              setExit(true);
              setTimeout(() => {
                onClose();
              }, 500);
            }}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                strokeWidth="2"
                stroke="rgb(108, 108, 108)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>

          <AnimatePresence>
            <motion.div
              animate={{
                x: steps == 4 ? -18 : 0,
              }}
              transition={{ duration: 0.5 }}
              className={style.dots}
            >
              <div className={steps === 1 ? style.theDot : style.dot}></div>
              <div className={steps === 2 ? style.theDot : style.dot}></div>
              <div className={steps === 3 ? style.theDot : style.dot}></div>
              <AnimatePresence>
                {steps == 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={steps === 4 && style.theDotAdditional}
                  ></motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

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
                  stroke="rgb(108, 108, 108)"
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

          <AnimatePresence>
            {steps !== 1 && form.comment.length < 50 && steps !== 3 && (
              <motion.button
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  width: steps == 4 ? "110px" : "45px",
                  height: steps == 4 ? "40px" : "45px",
                  borderRadius: steps == 4 ? "10px" : "20px",
                }}
                transition={{ duration: 0.3 }}
                className={style.nextButton}
                onClick={handleButton}
              >
                {steps == 2 && (
                  <motion.svg
                    initial={{ opacity: 0, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{ duration: 0.3 }}
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
                  </motion.svg>
                )}
                {steps == 4 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.2,
                      delay: steps == 3 ? 0.3 : 0.5,
                    }}
                    className={style.primaryButtonText}
                  >
                    Submit
                  </motion.p>
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.getElementById("formRecommendationModal")
  );
};
