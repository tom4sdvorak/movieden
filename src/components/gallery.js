import { Card, CardActionArea, CardContent, CardMedia, Typography, CircularProgress } from '@mui/material';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import React, { useEffect, useState } from 'react';
import NoImage from '../assets/no-image.jpg';
import '../App.css';
import './gallery.css';
import PopUp from './popup';
import API_URL from '../apiconfig';


// Screen with gallery of all movies received from API
function Gallery({setTab, currentMovie, setCurrentMovie, setUpdateMode}) {
    const [ movies, setMovies ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ isOpen, setIsOpen ] = useState(false); // Controls state of dialog window
    
    // Grabs movies from API
    const fetchMovies = async () =>{
        try{
            const response = await fetch(API_URL+"/api/getall");
            const data = await response.json();
            setMovies(data);
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

    return (
        <div id='movieGallery'>
            <PopUp isOpen={isOpen} setIsOpen={setIsOpen} movie={currentMovie} setUpdateMode={setUpdateMode} setTab={setTab} />
            {loading ? <CircularProgress /> : movies.map((movie) => (
                <Card className="cards" key={movie._id}>
                    <CardActionArea onClick={()=> handleCardClick(movie)}>
                        <CardMedia
                        component="img"
                        image={movie.posterUrl !== undefined ? movie.posterUrl : NoImage}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {movie.title}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </div>
    )
}

export default Gallery;
