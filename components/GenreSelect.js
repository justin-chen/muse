import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Genre from './Genre';
import genres from '../utils/genres';

export default class GenreSelect extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>WHAT ARE YOU IN THE MOOD FOR?</Text>
        <FlatList 
        data={genres}
        style={styles.genreList}
        contentContainerStyle={{alignItems: 'center'}}
        numColumns={2} renderItem={({ item, index }) => {
          return (<Genre item={item} index={index} />)
        }}>
        </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
  },
  container: {
    paddingTop: 75,
    backgroundColor: '#ffffff',
  },
  genreList: {
    marginTop: 24,
  }
});
