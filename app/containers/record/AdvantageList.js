import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import {List, Button} from 'antd-mobile'

const Item = List.Item;
const Brief = Item.Brief;


export default class AdvantageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [{
                id: "check1",
                pointType: "二连",
                point:"兵器室",
                list:[],
                remark: "我是优点备注",
            },
                {
                    id: "check2",
                    pointType: "二连",
                    point:"手枪柜",
                    list:[],
                    remark: "我是优点备注",
                }
            ]
        };
    }

    /**
     * 问题详情
     * @param id
     */
    toProblem = (id) => {
        const {navigate} = this.props.navigation;
        navigate("AdvantageDetail", { id: id })
    }

    render() {
        return (
            <View>
                <List className="my-list">
                    {this.state.list.map((val, index) => {
                        return (
                            <Item
                                key={"item" + index}
                                arrow="horizontal"
                                thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                                multipleLine
                                onClick={this.toProblem.bind(this,val.id)}
                            >
                                {val.pointType+'-'+val.point}
                                {val.list.map((value,i)=>{
                                    return <Brief>{value.name}</Brief>
                                })}
                                <Brief>{val.remark}</Brief>
                            </Item>
                        )
                    })}
                </List>
            </View>
        )
    }
}

const styles = StyleSheet.create({});