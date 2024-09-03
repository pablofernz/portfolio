import { LOADED, SECTION, GET_RECOMMENDATIONS, ALERT_NEW_COMMENT, FORCE_UPDATE_COMMENTS, OPEN_THE_CHATBOX } from "./actions";

let initialstate = {
    admin: true,
    isLoading: true,
    isNavbarVisible: true,
    section: "home",
    recommendations: [],
    updateComments: true,
    newComment: false,
    chatbox: {
        isOpen: false
    },
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

        case FORCE_UPDATE_COMMENTS:

            return {
                ...state,
                updateComments: !state.updateComments
            }

        case OPEN_THE_CHATBOX:
            console.log(action.payload)
            return {
                ...state,
                chatbox: {
                    isOpen: action.payload !== undefined ? action.payload : !state.chatbox.isOpen
                }
            }


        default:
            return { ...state }

    }
}

export default reducer;