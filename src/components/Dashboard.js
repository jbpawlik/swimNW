import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import firebase from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { navigation } from '../helpers/Navigate'
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: ''
    }
  }

  signOut = () => {
    const {navigation} = this.props;
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Signup')
    })
    // .catch(error => this.setState({ errorMessage: error.message }))
  }


  render() {
    this.state = {
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid
    }
    
    return (
      <View style={styles.container}>
        <Text style = {styles.textStyle}>
          You are signed in.
        </Text>

        <Button
          color="#38A3EA"
          title="Signout"
          onPress={() => this.signOut()}
        />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 24,
    marginBottom: 20,
    padding: 40
  }
});