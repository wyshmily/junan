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
                // tabBarIcon: ({tintColor}) => <Icon name="home" size={px2dp(22)} color={tintColor}/>,
            }
        },
        RecordHome: {
            screen: RecordHome,
            navigationOptions: {
                tabBarLabel: '记录',
                header: null,
                // tabBarIcon: ({tintColor}) => <Icon name="user" size={px2dp(22)} color={tintColor}/>,
            }
        },
    }, {
        animationEnabled: true,
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        backBehavior: 'none',
        tabBarOptions: {
            activeTintColor: '#fff',
            inactiveTintColor: '#fff',
            activeBackgroundColor: '#fff',
            inactiveBackgroundColor: '#3496f0',
            showIcon: true,
            pressColor: 'gray',
            pressOpacity: 0.8,
        },
    },
)

//进行导航的注册
const Route = StackNavigator({
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
    tabBarImage: {
        width: 24,
        height: 24,
    },
    tabBar: {
        backgroundColor: 'white',
    },
    tabBarLabel: {
        fontSize: 12,
    },
    tabBarItem: {
        height: 56,
    },
})


AppRegistry.registerComponent('junan', () => Route);
