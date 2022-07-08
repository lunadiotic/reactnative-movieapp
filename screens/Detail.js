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
import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat';
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
          <View style={styles.container}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            {movie.genres && (
              <View style={styles.genreContainer}>
                {movie.genres.map((genre, index) => (
                  <Text key={index} style={styles.genreTitle}>
                    {genre.name}
                  </Text>
                ))}
              </View>
            )}
            <View style={styles.starsContainer}>
              <Text>{movie.vote_average}</Text>
              <StarRating
                starSize={35}
                fullStarColor={'gold'}
                halfStarColor={'gold'}
                disabled={true}
                maxStars={5}
                rating={movie.vote_average / 2}
              />
            </View>
            <Text style={styles.releaseDate}>
              {'Release date: ' +
                dateFormat(movie.release_date, 'dddd, d mmmm yyyy')}
            </Text>
            <Text style={styles.overview}>{movie.overview}</Text>
          </View>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    height: dimensions.height / 2.5,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  genreContainer: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  genreTitle: {
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  releaseDate: {
    fontWeight: 'bold',
  },
  overview: {
    marginVertical: 15,
    paddingHorizontal: 15,
  },
});

export default Detail;
