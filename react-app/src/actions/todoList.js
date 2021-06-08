import * as api from '../api/index.js';
// eslint-disable-next-line
import { CREATE, FETCH, UPDATE, DELETE } from '../constants/constantsType.js';
import { setSnackBar } from './snackbar.js';

// get all notes
export const getNotes = () => async (dispatch) => {
    try {
        const { data } = await api.fetchNotes();
        // dispatch action to get all notes
        dispatch({ type: FETCH, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

// create new note
export const createNote = (newNote) => async (dispatch) => {
    try {
        const { data } = await api.createNote(newNote);

        dispatch({ type: CREATE, payload: data });
        dispatch(setSnackBar(true, "success", "SUCCESSFULLY CREATED"));

    } catch (error) {
        console.log(error.message);
    }
};

// update current note
export const updateNote = (id, updatedNote) => async (dispatch) => {
    try {
        const { data } = await api.updateNote(id, updatedNote);

        dispatch({ type: UPDATE, payload: data });
        dispatch(setSnackBar(true, "success", "SUCCESSFULLY UPDATED"));

    } catch (error) {
        console.log(error.message);
    }
};

// delete current note
export const deleteNote = (id) => async (dispatch) => {
    try {
        await api.deleteNote(id);

        dispatch({ type: DELETE, payload: id });
        dispatch(setSnackBar(true, "success", "SUCCESSFULLY DELETED"));

    } catch (error) {
        console.log(error.message);
    }
};