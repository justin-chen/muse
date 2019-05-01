import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View, Dimensions } from 'react-native';

export default class Genre extends React.Component {
  render() {
    return (
      <View style={styles.genreItem}>
        <View style={styles.genreTitleView}>
          <Text style={styles.genreText}>{this.props.item.name}</Text>
        </View>
        <Image style={{height: '100%', width: '100%'}} source={{uri: this.props.item.url}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  genreTitleView: {
    zIndex: 999,
    position: 'absolute',
    top: Dimensions.get('window').width / 3.5
  },
  genreItem: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    width: Dimensions.get('window').width / 2.5,
    height: Dimensions.get('window').width / 2.5, // approximate a square
  },
  genreText: {
    color: 'white',
    fontSize: 12,
    letterSpacing: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
