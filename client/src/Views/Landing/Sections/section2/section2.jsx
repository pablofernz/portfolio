import { useEffect, useRef, useState } from "react";
import style from "./section2.module.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { useDispatch } from "react-redux";
import { setSection } from "../../../../Redux/actions";
import Section1Footer from "../section1/Footer/section1Footer";
const Section2 = () => {
  const dispatch = useDispatch();

  return (
    <motion.section
      className={style.section2}
      whileInView={() => dispatch(setSection("about"))}
      viewport={{ amount: 0.5 }}
    >
      <Section1Footer />
      <motion.header
        // initial={{ y: -200, opacity: 0 }}
        // whileInView={{ y: [0, -200], opacity: 1 }}
        // transition={{ duration: 2, type: "spring" }}
        className={style.headerText}
      >
        <h1 className={style.h1test}>MY PROJECTS</h1>
      </motion.header>
    </motion.section>
  );
};

export default Section2;
