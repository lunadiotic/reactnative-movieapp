import React from 'react';
import {Text, View} from 'react-native';
import axios from 'axios';

const getPopMovies = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/movie/popular?api_key=778306490922af732ee8ce5aeb1ef02e',
  );
  console.log(JSON.stringify(response.data.results[0], null, 2));
};

const App = () => {
  getPopMovies();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Try editing me! 🎉</Text>
    </View>
  );
};

export default App;
