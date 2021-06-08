import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grow, Typography, Grid, Divider, TableRow, TableCell, Paper, TableContainer, Table, TableHead, TableBody, Button, Tooltip, Dialog, DialogContent, DialogTitle, DialogActions, TextField } from '@material-ui/core';
import useStyle from './styles.js';
import AddIcon from '@material-ui/icons/Add';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import { createNote, getNotes, deleteNote, updateNote } from '../../actions/todoList.js';
import moment from 'moment';


const Dashboard = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [currentId, setCurrentId] = useState(0);
    const [noteData, setNoteData] = useState({ note: '' });

    const user = JSON.parse(localStorage.getItem('profile'));

    const notes = useSelector((state) => {
        console.log(state);
        return state.todolist;
    });

    const n = useSelector((state) => currentId ? state.todolist.find((n) => n._id_Note === currentId) : null);

    useEffect(() => {
        dispatch(getNotes());
        if (n) setNoteData(n);
    }, [dispatch, n]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentId(0);
        setNoteData({ note: '' });
    };

    // dispatch to create/update note
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentId === 0) {
            // create
            dispatch(createNote(noteData));
        } else {
            // update
            dispatch(updateNote(currentId, noteData));
        }
        handleClose();
    };

    const onChange = (e) => setNoteData({ ...noteData, [e.target.name]: e.target.value });

    return (
        <Grow in>
            {
                !user ? (
                    <Container className={classes.mainContainer}>
                        <Typography variant="h4" style={{ padding: '10px 0px 10px 50px' }}>Your Notes</Typography>
                        <Divider style={{ margin: 20 }} />
                        <Grid container justify="center" alignItems="center" spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h5">YOU ARE NOT AUTHORIZED . . .</Typography>
                            </Grid>
                        </Grid>
                    </Container>
                ) : (
                    <Container className={classes.mainContainer}>
                        <Typography variant="h4" style={{ padding: '10px 0px 10px 50px' }}>Your Notes</Typography>
                        <Divider style={{ margin: 20 }} />

                        <Grid container justify="space-around" alignItems="center" spacing={3}>
                            <Grid item xs={12} md={7}>
                                <Typography variant="h5" style={{ padding: '10px 0px 10px 50px' }}>Welcome {user?.profile.name}</Typography>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Button onClick={handleClickOpen} ><Tooltip title="create"><AddIcon fontSize='large' color='primary' /></Tooltip></Button>
                                <Dialog fullWidth maxWidth='sm' open={open} onClose={handleClose}>
                                    <DialogTitle>{!currentId ? "Create New" : "Update Current"} Note</DialogTitle>
                                    <DialogContent>
                                        <TextField name="note" variant="outlined" label={!currentId ? "Create New Note" : "Update Current Note"} fullWidth value={noteData.note} onChange={onChange} />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button type="submit" variant='contained' color='primary' onClick={handleSubmit}>{!currentId ? "Create" : "Update"}</Button>
                                        <Button variant='contained' onClick={handleClose} color="secondary">Close</Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" alignItems="center" spacing={3}>
                            <Grid item xs={12} md={8} sm={6}>
                                <div style={{ height: '100%', width: '100%' }}>
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">Number</TableCell>
                                                    <TableCell align="center">Note</TableCell>
                                                    <TableCell align="left">Created At</TableCell>
                                                    <TableCell align="left">Update</TableCell>
                                                    <TableCell align="center">Delete</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {notes?.map((element) => (
                                                    <TableRow key={element.id_Note}>
                                                        <TableCell component="th" scope="row" align="center">{notes.indexOf(element) + 1}</TableCell>
                                                        <TableCell align="center">{element.note}</TableCell>
                                                        <TableCell align="left">{moment(element.createdAt).format("L")}</TableCell>
                                                        <TableCell align="left">
                                                            <Button onClick={() => { handleClickOpen(); setCurrentId(element.id_Note); }}><Tooltip title="update"><UpdateIcon fontSize='default' color='primary' /></Tooltip></Button>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Button onClick={() => dispatch(deleteNote(element.id_Note))}><Tooltip title="delete"><DeleteIcon fontSize='default' color='primary' /></Tooltip></Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                )
            }
        </Grow >

    )
}

export default Dashboard;
