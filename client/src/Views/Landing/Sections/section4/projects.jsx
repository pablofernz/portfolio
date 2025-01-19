import iconsData from "../../../../assets/icons/iconsData.js";
import useViewportWidth from "../../../../Components/Hooks/useViewportSize.jsx";
const technologies = {
  javascript: {
    name: "Javascript",
    url: iconsData.filter((icon) => icon.name.toLowerCase() == "javascript")[0]
      .url,
    category: "frontend",
    description: {
      frontend:
        "Implementé la lógica de la página, manejando interacciones y funcionalidad dinámica.",
      backend: "",
    },
    type: "Lenguaje de programación",
  },
  html: {
    name: "HTML",
    url: iconsData.filter((icon) => icon.name.toLowerCase() == "html")[0].url,
    category: "frontend",
    description: {
      frontend: "Definir la estructura y contenido básico de la página.",
    },
    type: "Lenguaje web",
  },
  css: {
    name: "CSS",
    url: iconsData.filter((icon) => icon.name.toLowerCase() == "css")[0].url,
    category: "frontend",
    description: {
      frontend: "Diseñar y personalizar el estilo visual.",
    },
    type: "Lenguaje web",
  },
  react: {
    name: "React",
    url: iconsData.filter((icon) => icon.name.toLowerCase() == "react")[0].url,
    category: "frontend",
    description: {
      frontend:
        "Crear componentes reutilizables para organizar la estructura de la web.",
    },
    type: "Libreria de JavaScript",
  },
  redux: {
    name: "Redux",
    url: iconsData.filter((icon) => icon.name.toLowerCase() == "redux")[0].url,
    category: "frontend",
    description: {
      frontend:
        "Manejar el estado global de la aplicación para coordinar las acciones y datos.",
    },
    type: "Library for JavaScript",
  },
  framer_motion: {
    name: "Framer Motion",
    url: iconsData.filter(
      (icon) => icon.name.toLowerCase() == "framermotion"
    )[0].url,
    category: "frontend",
    description: {
      frontend:
        "Implementar animaciones suaves y atractivas a los elementos de la página.",
    },
    type: "React Library",
  },
  node: {
    name: "Node",
    url: iconsData.filter((icon) => icon.name.toLowerCase() == "node")[0].url,
    category: "backend",
    description: {
      backend:
        "Ejecutar el entorno del Back-End para manejar la lógica del servidor.",
    },
    type: "Entorno de ejecución",
  },
  express: {
    name: "Express",
    url: iconsData.filter((icon) => icon.name.toLowerCase() == "express")[0]
      .url,
    category: "backend",
    description: {
      backend:
        "Crear y manejar el servidor, definiendo rutas y controladores para gestionar solicitudes HTTP.",
    },
    type: "Framework de Node",
  },
  mongodb: {
    name: "MongoDB",
    url: iconsData.filter((icon) => icon.name.toLowerCase() == "mongodb")[0]
      .url,
    category: "backend",
    description: {
      backend: "Base de datos NoSQL para almacenar y gestionar datos.",
    },
    type: "Base de datos NoSQL",
  },
  mongoose: {
    name: "Mongoose",
    url: iconsData.filter((icon) => icon.name.toLowerCase() == "mongoose")[0]
      .url,
    category: "backend",
    description: {
      backend:
        "Facilitar la interacción con MongoDB mediante modelos y esquemas.",
    },
    type: "ODM (Object Data Modeling)",
  },
  postgresql: {
    name: "PostgreSQL",
    url: iconsData.filter((icon) => icon.name.toLowerCase() == "postgresql")[0]
      .url,
    category: "backend",
    description: {
      backend: "Base de datos relacional para manejar datos estructurados.",
    },
    type: "Base de datos SQL",
  },
  sequelize: {
    name: "Sequelize",
    url: iconsData.filter((icon) => icon.name.toLowerCase() == "sequelize")[0]
      .url,
    category: ["backend"],
    description: {
      backend:
        "Manejar la base de datos PostgreSQL con JavaScript, evitando escribir consultas SQL manuales.",
    },
    type: "ORM (Object-Relational Mapping) ",
  },
  jest: {
    name: "Jest",
    url: iconsData.filter((icon) => icon.name.toLowerCase() == "jest")[0].url,
    category: ["backend"],
    description: "",
  },
  firebase: {
    name: "Firebase",
    url: iconsData.filter((icon) => icon.name.toLowerCase() == "firebase")[0]
      .url,
    category: ["backend", "frontend"],
    description: "",
  },
};

const websiteType = {
  e_commerce: {
    es: "Tienda Online",
    en: "E-Commerce",
    style: {
      backgroundColor: "rgb(11, 59, 23)",
      color: "rgb(142, 255, 178)",
    },

    icon: () => {
      return (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            height="15"
            width="15"
            style={{ marginTop: "2px" }}
          >
            <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 0 0 7.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 0 0 4.902-5.652l-1.3-1.299a1.875 1.875 0 0 0-1.325-.549H5.223Z" />
            <path
              fillRule="evenodd"
              d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 0 0 9.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 0 0 2.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3Zm3-6a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-3Zm8.25-.75a.75.75 0 0 0-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-5.25a.75.75 0 0 0-.75-.75h-3Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      );
    },
  },

  taskManager: {
    es: "Pared de Notas",
    en: "Task Manager",
    style: {
      backgroundColor: "rgb(118, 36, 3)",
      color: "rgb(255, 125, 125)",
      border: "2px solid black",
    },
    icon: () => {
      return (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            height="15"
            width="15"
            style={{ marginTop: "2px" }}
          >
            <path
              fillRule="evenodd"
              d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      );
    },
  },
  weatherApp: {
    es: "App del clima",
    en: "Weather App",
    style: {
      backgroundColor: "rgb(8, 33, 79)",
      color: "rgb(142, 204, 255)",
    },
    icon: () => {
      return (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            height="15"
            width="15"
            style={{ marginTop: "2px" }}
          >
            <path
              fillRule="evenodd"
              d="M4.5 9.75a6 6 0 0 1 11.573-2.226 3.75 3.75 0 0 1 4.133 4.303A4.5 4.5 0 0 1 18 20.25H6.75a5.25 5.25 0 0 1-2.23-10.004 6.072 6.072 0 0 1-.02-.496Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      );
    },
  },
};

export const Projects = [
  {
    name: "Indico",
    id: "indico",
    getDescription() {
      return (
        <article>
          <h1>
            A WEBSITE CONCEPT
            {useViewportWidth() > 600 ||
              (useViewportWidth() < 400 && <br />)}{" "}
            FOR A ECO-FRIENDLY RESTAURANT
          </h1>
          <p>
            Designed with a focus on user experience, featuring database
            management and an intuitive interface.
          </p>
          <p>
            Fully designed and developed to showcasing <br /> Front-End and
            Back-End skills.
          </p>
        </article>
      );
    },
    type: websiteType.e_commerce,
    images: [
      {
        name: "Landing Page",
        mockup:
          "https://res.cloudinary.com/dnrprmypf/image/upload/q_0/v1734970234/Projects%20Images/Indico/Project%20View/Landingpage_mockup.webp",
        imageFullSize:
          "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:low/v1734970225/Projects%20Images/Indico/Project%20View/Landingpage.webp",
      },
      {
        name: "Store",
        mockup:
          "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:low/v1734642264/Projects%20Images/Indico/Project%20View/352_2x_shots_so_uas8hn.webp",
        imageFullSize:
          "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:low/v1732308472/Projects%20Images/Indico/Project%20View/eacae474-9615-4b47-b2ba-0fba4422a9a2.webp",
      },

      {
        name: "Reviews Page",
        mockup:
          "https://res.cloudinary.com/dnrprmypf/image/upload/q_0/v1734643017/Projects%20Images/Indico/Project%20View/reviews_mockup.webp",
        imageFullSize:
          "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:low/v1734643014/Projects%20Images/Indico/Project%20View/reviews.webp",
      },
      {
        name: "Login Page",
        mockup:
          "https://res.cloudinary.com/dnrprmypf/image/upload/q_0/v1734642567/Projects%20Images/Indico/Project%20View/login_mockup.webp",
        imageFullSize:
          "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:low/v1727383281/Projects%20Images/Indico/Project%20View/login.webp",
      },

      {
        name: "Register Page",
        mockup:
          "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:low/v1727382413/Projects%20Images/Indico/Project%20View/register_mockup.webp",
        imageFullSize:
          "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:low/v1727368918/Projects%20Images/Indico/Project%20View/register.webp",
      },
    ],
    iconURL:
      "https://res.cloudinary.com/dnrprmypf/image/upload/v1718654550/logo_Indico_white_vmxbxp.png",
    techStack_names: [
      "javascript",
      "html",
      "css",
      "react",
      "redux",
      "framer_motion",
      "node",
      "express",
      "mongodb",
      "mongoose",
    ],
    techStack_data: [],
    initTechStack() {
      this.techStack_data = this.techStack_names.map(
        (str) => technologies[str]
      );
    },
    style: {
      primaryColor: "rgb(178, 255, 187)",
      primaryColorDark: "rgb(4, 60, 0)",
      primaryColorLight: "rgb(236, 254, 235)",
      backgroundImageUrl:
        "https://res.cloudinary.com/dnrprmypf/image/upload/e_blur:1221,q_49/v1717532382/lucy-joy-Otc-BYz-A22z-M-unsplash_xydbrc.jpg",
      fontFamily: "Real Line",
      gridReverse: false,
      gridBackground:
        "https://images.unsplash.com/photo-1729636364314-877a914f223a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    links: {
      github: "https://github.com/pablofernz/indico-restaurant",
      website: "https://projectindico.vercel.app",
    },
    funFacts: ["This project has more than 20.000 lines of code"],
    dontOpen: false,
  },
  {
    name: "Nimbus",
    id: "nimbus",
    getDescription() {
      return (
        <article>
          <h1>
            A WEBSITE TO KNOW
            {useViewportWidth() > 600 ||
              (useViewportWidth() < 400 && <br />)}{" "}
            THE WEATHER ANYTIME, ANYWHERE
          </h1>
          <p>
            Stay updated with real-time forecasts, featuring detailed
            temperature insights and weather patterns.
          </p>
          <p>
            Designed to provide accurate data for <br /> planning your day with
            ease.
          </p>
        </article>
      );
    },
    type: websiteType.weatherApp,
    images: [
      {
        name: "Landing Page",
        mockup:
          "https://res.cloudinary.com/dnrprmypf/image/upload/q_0/v1734352742/Projects%20Images/Forecaster/4467d236-2b8f-4933-a0dc-26df2b3baca3.webp",
        imageFullSize:
          "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:low/v1734352742/Projects%20Images/Forecaster/4467d236-2b8f-4933-a0dc-26df2b3baca3.webp",
      },
      {
        name: "Weather Page",
        mockup:
          "https://res.cloudinary.com/dnrprmypf/image/upload/q_0/v1734352940/Projects%20Images/Forecaster/22b2bfb2-3db7-4896-b0a2-b40e0b438717.webp",
        imageFullSize:
          "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:good/v1734352940/Projects%20Images/Forecaster/22b2bfb2-3db7-4896-b0a2-b40e0b438717.webp",
      },
    ],
    iconURL: "text",
    techStack_names: [
      "javascript",
      "html",
      "css",
      "react",
      "framer_motion",
      "node",
      "express",
    ],
    techStack_data: [],
    initTechStack() {
      this.techStack_data = this.techStack_names.map(
        (str) => technologies[str]
      );
    },
    style: {
      primaryColor: "rgb(142, 204, 255)",
      primaryColorDark: "rgb(8, 33, 79)",
      primaryColorLight: "rgb(203, 228, 255)",
      backgroundImageUrl:
        "https://res.cloudinary.com/dnrprmypf/image/upload/e_blur:1221,q_49/v1717532382/lucy-joy-Otc-BYz-A22z-M-unsplash_xydbrc.jpg",
      fontFamily: "Trebuchet MS",
      gridReverse: true,
      gridBackground:
        "https://images.unsplash.com/photo-1556203337-17d0b169c3d1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    links: {
      github: "https://github.com/pablofernz/nimbus",
      website: "https://projectnimbus.vercel.app",
    },
    funFacts: ["this project barely survive"],
    dontOpen: false,
  },

  {
    name: "zen",
    id: "zen",
    getDescription() {
      return (
        <article>
          <h1>
            A PLACE TO ORGANIZE
            {useViewportWidth() > 600 ||
              (useViewportWidth() < 400 && <br />)}{" "}
            YOUR TASKS AND IDEAS EFFORTLESSLY
          </h1>
          <p>
            Stay productive with intuitive tools, helping you capture and
            prioritize your to-dos seamlessly.
          </p>
          <p>
            Designed to simplify your workflow and keep you focused on what
            matters most.
          </p>
        </article>
      );
    },
    type: websiteType.taskManager,
    images: [
      {
        name: "Landing Page",
        mockup:
          "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:low/v1736954867/Projects%20Images/Zen/Project%20View/landing_mockup.webp",
        imageFullSize:
          "https://res.cloudinary.com/dnrprmypf/image/upload/v1736954618/Projects%20Images/Zen/Project%20View/landing.webp",
      },
      {
        name: "Noteboard",
        mockup:
          "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:low/v1736955985/Projects%20Images/Zen/Project%20View/home_mockup.webp",
        imageFullSize:
          "https://res.cloudinary.com/dnrprmypf/image/upload/v1736955798/Projects%20Images/Zen/Project%20View/home.webp",
      },
      {
        name: "Login Modal",
        mockup:
          "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:low/v1736956150/Projects%20Images/Zen/Project%20View/login_mockup.webp",
        imageFullSize:
          "https://res.cloudinary.com/dnrprmypf/image/upload/v1736956134/Projects%20Images/Zen/Project%20View/login.png",
      },
    ],
    iconURL: "text",
    techStack_names: [
      "javascript",
      "html",
      "css",
      "react",
      "redux",
      "framer_motion",
      "node",
      "express",
      "mongodb",
      "mongoose",
      "firebase",
    ],
    techStack_data: [],
    initTechStack() {
      this.techStack_data = this.techStack_names.map(
        (str) => technologies[str]
      );
    },
    style: {
      primaryColor: "rgb(255, 87, 87)",
      primaryColorDark: "rgb(118, 36, 3)",
      primaryColorLight: "rgb(249, 126, 126)",
      gridBackground:
        "https://images.unsplash.com/photo-1516320654132-c3a74da4da5b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      fontFamily: "Trebuchet MS",
      gridReverse: false,
    },
    links: {
      github: "https://github.com/pablofernz/zen",
      website: "https://projectzen.vercel.app",
    },
    funFacts: ["You are not dreaming."],
    dontOpen: false,
  },
  {
    name: "???",
    id: "unknown",
    getDescription() {
      return (
        <article>
          <h1>
            A WEBSITE CONCEPT
            {useViewportWidth() > 600 ||
              (useViewportWidth() < 400 && <br />)}{" "}
            FOR A ECO-FRIENDLY RESTAURANT
          </h1>
          <p>
            Designed with a focus on user experience, featuring database
            management and an intuitive interface.
          </p>
          <p>
            Fully designed and developed to showcasing <br /> Front-End and
            Back-End skills.
          </p>
        </article>
      );
    },
    type: "",
    images: [],
    techStack_names: [],
    techStack_data: [],
    initTechStack() {
      this.techStack_data = this.techStack_names.map(
        (str) => technologies[str]
      );
    },
    dontOpen: true,
    comingSoon: true,
  },
];
Projects.forEach((project) => project.initTechStack());
