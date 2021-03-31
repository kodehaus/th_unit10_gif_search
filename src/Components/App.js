import '../App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import GifList from './GifList';
import Gif from './Gif';

function App () {
  const [data, setData] = useState([]); // [0, f]
  const [query, setQuery] = useState('cats'); // [0, f]
  const [isLoading, setIsLoading] = useState(true); // [0, f]
  const performSearch = (value) => setQuery(value);
  useEffect(() => {
    axios(`http://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=7RKHACAQ0qHlL0ClPfKqhmoiBVBWnJPH`)
      .then(response => setData(response.data.data))
      .catch(error => console.log('Error fetching and parsing data', error))
      .finally(() => setIsLoading(false));
  }, [query]);
  return (
    <>
      <div className='main-header'>
        <div className='inner'>
          <h1 className='main-title'>GifSearch</h1>
          <SearchForm onSearch={performSearch} />
        </div>
      </div>
      <div className='main-content'>
        {
          isLoading
            ? <p> Loading.......</p>
            : <GifList data={data} />
        }

      </div>
    </>
  );
}

export default App

