import iconsData from "../../../../assets/icons/iconsData.js";

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

  globalChat: {
    es: "Chat Global",
    en: "Global Chat",
    style: {
      backgroundColor: "rgb(25, 11, 59)",
      color: "rgb(175, 163, 255)",
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
};

export const Projects = [
  {
    name: "Indico",
    id: "indico",
    description: "",
    type: websiteType.e_commerce,
    images: [
      {
        name: "Landing Page",
        mockup:
          "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:low/v1727365038/Projects%20Images/Indico/Landing_Page_Mockup.png",
        imageFullSize:
          "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:low/v1718655325/Projects%20Images/Indico/Landing_Page.png",
      },

      {
        name: "Login Page",
        mockup:
          "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:low/v1727383218/Projects%20Images/Indico/login_mockup.png",
        imageFullSize:
          "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:low/v1727383281/Projects%20Images/Indico/login.png",
      },

      {
        name: "Register Page",
        mockup:
          "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:low/v1727382413/Projects%20Images/Indico/register_mockup.png",
        imageFullSize:
          "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:low/v1727368918/Projects%20Images/Indico/register.png",
      },
      {
        name: "Account Page",
        mockup:
          "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:low/v1727382865/Projects%20Images/Indico/account_mockup.png",
        imageFullSize:
          "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:good/v1727382908/Projects%20Images/Indico/account.png",
      },
    ],
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
      backgroundImageUrl:
        "https://res.cloudinary.com/dnrprmypf/image/upload/e_blur:1221,q_49/v1717532382/lucy-joy-Otc-BYz-A22z-M-unsplash_xydbrc.jpg",
      fontFamily: "Real Line",
    },
    github_link: "https://github.com/pablofernz/indico-restaurant",
    dontOpen: false,
  },
  {
    name: "Globber",
    id: "globber",
    description: "",
    type: websiteType.globalChat,
    images: [],
    techStack_names: [
      "javascript",
      "react",
      "redux",
      "html",
      "css",
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
      primaryColor: "rgb(175, 163, 255)",
      fontFamily: "Basier Square",
    },
    github_link: "",
    dontOpen: true,
  },
  {
    name: "Unknown1",
    id: "unknown1",
    description: "",
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
  },
  {
    name: "Unknown2",
    id: "unknown2",
    description: "",
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
  },
];
Projects.forEach((project) => project.initTechStack());
