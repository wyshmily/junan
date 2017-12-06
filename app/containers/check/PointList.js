import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import {List, Button} from 'antd-mobile'

const Item = List.Item;

export default class PointList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pointList: [{id: "point1", point: "兵器室大门", num: 3}, {id: "point2", point: "手枪柜", num: 5}]
        };
    }

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.pointType}`,
    });

    newPoint = () => {

    }

    render() {
        return (
            <view>
                <List className="my-list">
                    {this.state.pointList.map((val, index) => {
                        return (<Item key={"pointitem" + index} arrow="horizontal" extra={val.num} multipleLine
                                      onClick={this.beginCheck.bind(this, val.id)}>{val.point}</Item>)
                    })}
                </List>
                <Button type="primary" onClick={this.newPoint}>新增点位</Button>
            </view>
        )
    }
}

const styles = StyleSheet.create({});