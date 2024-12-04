import './App.css';
import '@fontsource/roboto/400.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import React from 'react';
import AddMovie from './components/addmovie';
import Gallery from './components/gallery';

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <header className="App-header">
        
      </header>
      <nav>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Item One" />
          <Tab label="Add Movie" />
          <Tab label="Move Gallery" />
        </Tabs>
      </nav>
      <div>
        {value === 1 ? <AddMovie /> : null}
        {value === 2 ? <Gallery /> : null}
      </div>
      
    </div>
  );
}

export default App;
