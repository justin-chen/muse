import React from 'react';
import { AntDesign } from '@expo/vector-icons'
import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-swipeable-row';

export default class Track extends React.Component {
  render() {
    const { playlistId, item, trackPlaying } = this.props;
    return (
      <Swipeable
        rightButtons={[
          <TouchableOpacity style={{ justifyContent: 'center', height: 72 }} onPress={() => this.props.deleteTrack(playlistId, item.uri)}>
            <AntDesign name='close' size={32} style={{ color: 'red' }} />
          </TouchableOpacity>,
        ]}
        rightButtonWidth={32}
      >
        <View style={styles.divider} />
        <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.previewTrack(item.preview)}>
          <View style={styles.track}>
            <Image style={styles.trackArt} source={{ uri: item.thumbnail }} />
            <Text
              numberOfLines={1}
              style={trackPlaying == item.preview && item.preview ? [styles.trackName, { color: '#7ae48c' }] : styles.trackName}
            >
              {item.track}
            </Text>
            <Text
              numberOfLines={1}
              style={trackPlaying == item.preview && item.preview ? [styles.trackArtists, { color: '#7ae48c' }] : styles.trackArtists}
            >
              {item.artists.join(', ')} - {item.album}
            </Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
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
    letterSpacing: 0.5,
    position: 'absolute',
    marginLeft: 72,
    marginTop: 15
  },
  trackArtists: {
    fontSize: 12,
    position: 'absolute',
    marginLeft: 72,
    marginTop:  39
  },
  trackArt: {
    marginTop: 12,
  height: 48,
    width: 48
  },
});
