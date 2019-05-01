import React from 'react';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, Image, TouchableOpacity, View, Dimensions } from 'react-native';

export default class Genre extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={() => { this.props.genreToggle(this.props.item.key) }} activeOpacity={0.9}>
        <View style={styles.genreItem}>
          <View style={styles.genreTitleView}>
            <Text style={styles.genreText}>{this.props.item.name}</Text>
          </View>
          <View style={styles.genreCheck}>
            {this.props.checked && <Feather name='check' size={24} style={{ color: 'white' }} />}
          </View>
          <Image style={{ height: '100%', width: '100%' }} source={{ uri: this.props.item.url }} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  genreCheck: {
    zIndex: 999,
    position: 'absolute',
    top: 8,
    right: 8
  },
  genreTitleView: {
    zIndex: 999,
    position: 'absolute',
    top: Dimensions.get('window').width / 3.5
  },
  genreItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 8,
    width: Dimensions.get('window').width / 2.5,
    height: Dimensions.get('window').width / 2.5, // approximate a square
  },
  genreText: {
    color: 'white',
    fontSize: 12,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
