import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import {List} from 'antd-mobile'
const Item = List.Item;

export default class PointTypeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pointList:[{id:"point1",point:"兵器室",num:3},{id:"point2",point:"弹药库",num:5},{id:"point3",point:"油库",num:4},{id:"point4",point:"哨位",num:2}]
        };
    }
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.org}`,
    });

    beginCheck=(pointId)=>{
        console.log("selected:",pointId)
        const {navigate} = this.props.navigation;
        navigate("PointList", { pointType: pointId })

    }

    render() {
        return (
            <List className="my-list">
                {this.state.pointList.map((val, index) => {
                    return (<Item key={"pointitem" + index} arrow="horizontal" extra={val.num} multipleLine
                                  onClick={this.beginCheck.bind(this, val.point)}>{val.point}</Item>)
                })}
            </List>
        )
    }
}

const styles = StyleSheet.create({


});