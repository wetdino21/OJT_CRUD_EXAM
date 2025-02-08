export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

export const register = (userData) => (dispatch) => {
    // Simulating API call (Replace this with actual API request)
    setTimeout(() => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: userData, // Store user data in Redux state
        });
    }, 1000);
};

