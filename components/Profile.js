import React from 'react';
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export default class Profile extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Profile',
      headerTitleStyle: {
        fontWeight: 'bold',
        letterSpacing: 0,
      },
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{ width: 64, paddingLeft: 18 }}
        >
          <Ionicons name='ios-arrow-back' size={32} />
        </TouchableOpacity>
      ),
    };
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.profile.images.length ?
          <View style={styles.userImageContainer}>
            <Image style={styles.userImage} source={{ uri: this.props.profile.images[0].url }} />
          </View> :
          <FontAwesome name='user-circle-o' size={100} style={{ color: '#505050' }} />
        }
        <View style={[styles.divider, { marginTop: 48 }]} />
        <Text style={styles.titleText}>User Name</Text>
        <Text style={styles.infoText} numberOfLines={1}>{this.props.profile.display_name}</Text>
        <View style={styles.divider} />
        <Text style={styles.titleText}>Email</Text>
        <Text style={styles.infoText} numberOfLines={1}>{this.props.profile.email}</Text>
        <View style={styles.divider} />
        
        {/* <TouchableOpacity style={{width: '75%'}} activeOpacity={0.6} onPress={() => this.props.navigation.navigate('GenreSelect')}>
          <Text style={styles.titleText}>Genre Preferences</Text>
          <Text style={styles.genreText} numberOfLines={2}>
            {
              this.props.genres.length ? this.props.genres.join(', ') : 'None'
            }
          </Text>
          <Feather name='edit' size={24} style={styles.editGenres}/>
        </TouchableOpacity>
        <View style={styles.divider} /> */}
        <TouchableOpacity style={styles.signOutButton} onPress={() => {
          this.props.signOut();
          this.props.navigation.navigate('Auth');
        }}>
          <Text style={styles.signOutText}>SIGN OUT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  editGenres: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  userImageContainer: {
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
  },
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  titleText: {
    width: '75%',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0,
  },
  infoText: {
    marginTop: 4,
    width: '75%',
    textAlign: 'left',
    fontSize: 14,
    letterSpacing: 0,
  },
  genreText: {
    marginTop: 4,
    paddingRight: '15%',
    textAlign: 'left',
    fontSize: 14,
    letterSpacing: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 48,
  },
  divider: {
    marginTop: 12,
    marginBottom: 12,
    borderBottomColor: 'rgba(128,128,128,0.3)',
    borderBottomWidth: 1,
    width: '75%'
  },
  signOutButton: {
    marginTop: 24,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 50,
    backgroundColor: 'rgb(168,168,168)',
  },
  signOutText: {
    lineHeight: 36,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0,
    color: '#fff',
  },
});
