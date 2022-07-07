/* eslint-disable */

import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import CardComponent from './CardComponent';

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
};

const List = props => {
  const {title, content, navigation} = props;
  return (
    <View style={styles.list}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={content}
          horizontal={true}
          renderItem={({item}) => (
            <CardComponent item={item} navigation={navigation} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  list: {
    marginTop: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

List.propTypes = propTypes;

export default memo(List);
