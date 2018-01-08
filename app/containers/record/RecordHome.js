import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View, Image,
    TouchableHighlight,
    DeviceEventEmitter
} from 'react-native';
import { WingBlank, Toast, WhiteSpace, Flex } from 'antd-mobile';
import Icon from 'react-native-vector-icons/FontAwesome'


export default class RecordHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            problem: { num: 0 },
            advantage: { num: 0 }
        };
    }
    componentWillMount() {
     
        let inspect = global.inspect;
        let num1 = 0;
        let num2 = 0;
        inspect.PositionTypeList.forEach(element => {

            if (element.PositionList.length != 0) {
                element.PositionList.forEach(ele => {
                    num1 += ele.ProblemList.length;
                    num2 += ele.AdvantageList.length;
                }

                )
            }


        });
        

        this.setState({
            problem: { num: num1 },
            advantage: { num: num2 }
        })
    }

  
    componentWillReceiveProps(){
        this.componentWillMount();
    }

     

    toList = (uri) => {
        const { navigate } = this.props.navigation;
        navigate(uri)
    }

    render() {
        return (
            <View style={styles.container}>
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    <TouchableHighlight className="my-list" style={styles.card} onPress={this.toList.bind(this, "ProblemList")}>
                        <View>
                            <Flex>
                                <Flex.Item style={styles.inner}>

                                <Image source={require('../../iconImages/problem.png')} style={{width:25, height: 25}} />
                                    {/* <Image
                                        source={{uri: '../../iconImages/problem.png'}} style={{width: 40, height: 40}}
                                    />) */}
                                    <Text style={styles.title}>{"问题记录"}</Text>
                                </Flex.Item>
                                <Flex.Item><Text
                                    style={styles.num}>{this.state.problem.num}</Text></Flex.Item>
                            </Flex>
                        </View>
                    </TouchableHighlight>
                    <WhiteSpace size="lg" />
                </WingBlank>
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    <TouchableHighlight style={styles.card} className="my-list" onPress={this.toList.bind(this, "AdvantageList")}>
                        <View>
                            <Flex>
                                <Flex.Item style={styles.inner}>
                                    
                                     <Image source={require('../../iconImages/advantages.png')} style={{width:25, height: 25}} />
                                    <Text style={styles.title}>{"优点记录"}</Text>
                                </Flex.Item>
                                <Flex.Item><Text
                                    style={styles.num}>{this.state.advantage.num}</Text></Flex.Item>
                            </Flex>
                        </View>
                    </TouchableHighlight>
                    <WhiteSpace size="lg" />
                </WingBlank>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 40,
        paddingTop: 40,
        backgroundColor: '#fff'
    },
    inner: {
        flexDirection: 'row',
    },
    title: {
        fontSize: 16,
        textAlign: 'left',
        marginLeft: 15,
    },
    num: {
        textAlign: 'right',
    },
    icon: {
        width: 26,
        height: 26,
    }
});
