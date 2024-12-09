import { useEffect, useRef, useState } from "react";
import style from "./card.module.css";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import {
  changePinnedValue,
  forceUpdateComments,
} from "../../../../../Redux/actions";
import axios from "axios";
import { square } from "ldrs";
import { useDispatch } from "react-redux";

square.register();

export const Card = ({
  id,
  nameAndLastname,
  occupation,
  workData,
  socialMedia,
  image,
  comment,
  pinned,
  adminAccess,
  index,
}) => {
  const socialMediaData = {
    Linkedin: {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="rgb(0, 120, 178)"
          viewBox="0 0 16 16"
        >
          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
        </svg>
      ),
      // URL: `https://linkedin.com/in/${username}`,
    },
    Instagram: {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="rgb(251, 97, 97)"
          viewBox="0 0 16 16"
        >
          <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
        </svg>
      ),
      // URL: `https://instagram.com/${username}`,
    },
    X: {
      icon: (
        <svg
          style={{ opacity: 0.7 }}
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="white"
          viewBox="0 0 16 16"
        >
          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
        </svg>
      ),
      // URL: `https://x.com/${username}`,
    },
    GitHub: {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="white"
          viewBox="0 0 16 16"
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
        </svg>
      ),
      // URL: `https://github.com/${username}`,
    },
  };

  const [tooltip, setTooltip] = useState(false);
  const [tooltipPin, setTooltipPin] = useState(false);
  const dispatch = useDispatch();
  const [isPinned, setIsPinned] = useState(pinned);

  const pinHandler = () => {
    changePinnedValue(id);
    setIsPinned(!isPinned);
  };
  useEffect(() => {
    dispatch(forceUpdateComments());
  }, [isPinned]);
  const [deleteStatus, setDeleteStatus] = useState("Not deleted");
  const deleteCardHandler = async () => {
    setDeleteStatus("Deleting");

    const response = await axios.delete(
      `https://portfolio-backend-8kqa.onrender.com/recomendation/delete/${id}`
      // `http://localhost:3001/recomendation/delete/${id}`
    );
    setDeleteStatus(response.data);
    setTimeout(() => {
      dispatch(forceUpdateComments());
    }, 2000);
  };
  return (
    <motion.div
      layout
      initial={{ opacity: 0, filter: "brightness(0%)" }}
      animate={{ opacity: 1, filter: "brightness(100%)" }}
      exit={{ opacity: 0, filter: "brightness(0%)" }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 150,
      }}
      className={style.card}
      onClick={() => {
        console.log(nameAndLastname.split(""));
      }}
    >
      <AnimatePresence mode="popLayout">
        {deleteStatus == "Not deleted" && (
          <motion.div
            key="card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 150,
            }}
            className={style.cardAux}
          >
            <header className={style.header}>
              <div className={style.photoContainer}>
                <img
                  className={style.photo}
                  src={
                    image?.trim()
                      ? image
                      : "https://res.cloudinary.com/dnrprmypf/image/upload/v1728605983/Projects%20Images/Indico/Clients%20Photos/User%20default%20photo.png"
                  }
                  alt="userPhoto"
                />
              </div>
              <div className={style.userData}>
                {nameAndLastname.length >= 18 && (
                  <>
                    <div className={style.shadowLeft}></div>
                    <div className={style.shadowRight}></div>
                    <div className={style.shadowRight}></div>
                    <div className={style.shadowRight}></div>
                  </>
                )}
                <div className={style.name}>
                  {nameAndLastname.length >= 17 ? (
                    <div className={style.nameAux}>
                      <div> {nameAndLastname}</div>
                      <div> {nameAndLastname}</div>
                    </div>
                  ) : (
                    nameAndLastname
                  )}
                </div>
                <div
                  style={{ opacity: occupation == "" && 0.6 }}
                  className={style.occupation}
                >
                  {occupation == "" ? "Job not shared" : occupation}
                </div>
                {workData.placeOfWork !== "Freelancer" &&
                workData.placeOfWork ? (
                  <div className={style.placeOfWork}>
                    At
                    {workData.siteLink !== "" ? (
                      <a
                        className={style.siteLink}
                        href={workData.siteLink}
                        target="_blank"
                      >
                        {workData.placeOfWork}
                      </a>
                    ) : (
                      <a>{workData.placeOfWork}</a>
                    )}
                  </div>
                ) : (
                  <div className={style.placeOfWork}>
                    {workData.placeOfWork == "" && workData.siteLink == "" ? (
                      <a style={{ opacity: 0.6 }}>Unknown company</a>
                    ) : (
                      <a
                        className={style.siteLink}
                        href={workData.siteLink}
                        target="_blank"
                      >
                        {workData.placeOfWork}
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className={style.userLink}>
                <div className={style.singleIconContainer}>
                  <div
                    className={`${style.iconsContainer} 
              ${socialMedia.length == 2 && style.length2}
              ${socialMedia.length == 3 && style.length3}
              ${socialMedia.length == 4 && style.length4}`}
                  >
                    {socialMedia.map((socialNetwork) => {
                      return (
                        <a
                          key={socialNetwork._id}
                          href={
                            socialNetwork.name == "Linkedin"
                              ? `https://linkedin.com/in/${socialNetwork.username}`
                              : `https://${socialNetwork.name}.com/${socialNetwork.username}`
                          }
                          target="blank"
                          onMouseEnter={() => {
                            setTooltip(true);
                          }}
                          onMouseLeave={() => {
                            setTooltip(false);
                          }}
                        >
                          {socialMediaData[socialNetwork.name].icon}
                        </a>
                      );
                    })}
                    {socialMedia[0] && (
                      <a
                        href={
                          socialMedia[0].name == "Linkedin"
                            ? `https://linkedin.com/in/${socialMedia[0].username}`
                            : `https://${socialMedia[0].name}.com/${socialMedia[0].username}`
                        }
                        target="blank"
                        onMouseEnter={() => {
                          setTooltip(true);
                        }}
                        onMouseLeave={() => {
                          setTooltip(false);
                        }}
                      >
                        {socialMediaData[socialMedia[0].name].icon}
                      </a>
                    )}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    y: tooltip ? 0 : 10,
                    opacity: tooltip ? 1 : 0,
                  }}
                  transition={{
                    duration: 1,
                    type: "spring",
                    damping: 20,
                    stiffness: 100,
                  }}
                  className={style.tooltip}
                >
                  Visit their profile
                </motion.div>
              </div>
            </header>
            <main className={style.main}>
              <div className={style.msgContainer}>
                <p className={style.msg}>"{comment}"</p>
              </div>
            </main>
            {adminAccess ? (
              <div>
                <button
                  onClick={() => {
                    pinHandler();
                  }}
                  className={`${style.pin} ${isPinned && style.pinned}`}
                  style={{ cursor: "pointer" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A6 6 0 0 1 5 6.708V2.277a3 3 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    deleteCardHandler();
                  }}
                  className={`${style.deleteButton}`}
                  style={{ cursor: "pointer" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgba(150, 150, 150, 0.2)"
                    width="23"
                    height="23"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className={style.pinned}>
                {pinned && (
                  <div className={style.pinnedTooltip}>
                    <p
                      onMouseEnter={() => {
                        setTooltipPin(true);
                      }}
                      onMouseLeave={() => {
                        setTooltipPin(false);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill=" rgb(123, 255, 180)"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A6 6 0 0 1 5 6.708V2.277a3 3 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354" />
                      </svg>
                    </p>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        y: tooltipPin ? 0 : 10,
                        opacity: tooltipPin ? 1 : 0,
                      }}
                      transition={{
                        duration: 1,
                        type: "spring",
                        damping: 20,
                        stiffness: 100,
                      }}
                      className={style.tooltipPin}
                    >
                      <p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18px"
                          height="18px"
                          viewBox="0 0 24 24"
                          style={{ marginTop: "4px" }}
                        >
                          <path
                            fill="black"
                            fillRule="evenodd"
                            d="M4.536 5.778a5 5 0 0 1 7.07 0q.275.274.708.682q.432-.408.707-.682a5 5 0 0 1 7.125 7.016L13.02 19.92a1 1 0 0 1-1.414 0L4.48 12.795a5 5 0 0 1 .055-7.017z"
                          />
                        </svg>
                      </p>
                      <p>Pinned by Pablo</p>
                    </motion.div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
        {deleteStatus == "Deleting" && (
          <motion.div
            key="deleting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 150,
            }}
            className={style.cardAuxDeleted}
          >
            <l-square
              size="70"
              stroke="5"
              stroke-length="0.25"
              bg-opacity="0.04"
              speed="1.2"
              color="rgb(197, 197, 197)"
            ></l-square>
          </motion.div>
        )}
        {deleteStatus == "Deleted" && (
          <motion.div
            key="deleted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 150,
            }}
            className={style.cardAuxDeleted}
          >
            <h1>Comment deleted</h1>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
export const CardSkeleton = () => {
  const ref = useRef(null);

  return (
    <motion.div
      drag
      ref={ref}
      dragConstraints={ref}
      className={style.cardSkeleton}
    >
      <motion.img
        animate={{ opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2, type: "spring", repeat: Infinity }}
        style={{ height: "60px", width: "60px" }}
        src="https://res.cloudinary.com/dnrprmypf/image/upload/v1718494423/logo_white_juquqf.png"
        alt=""
      />
    </motion.div>
  );
};
