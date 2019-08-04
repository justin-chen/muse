import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AnimatedLoader from 'react-native-animated-loader';
import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';

export default class SessionInitiation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingTracks: false,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return ({
      headerStyle: {
        borderBottomWidth: 0,
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

  startMuseSession = async (flow) => {
    const { access_token, refresh_token } = this.props.auth;

    this.setState({ fetchingTracks: true });
    if (flow === "PERSONALIZED") {
      await this.props.fetchPersonalizedTracks(access_token, refresh_token);
    } else {
      const categories = this.props.genres;
      await this.props.fetchTracks(access_token, refresh_token, categories);
    }
    this.setState({ fetchingTracks: false });

    this.props.navigation.navigate('TrackPreview');
  }

  render() {
    return (
      <Animated.View style={[{ ...this.props.style }, styles.container]}>
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

          <TouchableOpacity style={styles.customButton} activeOpacity={0.9} onPress={() => this.props.navigation.navigate('GenreSelect', { header: 'Categories' })}>
            <Text style={styles.buttonTitleText}>Customize My Search</Text>
            <Text style={styles.buttonInfoText}>Pick from the provided categories and we'll find you songs that fit your mood</Text>
          </TouchableOpacity>

          <View style={styles.break} />

          <TouchableOpacity style={styles.customButton} activeOpacity={0.9} onPress={() => this.startMuseSession("PERSONALIZED")}>
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
