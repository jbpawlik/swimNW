// import React from "react";
// import PropTypes from "prop-types";

import React, { Component, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../firebase';
import {Picker} from '@react-native-picker/picker'


export default class ReusableForm extends React.Component {

  constructor() {
    let user = firebase.auth().currentUser;
    // const db = firebase.firestore();
    super();
    this.dbRef = firebase.firestore().collection('markers');
    this.state = { 
      title: '',
      rating: '',
      // latitude: null, 
      // longitude: null,
      location: '',
      type: '',
      season: '',
      privacy: 'Public',
      userID: user.uid
    }
  }

  // const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   return firebase.auth().onAuthStateChanged(setLoggedIn);
  // }, []);

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  addMarker = () => {

    if (this.state.title === '') {
      Alert.alert('Fill out all required fields')
    } else {
      this.dbRef.add({
        title: this.state.title,
        // latitude: parseFloat(this.state.latitude), 
        // longitude: parseFloat(this.state.longitude),
        coordinate: this.props.tempCoordinate,
        privacy: this.state.privacy,
        userID: this.state.userID
        // coordinate: {latitude: parseFloat(this.state.latitude), longitude: parseFloat(this.state.longitude)}
      })
      // this.props.navigation.navigate('Map')
      this.props.hideReusableForm()
    }
    }

  render() {
    // if(this.state.isLoading){
    //   return(
    //     <View style={styles.preloader}>
    //       <ActivityIndicator size="large" color="#9E9E9E"/>
    //     </View>
    //   )
    // }
    console.log(this.state.userID)

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Title"
          value={this.state.title}
          onChangeText={(val) => this.updateInputVal(val, 'title')}
        />
        <Picker
          selectedValue={this.state.privacy}
          placeholder="Select Privacy Level"
          onValueChange={(val, index) =>
            this.updateInputVal(val, 'privacy')
          }>
          <Picker.Item label="Public" value="Public" />
          <Picker.Item label="Protected" value="Protected" />
          <Picker.Item label="Private" value="Private" />
        </Picker>
        {/* <TextInput
          style={styles.inputStyle}
          keyboardType='numeric'
          placeholder={this.state.tempCoordinate}
          value={this.state.latitude}
          onChangeText={(val) => this.updateInputVal(val, 'latitude')}
        />
        <TextInput
          style={styles.inputStyle}
          keyboardType='numeric'
          placeholder="Longitude"
          value={this.state.longitude}
          onChangeText={(val) => this.updateInputVal(val, 'longitude')}
        />    */}
        <Button
          color="#3740FE"
          title="Add Marker"
          onPress={() => this.addMarker()}
        />
        <Button
          color="#3740FE"
          title="Back to Map"
          onPress={() => this.props.hideReusableForm()}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});
