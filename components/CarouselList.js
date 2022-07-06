/* eslint-disable */

import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

const List = props => {
  const {title, content} = props;
  return (
    <View style={styles.list}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={content}
          horizontal={true}
          renderItem={({item}) => <Text>{item.title}</Text>}
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

export default List;
