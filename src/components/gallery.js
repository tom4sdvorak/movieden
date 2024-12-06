import { Card, CardActionArea, CardContent, CardMedia, Typography, CircularProgress, Checkbox, FormControl, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import React, { useEffect, useState } from 'react';
import NoImage from '../assets/no-image.jpg';
import '../App.css';
import './gallery.css';
import PopUp from './popup';
import API_URL from '../apiconfig';

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

// Screen with gallery of all movies received from API
function Gallery({setTab, currentMovie, setCurrentMovie, setUpdateMode}) {
    const [ movies, setMovies ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ isOpen, setIsOpen ] = useState(false); // Controls state of dialog window
    const [ selectedGenres, setSelectedGenres ] = useState([]);
    const [ filteredMovies, setFilteredMovies ] = useState([]);
    
    // Grabs movies from API
    const fetchMovies = async () =>{
        try{
            const response = await fetch(API_URL+"/api/getall");
            const data = await response.json();
            setMovies(data);
            setFilteredMovies(data);
        }
        catch (e){
            console.log(e);
        }
        setLoading(false);
    }

    useEffect(()=>{
        fetchMovies();
    }, []);

    // Runs individual movie card is clicked, opens dialog window for that movie
    const handleCardClick = (movie) => {
        setCurrentMovie(movie);
        setIsOpen(true);
    }

    // Runs when selector is changed
    const handleChange = (event) => {
        const { name, value } = event.target;
        if(typeof value === 'string'){
            setSelectedGenres(value.split(','));
        }
        else{
            setSelectedGenres(value);
        }
    }

    // Run when user changed selected genres
    useEffect(()=>{
        filterMovies();
    }, [selectedGenres])

    // Runs when user filters by genres
    const filterMovies = () => {
        if(selectedGenres.length > 0){
            const newMoviesList = movies.filter((movie) => { // Filter array of movies, checking for each
                return selectedGenres.some(genre => movie.genres.includes(genre)); // if their genres array has some element from selectedGenres array
            });
            setFilteredMovies(newMoviesList);
        }
        else{
            setFilteredMovies(movies);
        }
        
    }

    return (
        <div id="galleryContainer">
            <div>
                <FormControl fullWidth style={{flexDirection: "row"}} variant="outlined">
                    <Select
                    multiple
                    displayEmpty
                    name="genres"
                    value={selectedGenres}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    label="Genres"
                    className="genreSelector"
                    renderValue={(selected)=> "Genres"}
                    slotProps={{ input: { className: "inputs" }}}
                    >
                    <MenuItem className="genresItems" disabled value="">
                        Genres
                    </MenuItem>
                    {movieGenres.map((genre) => (
                        <MenuItem className="genresItems" key={genre} value={genre}>
                        <Checkbox className="genresCheckboxes" size="medium" checked={selectedGenres.includes(genre)} />
                        <ListItemText className="genresItems" primary={genre} />
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </div>
            <PopUp isOpen={isOpen} setIsOpen={setIsOpen} movie={currentMovie} setUpdateMode={setUpdateMode} setTab={setTab} />
            <div id='movieGallery'>
            {loading ? <CircularProgress /> : filteredMovies.map((movie) => (
                <Card className="cards" key={movie._id}>
                    <CardActionArea onClick={()=> handleCardClick(movie)} className="cardClickables">
                        <CardMedia
                        component="img"
                        image={movie.posterUrl !== undefined ? movie.posterUrl : NoImage}
                        className="cardPosters"
                        />
                        <CardContent className="cardContents">
                        <Typography className="cardTitles" gutterBottom variant="h5" component="div">
                            {movie.title}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
            </div>
        </div>
    )
}

export default Gallery;
