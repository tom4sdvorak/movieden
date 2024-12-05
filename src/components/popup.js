import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import '../App.css';
import './popup.css';
import { Checkbox, FormControl, Input, ListItemText, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import validator from 'validator';
import API_URL from '../apiconfig';
import { useState } from 'react';
import React from 'react';
import { LoadingButton } from '@mui/lab';

const movieGenres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Science Fiction",
    "Thriller",
    "War",
    "Western",
  ];

// Dialog window for individual movie informations
export default function PopUp({isOpen, setIsOpen, movie, setTab, setUpdateMode}) {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Runs when user clicks on Update button
    const handleUpdate = () => {
        setIsOpen(false); // Closes dialog
        setUpdateMode(true); // Sets Add Movie tab to Update mode
        setTab(1); // Opens Add Movie tab
    };

    // Runs when user clicks on Delete button
    const handleDelete = async (id) => {
        setLoading(true);
        // Attempts to delete movie by calling API
        try {
            const response = await fetch(API_URL+"/api/delete/"+id, {
            method: "DELETE",
            });
            if(!response.ok){
                setError("Something went wrong!");
            }
            else{
                setError("");
                setTab(0);
            }
        }
        catch (e){
            setError(e.message);
            setLoading(false);
        }
        setLoading(false);
        setIsOpen(false);
    };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
        <>
            {movie === undefined ? null :
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>{movie?.title+" ("+movie?.year+")"}</DialogTitle>
                <DialogContent dividers>
                    <Typography>
                        <b>Duration:</b> {movie?.duration} minutes
                    </Typography>
                    <Typography>
                        <b>Language:</b> {movie?.voLang} | <b>Subtitles:</b> {movie?.subLang}
                    </Typography>
                    <Typography>
                        <b>Genres:</b> {movie?.genres === undefined ? "" : (movie?.genres).join(", ")}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdate} variant="outlined">Update</Button>
                    <LoadingButton
                        component="label"
                        variant="outlined"
                        onClick={()=>handleDelete(movie?._id)}
                        loading={loading}
                        loadingPosition="center"
                        color="error"
                    >Delete
                    </LoadingButton>
                </DialogActions>
            </Dialog>
            }
        </>
  );
}