import { LOADED, SECTION, END_ANIMATION } from "./actions";

let initialstate = {
    isLoading: true,
    section: "home",
    iconOutsideViewport: ""
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

        case END_ANIMATION:
            return {
                ...state,
                iconOutsideViewport: action.payload
            }
        default:
            return { ...state }

    }
}

export default reducer;