/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getDetailMovie} from '../services/api-request';

const dimensions = Dimensions.get('screen');
const placeholderImage = require('../assets/images/placeholder.png');

const Detail = ({route, navigation}) => {
  const {movieId} = route.params;
  const [movie, setMovie] = useState();
  const [err, setErr] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getDetailMovie(movieId)
      .then(result => {
        setMovie(result);
        setLoaded(true);
      })
      .catch(err => {
        setErr(err);
      });
  }, [movieId]);

  return (
    <View>
      {loaded && !err && (
        <ScrollView>
          <Image
            style={styles.image}
            source={
              movie.poster_path
                ? {
                    uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                  }
                : placeholderImage
            }
          />
          <Text>{JSON.stringify(movie)}</Text>
        </ScrollView>
      )}
      {!loaded && (
        <ActivityIndicator size="large" style={{opacity: 1}} color="#999999" />
      )}
      {err && <ErrorComponent />}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: dimensions.height / 2.5,
  },
});

export default Detail;
