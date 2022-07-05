/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {getPopularMovies} from '../services/api-request';

const Home = () => {
  const [movie, setMovie] = useState('');
  const [err, setErr] = useState(false);

  useEffect(() => {
    getPopularMovies()
      .then(movies => {
        setMovie(movies[0]);
      })
      .catch(err => {
        setErr(err);
      });
  }, []);
  return (
    <>
      <Text>Title: {movie.original_title}</Text>
      <Text>Release Date: {movie.release_date}</Text>
      {err && <Text style={{color: 'red'}}>Internal Server Error</Text>}
    </>
  );
};

export default Home;
