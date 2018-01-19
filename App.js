import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image } from 'react-native';
//导入stack导航组件
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Dimensions } from 'react-native';

import Login from './app/Login';
import Check from './app/containers/check/Check';
// import Record from './app/containers/Record'
import CheckHome from './app/containers/check/CheckHome';
import RecordHome from './app/containers/record/RecordHome';

import AdvantageList from "./app/containers/record/AdvantageList";
import ProblemList from "./app/containers/record/ProblemList";
import ProblemDetail from "./app/containers/record/ProblemDetail";
import AdvantageDetail from "./app/containers/record/AdvantageDetail";

import ImagePickers from './app/components/ImagePickers';

import { Toast } from 'antd-mobile';
import {
    Button
} from 'react-native';

const deviceW = Dimensions.get('window').width

const basePx = 375

function px2dp(px) {
    return px * deviceW / basePx
}


//进行导航的注册

// const MainNavigator = TabNavigator({

//     CheckHome: {
//         screen: CheckHome,
//         navigationOptions: {
//             tabBarLabel: '检查',
//             header: null,
//             tabBarIcon: ({ tintColor }) =>
//                 (<Image
//                     source={require('./app/iconImages/check.png')}
//                     style={[styles.icon, { tintColor: tintColor }]}
//                 />),


//         }
//     },
//     RecordHome: {
//         screen: RecordHome,
//         navigationOptions: {
//             tabBarLabel: '记录',
//             header: null,
//             tabBarIcon: ({ tintColor }) => (<Image
//                 source={require('./app/iconImages/record.png')}
//                 style={[styles.icon, { tintColor: tintColor }]}
//             />),



//         }
//     },
// }, {
//         animationEnabled: true,// 切换页面时是否有动画效果
//         tabBarPosition: 'bottom',
//         swipeEnabled: true,// 是否可以左右滑动切换tab
//         backBehavior: 'none',// 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
//         tabBarOptions: {
//             activeTintColor: '#3e9ce9',// 文字和图片选中颜色
//             inactiveTintColor: '#999999',// 文字和图片未选中颜色
//             showIcon: true,// android 默认不显示 icon, 需要设置为 true 才会显示
//             indicatorStyle: {
//                 height: 0,  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
//                 opacity: 0
//             },
//             style: {
//                 backgroundColor: '#fff',// TabBar 背景色
//                 // height: 44,
//                 // lineHeight:44,
//             },
//             tabStyle: {
//                 padding: 0
//             },
//             labelStyle: {
//                 fontSize: 12, // 文字大小
//             },
//         },

//     },
// )

const Route = StackNavigator({
    initialRouteName: { screen: Login },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
        }
    },
    CheckHome: {
        screen: CheckHome, navigationOptions: {
            title: '现场检查'
        }
    },
    RecordHome: {
        screen: RecordHome, navigationOptions: {
            title: '检查记录'
        }
    },
    Check: {
        screen: Check, navigationOptions: {
            header: null
        }
    },
    

    AdvantageList: {
        screen: AdvantageList, navigationOptions: {
            title: '优点记录'
        }
    },
    ProblemList: {
        screen: ProblemList, navigationOptions: {
            title: '问题记录'
        }
    },
    ProblemDetail: {
        screen: ProblemDetail, navigationOptions: {
            title: '问题详情'
        }
    },
    AdvantageDetail: {
        screen: AdvantageDetail, navigationOptions: {
            title: '优点详情',
            initialRouteParams: {}
        }
    },


    ImagePickers: {
        screen: ImagePickers, navigationOptions: {
            header: null
        }
    },
});

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    },
})


AppRegistry.registerComponent('junan', () => Route);
