import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default class Login extends React.Component {
  static navigationOptions = {
    header: null
  }

  componentDidUpdate(prevProps) {
    if (this.props.access_token && !prevProps.access_token) {
      this.props.navigation.navigate('App');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.splashImage} source={require('../assets/welcome/splash.png')} />
        <Text style={styles.titleText}>CREATE THE PERFECT PLAYLIST</Text>
        <Text style={styles.bodyText}>without vigorous searching.{'\n'}All you have to do is swipe.{'\n'}Export to Spotify when you're done.</Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={this.props.authenticateUser}
        >
          <Text style={styles.loginText}>
            <FontAwesome name='spotify' size={36} />
            {'   '}LOG IN WITH SPOTIFY
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  splashImage: {
    width: 240,
    height: 240,
    marginBottom: 48,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bodyText: {
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 24
  },
  loginButton: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#7ae48c',
    backgroundColor: '#7ae48c',
  },
  loginText: {
    lineHeight: 36,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
