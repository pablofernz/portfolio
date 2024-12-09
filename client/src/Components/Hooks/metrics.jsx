import axios from "axios";
import { useEffect, useState } from "react";
import { Projects } from "../../Views/Landing/Sections/section4/projects";
export function Metrics() {
  const project = Projects.map((project) => project.name.toLowerCase());

  const [userData, setUserData] = useState({
    firstVisit: undefined,
    id: undefined,
    projects: [],
  });

  // Función para actualizar el contador de vistas
  const updateViewsCount = async () => {
    try {
      const { data } = await axios.post(
        "https://portfolio-backend-8kqa.onrender.com/metrics/views"
      );
      setUserData((prevData) => ({
        ...prevData,
        id: data.pageViews,
      }));
    } catch (error) {
      console.error("Error updating views count:", error);
    }
  };

  // Función que carga los datos de localStorage y actualiza firstVisit si es necesario
  const loadUserData = () => {
    const storedData = localStorage.getItem("user_data");

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      // Si los datos ya existen, mantenemos todo igual pero marcamos firstVisit como false
      setUserData({
        ...parsedData,
        firstVisit: false,
      });
    } else {
      // Si no hay datos en localStorage, es la primera visita
      setUserData((prevData) => ({ ...prevData, firstVisit: true }));
      updateViewsCount();
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  // Effect para guardar los datos actualizados en localStorage cuando cambie userData
  useEffect(() => {
    if (userData.firstVisit !== undefined) {
      localStorage.setItem("user_data", JSON.stringify(userData));
    }
  }, [userData]);

  return null;
}
