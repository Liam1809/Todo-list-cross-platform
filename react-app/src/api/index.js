import axios from 'axios';

const API = axios.create({ baseURL: 'https://d8dzz6njlf.execute-api.us-east-1.amazonaws.com/dev' });

// send token back to server to verify authentication
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    console.log(req);
    return req;
});

// API REQUESTS to retrieve TodoLists from server
export const fetchNotes = () => API.get('/todoLists/get-notes');
export const createNote = (newNote) => API.post('/todoLists/create-note', newHD);
export const updateNote = (id, updatedNote) => API.patch(`/todoLists/update-note/${id}`, updatedNote);
export const deleteNote = (id) => API.delete(`/todoLists/delete-note/${id}`);

// API REQUESTS to retrieve Authentication from servers
export const signIn = (FormData) => API.post('/users/login', FormData);
export const signUp = (FormData) => API.post('/users/register', FormData);