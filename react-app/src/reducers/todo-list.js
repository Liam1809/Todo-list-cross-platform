import { FETCH, CREATE, UPDATE, DELETE } from '../constants/constantsType.js';

const todoList = (todoList = [], action) => {
    switch (action.type) {
        case FETCH:
            return todoList;
        case CREATE:
            return todoList;
        case UPDATE:
            return todoList;
        case DELETE:
            return todoList;
        default:
            return todoList;
    }
};

export default todoList;