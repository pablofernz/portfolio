import axios from "axios"

export const LOADED = 'LOADED'
export const SECTION = 'SECTION'
export const GET_RECOMMENDATIONS = 'GET_RECOMMENDATIONS'
export const IS_VISIBLE = 'IS_VISIBLE'
export const ALERT_NEW_COMMENT = 'ALERT_NEW_COMMENT'
export const FORCE_UPDATE_COMMENTS = 'FORCE_UPDATE_COMMENTS'
export const OPEN_THE_CHATBOX = 'OPEN_THE_CHATBOX'
export const MODALS_STATES = 'MODALS_STATES'
export const HIDE_OR_SHOW_CIRCLE_CURSOR = 'HIDE_OR_SHOW_CIRCLE_CURSOR'
export const TEST = 'TEST'
export const BACKGROUND_MODAL_NEEDED = 'BACKGROUND_MODAL_NEEDED'

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
            const res = await axios.get("https://portfolio-backend-8kqa.onrender.com/recomendation/get")

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
    const response = await axios.put(`https://portfolio-backend-8kqa.onrender.com/admin/pinRecommendation/${id}`)

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

export const forceUpdateComments = () => {
    return function (dispatch) {
        dispatch({
            type: FORCE_UPDATE_COMMENTS,
        })
    }
}


export const openTheChatbox = (state) => {
    return function (dispatch) {
        dispatch({
            type: OPEN_THE_CHATBOX,
            payload: state
        })
    }
}
export const openCloseModals = (state) => {
    return function (dispatch) {
        dispatch({
            type: MODALS_STATES,
            payload: state
        })
    }
}

export const updateCursorOptions = (options) => {
    return function (dispatch) {
        dispatch({
            type: TEST,
            payload: options
        })
    }
}
export const backgroundModalNeeded = (boolean) => {
    return function (dispatch) {
        dispatch({
            type: BACKGROUND_MODAL_NEEDED,
            payload: boolean
        })
    }
}