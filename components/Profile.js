import React from 'react';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export default class Profile extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Profile',
      headerStyle: {
        backgroundColor: '#fafafa',
        height: 59,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        letterSpacing: 1,
        fontSize: 22,
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
  },
  infoText: {
    marginTop: 4,
    width: '75%',
    textAlign: 'left',
    fontSize: 14,
  },
  genreText: {
    marginTop: 4,
    paddingRight: '15%',
    textAlign: 'left',
    fontSize: 14,
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
    width: '50%',
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 50,
    backgroundColor: 'rgb(168,168,168)',
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
  },
  signOutText: {
    lineHeight: 36,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
