import React, { useEffect, useState } from 'react'
import API_URL from '../apiconfig';
import { LoadingButton } from '@mui/lab';
import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined';
import { Card, Chip, Divider, Stack, Typography } from '@mui/material';
import "./random.css"

function SuggestMovie(){
    const [movieIds, setMovieIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [movie, setMovie] = useState(null);
    
    const fetchMovies = async ()=>{
        try{
            const response = await fetch(API_URL+"/api/getIds");
            const data = await response.json();
            setMovieIds(data);
        }
        catch (e){
            console.log(e);
            setError(e.message);
        }
        setLoading(false);
    }

    useEffect(()=>{
        fetchMovies();
    }, [])
    
    const handleClick = async ()=>{
        setLoading(true);
        const randomIndex = Math.floor(Math.random() * movieIds.length);
        try {
            const response = await fetch(API_URL+"/api/"+movieIds[randomIndex]._id);
            console.log(response);
            const data = await response.json();
            setLoading(false);
            if(!response.ok){
                setError(data.message);
            }
            else{
                setError("");
                setMovie(data);
            }
        }
        catch (e){
            console.log(e);
            setError(e.message);
        }
    }

    return (
        <div id="random">
            <p className="errorMessage">{error}</p>
              <LoadingButton
                component="label"
                variant="contained"
                startIcon={<ShuffleOutlinedIcon />}
                onClick={handleClick}
                loading={loading}
                loadingPosition="start"
                fullWidth={true}
              >
                Find Random Movie
              </LoadingButton>
              {movie ?
                <Card id="movieCard" variant="outlined">
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <div style={{display: "flex", flex: "1", justifyContent: "center"}}><img style={{width: "90%", objectFit: "cover"}} src={movie?.posterUrl} alt="Poster"/></div>
                        <div style={{display: "flex", flex: "2", flexDirection: "column"}}>
                            <div>
                                <Typography gutterBottom variant="h5" component="div">
                                    {movie.title+" ("+movie.year+")"}
                                </Typography>
                                <Divider />
                                <Typography variant="body2">
                                    <b>Duration:</b> {movie?.duration} minutes
                                </Typography>
                                <Typography variant="body2">
                                    <b>Language:</b> {movie?.voLang}
                                </Typography>
                                <Typography variant="body2">
                                    <b>Subtitles:</b> {movie?.subLang}
                                </Typography>
                                <Typography variant="body2">
                                    <b>Genres:</b> {movie?.genres === undefined ? "" : (movie?.genres).join(", ")}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </Card>
              : null}
        </div>
    )
}
export default SuggestMovie;
