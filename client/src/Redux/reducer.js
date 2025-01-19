import { SET_SECTION_LOADED, LOADED, SECTION, GET_RECOMMENDATIONS, ALERT_NEW_COMMENT, FORCE_UPDATE_COMMENTS, OPEN_THE_CHATBOX, MODALS_STATES, TEST, BACKGROUND_MODAL_NEEDED } from "./actions";

let initialstate = {
    sectionLoaded: { section1: true, section2: true, section3: true, section4: true, section5: true, footer: true },
    admin: false,
    isLoading: true,
    isNavbarVisible: true,
    section: "Home",
    recommendations: [],
    updateComments: true,
    newComment: false,
    chatbox: {
        isOpen: false
    },
    modalOpen: false,

    projectsData: [],
    backgroundModalNeeded: false,
    cursor: { isVisible: false, width: 8, heigth: 8, x: null, y: null, textContent: null }
};

let reducer = (state = initialstate, action) => {
    switch (action.type) {


        case SET_SECTION_LOADED:
            return {
                ...state,
                sectionLoaded: { ...state.sectionLoaded, [action.payload]: true }
            }

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



        case TEST:
            return {
                ...state,
                cursor: { ...state.cursor, ...action.payload }
            }

        case BACKGROUND_MODAL_NEEDED:
            return {
                ...state,
                backgroundModalNeeded: action.payload
            }




        default:
            return { ...state }

    }
}

export default reducer;