import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Check from './containers/Check'
import Record from './containers/Record'
import PointTypeList from './containers/PointTypeList'
const deviceW = Dimensions.get('window').width

const basePx = 375

function px2dp(px) {
  return px *  deviceW / basePx
}


export default class TabBars extends Component {
  state= {
    selectedTab: 'check'
  };
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.org}`,
    });

  render() {
    return (
        <View>
          <PointTypeList />
          <TabNavigator>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'check'}
                title="检查"
                selectedTitleStyle={{color: "#3496f0"}}
                renderIcon={() => <Icon name="home" size={px2dp(22)} color="#666"/>}
                renderSelectedIcon={() => <Icon name="check" size={px2dp(22)} color="#3496f0"/>}
                badgeText="1"
                onPress={() => this.setState({selectedTab: 'check'})}>
              <Check/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'record'}
                title="记录"
                selectedTitleStyle={{color: "#3496f0"}}
                renderIcon={() => <Icon name="user" size={px2dp(22)} color="#666"/>}
                renderSelectedIcon={() => <Icon name="user" size={px2dp(22)} color="#3496f0"/>}
                onPress={() => this.setState({selectedTab: 'record'})}>
              <Record/>
            </TabNavigator.Item>
          </TabNavigator>
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