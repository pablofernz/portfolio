import axios from "axios"


export const LOADED = 'LOADED'
export const SECTION = 'SECTION'
export const GET_RECOMMENDATIONS = 'GET_RECOMMENDATIONS'
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

export const fetchRecommendations = () => {
    return async function (dispatch) {
        try {
            const res = await axios.get("http://localhost:3001/recomendation/get")

            dispatch({
                type: GET_RECOMMENDATIONS,
                payload: res.data
            })
        } catch (error) {
            return error
        }
    }
}