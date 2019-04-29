import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.splashImage} source={require('./assets/welcome/splash.png')} />
        <Text style={styles.titleText}>CREATE THE PERFECT PLAYLIST</Text>
        <Text style={styles.bodyText}>without vigorous searching.{'\n'}All you have to do is swipe.{'\n'}Export to Spotify when you're done.</Text>
        <TouchableOpacity style={[styles.button, styles.loginButton]}>
          <Text style={[styles.buttonText, styles.loginText]}>LOG IN WITH SPOTIFY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.guestButton]}>
          <Text style={[styles.buttonText, styles.guestText]}>CONTINUE AS GUEST</Text>
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
    letterSpacing: 2,
  },
  bodyText: {
    letterSpacing: 1,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 24
  },
  button: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 32,
    paddingRight: 32,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 50,
    borderWidth: 4
  },
  loginButton: {
    borderColor: '#7ae48c',
    backgroundColor: '#7ae48c',
  },
  guestButton: {
    borderColor: '#7ae48c',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  loginText: {
    color: '#fff',
  },
  guestText: {
    color: '#7ae48c',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
