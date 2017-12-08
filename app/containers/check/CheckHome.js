import React, { Component } from 'react';
import {
    StyleSheet,
  Text,
  View
} from 'react-native';
import {Button,WhiteSpace} from 'antd-mobile'
export default class CheckHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'XXXX安全检查',
            org: 'XX单位',
            time:(new Date()).toUTCString()
        };
    }
    beginCheck=()=>{
        const {navigate} = this.props.navigation;
        console.log(navigate)
        //跳转页面
        navigate("OrgList")
    }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
            {this.state.name}
        </Text>
        <Text style={styles.instructions}>
            {this.state.org}
        </Text>
          <Text style={styles.instructions}>
              {this.state.time}
          </Text>
          <WhiteSpace size="lg"/>
          <WhiteSpace size="lg"/>
        <Button type="primary" onClick={this.beginCheck}>开始检查</Button>
          <WhiteSpace size="lg"/>
          <WhiteSpace size="lg"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
    instructions: {
        textAlign: 'center',
        marginBottom: 10,
    },
});
