import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import {List, Button,Flex} from 'antd-mobile'
import Icon from 'react-native-vector-icons/FontAwesome'

const Item = List.Item;
const Brief = Item.Brief;


export default class ProblemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [{
                id: "check1",
                pointType: "二连",
                point:"兵器室",
                list:[],
                remark: "我是问题备注",
            },
                {
                    id: "check2",
                    pointType: "二连",
                    point:"手枪柜",
                    list:[],
                    remark: "我是问题备注",
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
        navigate("ProblemDetail", { id: id })
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
                                onClick={this.toProblem.bind(this,val.id)}
                            >
                                <View style={styles.view}>
                                    <Icon name="warning" size={22} color={'#e94f4f'} />
                                    <Text style={styles.title}>{val.pointType+'-'+val.point}</Text>
                                </View>
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

const styles = StyleSheet.create({
    view:{
        flexDirection: 'row'
    },
    title:{
        textAlign:'left',
        fontSize:16,
        marginLeft:20,
    },
});