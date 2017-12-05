import { AppRegistry } from 'react-native';
//导入stack导航组件
import { StackNavigator } from 'react-navigation';
import Login from './app/Login'
import HomeScreen from './app/Home';
import Tabbars from './app/root'


//进行导航的注册
const Route = StackNavigator({
    Login:{screen:Login},
    Home: { screen: HomeScreen },
    MyTabBars: {screen: Tabbars},

});

AppRegistry.registerComponent('junan', () => Route);
