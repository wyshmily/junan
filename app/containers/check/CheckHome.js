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
            name: '',
            org: '',
            time: '',
            inspectorName:'',
        };
    }
    componentWillMount() {
        let result = global.inspect;
        let timer=result.InspectDate.split('T')[0]
        let time=global.inspect.InspectDate.split('T')[0]
        this.setState({
            name: result.Name,
            org: result.OrganizerName,
            time: timer,
            inspectorName:result.Record.InspectorName
        })
    }
    beginCheck = () => {
        const { navigate } = this.props.navigation;
        console.log(navigate)
        //跳转页面
        navigate("OrgList")
    }

    test = () => {
        const { navigate } = this.props.navigation;
        //跳转页面
        navigate("Test")
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    检查名称:{this.state.name}
                </Text>
                <Text style={styles.instructions}>
                    检查单位:{this.state.org}
                </Text>
                <Text style={styles.instructions}>
                    检查人:{this.state.inspectorName}
                </Text>

                
                <Text style={styles.instructions}>
                    检查时间:{this.state.time}
                </Text>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <Button type="primary" onClick={this.beginCheck}>开始检查</Button>
                {/* <Button type="primary" onClick={this.test}>测试</Button> */}
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
