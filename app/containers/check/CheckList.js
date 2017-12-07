import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import {List, Button} from 'antd-mobile'

const Item = List.Item;
const Brief = Item.Brief;


export default class CheckList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pointList: [{
                id: "check1",
                name: "位置选择",
                detail: "兵器室应选择在办公楼或营连宿舍的中间楼层，便于取用和警戒的房间，一般连队兵器室面积不小于15㎡。",
                checked: false
            },
                {
                    id: "check2",
                    name: "建筑结构",
                    detail: "兵器室应为钢筋混凝土（≧20cm）或砖混结构（≧37cm），地面用混凝土加固（≧15cm），屋顶用钢筋混凝土整体浇注结构，预制板结构屋顶应使用砂浆将缝隙填平，单人使用1.5米长的撬棍破坏，不能破损或移位。",
                    checked: true
                }
            ]
        };
    }

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.point}`,
    });
    /**
     * 设为正常
     * @param id
     */
    setNormal = (id) => {
        console.log(id);
    }
    /**
     * 新增优点
     * @param id
     */
    addAdvantage = (id) => {
        const {navigate} = this.props.navigation;
        navigate("AddAdvantage", { id: id })
    }
    /**
     * 新增问题
     * @param id
     */
    addProblem = (id) => {
        const {navigate} = this.props.navigation;
        navigate("AddProblem", { id: id })
    }

    render() {
        return (
            <View>
                <List className="my-list">
                    {this.state.pointList.map((val, index) => {
                        return (
                            <Item
                                key={"pointitem" + index}
                                arrow="horizontal"
                                multipleLine
                                platform="android"
                            >
                                {val.name}

                                <Brief>{val.detail}</Brief>
                                <View><Button key={"button-problem"} type="warning" size="small" inline
                                              onClick={this.addProblem.bind(this, val.id)}>发现问题</Button>
                                    <Button key={"button-advantage"} type="ghost" size="small" inline style={{ marginRight: 4 }}
                                            className={"am-button-borderfix"}
                                            onClick={this.addAdvantage.bind(this, val.id)}>记录优点</Button>
                                    <Button key={"button-normal"} type="primary" size="small" inline style={{ marginRight: 4 }}
                                            onClick={this.setNormal.bind(this, val.id)}>设为正常</Button>
                                </View>
                            </Item>
                        )
                    })}
                </List>
            </View>
        )
    }
}

const styles = StyleSheet.create({});