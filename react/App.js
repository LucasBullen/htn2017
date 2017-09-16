import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>

    <Image
      source={require('./assets/img/artwork.png')}
      style={styles.image}/>
        <Text style={styles.openText}>OPEN • CLOSES IN 3 HR 23 MINS</Text>
        <Text style={styles.titleText}>Metamorphosis</Text>
        <Text style={styles.artistText}>Marco Escobedo</Text>
        <Text style={styles.bodyText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
      </View>
    );
  }
}

/* ignore this fake css from hell */

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#fff',
  },
  bodyText: {
    fontFamily: 'Avenir Next',
    fontSize: 16,
    left: 125,
    width: 212,
    textAlign: 'justify',
  },
  artistText: {
    fontFamily: 'Avenir Next',
    fontSize: 16,
    color: '#A680B4',
    left: 30,
    marginBottom: 10,
  },
  titleText: {
    fontFamily: 'Baskerville',
    fontSize: 18,
    fontWeight: 'bold',
    left: 30,
    marginBottom: 1.5,
  },
  openText: {
    fontFamily: 'Avenir Next',
    fontSize: 14,
    marginBottom: 15,
    letterSpacing: .5,
    fontWeight: '500',
    color: '#979797',
    left: 73,
  },
  image: {
    alignItems: 'center',
    top: 53,
    zIndex: 0,
    marginBottom: 50,
    left: 25,
  },
});
