
import { REGISTER_SUCCESS } from "../actions/authActions";

const initialState = {
    isAuthenticated: false,
    user: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;

