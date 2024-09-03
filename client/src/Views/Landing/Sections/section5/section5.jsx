import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./section5.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardSkeleton } from "./Card/card";
import {
  fetchRecommendations,
  forceUpdateComments,
} from "../../../../Redux/actions";
import { FormComments } from "./formRecommendation/formComments";
import useViewportWidth from "../../../../Components/Hooks/useViewportSize";
import { AdminModal } from "./adminModal/adminModal";
const Section5 = () => {
  const vwWidth = useViewportWidth();
  const dispatch = useDispatch();
  const updateSignal = useSelector((state) => state.updateComments);
  useEffect(() => {
    dispatch(fetchRecommendations());
    if (updateSignal) {
      setTimeout(() => {
        dispatch(forceUpdateComments());
      }, 500);
    }
  }, [dispatch, updateSignal]);

  // Fetch recommendations/comments data and save them in a global state with redux
  // Update the recommendations/comments when one has been deleted or created
  const recommendations = useSelector((state) => state.recommendations);
  // ----------------------------------------------------------

  // sorted by pinned first in an array that will be used in the map function to render the data
  const sortedRecommendations = [...recommendations].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });
  // ----------------------------------------------------------

  // Local and global states
  const admin = useSelector((state) => state.admin);
  const [formOpen, setFormOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [tooltipButton, setTooltipButton] = useState(false);

  // ----------------------------------------------------------

  // Logic to lock the scroll when the form is open
  // useEffect(() => {
  //   if (formOpen || adminModalOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  // }, [formOpen]);
  // ----------------------------------------------------------------

  // const [indexComments, setIndexComments] = useState(0);
  const testArray = [1, 2, 3];
  const itemsPerRow = vwWidth >= 1200 ? 3 : vwWidth >= 740 ? 2 : 1;
  const steps = Math.ceil(recommendations.length / itemsPerRow) - 1;
  const [currentStep, setCurrentStep] = useState(0);

  const moreHandler = () => {
    setCurrentStep(currentStep + 1);

    // if (indexComments < recommendations.length) {
    //   setIndexComments(indexComments + 1);
    // } else {
    //   console.log("Limite excedido");
    // }
  };

  const lessHandler = () => {
    // if (indexComments !== 0) {
    //   setIndexComments(indexComments - 1);
    // }
    setCurrentStep(currentStep - 1);
  };

  return (
    <motion.section className={style.section5}>
      <AnimatePresence>
        {formOpen && (
          <FormComments
            onClose={() => {
              setFormOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      {admin && (
        <AnimatePresence>
          {adminModalOpen && (
            <AdminModal
              onClose={() => {
                setAdminModalOpen(false);
              }}
              sortedRecommendations={sortedRecommendations}
            />
          )}
        </AnimatePresence>
      )}
      <div className={style.upper}>
        <div className={style.headerContainer}>
          <h2 className={style.title}>
            Don't trust me,
            <label
              style={{
                fontWeight: "600",
                fontStyle: "italic",
                color: "rgb(123, 255, 180)",
              }}
            >
              {" "}
              trust them
            </label>
          </h2>
          <h3 className={style.subtitle}>
            Discover what the people have to say about their experiences working
            with me
          </h3>
        </div>
      </div>
      <div className={style.medium}>
        <div className={style.main}>
          <AnimatePresence mode={"popLayout"}>
            {recommendations.length ? (
              <motion.div key="cards" className={style.cardContainer2}>
                <motion.div
                  animate={{
                    y: -320 * currentStep,
                  }}
                  transition={{
                    duration: 1,
                    type: "spring",
                    damping: 20,
                    stiffness: 100,
                  }}
                  className={style.cardsTest}
                >
                  <AnimatePresence mode="popLayout">
                    {sortedRecommendations.map((rec) => (
                      <Card
                        id={rec._id}
                        key={rec._id}
                        image={rec.image}
                        nameAndLastname={rec.nameAndLastname}
                        occupation={rec.occupation}
                        workData={rec.workData}
                        socialMedia={rec.socialMedia.filter(
                          (social) => social.username !== ""
                        )}
                        comment={rec.comment}
                        pinned={rec.pinned}
                        admin={admin}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div className={style.cardContainer2}>
                <motion.div
                  key="skeleton"
                  layout
                  animate={{
                    y: -320 * currentStep,
                  }}
                  transition={{
                    duration: 1,
                    type: "spring",
                    damping: 20,
                    stiffness: 100,
                  }}
                  className={style.cardsTest}
                >
                  <CardSkeleton />
                  <CardSkeleton />
                  <CardSkeleton />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode={"popLayout"}>
            {recommendations.length > 3 && (
              <motion.div
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 100,
                }}
                className={style.buttonsContainer}
              >
                <button
                  style={{ opacity: currentStep == 0 && 0.3 }}
                  className={style.pageButtons}
                  disabled={currentStep == 0}
                  onClick={lessHandler}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    width="30"
                    height="30"
                    strokeWidth="1.5"
                    stroke="white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                    />
                  </svg>
                </button>

                <button
                  style={{ opacity: currentStep == steps && 0.3 }}
                  className={style.pageButtons}
                  disabled={currentStep == steps}
                  onClick={moreHandler}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    width="30"
                    height="30"
                    strokeWidth="1.5"
                    stroke="white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                    />
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ---------- FOOTER SECTION --------------- */}
      <div className={style.footer}>
        {/* <motion.h3
          className={style.tooltipButton}
          initial={{ opacity: 0 }}
          animate={{
            y: tooltipButton ? 0 : 10,
            opacity: tooltipButton ? 1 : 0,
          }}
          transition={{
            duration: 1,
            type: "spring",
            damping: 20,
            stiffness: 100,
          }}
        >
          If we've worked together, your feedback would be greatly appreciated
        </motion.h3> */}
        {admin ? (
          <button
            className={style.openModalButton}
            onClick={() => {
              setAdminModalOpen(true);
            }}
          >
            See all comments
          </button>
        ) : (
          <button
            className={style.openModalButton}
            onClick={() => {
              setFormOpen(true);
            }}
            onMouseEnter={() => {
              setTooltipButton(true);
            }}
            onMouseLeave={() => {
              setTooltipButton(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.25rem"
              height="1.25rem"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            >
              <path d="M12 19v-7m0 0V5m0 7H5m7 0h7"></path>
            </svg>
            Leave your comment
          </button>
        )}
      </div>
    </motion.section>
  );
};

export default Section5;
