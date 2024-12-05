import { Button, Checkbox, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import '../App.css';
import './addmovie.css';
import { useEffect, useState } from 'react';
import React from 'react';
import NoImage from '../assets/no-image.jpg';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LoadingButton from '@mui/lab/LoadingButton';
import validator from 'validator';
import API_URL from '../apiconfig';

// Static array of genres
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

// Screen with form for adding/updating movie
function AddMovie({setTab, currentMovie, updateMode, setUpdateMode}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const thisYear = new Date().getFullYear();

  // Initialize empty form
  const [ formData, setFormData] = useState({
    title: "",
    voLang: "",
    subLang: "",
    duration: "",
    year: "",
    genres: [],
    posterUrl: ""
  });

  useEffect(()=>{
    if(updateMode){ // If updateMode is set enabled, fill form with selected movie
      const newFormData = {...formData, ...currentMovie};
      setFormData(newFormData);
    }
  }, [updateMode]);

  // Holds state (invalid or not) for each input field
  const [ errorFields, setErrorFields] = useState({
    title: false,
    voLang: false,
    subLang: false,
    duration: false,
    year: false,
    genres: false,
    posterUrl: false,
  });

  // Runs when any field is changed
  const handleChange = (event) => {
    const { name, value } = event.target;
    if(name === "genres"){
      if(typeof value === 'string'){
        const newFormData = {...formData,[name]: value.split(',')};
        setFormData(newFormData);
      }
      else{
        const newFormData = {...formData,[name]: value};
        setFormData(newFormData);
      }
    }
    else{
      const newFormData = {...formData,[name]: value};
      setFormData(newFormData);
    }
  }

  // Runs when form is submitted
  const handleSubmit = async ()=>{
    setLoading(true);
    setError("");
    const newErrorFields = {
      title: false,
      voLang: false,
      subLang: false,
      duration: false,
      year: false,
      genres: false,
      posterUrl: false,
    };

    //Validation
    if(formData.title.length < 1){
      newErrorFields.title = true;
    }
    if(isNaN(parseInt(formData.year)) || parseInt(formData.year) < 1800 || parseInt(formData.year) > thisYear){
      newErrorFields.year = true;
    }
    if(isNaN(parseInt(formData.duration)) || parseInt(formData.duration) < 1){
      newErrorFields.duration = true;
    }
    if(formData.voLang.length < 1){
      newErrorFields.voLang = true;
    }
    if(formData.posterUrl.length > 0){
      if(validator.isURL(formData.posterUrl) == false){
        newErrorFields.posterUrl = true;
      }
    }
    setErrorFields(newErrorFields);

    // Cancel submitting form if any field is invalid
    if(Object.values(newErrorFields).some(value => value === true)){
      setLoading(false);
      return;
    }
    else{
      const dataToSend = JSON.stringify(formData);
      try {
        let response;
        if(updateMode){ // Runs when form is in update mode
          response = await fetch(API_URL+"/api/update/"+currentMovie._id, {
            headers: {
            'Content-Type': 'application/json'
            },
            method: "PATCH",
            body: dataToSend,
          });
        }
        else{ // Runs when form is for adding new movie
          response = await fetch(API_URL+"/api/add", {
            headers: {
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: dataToSend,
          });
        }
        const data = await response.json();
        setLoading(false);
        if(!response.ok){
          setError(data.message);
        }
        else{
          setError("");
          setUpdateMode(false);
          setTab(0);
        }
      }
      catch (e) {
        setError(e.message);
        setLoading(false);
      }
    }    
  }

  return (
    <div id='addMovie'>
        <FormControl id="form" variant="outlined">
          <div className="formContainers">
            <TextField error={errorFields.title} helperText={errorFields.title ? "Title is required" : ''} name="title" slotProps={{ input: { className: "inputs" }, inputLabel: { className: "labels" } }} className="fields" label="Movie Title" value={formData.title} variant="outlined" type="text" onChange={handleChange} required />
          </div>
          <div className="formContainers">
            <TextField error={errorFields.year} helperText={errorFields.year ? "Year must be between 1800 and"+thisYear : ''} name="year" slotProps={{ input: { className: "inputs" }, inputLabel: { className: "labels" } }} className="fields" label="Release Year" value={formData.year} variant="outlined" type="number" onChange={handleChange} required />
            <TextField error={errorFields.duration} helperText={errorFields.duration ? "Duration must be a number" : ''} name="duration" slotProps={{ input: { className: "inputs" }, inputLabel: { className: "labels" } }} className="fields" label="Duration (minutes)" value={formData.duration} variant="outlined" type="number" onChange={handleChange} required />
          </div>
          <div className="formContainers">
            <TextField error={errorFields.voLang} helperText={errorFields.voLang ? "Language is required" : ''} name="voLang" slotProps={{ input: { className: "inputs" }, inputLabel: { className: "labels" } }} className="fields" label="Language" variant="outlined" value={formData.voLang} type="text" onChange={handleChange} required />
            <TextField name="subLang" slotProps={{ input: { className: "inputs" }, inputLabel: { className: "labels" } }} className="fields" label="Subtitles language" variant="outlined" value={formData.subLang} type="text" onChange={handleChange} />
          </div>
          <div className="formContainers">
            <div className="fields" id="sideFields">
              <TextField error={errorFields.posterUrl} helperText={errorFields.posterUrl ? "Incorrect URL to image" : ''} name="posterUrl" slotProps={{ input: { className: "inputs" }, inputLabel: { className: "labels" } }} className="fields" label="Movie Poster URL" variant="outlined" value={formData.posterUrl} type="text" onChange={handleChange} />
              <FormControl style={{flexDirection: "row"}} variant="outlined">
              <Select
                multiple
                displayEmpty
                className="fields"
                name="genres"
                value={formData.genres}
                onChange={handleChange}
                input={<OutlinedInput />}
                label="Genres"
                renderValue={(selected)=> "Genres"}
                slotProps={{ input: { className: "inputs" }}}
              >
                <MenuItem disabled value="">
                  Genres
                </MenuItem>
                {movieGenres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    <Checkbox checked={formData.genres.includes(genre)} />
                    <ListItemText primary={genre} />
                  </MenuItem>
                ))}
              </Select>
              </FormControl>
              <List dense={true} className="fields">
                  {formData.genres.map((genre) => (
                    <ListItem key={genre}>
                      <ListItemText
                        primary={genre}
                      />
                    </ListItem>
                  ))}
              </List>
              <p className="errorMessage">{error}</p>
              <LoadingButton
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                onClick={handleSubmit}
                loading={loading}
                loadingPosition="start"
                fullWidth={true}
              >
                {updateMode ? "Update Movie" : "Add Movie"}
              </LoadingButton>
            </div>
            <div id="posterDiv" className="fields"><img src={formData.posterUrl !== "" ? formData.posterUrl : NoImage} alt="Poster" /></div>
          </div>
        </FormControl>
    </div>
  );
}

export default AddMovie;
