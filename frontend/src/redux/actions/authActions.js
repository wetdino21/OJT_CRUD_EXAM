export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";
export const DELETE_SUCCESS = "DELETE_SUCCESS";

// Register action
export const register = (userData) => (dispatch) => {
    // Simulating API call (Replace this with actual API request)
    setTimeout(() => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: userData, // Store user data in Redux state
        });
    }, 1000);
};

// Login action
export const login = (userData) => (dispatch) => {
    // Simulating API call (Replace this with actual API request)
    setTimeout(() => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: userData, // Store user data in Redux state
        });
    }, 1000);
};

// Update action
export const update = (userData) => (dispatch) => {
    // Simulating API call (Replace this with actual API request)
    setTimeout(() => {
        dispatch({
            type: UPDATE_SUCCESS,
            payload: userData, // Update user data in Redux state
        });
    }, 1000);
};

// Delete action
export const deleteUser = (userId) => (dispatch) => {
    // Simulating API call (Replace this with actual API request)
    setTimeout(() => {
        dispatch({
            type: DELETE_SUCCESS,
            payload: userId, // Remove user data from Redux state
        });
    }, 1000);
};

