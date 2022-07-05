import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {getPopularMovies} from './services/api-request';

const App = () => {
  const [movie, setMovie] = useState({});
  const [errorStatus, setErrorStatus] = useState(false);

  useEffect(() => {
    getPopularMovies()
      .then(movies => {
        setMovie(movies[0]);
      })
      .catch(err => {
        setErrorStatus(err);
      });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Title: {movie.original_title}</Text>
      <Text>Language: {movie.original_language}</Text>
      <Text>Release Date: {movie.release_date}</Text>
      {errorStatus && <Text style={{color: 'red'}}>Internal Server Error</Text>}
    </View>
  );
};

export default App;
