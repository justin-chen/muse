import React from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';

export default class PlaylistRow extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <View>
        <View style={styles.divider} />
        <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.exportToPlaylist(item.key)}>
          <View style={styles.track}>
            <View style={styles.trackArtWrapper}>
              <Image style={styles.trackArt} source={{ uri: item.thumbnail }} />
            </View>
            <Text
              numberOfLines={1}
              style={styles.trackName}
            >
              {item.name}
            </Text>
            <Text
              numberOfLines={1}
              style={styles.trackArtists}
            >
              {item.trackCount} {item.trackCount > 1 ? 'Songs' : 'Song'}
            </Text>
          </View>
        </TouchableOpacity>
        {this.props.lastItem && <View style={styles.divider} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    marginBottom: 0,
    borderBottomColor: 'rgba(128,128,128,0.3)',
    borderBottomWidth: 1,
    width: '100%'
  },
  track: {
    paddingLeft: 0,
    paddingRight: 0,
    height: 72,
  },
  trackName: {
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    marginLeft: 64,
    marginTop: 15
  },
  trackArtists: {
    fontSize: 12,
    position: 'absolute',
    marginLeft: 64,
    marginTop: 39,
  },
  trackArt: {
    height: 48,
    width: 48,
  },
  trackArtWrapper: {
    marginTop: 12,
    marginLeft: 2,
    shadowOffset: { width: 0, height: 0, },
    shadowColor: 'grey',
    shadowOpacity: 1,
    shadowRadius: 0.8
  },
  deleteButton: {
    position: 'absolute',
    right: 8,
    justifyContent: 'center',
    height: 74
  }
});
