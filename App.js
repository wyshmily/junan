import { AppRegistry } from 'react-native';
//导入stack导航组件
import { StackNavigator } from 'react-navigation';
import Login from './app/Login'
import HomeScreen from './app/Home';
import TabBars from './app/TabBars'
import OrgList from './app/containers/OrgList'

//进行导航的注册
const Route = StackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
        }
    },
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: null,
        }
    },
    OrgList:{screen:OrgList,navigationOptions:{
        title:'受检单位'
    }},
    TabBars: {screen: TabBars},

});

AppRegistry.registerComponent('junan', () => Route);
