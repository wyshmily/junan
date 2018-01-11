import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Item,
    DeviceEventEmitter
} from 'react-native';
import { Button, WhiteSpace,Toast } from 'antd-mobile'

export default class CheckHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '检查',
            org: '某团',
            time: '2017-12-1',
            inspectorName:'一连',
        };
    }
    componentWillMount() {
       
    }
    beginCheck = () => {
        const { navigate } = this.props.navigation;
        console.log(navigate)
        
    }

    test = () => {
        const { navigate } = this.props.navigation;
        //跳转页面
       
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
                    检查人:{this.state.inspectorName}
                </Text>

                
                <Text style={styles.instructions}>
                    {this.state.time}
                </Text>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <Button type="primary" onClick={this.beginCheck}>开始检查</Button>
                <Button type="primary" onClick={this.record}>检查记录</Button>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
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
