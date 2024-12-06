import './App.css';
import '@fontsource/roboto/400.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import React from 'react';
import AddMovie from './components/addmovie';
import Gallery from './components/gallery';
import SuggestMovie from './components/random';
import { Typography } from '@mui/material';



function App() {
  const [tab, setTab] = useState(0);
  const [ currentMovie, setCurrentMovie ] = useState(null); // Holds currently seleted movie
  const [ updateMode, setUpdateMode ] = useState(false); // Changes Add Movie tab from empty form for adding movies to prefilled form for editing selected movie

  // Changes tab
  const handleChange = (event, newValue) => {
    setTab(newValue);
    setUpdateMode(false); // Disabled updating mode in case users clicked away from the tab during update
  };

  return (
    <div className="App">
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <header className="App-header">
        <Typography variant='h1' id="pageTitle">MovieDen</Typography>
      </header>
      <nav id="navigation">
        <Tabs value={tab} onChange={handleChange}>
          <Tab className="tab" label="Home" />
          <Tab className="tab" label={updateMode ? "Update" : "Add"} />
          <Tab className="tab" label="Gallery" />
          <Tab className="tab" label="Random" />
        </Tabs>
      </nav>
      <div id="main-container">
        {tab === 0 ? 
        <div>
          <Typography variant="h2" className="homeText" style={{textAlign: "center"}}>Welcome</Typography>
          <Typography variant="h5" className="homeText" style={{textAlign: "center"}}>This is home page of React frontend for course Full Stack Development</Typography>
          <p className="homeText">This site demonstrates</p>
          <ul> 
            <li><Typography variant="body1" className="homeText">API route /getall as Movie Gallery showing all movie entries in DB</Typography></li>
            <li><Typography variant="body1" className="homeText">API route /:id as Random Movie generator from list of keys in DB</Typography></li>
            <li><Typography variant="body1" className="homeText">API route /add as form Add Movie form</Typography></li>
            <li><Typography variant="body1" className="homeText">API route /update/:id as prefilled Add Movie form for updating existing movie</Typography></li>
            <li><Typography variant="body1" className="homeText">API route /delete/:id as an action inside Movie Gallery to delete selected movie</Typography></li>
            <li><Typography variant="body1" className="homeText">Searching for movies by genre via dropdown menu in Movie Gallery</Typography></li>
            <li><Typography variant="body1" className="homeText">Styling of the website using library - Material UI</Typography></li>
            <li><Typography variant="body1" className="homeText">Dynamic rendering of webpage and its data by user input</Typography></li>
            <li><Typography variant="body1" className="homeText">And last but not least, responsive design</Typography></li>
          </ul>

        </div> 
        : null}
        {tab === 1 ? <AddMovie updateMode={updateMode} setUpdateMode={setUpdateMode} currentMovie={currentMovie} setTab={setTab} /> : null}
        {tab === 2 ? <Gallery currentMovie={currentMovie} setTab={setTab} setCurrentMovie={setCurrentMovie} setUpdateMode={setUpdateMode} /> : null}
        {tab === 3 ? <SuggestMovie /> : null}
      </div>
      
    </div>
  );
}

export default App;
