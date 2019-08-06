import React from 'react';
import { LinearGradient } from 'expo';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import AnimatedLoader from 'react-native-animated-loader';
import { NavigationEvents } from 'react-navigation';
import { StyleSheet, Image, Text, TouchableOpacity, View, FlatList, ScrollView, Dimensions, Animated, RefreshControl } from 'react-native';
import Playlist from './Playlist';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      refreshing: false,
      fetchingTracks: false,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home',
      headerStyle: {
        backgroundColor: '#fafafa',
        height: 59,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        letterSpacing: 1,
        fontSize: 22,
      },
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={{ paddingLeft: 24, width: 64 }}
        >
          <AntDesign name='user' size={28} />
        </TouchableOpacity>
      ),
    };
  };

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 2000,
    }).start();
  }

  _onRefresh = async (refresh = true) => {
    const { access_token, refresh_token } = this.props.auth;
    const { id: user_id } = this.props.user.profile;
    if (refresh) {
      this.setState({ refreshing: true });
      await this.props.fetchPlaylists(access_token, refresh_token, user_id);
      this.setState({ refreshing: false });
    } else {
      this.props.fetchPlaylists(access_token, refresh_token, user_id);
    }
  }

  renderRefreshControl = () => (
    <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
  )

  fetchPlaylistTracks = async params => {
    if (!params.count) {
      alert('No songs in playlist.');
      return;
    }
    const { access_token, refresh_token } = this.props.auth;
    await this.props.fetchPlaylistTracks(access_token, refresh_token, params);
    this.props.navigation.navigate('PlaylistTracks', params);
  }

  render() {
    let { fadeAnim } = this.state;
    return (
      <Animated.View style={[{ ...this.props.style, opacity: fadeAnim, }, styles.container]}>
        <NavigationEvents
          onWillFocus={() => this._onRefresh(false)}
        />
        <AnimatedLoader
          visible={this.state.fetchingTracks}
          overlayColor='#fff'
          animationStyle={styles.lottie}
          speed={1.5}
          source={require('../assets/loading.json')}
        />
        <View style={styles.playlistContainer}>
          {this.props.playlists.length ?
            <FlatList
              data={this.props.playlists}
              contentContainerStyle={styles.playlists}
              showsVerticalScrollIndicator={false}
              refreshControl={this.renderRefreshControl()}
              numColumns={2} renderItem={({ item, index }) => {
                return (
                  <Playlist
                    index={index}
                    playlistId={item.key}
                    name={item.name}
                    count={item.trackCount}
                    url={item.tracksUrl}
                    thumbnail={item.thumbnail}
                    navigation={this.props.navigation}
                    press={this.fetchPlaylistTracks}
                    user={this.props.user}
                  />
                )
              }}>
            </FlatList>
            :
            <ScrollView
              contentContainerStyle={styles.playlists}
              refreshControl={this.renderRefreshControl()}
            >
              <Image style={styles.createPlaylist} source={require('../assets/home/playlist.png')} />
              <Text style={styles.titleText}>CREATE YOUR FIRST PLAYLIST</Text>
              <Text style={styles.infoText}>Start by tapping the {<MaterialCommunityIcons name='play' size={14} />} button.</Text>
            </ScrollView>
          }
          <TouchableOpacity style={styles.startButton} activeOpacity={0.95} onPress={() => { this.props.navigation.navigate('SessionInitiation') }}>
            <MaterialCommunityIcons name='play' size={64} style={{ color: '#fff', paddingTop: 7 }} />
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
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    marginTop: 8,
    fontSize: 14,
  },
  createPlaylist: {
    width: 240,
    height: 262,
    marginTop: 24,
    marginBottom: 40
  },
  playlists: {
    paddingTop: 16,
    paddingBottom: 128,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  playlistContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  startButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 50,
    width: 100,
    height: 100,
    backgroundColor: '#7ae48c',
    right: 18,
    bottom: 30,
    zIndex: 999,
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'grey',
    shadowOpacity: 0.8,
  },
});
