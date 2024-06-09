import axios from "axios"
export const GET_USERS = 'GET_USERS'

export const getUsers = () => {
    return async function (dispatch) {
        const response = await axios.get('http://localhost:3001/user/get')
        const users = response.data

        dispatch({
            type: GET_USERS,
            payload: users
        })
    }
}
