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
  const [formOpen, setFormOpen] = useState(false);
  const [adminAccess, setAdminAccess] = useState(false);
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
  const steps = Math.ceil(
    testArray.length /
      (vwWidth >= 1000 ? 2 : vwWidth >= 740 ? 2 : vwWidth < 740 && 1) -
      1
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [animation, setAnimation] = useState(false);

  const moreHandler = () => {
    setCurrentStep(currentStep + 1);
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 1);
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
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 1);
  };

  useEffect(() => {
    console.log();
  });

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

      <div className={style.subSection1}>
        <div className={style.component}>
          <div className={style.titleContainer}>
            <div className={style.title}>
              <label>Comments</label>
            </div>

            <label style={{ fontSize: "20px", opacity: 0.5 }}>
              (Card design and logic ready, only the container design left...
              and the entire form :p)
            </label>
            {adminAccess ? (
              <button className={style.openModalButton}>Admin button</button>
            ) : (
              <button
                className={style.openModalButton}
                onClick={() => {
                  setFormOpen(true);
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
                Add
              </button>
            )}
          </div>
        </div>
      </div>

      {/*---------------- Cards section --------------------------- */}
      <div className={style.subSection2}>
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
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </motion.div>
            </motion.div>
          )}
        </div>
        <button disabled={currentStep == steps} onClick={moreHandler}>
          More
        </button>
        <button disabled={currentStep == 0} onClick={lessHandler}>
          Less
        </button>
      </div>
    </motion.section>
  );
};

export default Section5;
