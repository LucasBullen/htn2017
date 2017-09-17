import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button,
  Modal,
TouchableHighlight
} from 'react-native';
import {
  TabNavigator
} from 'react-navigation';


// Home Screen //

class HomeScreen extends React.Component {
  static navigationOptions = {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Image
          source={require('./assets/img/profile.png')}
          style={[styles.icon, {
            tintColor: tintColor}]}
          />
),
};

render() {
  return (  <View style={styles.container}></View>


);
}
}

class ProfileScreen extends React.Component {
  static navigationOptions = {
        tabBarLabel: 'Profile',
};

render() {
  return (
      <Button
  onPress={() => this.props.navigation.goBack()}
  title="Go back home"
      />
);
}
}

class SearchScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Search',
  };

  render() {
    return (
        <Button
    onPress={() => this.props.navigation.goBack()}
    title="Go back home"
        />
  );
  }
}

class BidScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Bid',
  };

  state = {
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
        <ScrollView style={styles.container}>

  <Image
    source={require('./assets/img/artwork.png')}
    style={styles.image}/>
  <Text style={styles.openText}>OPEN • CLOSES IN 3 HR 23 MINS</Text>
    <Text style={styles.titleText}>Metamorphosis</Text>
    <Text style={styles.artistText}>Marco Escobedo</Text>
    <Text style={styles.bodyText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>

    <View style={{marginTop: 22}}>
    <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.modalVisible}
      onRequestClose={() => {alert("Modal has been closed.")}}
    >
    <View style={{marginTop: 22}}>
    <View>
        <View style={{flexDirection: 'row', flex: 1}}>
    <Image
    source={require('./assets/img/artwork.png')}
    style={styles.imageBid}/>
        <Text style={styles.titleTextBid}>Metamorphosis</Text>
        <Text style={styles.artistTextBid}>Marco Escobedo</Text>
      </View>
      </View>

    <TouchableHighlight onPress={() => {
      this.setModalVisible(!this.state.modalVisible)
    }}>
  <Text style={styles.bidButton}>BID</Text>
    </TouchableHighlight>

    <Image
    source={require('./assets/img/graph.jpg')}
    style={styles.graph}/>
        </View>
      </Modal>

      <TouchableHighlight onPress={() => {
        this.setModalVisible(true)
      }}>
    <Text style={styles.modalText}>BID</Text>
      </TouchableHighlight>
      </View>
    </ScrollView>
    );
  }
}

const Navigator = TabNavigator({
  Home: {
    screen: HomeScreen,
  },
  Profile: {
    screen: ProfileScreen,
  },
  Search: {
    screen: SearchScreen,
  },
  Bid: {
    screen: BidScreen,
  }

}, {
  tabBarPosition: 'bottom',
  flex: 1,
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});

export default class App extends React.Component {
  render() {
    return (
        <View style={styles.container}>
  <Navigator />
    </View>
  );
  }
}


const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
  container: {
    flex: 1,
  },
  bodyText: {
    fontFamily: 'Avenir Next',
    fontSize: 16,
    left: 30,
    width: 300,
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
  modalText: {
    alignSelf: 'center',
    flex: 1,
    backgroundColor: '#A680B4',
    height: 50,
    width: 100,
    letterSpacing: .5,
    color: '#ffffff',
    paddingTop: 17,
    paddingLeft: 38,
    marginBottom: 30,
  },
  graph: {
    alignSelf: 'center',
    top: 200,
  },
  titleTextBid: {
    fontFamily: 'Baskerville',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 1.5,
    top: 65,
    alignSelf: 'center',
    left: 50,
  },
  artistTextBid: {
    fontFamily: 'Avenir Next',
    fontSize: 16,
    color: '#A680B4',
    marginBottom: 10,
    top: 95,
    alignSelf: 'center',
    right: 85,
  },
  imageBid: {
    top: 53,
    zIndex: 0,
    marginBottom: 50,
    left: 30,
    height: 125,
    width: 100,
  },
  bidButton: {
    alignSelf: 'center',
    flex: 1,
    backgroundColor: '#A680B4',
    height: 50,
    width: 100,
    letterSpacing: .5,
    color: '#ffffff',
    paddingTop: 17,
    paddingBottom: 35,
    paddingLeft: 38,
    marginBottom: 30,
    top: 550,
  }
});
