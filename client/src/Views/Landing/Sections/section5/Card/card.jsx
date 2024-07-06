import { useEffect, useState } from "react";
import style from "./card.module.css";
import { motion } from "framer-motion";
import { changePinnedValue } from "../../../../../Redux/actions";

const Card = ({
  id,
  nameAndLastname,
  occupation,
  placeOfWork,
  siteLink,
  socialMediaIcon,
  socialMediaURL,
  image,
  message,
  pinned,
}) => {
  const [tooltip, setTooltip] = useState(false);
  const [tooltipPin, setTooltipPin] = useState(false);

  const [adminAccess, setAdminAccess] = useState(false);

  const [isPinned, setIsPinned] = useState(pinned);
  const pinHandler = () => {
    changePinnedValue(id);
    setIsPinned(!isPinned);
  };
  return (
    <div className={style.card}>
      <header className={style.header}>
        <div className={style.photoContainer}>
          <img className={style.photo} src={image} alt="userPhoto" />
        </div>
        <div className={style.userData}>
          <div className={style.name}>{nameAndLastname}</div>
          <div className={style.occupation}>{occupation}</div>

          {placeOfWork == "Freelancer" ? (
            <div className={style.placeOfWork}>
              {siteLink == "" ? (
                placeOfWork
              ) : (
                <a className={style.siteLink} href={siteLink} target="_blank">
                  {placeOfWork}
                </a>
              )}
            </div>
          ) : (
            <div className={style.placeOfWork}>
              In&nbsp;
              <a className={style.siteLink} href={siteLink} target="_blank">
                {placeOfWork}
              </a>
            </div>
          )}
        </div>
        <div className={style.userLink}>
          <a
            href={socialMediaURL}
            target="blank"
            onMouseEnter={() => {
              setTooltip(true);
            }}
            onMouseLeave={() => {
              setTooltip(false);
            }}
          >
            {socialMediaIcon}
          </a>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              y: tooltip ? 0 : 10,
              opacity: tooltip ? 1 : 0,
            }}
            transition={{ duration: 1, type: "spring" }}
            className={style.tooltip}
          >
            Visit their profile
          </motion.div>
        </div>
      </header>
      <main className={style.main}>
        <div className={style.msgContainer}>
          <p className={style.msg}>"{message}"</p>
        </div>
      </main>
      {adminAccess ? (
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
      ) : (
        <p className={style.pinned}>
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
                  class="bi bi-pin-fill"
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
                transition={{ duration: 1, type: "spring" }}
                className={style.tooltipPin}
              >
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18px"
                    height="18px"
                    viewBox="0 0 24 24"
                    style={{ marginTop: "4px"}}

                  >
                    <path
                      fill="black"
                      fill-rule="evenodd"
                      d="M4.536 5.778a5 5 0 0 1 7.07 0q.275.274.708.682q.432-.408.707-.682a5 5 0 0 1 7.125 7.016L13.02 19.92a1 1 0 0 1-1.414 0L4.48 12.795a5 5 0 0 1 .055-7.017z"
                    />
                  </svg>
                </p>
                <p>Pinned by Pablo</p>
              </motion.div>
            </div>
          )}
        </p>
      )}
    </div>
  );
};

export default Card;
