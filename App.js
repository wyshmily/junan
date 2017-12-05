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
import { Button,TabBar,List,DatePicker } from 'antd-mobile';
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
            selectedTab: 'redTab',
            hidden: false,
            fullScreen: false,
        };
    }

    renderContent=(pageText)=> {
        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
                <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
                   onClick={(e) => {
                       e.preventDefault();
                       this.setState({
                           hidden: !this.state.hidden,
                       });
                   }}
                >
                    Click to show/hide tab-bar
                </a>
                <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
                   onClick={(e) => {
                       e.preventDefault();
                       this.setState({
                           fullScreen: !this.state.fullScreen,
                       });
                   }}
                >
                    Click to switch fullscreen
                </a>
            </div>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Button>dianwo</Button>
                <List>
                    <DatePicker mode="datetime">
                        <List.Item arrow="horizontal">
                            选择时间
                        </List.Item>
                    </DatePicker>
                </List>
                <Text style={styles.instructions}>
                    test
                </Text>
                <Text style={styles.instructions}>
                    {instructions}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    marginTop:30,
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
