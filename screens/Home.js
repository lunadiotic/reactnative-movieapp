/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {getPopularMovies, getUpcomingMovies} from '../services/api-request';
import {SliderBox} from 'react-native-image-slider-box';
import ListComponent from '../components/ListComponent';

const dimensions = Dimensions.get('screen');

const Home = () => {
  const [popMovie, setPopMovie] = useState([]);
  const [movieImages, setMovieImages] = useState([]);
  const [err, setErr] = useState(false);

  useEffect(() => {
    getUpcomingMovies()
      .then(movies => {
        let images = [];
        for (let movie = 0; movie < movies.length; movie++) {
          images.push(
            `https://image.tmdb.org/t/p/w500${movies[movie]['poster_path']}`,
          );
        }
        setMovieImages(images);
      })
      .catch(err => {
        setErr(err);
      });

    getPopularMovies()
      .then(movies => {
        setPopMovie(movies);
      })
      .catch(err => {
        setErr(err);
      });
  }, []);

  return (
    <React.Fragment>
      <View style={styles.container}>
        <SliderBox
          images={movieImages}
          autoplay={true}
          circleLoop={true}
          sliderBoxHeight={dimensions.height / 1.5}
          dotStyle={styles.sliderStyle}
        />
      </View>
      <View style={styles.container}>
        <ListComponent
          title="Popular Movies"
          content={popMovie}></ListComponent>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
});

export default Home;
