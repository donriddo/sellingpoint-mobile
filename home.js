import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  MapView,
  ToolbarAndroid
} from 'react-native';
import styles from './styles';
export default class Home extends Component {
    rev () {
        this.props.navigator.pop();
    }
    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.welcome}>
                Welcome to SellingPoint!
            </Text>
            </View>
        );
    }
};
