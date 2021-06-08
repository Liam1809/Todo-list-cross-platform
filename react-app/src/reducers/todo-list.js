import { FETCH, CREATE, UPDATE, DELETE } from '../constants/constantsType.js';

const todoList = (todoList = [], action) => {
    switch (action.type) {
        case FETCH:
            return action.payload;
        case CREATE:
            return [...todoList, action.payload];
        case UPDATE:
            return todoList.map(note => note.id_Note === action.payload.id_Note ? action.payload : note);
        case DELETE:
            return todoList.filter(note => note.id_Note !== action.payload);
        default:
            return todoList;
    }
};

export default todoList;