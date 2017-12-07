import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { List, Modal, Button,Flex, Toast } from 'antd-mobile';

const prompt = Modal.prompt;
const Item = List.Item;

export default class PointList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pointList: [{id: "point1", point: "兵器室大门", num: 3,checkedNum:2}, {id: "point2", point: "手枪柜", num: 5,checkedNum:0}]
        };
    }

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.pointType}`,
    });

    newPoint = () => {

    }
    beginCheck = (point) => {
        const {navigate} = this.props.navigation;
        navigate("CheckList", { point: point })
    }
    render() {
        return (
            <View style={styles.container}>
                <List className="my-list">
                    {this.state.pointList.map((val, index) => {
                        return (<Item key={"pointitem" + index} arrow="horizontal" extra={val.checkedNum+'/'+val.num} multipleLine
                                      onClick={this.beginCheck.bind(this, val.point)}>{val.point}</Item>)
                    })}
                </List>
                <Flex style={styles.button} >
                    <Flex.Item></Flex.Item>
                    <Flex.Item><Button type={"primary"} onClick={() => prompt('新增点位', '点位名称',
                        [
                            { text: '取消' },
                            {
                                text: '保存',
                                onPress: value => new Promise((resolve) => {
                                    Toast.info(`你输入的点位名称是：${value}`, 1);
                                    setTimeout(() => {
                                        resolve();
                                    }, 1000);
                                }),
                            },
                        ], 'default', null, ['点位名称'])}
                    >新增点位</Button></Flex.Item>
                    <Flex.Item></Flex.Item>
                </Flex>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    button:{
        position: 'absolute',
        bottom: 20,
    },
});