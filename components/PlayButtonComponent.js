/* eslint-disable */

import React, {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const PlayButtonComponent = props => {
  const {handlePress} = props;
  return (
    <Pressable>
      <Icon
        name="play-circle"
        size={50}
        color={'white'}
        onPress={() => handlePress()}
      />
    </Pressable>
  );
};

export default memo(PlayButtonComponent);
