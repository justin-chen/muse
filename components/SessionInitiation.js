import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AnimatedLoader from 'react-native-animated-loader';
import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';

export default class SessionInitiation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingTracks: false,
      syncingNewUser: false,
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

  isUserNew = async (access_token, refresh_token) => {
    let is_new_user = await this.props.isNewUser(access_token, refresh_token);
    return is_new_user;
  }

  fetchArtistsFromNewUser = async (access_token, refresh_token) => {
    let fetchedArtistIds = [];
    let topArtistIds = await this.props.fetchTopArtists(access_token, refresh_token);
    let followedArtistIds = await this.props.fetchFollowedArtists(access_token, refresh_token);
    let libraryArtistIds = await this.props.fetchArtistsFromUserLibrary(access_token, refresh_token, this.props.user.profile.country);

    return fetchedArtistIds.concat(topArtistIds, followedArtistIds, libraryArtistIds);
  }

  updateUserSeeds = async (access_token, refresh_token, artist_ids) => {
    let updated = await this.props.updateUserSeeds(access_token, refresh_token, artist_ids);
    if (updated) {
      await this.props.syncedNewUser(access_token, refresh_token);
    } else {
      // did not update user seeds
    }
  }

  startPersonalizedMuseSession = async () => {
    const { access_token, refresh_token } = this.props.auth;

    // If user is a new user, perform user syncing
    let new_user = await this.isUserNew(access_token, refresh_token);
    if (new_user) {
      this.setState({ syncingNewUser: true });
      let fetchedArtistIds = await this.fetchArtistsFromNewUser(access_token, refresh_token);
      await this.updateUserSeeds(access_token, refresh_token, fetchedArtistIds);
      this.setState({ syncingNewUser: false }); 
    }

    this.setState({ fetchingTracks: true });
    await this.props.fetchPersonalizedTracks(access_token, refresh_token);
    this.setState({ fetchingTracks: false });

    this.props.navigation.navigate('TrackPreview', {personalized: true, categories: false});
  }

  render() {
    return (
      <Animated.View style={[{ ...this.props.style }, styles.container]}>
        <AnimatedLoader
          visible={this.state.syncingNewUser}
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
