import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import {List, Button,Flex} from 'antd-mobile'

const Item = List.Item;
const Brief = Item.Brief;


export default class CheckList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StandardList: [],
            StateList:[]
        };
    }

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.point}`,
    });

    componentWillMount() {
        let inspect =global.inspect;
        let type = global.currentPoint.type;
        let point = global.currentPoint.point;
        this.setState({
            StandardList: inspect.PositionTypeList[type].StandardList,
            StateList:inspect.PositionTypeList[type].PositionList[point].StateList
        })
    }
    setStateList=(index,value)=>{
        let checkI=null;
        const currentCheck = this.state.StateList.find((val,i)=>{
            if(val["index"]==index){
                checkI = i;
                return true

            }
            return false;
        })
        let stateList = this.state.StateList
        if(currentCheck){
            stateList[checkI]["value"]=value
        }else{
            stateList.push({"index":index,"value":value})
        }
        this.setState({StateList:stateList})
        let inspect = global.inspect;
        inspect.PositionTypeList[global.currentPoint.type].PositionList[global.currentPoint.point]["StateList"] = stateList
        global.inspect = inspect;
    }
    /**
     * 设为正常
     * @param id
     */
    setNormal = (id) => {
        console.log(id);
        this.setStateList(id,"normal")
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
                                {val.Category}

                                <Brief>{val.Standard}</Brief>
                                    <Flex>
                                    <Flex.Item><Button key={"button-problem"} type="warning" size="small" inline style={{ marginRight: 10 }}
                                                       onClick={this.addProblem.bind(this, index)}>发现问题</Button></Flex.Item>
                                        <Flex.Item><Button key={"button-advantage"} type="ghost" size="small" inline style={{ marginRight: 10 }}
                                                           className={"am-button-borderfix"}
                                                           onClick={this.addAdvantage.bind(this,index)}>记录优点</Button></Flex.Item>
                                        <Flex.Item><Button key={"button-normal"} type="primary" size="small" inline style={{ marginRight: 10 }}
                                                           onClick={this.setNormal.bind(this, index)}>设为正常</Button></Flex.Item>
                                    </Flex>
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
        flexDirection: 'row',
    },
});