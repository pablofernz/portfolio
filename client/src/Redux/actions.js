import axios from "axios"


export const LOADED = 'LOADED'
export const SECTION = 'SECTION'
export const END_ANIMATION = 'END_ANIMATION'

export const setLoaded = () => {
    return async function (dispatch) {
        dispatch({
            type: LOADED
        })
    }
}

export const setSection = (section) => {
    return async function (dispatch) {
        dispatch({
            type: SECTION,
            payload: section
        })
    }
}

export const setAnimacionEnd = (icon) => {
    return async function (dispatch) {
        dispatch({
            type: END_ANIMATION,
            payload: icon
        })
    }
}


export const getRecommendations = async () => {

    try {
        const res = await axios.get("http://localhost:3001/recomendation/get")

        return res.data
    } catch (error) {
        return error
    }
}