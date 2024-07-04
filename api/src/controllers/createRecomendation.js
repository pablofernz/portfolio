const RecomendationSchema = require("../models/Recomendation")

const recomendationAdd = async ({ nameAndLastname, email, occupation, placeOfWork, socialMedia, image, message }) => {
    const getDay = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}`;
        return formattedDateTime
    }
    try {
        const newRecomendation = new RecomendationSchema({ nameAndLastname, email, occupation, placeOfWork, socialMedia, message, image, date: getDay() });

        const savedRecomendation = await newRecomendation.save();

        console.log("Creado exitosamente");
        return savedRecomendation;

    } catch (error) {
        console.error("Error al crear", error);
        throw error; // Lanza el error para que se maneje en la función llamante
    }
};


module.exports = recomendationAdd