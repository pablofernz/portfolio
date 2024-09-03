import style from "./adminModal.module.css";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useViewportWidth from "../../../../../Components/Hooks/useViewportSize";
import { square } from "ldrs";
import { useSelector } from "react-redux";
import { Card } from "../Card/card";
import { useOutsideClick } from "../../../../../Components/Hooks/clickOutside";

square.register();

export const AdminModal = ({ onClose, sortedRecommendations }) => {
  const viewportWidth = useViewportWidth();
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setExit(true);
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [cardToPreview, setCardToPreview] = useState();
  const previewHandler = (id) => {
    const previewing = sortedRecommendations.find(
      (comment) => comment._id == id
    );
    setCardToPreview(previewing);
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: exit ? 0 : 1 }}
        transition={{
          duration: 0.5,
          delay: exit ? 0.5 : 0,
        }}
        className={style.component}
      >
        <motion.div
          initial={{ y: "100vh" }}
          animate={{
            y: exit ? "100vh" : "0vh",
          }}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 100,
            delay: exit ? 0 : 0.5,
          }}
          className={style.card}
        >
          <AnimatePresence>
            {cardToPreview && (
              <motion.div
                key="cardPreview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={style.cardPreview}
              >
                <p>Created: {cardToPreview.date.split(" ")[0]}</p>
                <Card
                  id={cardToPreview._id}
                  key={cardToPreview._id}
                  image={cardToPreview.image}
                  nameAndLastname={cardToPreview.nameAndLastname}
                  occupation={cardToPreview.occupation}
                  workData={cardToPreview.workData}
                  socialMedia={cardToPreview.socialMedia.filter(
                    (social) => social.username !== ""
                  )}
                  comment={cardToPreview.comment}
                  pinned={cardToPreview.pinned}
                  adminAccess={true}
                />
                <button
                  className={style.endPreview}
                  onClick={() => {
                    setCardToPreview(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="rgba(200,200,200, 0.7)"
                    height="50"
                    width="50"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <header className={style.header}>
            <h1>All comments</h1>
          </header>
          <main className={style.main}>
            <div className={style.cardCommentContainer}>
              {sortedRecommendations.map((comment) => {
                return (
                  <button
                    key={comment._id}
                    className={style.cardComment}
                    onClick={() => {
                      previewHandler(comment._id);
                    }}
                  >
                    <div className={style.userPhoto}>
                      <img
                        src={comment.image}
                        alt="userPhoto"
                        className={style.img}
                      />
                    </div>
                    <div className={style.userData}>
                      <h1>{comment.nameAndLastname}</h1>
                      <p>{comment.occupation}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </main>
          <footer className={style.footer}></footer>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.getElementById("section5AdminModal")
  );
};
