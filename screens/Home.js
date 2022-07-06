/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  getFamilyMovies,
  getPopularMovies,
  getPopularTv,
  getUpcomingMovies,
} from '../services/api-request';
import {SliderBox} from 'react-native-image-slider-box';
import ListComponent from '../components/ListComponent';
import ErrorComponent from '../components/ErrorComponent';

const dimensions = Dimensions.get('screen');

const Home = () => {
  const [popMovie, setPopMovie] = useState();
  const [popTV, setPopTV] = useState();
  const [familyMovie, setFamilyMovie] = useState();
  const [movieImages, setMovieImages] = useState();
  const [err, setErr] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getMovieData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTv(),
      getFamilyMovies(),
    ]);
  };

  useEffect(() => {
    getMovieData()
      .then(([upcomingMovies, popularMovies, popularTv, familyMovies]) => {
        let images = [];
        for (let movie = 0; movie < upcomingMovies.length; movie++) {
          images.push(
            `https://image.tmdb.org/t/p/w500${upcomingMovies[movie]['poster_path']}`,
          );
        }
        setMovieImages(images);
        setPopMovie(popularMovies);
        setPopTV(popularTv);
        setFamilyMovie(familyMovies);
      })
      .catch(err => {
        setErr(err);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <React.Fragment>
      {loaded && !err && (
        <ScrollView>
          {/* Slider */}
          {movieImages && (
            <View style={styles.container}>
              <SliderBox
                images={movieImages}
                autoplay={true}
                circleLoop={true}
                sliderBoxHeight={dimensions.height / 1.5}
                dotStyle={styles.sliderStyle}
              />
            </View>
          )}

          {/* popular movie carousel */}
          {popMovie && (
            <View style={styles.container}>
              <ListComponent
                title="Popular Movies"
                content={popMovie}></ListComponent>
            </View>
          )}

          {/* popular tv carousel */}
          {popTV && (
            <View style={styles.container}>
              <ListComponent title="Popular TV" content={popTV}></ListComponent>
            </View>
          )}

          {/* family movie carousel */}
          {familyMovie && (
            <View style={styles.container}>
              <ListComponent
                title="Family Movies"
                content={familyMovie}></ListComponent>
            </View>
          )}
        </ScrollView>
      )}

      {!loaded && (
        <ActivityIndicator size="large" style={{opacity: 1}} color="#999999" />
      )}

      {err && <ErrorComponent />}
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
