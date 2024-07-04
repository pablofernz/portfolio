import { LOADED, SECTION, GET_RECOMMENDATIONS } from "./actions";

let initialstate = {
    isLoading: true,
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
        default:
            return { ...state }

    }
}

export default reducer;