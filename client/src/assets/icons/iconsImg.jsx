import style from "./iconsImg.module.css";
import { useEffect, useRef } from "react";
import useViewportWidth from "../../Components/Hooks/useViewportSize";
import { motion } from "framer-motion";

const IconComponent = ({ icon, reference }) => {
  const width = useViewportWidth();

  const iconsData = [
    {
      name: "Javascript",
      url: "https://cdn.worldvectorlogo.com/logos/logo-javascript.svg",
      size: "large",
    },

    {
      name: "React",
      url: "https://res.cloudinary.com/dnrprmypf/image/upload/v1718817889/react_dahdvf.png",
      size: "large",
    },

    {
      name: "HTML",
      url: "https://res.cloudinary.com/dnrprmypf/image/upload/v1718818385/html_qbnzse.png",
      size: "large",
    },

    {
      name: "CSS",
      url: "https://res.cloudinary.com/dnrprmypf/image/upload/v1718821611/css_very39.png",
      size: "large",
    },

    {
      name: "Redux",
      url: "https://res.cloudinary.com/dnrprmypf/image/upload/v1718821939/redux_bpimiw.png",
      size: "large",
    },

    {
      name: "PostgreSQL",
      url: "https://res.cloudinary.com/dnrprmypf/image/upload/v1718822821/postgre_a7rs0l.png",
      size: "large",
    },

    {
      name: "MongoDB",
      url: "https://res.cloudinary.com/dnrprmypf/image/upload/v1718822923/mongo_ik5wzk.png",
      size: "large",
    },

    {
      name: "Mongoose",
      url: "https://res.cloudinary.com/dnrprmypf/image/upload/v1718823267/mongoose_jgco70.png",
      size: "large",
    },

    {
      name: "Git",
      url: "https://res.cloudinary.com/dnrprmypf/image/upload/v1718821753/git_hxxeie.png",
      size: "large",
    },

    {
      name: "GitHub",
      url: "https://res.cloudinary.com/dnrprmypf/image/upload/v1718823410/github_izsaz4.png",
      size: "large",
    },

    {
      name: "Node",
      url: "https://res.cloudinary.com/dnrprmypf/image/upload/v1718822103/node_ci6kys.png",
      size: "large",
    },

    {
      name: "Express",
      url: "https://res.cloudinary.com/dnrprmypf/image/upload/v1718818794/express_co7wsk.png",
      size: "large",
    },

    {
      name: "Sequelize",
      url: "https://res.cloudinary.com/dnrprmypf/image/upload/v1718822642/sequelize_qc4zus.png",
      size: "large",
    },

    {
      name: "Firebase",
      url: "https://res.cloudinary.com/dnrprmypf/image/upload/v1718823664/firebase_ymcpvf.png",
      size: "large",
    },

    {
      name: "FramerMotion",
      url: "https://res.cloudinary.com/dnrprmypf/image/upload/v1718823575/framer_soxxoo.png",
      size: "large",
    },

    {
      name: "Jest",
      url: "https://res.cloudinary.com/dnrprmypf/image/upload/v1718823913/jest_rtmxll.png",
      size: "large",
    },

    {
      name: "Typescript",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png?20221110153201",
      size: "large",
    },

    {
      name: "Slack",
      url: "https://res.cloudinary.com/dnrprmypf/image/upload/v1718900377/slack_cf6lg2.png",
      size: "large",
    },
  ];

  const chosedData = iconsData.filter(
    (iconChosed) => iconChosed.name == icon
  )[0];

  const ref = useRef(reference);
  return (
    <div>
      <motion.div
        dragConstraints={ref}
        ref={ref}
        drag
        style={{
          backgroundImage: `url(${chosedData.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height:
            chosedData.size == "large"
              ? "70px"
              : chosedData.size == "medium"
              ? "50px"
              : chosedData.size == "small" && "40px",
          width:
            chosedData.size == "large"
              ? "70px"
              : chosedData.size == "medium"
              ? "50px"
              : chosedData.size == "small" && "40px",

          borderRadius:
            chosedData.size == "large"
              ? "20px"
              : chosedData.size == "medium"
              ? "15px"
              : chosedData.size == "small" && "15px",

          cursor: "grab",
        }}
      >
        {" "}
      </motion.div>
    </div>
  );
};

export default IconComponent;
