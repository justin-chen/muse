import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';

export default class Playlist extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={() => {}} activeOpacity={0.9}>
        <View style={styles.genreItem}>
          <Ionicons name='ios-musical-notes' size={48} style={{color: '#D3D3D3'}}/>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  genreItem: {
    borderWidth: 0.5,
    borderColor: '#C0C0C0',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 8,
    width: Dimensions.get('window').width / 2.5,
    height: Dimensions.get('window').width / 2, // approximate a square
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
