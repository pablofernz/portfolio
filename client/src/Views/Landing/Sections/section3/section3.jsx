import { useDispatch } from "react-redux";
import style from "./section3.module.css";
import { motion } from "framer-motion";
import { setSection } from "../../../../Redux/actions";

const Section3 = () => {
  const dispatch = useDispatch();
  return (
    <motion.section
      whileInView={() => dispatch(setSection("works"))}
      viewport={{ amount: 0.5 }}
      className={style.section3}
    >
      sess
    </motion.section>
  );
};

export default Section3;
