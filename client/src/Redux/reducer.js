import { LOADED, SECTION, GET_RECOMMENDATIONS, ALERT_NEW_COMMENT } from "./actions";

let initialstate = {
    isLoading: true,
    isNavbarVisible: true,
    section: "home",
    recommendations: [],
    newComment: false
};

let reducer = (state = initialstate, action) => {
    switch (action.type) {
        case LOADED:
            return {
                ...state,
                isLoading: false
            }

        case SECTION:
            return {
                ...state,
                section: action.payload
            }

        case GET_RECOMMENDATIONS:
            return {
                ...state,
                recommendations: action.payload
            }

        case ALERT_NEW_COMMENT:
            return {
                ...state,
                newComment: !newComment
            }
        default:
            return { ...state }

    }
}

export default reducer;