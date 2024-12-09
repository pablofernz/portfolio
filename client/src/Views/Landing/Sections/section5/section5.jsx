import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./section5.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardSkeleton } from "./Card/card";
import {
  fetchRecommendations,
  forceUpdateComments,
  openCloseModals,
  updateCursorOptions,
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
  const [adminModalOpen, setAdminModalOpen] = useState();
  const [tooltipButton, setTooltipButton] = useState(false);

  // ----------------------------------------------------------

  // ----------------------------------------------------------------

  return (
    <motion.section
      className={style.section5}
      onMouseEnter={() => {
        dispatch(
          updateCursorOptions({
            isVisible: false,
          })
        );
      }}
    >
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
      <div className={style.section5Aux}>
        <div className={style.text}>
          <p>WHAT PEOPLE SAY ABOUT ME</p>
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
                dispatch(openCloseModals(true));
              }}
              onMouseEnter={() => {
                setTooltipButton(true);
              }}
              onMouseLeave={() => {
                setTooltipButton(false);
              }}
            >
              {vwWidth > 900 && (
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
              )}
              Leave your comment
            </button>
          )}
        </div>
        <div className={style.recommendations}>
          <div className={style.leftShadow}></div>
          <div className={style.medium}>
            <div className={style.main}>
              <AnimatePresence mode={"popLayout"}>
                {recommendations.length ? (
                  <motion.div
                    key="cards"
                    className={style.cardContainer2}
                    style={{
                      justifyContent:
                        recommendations.length >= 2 ? "start " : "center",
                    }}
                  >
                    <motion.div
                      className={`${style.cardsTest} ${
                        recommendations.length >= 2 && style.slider
                      }`}
                    >
                      <AnimatePresence mode="popLayout">
                        {sortedRecommendations.map((rec, index) => (
                          <div key={rec._id}>
                            <Card
                              id={rec._id}
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
                              index={index}
                            />
                          </div>
                        ))}
                      </AnimatePresence>

                      <AnimatePresence mode="popLayout">
                        {sortedRecommendations.map((rec, index) => (
                          <div key={rec._id}>
                            <Card
                              id={rec._id}
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
                              index={index}
                            />
                          </div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    className={style.cardContainer2}
                    style={{ justifyContent: "center" }}
                  >
                    <motion.div
                      key="skeleton"
                      layout
                      className={style.cardsTest}
                    >
                      <CardSkeleton />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className={style.rightShadow}></div>
            </div>
            {/* ---------- FOOTER SECTION --------------- */}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Section5;
