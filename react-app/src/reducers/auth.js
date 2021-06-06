import { AUTH, LOGOUT } from '../constants/constantsType.js';

const auth = (state = {}, action) => {
    switch (action.type) {
        case AUTH:
            return state;
        case LOGOUT:
            return state;
        default:
            return state;
    }
};

export default auth;