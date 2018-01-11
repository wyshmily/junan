import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native';
import { List, Button, Flex } from 'antd-mobile'

const Item = List.Item;
const Brief = Item.Brief;


export default class ProblemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
            ]
        };
    }



    componentWillMount() {
        let inspect = global.inspect;
        let lists = [];
        inspect.PositionTypeList.forEach(element => {

            if (element.PositionList.length != 0) {
                element.PositionList.forEach(ele => {

                    if (ele.ProblemList.length) {
                        ele.ProblemList.forEach(item => {
                            lists.push(item)
                        })

                    }
                }

                )
            }

            return lists;

        });

        this.setState({
            list: lists
        })
    }

    updateData = (data) => {

        this.componentWillMount();

    };

    /**
     * 问题详情
     * @param id
     */
    toProblem = (params) => {
        const { navigate } = this.props.navigation;
        navigate("ProblemDetail", { item: params, updateData: this.updateData })
    }

    render() {
        return (
            <ScrollView>
                <List className="my-list">
                    {this.state.list.map((val, index) => {
                        return (
                            <Item
                                key={"item" + index}
                                arrow="horizontal"
                                multipleLine
                                onClick={this.toProblem.bind(this, val)}
                            >
                                <View style={styles.view}>
                                    <Image source={require('../../iconImages/problem.png')} style={{ width: 15, height: 15,marginTop:5 }} />
                                    <Text style={styles.title}>{val.value.positionArr[1] + '-' + val.value.positionArr[0]}</Text>
                                </View>
                              
                                <Brief>{val.value.remark}</Brief>
                            </Item>
                        )
                    })}
                </List>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        height:22,
        lineHeight:22
    },
    title: {
        textAlign: 'left',
        fontSize: 16,
        marginLeft: 20,
    },
});