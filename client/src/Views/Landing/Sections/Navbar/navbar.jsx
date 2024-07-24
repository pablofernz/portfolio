import useViewportWidth from "../../../../Components/Hooks/useViewportSize";
import style from "./navbar.module.css";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setSection, setVisibleNavbar } from "../../../../Redux/actions";
const Navbar = () => {
  const width = useViewportWidth();
  const [isMobileNavbarOpen, setMobileNavbar] = useState(false);
  const sectionState = useSelector((state) => state.section);

  const dispatch = useDispatch();

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  // const [visible, setVisible] = useState(true);
  const visible = useSelector((state) => state.isNavbarVisible);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      dispatch(setVisibleNavbar(prevScrollPos > currentScrollPos));
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  return (
    <nav>
      {width > 800 ? (
        <motion.div
          initial={{ y: "0px" }}
          animate={{ y: !visible ? "-100px" : "0px" }}
          transition={{ duration: 0.5, type: "spring" }}
          className={style.navBarContainer}
        >
          <div className={style.navBar}>
            <div className={style.logoSpace}>
              <picture className={style.logoContainer}>
                <img
                  className={style.logo}
                  src="https://res.cloudinary.com/dnrprmypf/image/upload/v1718250070/Logo-portfolio_jxapuu.png"
                  alt=""
                  onClick={() => dispatch(setSection("home"))}
                />
              </picture>
            </div>

            <div className={style.textSpace}>
              <a
                className={`${style.navText} ${
                  sectionState == "about" && style.navTextActive
                }`}
                onClick={() => dispatch(setSection("about"))}
              >
                About
              </a>
              <a
                className={`${style.navText} ${
                  sectionState == "Services" && style.navTextActive
                }`}
                onClick={() => dispatch(setSection("Services"))}
              >
                Services
              </a>
              <a
                className={`${style.navText} ${
                  sectionState == "works" && style.navTextActive
                }`}
                onClick={() => dispatch(setSection("works"))}
              >
                Works
              </a>
              <a
                className={`${style.navText} ${
                  sectionState == "contact" && style.navTextActive
                }`}
                onClick={() => dispatch(setSection("contact"))}
              >
                Contact
              </a>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className={style.navBarContainer2}>
          <motion.div
            initial={{ height: 50 }}
            animate={{
              height: isMobileNavbarOpen === true ? 275 : 50,
              y: !visible && isMobileNavbarOpen === false ? "-100px" : "0px",
            }}
            transition={{ duration: 0.5, type: "spring" }}
            className={style.navBarModal}
          >
            <div className={style.navBarMobile}>
              <div className={style.logoSpace}>
                <picture className={style.logoContainer}>
                  <img
                    className={style.logo}
                    src="https://res.cloudinary.com/dnrprmypf/image/upload/v1718250070/Logo-portfolio_jxapuu.png"
                    alt=""
                    onClick={() => dispatch(setSection("home"))}
                  />
                </picture>
              </div>

              <div className={style.iconMenuNavbar}>
                <button
                  onClick={() => {
                    setMobileNavbar(!isMobileNavbarOpen);
                  }}
                  className={style.iconMenuNavbarButton}
                >
                  <p>
                    <svg
                      style={{ rotate: "0deg" }}
                      viewBox="0 0 24 24"
                      width="25"
                      height="25"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </p>
                </button>
              </div>
            </div>
            <div className={style.navTextModalContainer}>
              <div className={style.textModalContainer}>
                <a
                  onClick={() => {
                    dispatch(setSection("about"));
                    setTimeout(() => {
                      setMobileNavbar(false);
                    }, 500);
                  }}
                  className={`${style.navTextModal} ${
                    sectionState == "about" && style.navTextModalActive
                  }`}
                >
                  About
                </a>
              </div>
              <div className={style.textModalContainer}>
                <a
                  onClick={() => {
                    dispatch(setSection("works"));
                    setTimeout(() => {
                      setMobileNavbar(false);
                    }, 500);
                  }}
                  className={`${style.navTextModal} ${
                    sectionState == "works" && style.navTextModalActive
                  }`}
                >
                  Works
                </a>
              </div>
              <div className={style.textModalContainer}>
                <a
                  onClick={() => {
                    dispatch(setSection("Services"));
                    setTimeout(() => {
                      setMobileNavbar(false);
                    }, 500);
                  }}
                  className={`${style.navTextModal} ${
                    sectionState == "Services" && style.navTextModalActive
                  }`}
                >
                  Services
                </a>
              </div>
              <div className={style.textModalContainer}>
                <a
                  onClick={() => {
                    dispatch(setSection("contact"));
                    setTimeout(() => {
                      setMobileNavbar(false);
                    }, 500);
                  }}
                  className={`${style.navTextModal} ${
                    sectionState == "contact" && style.navTextModalActive
                  }`}
                >
                  Contact me
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
