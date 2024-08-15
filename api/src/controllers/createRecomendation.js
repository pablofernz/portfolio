const RecomendationSchema = require("../models/Recomendation")
const cloudinary = require('cloudinary').v2;
require("dotenv").config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
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
        let imageUrl = undefined;

        if (image !== "") {
            const result = await cloudinary.uploader.upload(image, {
                folder: 'Portfolio user photos',
                resource_type: 'image'
            });
            imageUrl = result.secure_url;
        }

        const newRecomendation = new RecomendationSchema({
            nameAndLastname,
            occupation,
            workData,
            socialMedia,
            comment,
            image: imageUrl,
            date: getDay()
        });

        const savedRecomendation = await newRecomendation.save();




        return true;

    } catch (error) {

        return error.message;
    }
};


module.exports = recomendationAdd