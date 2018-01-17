import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Item,
    Image,
    DeviceEventEmitter
} from 'react-native';
import { Button, WhiteSpace,Toast,Carousel } from 'antd-mobile'

export default class CheckHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            time: '',
            inspectorName:'',
           
        };
    }
    componentWillMount() {
        let result = global.inspect;
 
        let timer=new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate();
        this.setState({
            name: result.Name,
            time: timer,
            inspectorName:result.Record.InspectorName
        })
    }
    beginCheck = () => {
        const { navigate } = this.props.navigation;
        console.log(navigate)
        //跳转页面
        navigate("Check")
    }

    test = () => {
        const { navigate } = this.props.navigation;
        console.log(navigate)
        //跳转页面
        navigate("Test")
    }

    

    render() {
        return (
            <View style={styles.container}>

 
                <Text style={styles.welcome}>
                    {this.state.name}
                </Text>
                <Text style={styles.instructions}>
                    检查人:{this.state.inspectorName}
                </Text>

                
                <Text style={styles.instructions}>
                    {this.state.time}
                </Text>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <Button type="primary" onClick={this.beginCheck}>开始检查</Button>
                <WhiteSpace size="lg" />
                {/* <Button type="primary" onClick={this.test}>测试</Button>
                <WhiteSpace size="lg" /> */}
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
