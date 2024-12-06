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
        {tab === 1 ? <AddMovie updateMode={updateMode} setUpdateMode={setUpdateMode} currentMovie={currentMovie} setTab={setTab} /> : null}
        {tab === 2 ? <Gallery currentMovie={currentMovie} setTab={setTab} setCurrentMovie={setCurrentMovie} setUpdateMode={setUpdateMode} /> : null}
        {tab === 3 ? <SuggestMovie /> : null}
      </div>
      
    </div>
  );
}

export default App;
