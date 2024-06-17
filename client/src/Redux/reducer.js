import { LOADED, SECTION } from "./actions";

let initialstate = {
    isLoading: true,
    section: "home"
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

        default:
            return { ...state }

    }
}

export default reducer;