import { SET_SNACKBAR } from '../constants/constantsType.js';

// initial state snackbar
const initial = {
    snackbarOpen: false,
    snackbarType: "success",
    snackbarMessage: ""
};

// store notification to state
const snackbar = (state = initial, action) => {
    switch (action.type) {
        case SET_SNACKBAR:
            const { snackbarOpen, snackbarType, snackbarMessage } = action.payload;
            return { ...state, snackbarOpen, snackbarType, snackbarMessage };
        default:
            return state;
    }
};

export default snackbar;