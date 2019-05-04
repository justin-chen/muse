import React from 'react';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import { StyleSheet, Image, Text, TouchableOpacity, View, FlatList, ScrollView, Dimensions, Animated, RefreshControl } from 'react-native';
import Playlist from './Playlist';

export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'DISCOVER',
      headerTitleStyle: {
        fontWeight: 'bold',
        letterSpacing: 2,
      },
    };
  };

  render() {
    return (
      <View>
        <Text></Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
