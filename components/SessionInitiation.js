import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AnimatedLoader from 'react-native-animated-loader';
import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';

export default class SessionInitiation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingTracks: false,
      syncingUser: false,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return ({
      headerStyle: {
        borderBottomWidth: 0,
        height: 59,
      },
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={{ paddingLeft: 12, width: 64 }}
        >
          <MaterialCommunityIcons name='home-outline' size={30} />
        </TouchableOpacity>

      ),
    });
  }

  componentDidMount() {
    this.props.endSession();
  }

  startCategorizedMuseSession = async () => {
    this.props.genreUnselectAll();
    this.props.navigation.navigate('GenreSelect', { header: 'Categories' });
  }

  lastSyncedWithSpotify = async (access_token, refresh_token) => {
    let lastSynced = await this.props.lastSyncedWithSpotify(access_token, refresh_token);
    return lastSynced;
  }

  fetchSpotifyArtistsFromUser = async (access_token, refresh_token) => {
    let fetchedArtistIds = [];
    let topArtistIds = await this.props.fetchTopArtists(access_token, refresh_token);
    let followedArtistIds = await this.props.fetchFollowedArtists(access_token, refresh_token);
    let libraryArtistIds = await this.props.fetchArtistsFromUserLibrary(access_token, refresh_token, this.props.user.profile.country);

    return fetchedArtistIds.concat(topArtistIds, followedArtistIds, libraryArtistIds);
  }

  syncUserWithSpotify = async (access_token, refresh_token, artist_ids) => {
    let updated = await this.props.syncUserWithSpotify(access_token, refresh_token, artist_ids);
    return updated;
  }

  hasEnoughSeedData = async (access_token, refresh_token) => {
    let hasEnoughData = await this.props.userHasEnoughData(access_token, refresh_token);
    return hasEnoughData;
  }

  startPersonalizedMuseSession = async () => {
    const { access_token, refresh_token } = this.props.auth;
    const maxDaysBeforeSync = 1;
    const secondsInDay = 86400;

    let lastSynced = await this.lastSyncedWithSpotify(access_token, refresh_token);
    if ((Date.now() - lastSynced)/1000 >= (maxDaysBeforeSync*secondsInDay)) {
      this.setState({ syncingUser: true });
      let fetchedArtistIds = await this.fetchSpotifyArtistsFromUser(access_token, refresh_token);
      await this.syncUserWithSpotify(access_token, refresh_token, fetchedArtistIds);
      this.setState({ syncingUser: false });
    }

    let hasEnoughPersonalizedData = await this.hasEnoughSeedData(access_token, refresh_token);
    if (hasEnoughPersonalizedData) {
      this.setState({ fetchingTracks: true });
      await this.props.fetchPersonalizedTracks(access_token, refresh_token);
      this.setState({ fetchingTracks: false });
      this.props.navigation.navigate('TrackPreview', {personalized: true, categories: false});
    } else {
      alert("We are unable to gather enough data to generate personalized recommendations for you! Please use the category selection flow.");
    }
  }

  render() {
    return (
      <Animated.View style={[{ ...this.props.style }, styles.container]}>
        <AnimatedLoader
          visible={this.state.syncingUser}
          overlayColor='#fff'
          animationStyle={styles.lottie}
          speed={1.5}
          source={require('../assets/loading.json')}
        />
        <AnimatedLoader
          visible={this.state.fetchingTracks}
          overlayColor='#fff'
          animationStyle={styles.lottie}
          speed={1.5}
          source={require('../assets/loading.json')}
        />
        <View style={styles.playlistContainer}>
          <Text style={styles.titleText}>Choose one of two options:</Text>

          <View style={styles.bigBreak} />

          <TouchableOpacity style={styles.customButton} activeOpacity={0.9} onPress={this.startCategorizedMuseSession}>
            <Text style={styles.buttonTitleText}>Pick My Own Categories</Text>
            <Text style={styles.buttonInfoText}>Songs are chosen based on the music categories that you pick</Text>
          </TouchableOpacity>

          <View style={styles.break} />

          <TouchableOpacity style={styles.customButton} activeOpacity={0.9} onPress={this.startPersonalizedMuseSession}>
            <Text style={styles.buttonTitleText}>Personalized For Me</Text>
            <Text style={styles.buttonInfoText}>Songs are chosen based on artists and genres that you like on Spotify</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  lottie: {
    width: 240,
    height: 240
  },
  break: {
    height: 36,
  },
  bigBreak: {
    height: 72,
  },
  titleText: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  infoText: {
    marginTop: 8,
    fontSize: 14,
  },
  buttonTitleText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  buttonInfoText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    marginTop: 8,
  },
  customButton: {
    zIndex: 999,
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7ae48c',
    borderRadius: 40,
    color: 'white',
    padding: 14,
    width: 290,
    height: 90,
  },
  createPlaylist: {
    width: 240,
    height: 262,
    marginTop: 24,
    marginBottom: 40
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 24,
  },
  playlistContainer: {
    height: '70%',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
