import { useEffect, useRef, useState } from "react";
import style from "./section4.module.css";
import { AnimatePresence, motion } from "framer-motion";
import useViewportWidth from "../../../../Components/Hooks/useViewportSize";
import { useDispatch } from "react-redux";
import {
  backgroundModalNeeded,
  openCloseModals,
  updateCursorOptions,
} from "../../../../Redux/actions";
import ReactDOM from "react-dom";
import { Projects } from "./projects";
import axios from "axios";
import useOutsideClick from "../../../../Components/Hooks/clickOutside";
import { Opulento } from "uvcanvas";

// --------------- Project Modal Component -------------------
const ProjectModal = ({ setProjectOpen, projectOpen }) => {
  const modal = useRef(null);
  const bigImage = useRef(null);
  const width = useViewportWidth();

  const project = Projects.find(
    (project) => project.name.toLowerCase() === projectOpen.toLowerCase()
  );

  const userData = JSON.parse(localStorage.getItem("user_data"));
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !imageOpen) setProjectOpen("none");
      if (event.key === "Escape") setImageOpen(null);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const [projectStages, setProjectStages] = useState("description");
  const [imageLookingAt, setImageLookingAt] = useState(0);
  const [imageHovering, setImageHovering] = useState(false);
  const [imageOpen, setImageOpen] = useState(null);

  const [projectLiked, setProjectLiked] = useState(
    userData && userData.projects.length !== 0
      ? userData.projects[projectOpen.toLowerCase()]?.liked
      : false
  );
  const [projectLikesCounter, setProjectLikesCounter] = useState();
  const [projectViewsCounter, setProjectViewsCounter] = useState();
  const [viewsTooltip, setViewsTooltip] = useState(false);
  const [likesTooltip, setLikesTooltip] = useState(false);

  // Logic for the pointer circles
  const [arrowPointerVisible, setArrowPointerVisible] = useState(false);
  const [pointerData, setPointerData] = useState({ x: "", y: "" });
  const handleMouseMove = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    setPointerData({ x, y });
  };

  // Logic to increase or decrase likes counter on the project schema in mongoDB
  const projectLikeHandler = () => {
    setProjectLiked((prev) => !prev); // Inviertes el valor actual
    setProjectLikesCounter((prev) => (projectLiked ? prev - 1 : prev + 1));
    axios.post(
      `https://portfolio-backend-8kqa.onrender.com/metrics/projects/${projectOpen}/likes?set=${!projectLiked}`
    );
  };

  // Logic to set the "liked" property in localStorage to true or false when the button is clicked
  useEffect(() => {
    userData.projects = {
      [projectOpen.toLowerCase()]: { viewed: true, liked: projectLiked },
    };
    localStorage.setItem("user_data", JSON.stringify(userData));
  }, [projectLiked]);

  // Logic to create userData in localStorage if isn't already created, update the pageViews and get the likes of the project
  const fetchLikesAndUpdateStorage = async () => {
    if (!userData || !userData.projects) {
      const updatedData = {
        ...userData,
        projects: {
          [projectOpen.toLowerCase()]: { viewed: true, liked: false },
        },
      };

      localStorage.setItem("user_data", JSON.stringify(updatedData));
    }

    try {
      const response = await axios.get(
        `https://portfolio-backend-8kqa.onrender.com/metrics/projects/${projectOpen}/getlikes`
      );
      setProjectLikesCounter(response.data);

      // this post update the views of the proyect everytime is open
      const views = await axios.post(
        `https://portfolio-backend-8kqa.onrender.com/metrics/projects/${projectOpen}/views`
      );

      setProjectViewsCounter(
        views.data.projects.find(
          (p) => p.name.toLowerCase() == project.name.toLowerCase()
        ).views
      );
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  useEffect(() => {
    fetchLikesAndUpdateStorage();
  }, [projectOpen]);

  useOutsideClick(
    modal,
    () => projectOpen !== "none" && !imageOpen && setProjectOpen("none")
  );

  // Variant for useOutsideClick hook but for the image component, because doesn't work with the original hook
  useEffect(() => {
    if (!imageOpen) return;

    const timeout = setTimeout(() => {
      const handleClickOutside = (event) => {
        if (bigImage.current && !bigImage.current.contains(event.target)) {
          setImageOpen(null);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, 50);

    return () => clearTimeout(timeout);
  }, [imageOpen, bigImage]);

  return ReactDOM.createPortal(
    <motion.div
      initial={{ scale: 0, opacity: 0, y: "50vh" }}
      exit={{ scale: 0, opacity: 0, y: "50vh" }}
      animate={{
        scale: 1,
        opacity: 1,
        y: "0vh",
      }}
      transition={{
        type: "spring",
        damping: 15,
        stiffness: 70,
      }}
      className={style.backgroundModal}
    >
      {width > 900 && (
        <p className={style.exitp}>
          Press
          <button onClick={() => setProjectOpen("none")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M1 7h6v2H3v2h4v2H3v2h4v2H1zm10 0h4v2h-4v2h2a2 2 0 0 1 2 2v2c0 1.11-.89 2-2 2H9v-2h4v-2h-2a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2m8 0h2a2 2 0 0 1 2 2v1h-2V9h-2v6h2v-1h2v1c0 1.11-.89 2-2 2h-2a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2"
              />
            </svg>
          </button>
          key to exit
        </p>
      )}
      {/* ---------------Open image modal--------------- */}
      <AnimatePresence>
        {imageOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={style.projectImageModal}
          >
            {width > 900 && (
              <p className={style.exitp}>
                Press
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M1 7h6v2H3v2h4v2H3v2h4v2H1zm10 0h4v2h-4v2h2a2 2 0 0 1 2 2v2c0 1.11-.89 2-2 2H9v-2h4v-2h-2a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2m8 0h2a2 2 0 0 1 2 2v1h-2V9h-2v6h2v-1h2v1c0 1.11-.89 2-2 2h-2a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2"
                    />
                  </svg>
                </button>
                key to close
              </p>
            )}
            <header>
              <p>{imageOpen.name ? imageOpen.name : "Loading..."}</p>
            </header>
            <div>
              <motion.img
                initial={{ opacity: 0, scale: 0.5 }}
                exit={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                layoutId="imageOpen"
                src={imageOpen.imageFullSize}
                alt="projectImage"
                className={style.bigImage}
                ref={bigImage}
              />
              {width < 900 && (
                <p className={style.exitphoto}>
                  Touch outside of the image to close.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ----------------------------------------------------- */}

      <motion.div
        className={style.projectModalContainer}
        initial={{ backgroundPositionX: "0px" }}
        animate={{
          backgroundPositionX:
            projectStages == "screenshots"
              ? "-300px"
              : projectStages == "techStack"
              ? "-600px"
              : "-0px",
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 70,
        }}
        ref={modal}
        onMouseMove={handleMouseMove}
      >
        <div className={style.content}>
          {width < 900 && (
            <button
              className={style.exitButton}
              onClick={() => setProjectOpen("none")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                height="30"
                width="30"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {width < 900 && (
            <button
              className={style.likeButtonPhone}
              onClick={projectLikeHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={projectLiked === true ? "red" : "rgb(210,210,210)"}
                height="30"
                width="30"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </button>
          )}

          {/* -------------------- HEADER -------------------------- */}
          <header>
            <p style={{ fontFamily: project.style.fontFamily }}>
              {project.name}
            </p>

            <div>
              {projectViewsCounter && (
                <motion.a
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={style.likesContainer}
                  onMouseEnter={() => setViewsTooltip(true)}
                  onMouseLeave={() => setViewsTooltip(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgb(160,160,160)"
                    height="20"
                    width="20"
                  >
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path
                      fillRule="evenodd"
                      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <p className={style.likeCounter}>{projectViewsCounter}</p>
                  <AnimatePresence>
                    {viewsTooltip && (
                      <motion.p
                        initial={{ opacity: 0, y: 50, scale: 0 }}
                        exit={{ opacity: 0, y: 50, scale: 0 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          type: "spring",
                          damping: 15,
                          stiffness: 150,
                        }}
                        className={style.tooltip}
                      >
                        People who viewed this project
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.a>
              )}

              {projectLikesCounter && width > 600 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ cursor: "pointer" }}
                  onClick={projectLikeHandler}
                  onMouseEnter={() => setLikesTooltip(true)}
                  onMouseLeave={() => setLikesTooltip(false)}
                  className={style.likesContainer}
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={projectLiked === true ? "red" : "rgb(150,150,150)"}
                      height="20"
                      width="20"
                    >
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                  </div>
                  <p className={style.likeCounter}>{projectLikesCounter}</p>
                  <AnimatePresence>
                    {likesTooltip && width > 800 && (
                      <motion.p
                        initial={{ opacity: 0, y: 50, scale: 0 }}
                        exit={{ opacity: 0, y: 50, scale: 0 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          type: "spring",
                          damping: 15,
                          stiffness: 150,
                        }}
                        className={style.tooltip}
                      >
                        Cool people who liked this project
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.button>
              )}

              <a
                href={project.links.github}
                target="blank"
                className={style.githubButton}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="white"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>
                {width > 500 && <p>GITHUB REPOSITORY</p>}
              </a>
              <div style={project.type.style}>
                {project.type.icon()}
                <p> {project.type.en.toUpperCase()}</p>
              </div>
            </div>
          </header>
          {/* --------------------------------------------------------- */}

          <main>
            <motion.div className={style.visible}>
              <motion.div
                initial={{ x: "0%" }}
                animate={{
                  x:
                    projectStages == "screenshots"
                      ? "-33.3%"
                      : projectStages == "techStack"
                      ? "-66.66%"
                      : "0%",
                }}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 70,
                }}
                className={style.sectionContainer}
              >
                {/* --------------- DESCRIPTION SECTION --------------------- */}
                <section className={style.descriptionSection}>
                  {width > 600 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      exit={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: arrowPointerVisible == true ? 1 : 0,
                        scale: arrowPointerVisible == true ? 1 : 0,
                        top: pointerData.y - 130,
                        left: pointerData.x - 224,
                      }}
                      transition={{
                        type: "spring",
                        damping: 100, // Ajusta el valor para un movimiento más suave
                        stiffness: 2000, // Baja la rigidez para suavizar el rebote
                      }}
                      className={style.siteIcon}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                        stroke="black"
                        height="20"
                        width="20"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </motion.div>
                  )}
                  <div className={style.bentoGrid}>
                    <div
                      className={style.one}
                      style={{
                        flexDirection:
                          width > 600 && project.style.gridReverse
                            ? "column-reverse"
                            : width > 600
                            ? "column"
                            : project.style.gridReverse
                            ? "row-reverse"
                            : "row",
                      }}
                    >
                      <div
                        className={style.oneUpper}
                        style={{
                          backgroundColor: project.style.primaryColorDark,
                        }}
                      >
                        <div className={style.oneUpperAux}>
                          <motion.div
                            className={style.screen}
                            style={{
                              backgroundColor: project.style.primaryColor,
                            }}
                          >
                            {width > 600 && (
                              <img
                                className={style.logo}
                                src="https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:low/v1718250070/Logo-portfolio_jxapuu.webp"
                                alt="logoPortfolio"
                              />
                            )}
                            <p>FUN FACT</p>
                            {width > 600 && (
                              <div className={style.hoverTextContainer}>
                                <p
                                  className={style.hoverText}
                                  style={{
                                    color: project.style.primaryColorLight,
                                  }}
                                >
                                  HOVER HOVER HOVER HOVER
                                </p>
                              </div>
                            )}
                          </motion.div>
                          <motion.div
                            className={style.screenText}
                            style={{
                              color: project.style.primaryColor,
                              backgroundColor: project.style.primaryColorDark,
                            }}
                          >
                            <p>{project.funFacts[0].toUpperCase()}</p>
                          </motion.div>
                        </div>
                      </div>
                      <div
                        className={style.oneBottom}
                        style={{
                          backgroundImage: `url(${project.style.gridBackground})`,
                        }}
                      ></div>
                    </div>
                    <div className={style.two}>
                      {width > 600 && (
                        <div className={style.twoUpper}>
                          <div
                            className={style.uvCanvasContainer}
                            style={{ filter: "brightness(35%)" }}
                          >
                            <Opulento />
                          </div>
                        </div>
                      )}
                      <div className={style.twoCenter}>
                        <div
                          className={style.circleBlurred}
                          style={{
                            backgroundColor: project.style.primaryColor,
                          }}
                        ></div>
                        <div
                          className={style.circleBlurred2}
                          style={{
                            backgroundColor: project.style.primaryColor,
                          }}
                        ></div>
                        <article>
                          <h1>
                            A WEBSITE{" "}
                            <label
                              style={{
                                fontSize: "15px",
                                color: project.style.primaryColor,
                              }}
                            >
                              CONCEPT
                            </label>{" "}
                            {width > 600 || (width < 400 && <br />)} FOR A
                            ECO-FRIENDLY RESTAURANT
                          </h1>
                          <p>
                            Designed with a focus on user experience, featuring
                            database management and an intuitive interface.
                          </p>
                          <p>
                            Fully designed and developed to showcasing <br />{" "}
                            Front-End and Back-End skills.
                          </p>
                        </article>
                      </div>
                      {width > 600 && (
                        <div className={style.twoBottom}>
                          <div
                            className={style.uvCanvasContainer}
                            style={{ filter: "brightness(35%)" }}
                          >
                            <Opulento />
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      className={style.third}
                      style={{
                        flexDirection:
                          width > 600 && project.style.gridReverse
                            ? "column-reverse"
                            : width > 600
                            ? "column"
                            : project.style.gridReverse
                            ? "row-reverse"
                            : "row",
                      }}
                    >
                      <div className={style.thirdUpper}>
                        <picture>
                          <img
                            src="https://res.cloudinary.com/dnrprmypf/image/upload/v1718654550/logo_Indico_white_vmxbxp.png"
                            alt=""
                          />
                        </picture>
                        <p style={{ top: "0", left: "0" }}>
                          {project.name.toUpperCase()}{" "}
                          <sup style={{ fontSize: "6px" }}>TM</sup>
                        </p>
                        <p style={{ bottom: "0", right: "0" }}>2024</p>

                        <svg
                          style={{
                            bottom: "0",
                            left: "0",
                            position: "absolute",
                            margin: "10px",
                          }}
                          className={style.svgFooter}
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill={project.style.primaryColor}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2L14.012 7.23109C14.294 7.96432 14.435 8.33093 14.6542 8.63931C14.8486 8.91262 15.0874 9.15141 15.3607 9.34575C15.6691 9.56503 16.0357 9.70603 16.7689 9.98804L22 12L16.7689 14.012C16.0357 14.294 15.6691 14.435 15.3607 14.6542C15.0874 14.8486 14.8486 15.0874 14.6542 15.3607C14.435 15.6691 14.294 16.0357 14.012 16.7689L12 22L9.98804 16.7689C9.70603 16.0357 9.56503 15.6691 9.34575 15.3607C9.15141 15.0874 8.91262 14.8486 8.63931 14.6542C8.33093 14.435 7.96432 14.294 7.23109 14.012L2 12L7.23108 9.98804C7.96431 9.70603 8.33093 9.56503 8.63931 9.34575C8.91262 9.15141 9.15141 8.91262 9.34575 8.63931C9.56503 8.33093 9.70603 7.96431 9.98804 7.23108L12 2Z"
                            stroke={project.style.primaryColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <svg
                          style={{
                            top: "0",
                            right: "0",
                            position: "absolute",
                            margin: "10px",
                          }}
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill={project.style.primaryColor}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2V22M19.0711 4.92893L4.92893 19.0711M22 12H2M19.0711 19.0711L4.92893 4.92893"
                            stroke={project.style.primaryColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <a
                        href={project.links.website}
                        target="blank"
                        className={style.thirdBottom}
                        style={{ backgroundColor: project.style.primaryColor }}
                        onMouseEnter={() => {
                          setArrowPointerVisible(true);
                        }}
                        onMouseLeave={() => {
                          setArrowPointerVisible(false);
                        }}
                      >
                        {width > 600 ? (
                          <motion.div className={style.siteTextContainer}>
                            <p> WEBSITE</p>
                            <p> WEBSITE</p>
                            <p> WEBSITE</p>
                            <p> WEBSITE</p>
                            <p> WEBSITE</p>
                            <p> WEBSITE</p>
                            <p> WEBSITE</p>
                            <p> WEBSITE</p>
                          </motion.div>
                        ) : (
                          <motion.div className={style.siteTextContainerSmall}>
                            <p>WEB SITE</p>
                            <motion.div className={style.siteIconSmall}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="3"
                                stroke="black"
                                height="15"
                                width="15"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                                />
                              </svg>
                            </motion.div>
                          </motion.div>
                        )}
                        {width > 600 && (
                          <div className={style.logoContainer}>
                            <img
                              style={{
                                filter: "invert()",
                                height: "20px",
                                width: "20px",
                              }}
                              src="https://res.cloudinary.com/dnrprmypf/image/upload/v1718250070/Logo-portfolio_jxapuu.png"
                              alt="logoPortfolio"
                            />
                          </div>
                        )}
                      </a>
                    </div>
                  </div>
                </section>

                {/* --------------- screenshots SECTION --------------------- */}

                <section className={style.screenshotsSection}>
                  {/* ------------- screenshots CURSOR POINTER -------------*/}
                  <AnimatePresence>
                    {width > 600 && (
                      <motion.div
                        className={style.cursorPointer}
                        initial={{ opacity: 0, scale: 0 }}
                        exit={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: imageHovering == true ? 1 : 0,
                          scale: imageHovering == true ? 1 : 0,
                          top: pointerData.y - 155,
                          left: pointerData.x - 250,
                          height: 90,
                          width: 90,
                        }}
                        style={{ zIndex: "20" }}
                        transition={{
                          type: "spring",
                          damping: 100, // Ajusta el valor para un movimiento más suave
                          stiffness: 2000, // Baja la rigidez para suavizar el rebote
                        }}
                      >
                        <p
                          style={{ fontSize: "12px" }}
                          className={style.cursorText}
                        >
                          CLICK TO <br />
                          FULL IMAGE
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className={style.imageContainerAux}>
                    <header className={style.imagesContainer}>
                      <div className={style.imgContainer}>
                        <picture>
                          {project.images.map((projectImage, index) => (
                            <motion.img
                              animate={{
                                x: `-${130 * imageLookingAt}%`,
                                scale: index === imageLookingAt ? 1 : 0.5,
                              }}
                              key={index}
                              transition={{
                                type: "spring",
                                damping: 15,
                                stiffness: 70,
                              }}
                              src={projectImage?.mockup}
                              alt="projectImage"
                              loading="lazy"
                              onClick={() => {
                                setImageOpen(projectImage);
                              }}
                              onMouseEnter={() => setImageHovering(true)}
                              onMouseLeave={() => setImageHovering(false)}
                            />
                          ))}
                        </picture>
                        <AnimatePresence>
                          {width > 600 &&
                            imageLookingAt !== project.images.length - 1 && (
                              <motion.button
                                initial={{ opacity: 0, scale: 0 }}
                                exit={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={style.nextButton}
                                onClick={() =>
                                  setImageLookingAt(imageLookingAt + 1)
                                }
                              >
                                <svg
                                  style={{ marginLeft: "2px" }}
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2"
                                  stroke="currentColor"
                                  width="30"
                                  height="30"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                  />
                                </svg>
                              </motion.button>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                          {width > 600 && imageLookingAt !== 0 && (
                            <motion.button
                              initial={{ opacity: 0, scale: 0 }}
                              exit={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              onClick={() =>
                                setImageLookingAt(imageLookingAt - 1)
                              }
                              className={style.previousButton}
                            >
                              <svg
                                style={{ marginLeft: "-2px", rotate: "180deg" }}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="3"
                                stroke="currentColor"
                                width="25"
                                height="25"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                />
                              </svg>
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </div>
                    </header>

                    <div className={style.imageIndicators}>
                      <div className={style.dotsContainer}>
                        {project.images.map((_, index) => (
                          <motion.div
                            key={index}
                            onClick={() => setImageLookingAt(index)}
                            className={style.dots}
                            layout
                            animate={{
                              width: imageLookingAt === index ? 20 : 8,
                              backgroundColor:
                                imageLookingAt === index
                                  ? "rgb(40,40,40)"
                                  : "rgb(180,180,180)",
                              borderRadius: imageLookingAt === index ? 10 : 10,
                            }}
                          />
                        ))}
                      </div>

                      {width < 600 && (
                        <div className={style.carouselButtonsContainer}>
                          <motion.button
                            disabled={imageLookingAt == 0}
                            animate={{
                              opacity: imageLookingAt == 0 ? 0.3 : 1,
                            }}
                            onClick={() =>
                              setImageLookingAt(imageLookingAt - 1)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              height="30"
                              width="30"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </motion.button>

                          <motion.button
                            disabled={
                              imageLookingAt == project.images.length - 1
                            }
                            animate={{
                              opacity:
                                imageLookingAt == project.images.length - 1
                                  ? 0.3
                                  : 1,
                            }}
                            onClick={() =>
                              setImageLookingAt(imageLookingAt + 1)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              height="30"
                              width="30"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {/* --------------- TECH STACK SECTION --------------------- */}

                <section className={style.techStackSection}>
                  <div className={style.stacksContainer}>
                    {project.techStack_data.map((tech) => (
                      <div key={tech.name} className={style.techCard}>
                        <div className={style.techIcon}>
                          <picture key={tech.name}>
                            <img
                              src={tech.url}
                              alt="technologiIcon"
                              loading="lazy"
                            />
                          </picture>
                        </div>
                        {/* <div className={style.techName}>
                          <p>{tech.name}</p>
                        </div> */}
                      </div>
                    ))}
                  </div>
                </section>
              </motion.div>
            </motion.div>
          </main>
          <footer>
            <div className={style.indicatorsButtonsContainer}>
              <button
                key="description"
                onClick={() => {
                  setProjectStages("description");
                }}
                className={style.indicatorsButtons}
              >
                <motion.p
                  animate={{
                    color:
                      projectStages !== "description"
                        ? "rgb(120, 120,120)"
                        : project.style.primaryColor,
                  }}
                >
                  Description
                </motion.p>
                {projectStages == "description" && (
                  <motion.div
                    layoutId="stages"
                    className={style.indicator}
                    style={{
                      backgroundColor: project.style.primaryColor,
                    }}
                  />
                )}
              </button>
              <button
                key="screenshots"
                onClick={() => {
                  setProjectStages("screenshots");
                }}
                className={style.indicatorsButtons}
              >
                <motion.p
                  animate={{
                    color:
                      projectStages !== "screenshots"
                        ? "rgb(120, 120, 120)"
                        : project.style.primaryColor,
                  }}
                >
                  Screenshots
                </motion.p>
                {projectStages == "screenshots" && (
                  <motion.div
                    layoutId="stages"
                    className={style.indicator}
                    style={{
                      backgroundColor: project.style.primaryColor,
                    }}
                  />
                )}
              </button>
              <button
                key="techStack"
                onClick={() => {
                  setProjectStages("techStack");
                }}
                className={style.indicatorsButtons}
              >
                <motion.p
                  animate={{
                    color:
                      projectStages !== "techStack"
                        ? "rgb(120, 120, 120)"
                        : project.style.primaryColor,
                  }}
                >
                  {width > 370 ? "Tech Stack" : "Stack"}
                </motion.p>
                {projectStages == "techStack" && (
                  <motion.div
                    layoutId="stages"
                    className={style.indicator}
                    style={{
                      backgroundColor: project.style.primaryColor,
                    }}
                  />
                )}
              </button>
            </div>
          </footer>
        </div>
      </motion.div>
    </motion.div>,
    document.getElementById("modal")
  );
};

const Section4 = () => {
  const width = useViewportWidth();

  const dispatch = useDispatch();

  const [projectOpen, setProjectOpen] = useState("none");
  const [projectHovered, setProjectHovered] = useState("none");

  //  Logic to lock the scroll when the form is open
  useEffect(() => {
    if (projectOpen !== "none") {
      dispatch(openCloseModals(true));
      updateCursorOptions({
        isVisible: false,
      });
      dispatch(backgroundModalNeeded(true));
    } else {
      dispatch(openCloseModals(false));
      dispatch(backgroundModalNeeded(false));
    }
  }, [projectOpen]);

  return (
    <section
      className={`${style.section4} `}
      onMouseLeave={() => {
        updateCursorOptions({
          isVisible: false,
          width: null,
          height: null,
          textContent: null,
        });
      }}
      onMouseEnter={() => {
        dispatch(
          updateCursorOptions({
            isVisible: true,
            width: 8,
            height: 8,
            textContent: null,
          })
        );
      }}
    >
      {/* -------------- Project Modal -------------- */}

      <AnimatePresence>
        {projectOpen !== "none" && (
          <ProjectModal
            setProjectOpen={setProjectOpen}
            projectOpen={projectOpen}
          />
        )}
      </AnimatePresence>
      <motion.div
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 70,
        }}
        className={style.pageContent}
      >
        <div className={style.top}>
          <motion.p className={style.projectTitle}>PROJECTS</motion.p>
        </div>
        <div className={style.bottom}>
          {Projects.map((project, index) => {
            return (
              <motion.div key={project.id} className={style.projectDetail}>
                <button
                  onMouseEnter={() => {
                    setProjectHovered(project.id);
                    dispatch(
                      updateCursorOptions({
                        isVisible: true,
                        width: 90,
                        height: 90,
                        textContent: project.comingSoon
                          ? "COMING <br/> SOON"
                          : "CLICK TO <br/>SEE MORE",
                      })
                    );
                  }}
                  onMouseLeave={() => {
                    setProjectHovered("none");
                    dispatch(
                      updateCursorOptions({
                        isVisible: true,
                        width: 8,
                        height: 8,
                        textContent: null,
                      })
                    );
                  }}
                  onClick={() => {
                    if (project.dontOpen === false && project.id) {
                      setProjectOpen(project.id);
                    }
                  }}
                  className={style.row}
                >
                  <p className={style.project}>{project.name}</p>
                  {!project.dontOpen && width > 900 && (
                    <label>#00{index + 1}</label>
                  )}
                  {!project.dontOpen && width > 900 && <span>12-06-2024</span>}
                  <AnimatePresence>
                    {projectHovered === project.id &&
                      project.dontOpen === false && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          exit={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          layoutId="arrow"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            height="30"
                            width="30"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                            />
                          </svg>
                        </motion.p>
                      )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      <div
        className={style.callToAction}
        onMouseEnter={() => {
          dispatch(
            updateCursorOptions({
              isVisible: false,
            })
          );
        }}
        onMouseLeave={() => {
          dispatch(
            updateCursorOptions({
              isVisible: true,
            })
          );
        }}
      >
        <div className={style.textContainer}>
          <div
            className={style.uvCanvasContainer}
            style={{ filter: "brightness(25%)" }}
          >
            <Opulento />
          </div>
          <h1 className={style.text1}>Ready to start your project?</h1>
          <h2 className={style.text2}>
            Let's work together to bring it to life!
          </h2>
        </div>

        <div className={style.buttonsContainer}>
          <motion.a
            whileTap={{ scale: 0.95 }}
            className={style.sendMessageButton}
            href="https://mail.google.com/mail/?view=cm&fs=1&to=pablodanyfer@gmail.com&su=Hi!%20I would%20like%20to%20talk%20about%20a%20project"
            target="_blank"
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
            <p className={style.buttonText}>Let's talk about it</p>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Section4;
