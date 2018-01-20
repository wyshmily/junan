import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native';
import { Toast, List, Button } from 'antd-mobile'
import Icon from 'react-native-vector-icons/FontAwesome'

const Item = List.Item;
const Brief = Item.Brief;


export default class AdvantageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }


    updateData = (data) => {

        this.componentWillMount();

    };


    componentWillMount() {
        let inspect = global.inspect;
        let lists = [];
        inspect.PositionTypeList.forEach(element => {

            if (element.PositionList.length != 0) {
                element.PositionList.forEach(ele => {

                    if (ele.AdvantageList.length) {
                        ele.AdvantageList.forEach(item => {
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



    /**
     * 问题详情
     * @param id
     */
    toProblem = (params) => {
        const { navigate } = this.props.navigation;
        navigate("AdvantageDetail", { item: params, updateData: this.updateData })
    }



    render() {
        return (
            <ScrollView>

                <List className="my-list">
                    {this.state.list.map((val, index) => {
                        return (
                            <Item
                            style={{marginTop:20}}
                                key={"item" + index}
                                arrow="horizontal"
                                multipleLine
                                onClick={this.toProblem.bind(this, val)}
                            >
                                <View style={styles.view}>
                                    <Image source={require('../../iconImages/advantages.png')} style={{ width: 15, height: 15 ,marginTop:5}} />
                                    {/* <Icon name="check-circle-o" size={22} color={'#3e9ce9'} /> */}
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
    },
    title: {
        textAlign: 'left',
        fontSize: 16,
        marginLeft: 20,
    },
});