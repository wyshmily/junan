import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { List, Button } from 'antd-mobile'
import Icon from 'react-native-vector-icons/FontAwesome'

const Item = List.Item;
const Brief = Item.Brief;


export default class AdvantageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [{
                id: "check1",
                pointType: "二连",
                point: "兵器室",
                list: [],
                remark: "我是优点备注",
            },
            {
                id: "check2",
                pointType: "二连",
                point: "手枪柜",
                list: [],
                remark: "我是优点备注",
            },
            {
                id: "check2",
                pointType: "二连",
                point: "手枪柜",
                list: [],
                remark: "我是优点备注",
            }
            ]
        };
    }

    componentWillMount() {
        let inspect = global.inspect;
        let lists = [];
        inspect.PositionTypeList.forEach(element => {

            if (element.PositionList.length != 0) {
                element.PositionList.forEach(ele => {

                    if (ele.AdvantageList.length) {
                        lists.push(ele.AdvantageList)
                    }
                }

                )
            }


        });

        this.setState({
            list:lists
        })
    }

    /**
     * 问题详情
     * @param id
     */
    toProblem = (id) => {
        const { navigate } = this.props.navigation;
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
                                multipleLine
                                onClick={this.toProblem.bind(this, val.index)}
                            >
                                <View style={styles.view}>
                                    <Icon name="check-circle-o" size={22} color={'#3e9ce9'} />
                                    <Text style={styles.title}>{val.value.positionArr[1] + '-' + val.value.positionArr[0]}</Text>
                                </View>
                                {val.list.map((value, i) => {
                                    return <Brief>{value.name}</Brief>
                                })}
                                <Brief>{val.value.remark}</Brief>
                            </Item>
                        )
                    })}
                </List>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row'
    },
    title: {
        textAlign: 'left',
        fontSize: 16,
        marginLeft: 20,
    },
});