import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import React, { useEffect, useState } from 'react';
import NoImage from '../assets/no-image.jpg';
import '../App.css';
import './gallery.css';

const API_URL = "http://localhost:3000";

function Gallery() {
    const [ movies, setMovies ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const fetchMovies = async () =>{
        try{
            const response = await fetch(API_URL+"/api/getall");
            const data = await response.json();
            console.log(data);
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

    return (
        <div id='movieGallery'>
            {movies.map((movie) => (
                <Card className="cards" key={movie._id}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        image={movie.posterUrl !== undefined ? movie.posterUrl : NoImage}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {movie.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {"Year: " + movie.year}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {"Duration: " + movie.duration}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {"Language: " + movie.voLang}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {"Subtitles: " + movie.subLang}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {"Genres: " + movie.genres}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </div>
    )
}

export default Gallery;
