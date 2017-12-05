import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import {List} from 'antd-mobile'
const Item = List.Item;

export default class PointList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pointList:[{id:"point1",point:"兵器室大门",num:3},{id:"point2",point:"手枪柜",num:5}]
        };
    }
    beginCheck=(pointId)=>{
        console.log(pointId);

    }
    render() {
        return (
                <List className="my-list">
                    {this.state.pointList.map((val,index)=>{
                        return(<Item key={"pointitem"+index} arrow="horizontal" extra={val.num} multipleLine onClick={this.beginCheck.bind(this,val.id)}>{val.point}</Item>)
                    })}
                </List>
        )
    }
}

const styles = StyleSheet.create({


});