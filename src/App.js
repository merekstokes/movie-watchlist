import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './App.css';
import Watchlist from './components/Watchlist';
import MovieScreen from './components/MovieScreen';
import Header from './components/Header';

function App() {

  const [movieList, setMovieList] = useState([]);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getData();
  }, [page]);

  const getData = () => {
    axios
        .get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)
        .then((res) => {
            console.log(res.data.results);
            setMovieList(res.data.results);
        });
  };

  const addMovie = (movie) => {
    setList([...list, movie])
  }

  const removeMovie = (movie) => {
    const newState = list.filter((mov) => {
      return mov !== movie;
    });
    setList(newState);
  };

  return (
    <div className="App">
      <Header/>
      <main>
        <MovieScreen
              addMovie={addMovie}
              removeMovie={removeMovie}
              movieList={movieList}
              page={page}
              setPage={setPage}
              list={list}
        />
        <Watchlist 
              list={list} 
              movieList={movieList}
              removeMovie={removeMovie}
          />
      </main>
    </div>
  );
}

export default App;
