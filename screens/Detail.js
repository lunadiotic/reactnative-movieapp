/* eslint-disable */

import React from 'react';
import {Text, View} from 'react-native';

const Detail = ({route, navigation}) => {
  const {movieDetail} = route.params;
  return (
    <View>
      <Text>{JSON.stringify(movieDetail)}</Text>
    </View>
  );
};

export default Detail;
