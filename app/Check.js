import React, { Component } from 'react';
import {
    StyleSheet,
  Text,
  View
} from 'react-native';
export default class Check extends Component {
  render() {
    return (
      <View>
        <Text style={styles.welcome}>
          检查
        </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
