import React from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions, Image, Text } from 'react-native';

export default class Playlist extends React.Component {
  viewPlaylistTracks = () => {
    this.props.press({
      index: this.props.index,
      name: this.props.name,
      thumbnail: this.props.thumbnail,
      url: this.props.url + `?market=${this.props.user.profile.country}`,
      playlistId: this.props.playlistId
    });
  }

  render() {
    return (
      <TouchableOpacity onPress={this.viewPlaylistTracks} activeOpacity={0.9}>
        <View style={styles.playlist}>
          <View style={styles.thumbnail}>
            <Image style={styles.thumbnail} source={{ uri: this.props.thumbnail }} />
          </View>
          <Text style={styles.titleText} numberOfLines={1}>{this.props.name}</Text>
          <Text style={styles.countText}>{this.props.count}{this.props.count === 1 ? ' Song' : ' Songs'}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 2,
    paddingBottom: 2
  },
  countText: {
    fontSize: 14,
    letterSpacing: 0,
  },
  thumbnail: {
    marginBottom: 8,
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    // borderWidth: 0.6,
    // borderColor: '#C0C0C0'
    shadowOffset: { width: 0, height: 0, },
    shadowColor: 'grey',
    shadowOpacity: 1,
    shadowRadius: 0.9
  },
  playlist: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 8,
    paddingTop: 12,
    paddingBottom: 16,
    width: Dimensions.get('window').width / 2.5,
    height: Dimensions.get('window').width / 1.9,
    shadowOffset: { width: 0, height: 1, },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 0.85
  },
  genreItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 2.5,
    height: Dimensions.get('window').width / 2,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
