import { useEffect, useRef, useState } from "react";
import style from "./section4.module.css";
import { AnimatePresence, motion } from "framer-motion";
import useViewportWidth from "../../../../Components/Hooks/useViewportSize";
import { useDispatch, useSelector } from "react-redux";
import { openCloseModals, openTheChatbox } from "../../../../Redux/actions";
import ReactDOM from "react-dom";
import { Projects } from "./projects";
import axios from "axios";

// --------------- Project Modal Component -------------------
const ProjectModal = ({ setProjectOpen, projectOpen }) => {
  const modal = useRef(null);
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

  const [projectStages, setProjectStages] = useState("gallery");
  const [imageLookingAt, setImageLookingAt] = useState(0);
  const [imageHovering, setImageHovering] = useState(false);
  const [imageOpen, setImageOpen] = useState(null);
  const [projectLiked, setProjectLiked] = useState(
    userData && userData.projects.length !== 0
      ? userData.projects[projectOpen.toLowerCase()].liked
      : false
  );
  const [projectLikesCounter, setProjectLikesCounter] = useState();
  const [projectViewsCounter, setProjectViewsCounter] = useState();

  // Logic for the pointer circle
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
      `https://portfolio-back-production-9a9d.up.railway.app/metrics/projects/${projectOpen}/likes?set=${!projectLiked}`
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
        `https://portfolio-back-production-9a9d.up.railway.app/metrics/projects/${projectOpen}/getlikes`
      );
      setProjectLikesCounter(response.data);

      // this post update the views of the proyect everytime is open
      const views = await axios.post(
        `https://portfolio-back-production-9a9d.up.railway.app/metrics/projects/${projectOpen}/views`
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
            <header>
              {imageOpen.name ? <p>{imageOpen.name}</p> : <p>Loading...</p>}
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
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ----------------------------------------------------- */}

      <div
        className={style.projectModalContainer}
        ref={modal}
        onMouseMove={handleMouseMove}
      >
        <div className={style.content}>
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
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgb(140,140,140)"
                    height="20"
                    width="20"
                  >
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path
                      fill-rule="evenodd"
                      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <p className={style.likeCounter}>{projectViewsCounter}</p>
                </motion.a>
              )}

              {projectLikesCounter && (
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ cursor: "pointer" }}
                  onClick={projectLikeHandler}
                  className={style.likesContainer}
                >
                  <div className={style.likeButton}>
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
                </motion.button>
              )}
              <a
                href={project.github_link}
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
            <div className={style.visible}>
              <motion.div
                initial={{ x: "0%" }}
                animate={{
                  x:
                    projectStages == "gallery"
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
                  <div>
                    <p>
                      An <label> online restaurant</label> with a solid
                      structure, fast ordering, and seamless interactions.
                    </p>
                    <p>
                      Thoughtfully designed with attention to{" "}
                      <label>detail</label>.
                    </p>
                  </div>
                  <footer>
                    <a
                      href={project.github_link}
                      target="blank"
                      className={style.siteButton}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="white"
                        width="18"
                        height="18"
                      >
                        <path d="M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477ZM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0ZM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605ZM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477ZM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098ZM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816ZM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 1-3.746 2.504 18.63 18.63 0 0 0-2.37-6.49ZM12 2.276a17.152 17.152 0 0 1 2.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0 1 12 2.276ZM10.122 2.43a18.629 18.629 0 0 0-2.37 6.49 11.266 11.266 0 0 1-3.746-2.504 9.754 9.754 0 0 1 6.116-3.985Z" />
                      </svg>

                      <p>WEBSITE</p>
                    </a>
                  </footer>
                </section>

                {/* --------------- GALLERY SECTION --------------------- */}

                <section className={style.gallerySection}>
                  {/* ------------- GALLERY CURSOR POINTER -------------*/}
                  <AnimatePresence>
                    {width > 600 && (
                      <motion.div
                        className={style.cursorPointer}
                        initial={{ opacity: 0, scale: 0 }}
                        exit={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: imageHovering == true ? 1 : 0,
                          scale: imageHovering == true ? 1 : 0,
                          top: pointerData.y - 175,
                          left: pointerData.x - 320,
                          height: 100,
                          width: 100,
                        }}
                        style={{ zIndex: "20" }}
                        transition={{
                          type: "spring",
                          damping: 100, // Ajusta el valor para un movimiento más suave
                          stiffness: 2000, // Baja la rigidez para suavizar el rebote
                        }}
                      >
                        <p className={style.cursorText}>
                          CLICK TO <br />
                          FULL IMAGE
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <header className={style.imagesContainer}>
                      <div className={style.imgContainer}>
                        <picture>
                          {project.images.map((p, index) => (
                            <motion.img
                              // initial={{ scale: 0 }}
                              animate={{
                                x: `-${130 * imageLookingAt}%`,
                                // scale: index === imageLookingAt ? 1 : 0,
                              }}
                              transition={{
                                type: "spring",
                                damping: 15,
                                stiffness: 70,
                              }}
                              src={p?.mockup}
                              alt="projectImage"
                              // loading="lazy"
                              onClick={() => {
                                setImageOpen(p);
                              }}
                              onMouseEnter={() => setImageHovering(true)}
                              onMouseLeave={() => setImageHovering(false)}
                            />
                          ))}
                        </picture>
                        <AnimatePresence>
                          {imageLookingAt !== project.images.length - 1 && (
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
                                stroke-width="2"
                                stroke="currentColor"
                                width="30"
                                height="30"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                />
                              </svg>
                            </motion.button>
                          )}
                        </AnimatePresence>

                        <AnimatePresence>
                          {imageLookingAt !== 0 && (
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
                                stroke-width="2"
                                stroke="currentColor"
                                width="30"
                                height="30"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                />
                              </svg>
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </div>
                    </header>

                    <div className={style.imageIndicators}>
                      {project.images.map((_, index) => (
                        <motion.div
                          key={index}
                          onClick={() => setImageLookingAt(index)}
                          className={style.dots}
                          layout
                        >
                          <AnimatePresence>
                            {imageLookingAt === index && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                exit={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className={style.dotIndicator}
                              />
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                    <footer className={style.carouselButtonsContainer}></footer>
                  </div>
                </section>

                {/* --------------- TECH STACK SECTION --------------------- */}

                <section className={style.techStackSection}>
                  <footer>
                    <div className={style.techContainer}>
                      {project.techStack_data
                        .filter((item) => item.category == "frontend")
                        .map((tech) => (
                          <picture key={tech.name}>
                            <img
                              src={tech.url}
                              alt="technologiIcon"
                              loading="lazy"
                            />
                          </picture>
                        ))}
                    </div>
                  </footer>
                </section>
              </motion.div>
            </div>
          </main>
          <footer>
            {/* <div className={style.infiniteIconContainer}>
              {project.techStack_data.map((project) => (
                <div className={style.techContainer}>
                  <picture>
                    <img
                      src={project.url}
                      alt="technologiIcon"
                      loading="lazy"
                    />
                  </picture>
                  <div>{project.name}</div>
                </div>
              ))}
              {project.techStack_data.map((project) => (
                <div className={style.techContainer}>
                  <picture>
                    <img
                      src={project.url}
                      alt="technologiIcon"
                      loading="lazy"
                    />
                  </picture>
                  <div>{project.name}</div>
                </div>
              ))}
            </div> */}

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
                        ? "rgb(100, 100,100)"
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
                key="gallery"
                onClick={() => {
                  setProjectStages("gallery");
                }}
                className={style.indicatorsButtons}
              >
                <motion.p
                  animate={{
                    color:
                      projectStages !== "gallery"
                        ? "rgb(100, 100, 100)"
                        : project.style.primaryColor,
                  }}
                >
                  Gallery
                </motion.p>
                {projectStages == "gallery" && (
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
                        ? "rgb(100, 100, 100)"
                        : project.style.primaryColor,
                  }}
                >
                  Tech Stack
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
      </div>
    </motion.div>,
    document.getElementById("modal")
  );
};

const Section4 = () => {
  const width = useViewportWidth();

  const projectTitle = useRef(null);
  const dispatch = useDispatch();

  const [projectOpen, setProjectOpen] = useState("indico");
  const [projectHovered, setProjectHovered] = useState("none");

  //  Logic to lock the scroll when the form is open
  useEffect(() => {
    if (projectOpen !== "none") {
      dispatch(openCloseModals(true));
    } else {
      dispatch(openCloseModals(false));
    }
  }, [projectOpen]);

  // Logic for the pointer circle
  const [pointerData, setPointerData] = useState({ x: "", y: "" });
  const handleMouseMove = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    setPointerData({ x, y });
  };

  // useEffect(() => {
  //   console.log(Projects.filter((project) => project.id == projectHovered)[0]?.dontOpen);
  // }, [projectHovered]);
  return (
    <section
      className={`${style.section4} ${
        projectOpen !== "none" ? style.lessBright : ""
      }`}
      onMouseMove={handleMouseMove}
    >
      {/* -------------- Cursor pointer-------------- */}
      <AnimatePresence>
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
      </AnimatePresence>

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
        animate={
          {
            // scale: projectOpen !== "none" ? 3 : 1,
            // opacity: projectOpen !== "none" ? 0 : 1,
            // rotate: projectOpen !== "none" ? 20 : 0,
          }
        }
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 70,
        }}
        className={style.testZone}
      >
        <div className={style.top}>
          <motion.p
            className={style.projectTitle}
            ref={projectTitle}
            onMouseEnter={() => {
              setProjectHovered("title");
            }}
            onMouseLeave={() => {
              setProjectHovered("none");
            }}
          >
            PROJECTS
          </motion.p>
        </div>
        <div className={style.bottom}>
          {/* <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{
              opacity: projectHovered !== "none" ? 1 : 0,
              y:
                projectHovered == "indico"
                  ? 0
                  : projectHovered == "globber"
                  ? 105
                  : projectHovered == "unknown1"
                  ? 210
                  : projectHovered == "unknown2" && 315,
            }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 200,
            }}
            className={style.backgroundRow}
          ></motion.div> */}

          {Projects.map((project) => {
            return (
              <motion.div key={project.id} className={style.projectDetail}>
                <button
                  onMouseEnter={() => {
                    setProjectHovered(project.id);
                  }}
                  onMouseLeave={() => {
                    setProjectHovered("none");
                  }}
                  onClick={() => {
                    if (project.dontOpen === false && project.id) {
                      setProjectOpen(project.id);
                    }
                  }}
                  className={style.row}
                >
                  <p className={style.project}>{project.name}</p>
                </button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
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
            onClick={() => {
              dispatch(openTheChatbox(true));
            }}
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
