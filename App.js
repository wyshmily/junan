import React, { Component } from 'react';
import {AppRegistry, StyleSheet} from 'react-native';
//导入stack导航组件
import {StackNavigator, TabNavigator} from 'react-navigation';
import {Dimensions} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'


import Login from './app/Login'
import CheckHome from './app/containers/check/CheckHome'
import RecordHome from './app/containers/record/RecordHome'

import OrgList from './app/containers/check/OrgList'
import PointTypeList from './app/containers/check/PointTypeList'
import PointList from './app/containers/check/PointList'
import CheckList from './app/containers/check/CheckList'
import AddProblem from "./app/containers/check/AddProblem";
import AddAdvantage from "./app/containers/check/AddAdvantage";

import AdvantageList from "./app/containers/record/AdvantageList";
import ProblemList from "./app/containers/record/ProblemList";
import ProblemDetail from "./app/containers/record/ProblemDetail";
import AdvantageDetail from "./app/containers/record/AdvantageDetail";



const deviceW = Dimensions.get('window').width

const basePx = 375

function px2dp(px) {
    return px * deviceW / basePx
}


const MainNavigator = TabNavigator({
        Check: {
            screen: CheckHome,
            navigationOptions: {
                tabBarLabel: '检查',
                header: null,
                tabBarIcon: ({tintColor}) => <Icon name="check-square-o" size={px2dp(22)} color={tintColor}/>,
            }
        },
        RecordHome: {
            screen: RecordHome,
            navigationOptions: {
                tabBarLabel: '记录',
                header: null,
                tabBarIcon: ({tintColor}) => <Icon name="list" size={px2dp(22)} color={tintColor}/>,
            }
        },
    }, {
        animationEnabled: true,// 切换页面时是否有动画效果
        tabBarPosition: 'bottom',
        swipeEnabled: true,// 是否可以左右滑动切换tab
        backBehavior: 'none',// 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
        tabBarOptions: {
            activeTintColor: '#3e9ce9',// 文字和图片选中颜色
            inactiveTintColor: '#999999',// 文字和图片未选中颜色
            showIcon: true,// android 默认不显示 icon, 需要设置为 true 才会显示
            indicatorStyle: {
                height: 0,  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
                opacity: 0
            },
            style: {
                backgroundColor: '#fff',// TabBar 背景色
                // height: 44,
                // lineHeight:44,
            },
            tabStyle: {
                padding: 0
            },
            labelStyle: {
                fontSize: 12, // 文字大小
            },
        },
    },
)

//进行导航的注册
const Route = StackNavigator({
    initialRouteName:{screen:Login},
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
        }
    },
    TabBars: {screen: MainNavigator},
    OrgList: {
        screen: OrgList, navigationOptions: {
            title: '受检单位'
        }
    },
    PointTypeList: {screen: PointTypeList},
    PointList: {screen: PointList},
    CheckList: {screen: CheckList},
    AddProblem: {screen: AddProblem,navigationOptions: {
        title: '新增问题'
    }},
    AddAdvantage: {screen: AddAdvantage,navigationOptions: {
        title: '新增优点'
    }},
    AdvantageList: {screen: AdvantageList,navigationOptions: {
        title: '优点记录'
    }},
    ProblemList: {screen: ProblemList,navigationOptions: {
        title: '问题记录'
    }},
    ProblemDetail: {screen: ProblemDetail,navigationOptions: {
        title: '问题详情'
    }},
    AdvantageDetail: {screen: AdvantageDetail,navigationOptions: {
        title: '优点详情'
    }},
});

const styles = StyleSheet.create({

})


AppRegistry.registerComponent('junan', () => Route);
