import { Checkbox, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import '@fontsource/roboto/400.css';
import '../App.css';
import './addmovie.css';
import { useState } from 'react';
import React from 'react';
import NoImage from '../assets/no-image.jpg';

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

function AddMovie() {
  const [movieTitle, setMovieTitle ] = useState("");
  const [voLang, setVoLang ] = useState("");
  const [subLang, setSubLang ] = useState("");
  const [duration, setDuration ] = useState("");
  const [year, setYear ] = useState("");
  const [genres, setGenres ] = useState([]);
  const [posterUrl, setPosterUrl ] = useState("");

  const handleUrl = (e) => {
    console.log(e);
    setPosterUrl(e.target.value);
  }

  const handleGenres = (e) => {
    console.log(e);
    setGenres(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value);
  }

  return (
    <div id='addMovie'>
        <FormControl id="form" variant="outlined">
          <div className="formContainers">
            <TextField slotProps={{ input: { className: "inputs" }, inputLabel: { className: "labels" } }} className="fields" label="Movie Title" value={movieTitle} variant="outlined" type="text" onChange={(e)=>setMovieTitle(e.target.value)} required />
          </div>
          <div className="formContainers">
            <TextField slotProps={{ input: { className: "inputs" }, inputLabel: { className: "labels" } }} className="fields" label="Release Year" value={year} variant="outlined" type="number" onChange={(e)=>setYear(e.target.value)} required />
            <TextField slotProps={{ input: { className: "inputs" }, inputLabel: { className: "labels" } }} className="fields" label="Duration (minutes)" value={duration} variant="outlined" type="number" onChange={(e)=>setDuration(e.target.value)} required />
          </div>
          <div className="formContainers">
            <TextField slotProps={{ input: { className: "inputs" }, inputLabel: { className: "labels" } }} className="fields" label="Language" variant="outlined" value={voLang} type="text" onChange={(e)=>setVoLang(e.target.value)} required />
            <TextField slotProps={{ input: { className: "inputs" }, inputLabel: { className: "labels" } }} className="fields" label="Subtitles language" variant="outlined" value={subLang} type="text" onChange={(e)=>setSubLang(e.target.value)} />
          </div>
          <div className="formContainers">
            <div className="fields" id="sideFields">
              <TextField slotProps={{ input: { className: "inputs" }, inputLabel: { className: "labels" } }} className="fields" label="Movie Poster URL" variant="outlined" value={posterUrl} type="text" onChange={handleUrl} />
              <FormControl style={{flexDirection: "row"}} variant="outlined">
              <Select
                multiple
                displayEmpty
                className="fields"
                value={genres}
                onChange={handleGenres}
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
                    <Checkbox checked={genres.includes(genre)} />
                    <ListItemText primary={genre} />
                  </MenuItem>
                ))}
              </Select>
              </FormControl>
              <List dense={true} className="fields">
                  {genres.map((genre) => (
                    <ListItem key={genre}>
                      <ListItemText
                        primary={genre}
                      />
                    </ListItem>
                  ))}
              </List>
            </div>
            <div id="posterDiv" className="fields"><img src={posterUrl !== "" ? posterUrl : NoImage} alt="Poster" /></div>
          </div>
        </FormControl>
    </div>
  );
}

export default AddMovie;
