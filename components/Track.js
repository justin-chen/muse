import React from 'react';
import { AntDesign } from '@expo/vector-icons'
import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-swipeable-row';

export default class Track extends React.Component {
  render() {
    const { playlistId, item, trackPlaying } = this.props;
    return (
      <View>
        <View style={styles.divider} />
        <Swipeable
          rightButtons={[
            <TouchableOpacity style={{ justifyContent: 'center', height: 72 }} onPress={() => this.props.deleteTrack(playlistId, item.uri)}>
              <AntDesign name='close' size={32} style={{ color: 'red' }} />
            </TouchableOpacity>,
          ]}
          rightButtonWidth={32}
        >
          <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.previewTrack(item.preview)}>
            <View style={styles.track}>
              <View style={styles.trackArtWrapper}>
                <Image style={styles.trackArt} source={{ uri: item.thumbnail }} />
              </View>
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
    marginTop: 39
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
  }
});
