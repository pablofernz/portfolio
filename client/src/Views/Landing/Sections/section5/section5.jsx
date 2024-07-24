import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./section5.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardSkeleton } from "./Card/card";
import { fetchRecommendations } from "../../../../Redux/actions";
import { FormRecommendation } from "./formRecommendation/formRecommendation";
import useViewportWidth from "../../../../Components/Hooks/useViewportSize";
const Section5 = () => {
  const vwWidth = useViewportWidth();
  // Fetch recommendations/comments data and save them in a global state with redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecommendations());
  }, [dispatch]);

  const recommendations = useSelector((state) => state.recommendations);
  // ----------------------------------------------------------

  // sorted by pinned first in an array that will be used in the map function to render the data
  const sortedRecommendations = [...recommendations].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });
  // ----------------------------------------------------------

  // Local states
  const [formOpen, setFormOpen] = useState(true);
  const [adminAccess, setAdminAccess] = useState(false);
  const [tooltipButton, setTooltipButton] = useState(false);

  // ----------------------------------------------------------

  // Logic to lock the scroll when the form is open
  useEffect(() => {
    if (formOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [formOpen]);
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
          <FormRecommendation
            onClose={() => {
              setFormOpen(false);
            }}
          />
        )}
      </AnimatePresence>
      <div className={style.upper}>
        <div className={style.headerContainer}>
          <h2 className={style.title}>
            Don't trust me,{" "}
            <label
              style={{
                fontWeight: "600",
                fontStyle: "italic",
                color: "rgb(123, 255, 180)",
              }}
            >
              trust them
            </label>{" "}
          </h2>
          <h3 className={style.subtitle}>
            Discover what the people have to say about their experiences working
            with me
          </h3>
        </div>
      </div>
      <div className={style.medium}>
        <div className={style.main}>
          {recommendations.length ? (
            <motion.div className={style.cardContainer2}>
              <motion.div
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
                {sortedRecommendations.map((rec) => (
                  <Card
                    id={rec._id}
                    key={rec._id}
                    image={rec.image}
                    nameAndLastname={rec.nameAndLastname}
                    occupation={rec.occupation}
                    placeOfWork={Object.keys(rec.placeOfWork)}
                    siteLink={Object.values(rec.placeOfWork)}
                    socialMedia={rec.socialMedia}
                    message={rec.message}
                    pinned={rec.pinned}
                    adminAccess={adminAccess}
                  />
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div className={style.cardContainer2}>
              <motion.div
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
                {/* <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton /> */}
                {testArray.map(() => {
                  return <CardSkeleton />;
                })}
              </motion.div>
            </motion.div>
          )}
          {steps !== 0 ||
            (!recommendations.length && (
              <div className={style.buttonsContainer}>
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
                    stroke-width="1.5"
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
                    stroke-width="1.5"
                    stroke="white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                    />
                  </svg>
                </button>
              </div>
            ))}
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
        {adminAccess ? (
          <button className={style.openModalButton}>Admin button</button>
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
            Write your comment
          </button>
        )}
      </div>
    </motion.section>
  );
};

export default Section5;
