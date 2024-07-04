import { useState } from "react";
import style from "./card.module.css";
import { motion } from "framer-motion";

const Card = ({
  nameAndLastname,
  occupation,
  placeOfWork,
  siteLink,
  socialMediaIcon,
  socialMediaURL,
  image,
  message,
}) => {
  const [tooltip, setTooltip] = useState(false);

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
        <div
          className={style.userLink}
          onMouseEnter={() => {
            setTooltip(true);
          }}
          onMouseLeave={() => {
            setTooltip(false);
          }}
        >
          <a href={socialMediaURL} target="blank">
            {socialMediaIcon}
          </a>
          <motion.div
            animate={{ y: tooltip ? 0 : 10, opacity: tooltip ? 1 : 0 }}
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
    </div>
  );
};

export default Card;
