import axios from "axios"

export const LOADED = 'LOADED'
export const SECTION = 'SECTION'
export const GET_RECOMMENDATIONS = 'GET_RECOMMENDATIONS'
export const IS_VISIBLE = 'IS_VISIBLE'
export const ALERT_NEW_COMMENT = 'ALERT_NEW_COMMENT'

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
            const res = await axios.get("https://portfolio-back-nnl5.onrender.com/recomendation/get")

            dispatch({
                type: GET_RECOMMENDATIONS,
                payload: res.data
            })
        } catch (error) {
            return error
        }
    }
}

export const changePinnedValue = async (id) => {
    const response = await axios.put(`https://portfolio-back-nnl5.onrender.com/admin/pinRecommendation/${id}`)

    try {
        if (!id) return "No id"

    } catch (error) {
        console.log(error)
    }
}

export const setVisibleNavbar = (isVisible) => {
    return function (dispatch) {
        dispatch({
            type: IS_VISIBLE,
            payload: isVisible
        })
    }
}

export const alertNewComment = () => {
    return function (dispatch) {
        dispatch({
            type: ALERT_NEW_COMMENT,
        })
    }
}