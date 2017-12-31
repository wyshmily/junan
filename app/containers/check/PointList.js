import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { List, Modal, Button, Flex, Toast } from 'antd-mobile';

import * as stores from './../../Stores';


const prompt = Modal.prompt;
const Item = List.Item;


export default class PointList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pointList: [],
            StandardListLength: 0,
            PointTypeIndex: 0
        };
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.pointType}`,
    });

    componentWillMount() {

        let inspect = global.inspect;
        let index = this.props.navigation.state.params.index;

        let positionListArr = inspect.PositionTypeList[index].PositionList
                .filter(ele => ele.departmentId == global.department.Id);
 
        this.setState({
           
            pointList: positionListArr,
            StandardListLength: inspect.PositionTypeList[index].StandardList.length,
            PointTypeIndex: index
        })

    }

    /**
     * 检查该点位
     * @param point 点位名称
     * @param index 点位编号
     */
    beginCheck = (point, index) => {
        global.currentPoint = { type: this.props.navigation.state.params.index, point: index, pointName: point }
        const { navigate } = this.props.navigation;
        navigate("CheckList", { point: point })
    }

    render() {
        return (
            <View style={styles.container}>
                <List className="my-list">
                    {this.state.pointList.map((val, index) => {
                        let checkedNum = 0;
                        if (this.state.pointList[index].StateList) {
                            this.state.pointList[index].StateList.map((value, i) => {
                                if (value)
                                    checkedNum++;
                            })
                        }
                        return (
                            <Item key={"pointitem" + index} arrow="horizontal"
                                extra={(checkedNum)
                                    + '/' + this.state.StandardListLength}
                                multipleLine
                                onClick={this.beginCheck.bind(this, val.Name, index)}>{val.Name}</Item>)
                    })}
                </List>
                <Flex style={styles.button}>
                    <Flex.Item></Flex.Item>
                    <Flex.Item><Button type={"primary"} onClick={() => prompt('新增点位', '点位名称',
                        [
                            { text: '取消' },
                            {
                                text: '保存',
                                onPress: value => new Promise((resolve) => {
                                    let pointList = this.state.pointList;
                                    let length = this.state.StandardListLength
                                    let stateList = new Array(length);
                                    pointList.push({
                                        Id: pointList.length,
                                        Name: value,
                                        StateList: stateList,
                                        ProblemList: [],
                                        AdvantageList: [],
                                        departmentId: global.department.Id
                                    })
                                    this.setState({ pointList: pointList })
                                    let inspect = global.inspect;
                                    inspect.PositionTypeList[this.state.PointTypeIndex].PositionList = pointList
                                    global.inspect = inspect;
                                    stores.writeFile(inspect);
                                    Toast.info(`新增成功`, 1);
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
    container: {
        flex: 1,
    },
    button: {
        position: 'absolute',
        bottom: 20,
    },
});