const RecomendationSchema = require("../models/Recomendation")

const recomendationAdd = async ({ nameAndLastname, occupation, workData, socialMedia, image, comment }) => {
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
        const newRecomendation = new RecomendationSchema({
            nameAndLastname,
            occupation,
            workData,
            socialMedia,
            comment,
            image,
            date: getDay()
        });

        await newRecomendation.save();
        return true;

    } catch (error) {

        return error.message;
    }
};


module.exports = recomendationAdd