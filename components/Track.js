import React from 'react';
import { AntDesign } from '@expo/vector-icons'
import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';

export default class Track extends React.Component {

  deleteTrack = async () => {
    const { playlistId, item } = this.props;
    if (playlistId) {
      this.props.deleteTrack(playlistId, item.uri, item.preview_url);
    } else {
      this.props.deleteTrack(item.key, item.preview_url);
    }
  }

  render() {
    const { item, trackPlaying, readOnly } = this.props;
    return (
      <View>
        <View style={styles.divider} />
        <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.previewTrack(item.preview_url)}>
          <View style={styles.track}>
            <View style={styles.trackArtWrapper}>
              <Image style={styles.trackArt} source={{ uri: item.artwork[item.artwork.length - 1] }} />
            </View>
            <Text
              numberOfLines={1}
              style={[styles.trackName, { color: trackPlaying == item.preview_url && item.preview_url ? '#7ae48c' : 'black', width: readOnly || readOnly == undefined ? 'auto' : 190 }]}
            >
              {item.name}
            </Text>
            <Text
              numberOfLines={1}
              style={[styles.trackArtists, { color: trackPlaying == item.preview_url && item.preview_url ? '#7ae48c' : 'black', width: readOnly || readOnly == undefined ? 'auto' : 190 }]}
            >
              {item.artists.join(', ')} - {item.album}
            </Text>
          </View>
        </TouchableOpacity>
        {readOnly === false &&
          <TouchableOpacity style={styles.deleteButton} onPress={this.deleteTrack}>
            <AntDesign name='close' size={24} style={{ color: 'rgba(128,128,128,0.3)' }} />
          </TouchableOpacity>
        }
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
