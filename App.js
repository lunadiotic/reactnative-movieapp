import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import axios from 'axios';

const getPopMovies = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/movie/popular?api_key=778306490922af732ee8ce5aeb1ef02e',
  );
  return response.data.results;
};

const App = () => {
  const [movie, setMovie] = useState({});
  const [errorStatus, setErrorStatus] = useState(false);

  useEffect(() => {
    getPopMovies()
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
      <Text>{movie.original_title}</Text>
      <Text>{movie.original_language}</Text>
      <Text>{movie.release_date}</Text>
      {errorStatus && <Text style={{color: 'red'}}>Internal Server Error</Text>}
    </View>
  );
};

export default App;
