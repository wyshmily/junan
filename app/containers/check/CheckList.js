import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,ScrollView
} from 'react-native';
import {List, Button,Flex,Toast} from 'antd-mobile'
import * as stores from './../../Stores';

const Item = List.Item;
const Brief = Item.Brief;
const StateObj = {"normal":'正常','problem':'有问题','advantage':'有优点'}

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
        // title:global.department.Id
    });

    componentWillMount() {
    let inspect =global.inspect;
        let type = global.currentPoint.type;
        let point = global.currentPoint.point;

        this.setState({
            StandardList: inspect.PositionTypeList[type].StandardList,
            StateList:inspect.PositionTypeList[type].PositionList[point].StateList?inspect.PositionTypeList[type].PositionList[point].StateList:[]
        })
    }
    componentWillReceiveProps() {
        let inspect =global.inspect;
        let type = global.currentPoint.type;
        let point = global.currentPoint.point;

        this.setState({
            StandardList: inspect.PositionTypeList[type].StandardList,
            StateList:inspect.PositionTypeList[type].PositionList[point].StateList?inspect.PositionTypeList[type].PositionList[point].StateList:[]
        })
    }
    setStateList=(index,value)=>{
        let stateList = this.state.StateList
        let inspect = global.inspect;
        let type = global.currentPoint.type;
        let point = global.currentPoint.point;
        let key=null;
        if(stateList[index]=="advantage"){
            key = "AdvantageList"
        }else if(stateList[index]=="problem"){
            key = "ProblemList"
        }
        if(key){
            let currentIndex = 0;
            const current = inspect.PositionTypeList[type].PositionList[point][key].find((val,i)=>{
                if(val["index"]==index){
                    currentIndex=i
                    return true
                }
                return false
            })
            if(current){
                inspect.PositionTypeList[type].PositionList[point][key].splice(currentIndex,1);
            }
        }
        stateList[index]=value;
        inspect.PositionTypeList[type].PositionList[point]["DepartmentId"] = global.department.Id
        inspect.PositionTypeList[type].PositionList[0]["DepartmentId"] = global.department.Id
        
        inspect.PositionTypeList[type].PositionList[point]["StateList"] = stateList
        global.inspect = inspect;
        stores.writeFile(inspect,()=> {
            this.setState({StateList:stateList})
            Toast.info(`设置成功`, 1);
        })
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
        const { state, navigate } = this.props.navigation;
        navigate('AddAdvantage', { id:id,go_back_key: state.key ,pointName:state.params.point});

    }
    /**
     * 新增问题
     * @param id
     */
    addProblem = (id) => {
        const { state, navigate } = this.props.navigation;
        navigate('AddProblem', { id:id,go_back_key: state.key  ,pointName:state.params.point});
    }

    render() {
        return (
            <ScrollView>
                <List className="my-list">
                    {this.state.StandardList.map((val, index) => {
                        let itemState=this.state.StateList[index];
                        let itemStateText=this.state.StateList[index]?StateObj[this.state.StateList[index]]:'未检查'
                        return (
                            <Item
                                key={"pointitem" + index}
                                arrow="horizontal"
                                multipleLine
                                platform="android"
                            >
                                <View style={styles.view}>
                                    <Text style={styles.title}>{val.Category}</Text>
                                    <Text style={styles.right}>{itemStateText}</Text>
                                </View>


                                <Brief>{val.Standard}</Brief>
                                    <Flex>
                                    <Flex.Item><Button key={"button-problem"} type="warning" size="small" inline style={{ marginRight: 10 }}
                                                       onClick={this.addProblem.bind(this, index)} disabled={itemState==="problem"?true:false}>发现问题</Button></Flex.Item>
                                        <Flex.Item><Button key={"button-advantage"} type="ghost" size="small" inline style={{ marginRight: 10 }}
                                                           className={"am-button-borderfix"}
                                                           onClick={this.addAdvantage.bind(this,index)} disabled={itemState==="advantage"?true:false}>记录优点</Button></Flex.Item>
                                        <Flex.Item><Button key={"button-normal"} type="primary" size="small" inline style={{ marginRight: 10 }}
                                                           onClick={this.setNormal.bind(this, index)} disabled={itemState==="normal"?true:false}>设为正常</Button></Flex.Item>
                                    </Flex>
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
    },
    title: {
        fontSize: 17,
        color: '#000',
    },
    right:{
        position:'absolute',
        top:5,
        right:10,
    }
});