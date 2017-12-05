/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Button,List,InputItem } from 'antd-mobile';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    static navigationOptions={
        header:null,
    }

    changeInput=(key,value)=>{
        let newState=this.state;
        newState[key]=value
        this.setState(newState);
    }

    login = () => {
        console.log(this.state.username,this.state.password)
        //验证成功后跳转页面
        const {navigate} = this.props.navigation;
        navigate("Home")
    }

    render() {

        return (
            <View>

                <List>
                    <InputItem value={this.state.username} onChange={this.changeInput.bind(this,"username")}>用户名</InputItem>
                </List>
                <List>
                    <InputItem type={"password"} value={this.state.password} onChange={this.changeInput.bind(this,"password")}>密码</InputItem>
                </List>
                <List>
                    <Button type="primary" onClick={this.login}

                    >登录</Button>
                </List>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
