/* eslint-disable */

import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

const CardComponent = props => {
  const {item} = props;
  return (
    <View>
      <TouchableOpacity style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 20,
  },
});

export default CardComponent;
