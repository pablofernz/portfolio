import { LOADED, SECTION, GET_RECOMMENDATIONS, IS_VISIBLE } from "./actions";

let initialstate = {
    isLoading: true,
    isNavbarVisible: true,
    section: "home",
    recommendations: []

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

        case IS_VISIBLE:
            return {
                ...state,
                isNavbarVisible: action.payload
            }
        default:
            return { ...state }

    }
}

export default reducer;