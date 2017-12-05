import React, { Component } from 'react';
import {
    StyleSheet,
  Text,
  View
} from 'react-native';
import {Button} from 'antd-mobile'
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'XXXX安全检查',
            org: 'XX单位',
            time:(new Date()).toUTCString()
        };
    }
    static navigationOptions={
        header:null,
    }
    beginCheck=()=>{
        const {navigate} = this.props.navigation;
        //跳转页面
        navigate("MyTabBars")
    }
  render() {
    return (
      <View>
        <Text style={styles.welcome}>
            {this.state.name}
        </Text>
        <Text style={styles.instructions}>
            {this.state.org}
        </Text>
        <Button type="primary" onClick={this.beginCheck}>开始检查</Button>
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
    instructions: {
        textAlign: 'center',
        marginBottom: 5,
    },
});
