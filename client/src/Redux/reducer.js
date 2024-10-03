import { LOADED, SECTION, GET_RECOMMENDATIONS, ALERT_NEW_COMMENT, FORCE_UPDATE_COMMENTS, OPEN_THE_CHATBOX, MODALS_STATES } from "./actions";

let initialstate = {
    sectionLoaded: { section1: true, section2: true, section3: false, section4: true, section5: false, footer: false },
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
    modalOpen: false,

    projectsData: []
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
            return {
                ...state,
                chatbox: {
                    isOpen: action.payload !== undefined ? action.payload : !state.chatbox.isOpen
                }
            }


        case MODALS_STATES:
            return {
                ...state,
                modalOpen: action.payload
            }


        default:
            return { ...state }

    }
}

export default reducer;