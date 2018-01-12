import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View, ScrollView,
    Image,
    DeviceEventEmitter
} from 'react-native';
import { List, Button, WingBlank,Flex, Toast } from 'antd-mobile'
import * as stores from './../../Stores';

const Item = List.Item;
const Brief = Item.Brief;
const StateObj = { "normal": '正常', 'problem': '有缺点', 'advantage': '有优点' }

export default class CheckList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StandardList: [],
            StateList: [],
            Numbers:{
                aNumber: 0,
                pNumber:0,
                nNumber:0
            }
        };
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.point}`,

    });

    componentWillMount() {
        let inspect = global.inspect;
        let type = global.currentPoint.type;
        let point = global.currentPoint.point;

         
        let positionTypeListArr = [].slice.call(JSON.parse(JSON.stringify(inspect.PositionTypeList)));

        positionTypeListArr = positionTypeListArr.filter(function (element, i) {

            return element.PositionList.filter(function (ele, index) {

                return ele.departmentId == global.department.Id

            });

        });

        
        let aNumber=0;nNumber=0;pNumber=0;

         

        for( i=0;i<positionTypeListArr[type].PositionList[point].StateList.length;i++){
           let stateList=positionTypeListArr[type].PositionList[point].StateList
            if (stateList[i] == "advantage") {
               
                aNumber++;
            } else if (stateList[i] == "problem") {
                pNumber++
            }else if (stateList[i] == "normal") {
                nNumber++
            }
        }

        this.setState({
            StandardList: inspect.PositionTypeList[type].StandardList,
            StateList: positionTypeListArr[type].PositionList[point].StateList ? inspect.PositionTypeList[type].PositionList[point].StateList : [],
            Numbers:{
            aNumber: aNumber,
            pNumber:pNumber,
            nNumber:nNumber
            }
        })

 
        
    }



    componentWillUnmount() {
        DeviceEventEmitter.emit('ChangeIndex', {});
    }
    updateData = (data) => {
        this.componentWillMount();
        this.componentWillReceiveProps();

    };
    componentWillReceiveProps() {

        this.componentWillMount();
        // let inspect = global.inspect;
        // let type = global.currentPoint.type;
        // let point = global.currentPoint.point;


        // let positionTypeListArr = [].slice.call(JSON.parse(JSON.stringify(inspect.PositionTypeList)));


        // positionTypeListArr.filter(function (element, i) {

        //     return element.PositionList.filter(function (ele, index) {

        //         return ele.departmentId === global.department.Id

        //     });


        // });

        // this.setState({
        //     StandardList: inspect.PositionTypeList[type].StandardList,
        //     StateList: positionTypeListArr[type].PositionList[point].StateList ? inspect.PositionTypeList[type].PositionList[point].StateList : []
        // })

        // for( i=0;i<positionTypeListArr[type].PositionList[point].StateList.length;i++){
        //     let stateList=positionTypeListArr[type].PositionList[point].StateList
        //      if (stateList[i] == "advantage") {
                
        //          aNumber++;
        //      } else if (stateList[i] == "problem") {
        //          pNumber++
        //      }else if (stateList[i] == "normal") {
        //          nNumber++
        //      }
        //  }
 
        //  this.setState({
        //     StandardList: inspect.PositionTypeList[type].StandardList,
        //     StateList: positionTypeListArr[type].PositionList[point].StateList ? inspect.PositionTypeList[type].PositionList[point].StateList : [],
        //      Numbers:{
                 
        //      aNumber: aNumber,
        //      pNumber:pNumber,
        //      nNumber:nNumber
        //      }
        //  })
    }
    setStateList = (index, value) => {
        let stateList = this.state.StateList
        let inspect = global.inspect;
        let type = global.currentPoint.type;
        let point = global.currentPoint.point;
        let key = null;
        if (stateList[index] == "advantage") {
            key = "AdvantageList"
        } else if (stateList[index] == "problem") {
            key = "ProblemList"
        }
        if (key) {
            let currentIndex = 0;
            const current = inspect.PositionTypeList[type].PositionList[point][key].find((val, i) => {
                if (val["index"] == index) {
                    currentIndex = i
                    return true
                }
                return false
            })
            if (current) {
                inspect.PositionTypeList[type].PositionList[point][key].splice(currentIndex, 1);
            }
        }
        stateList[index] = value;
        inspect.PositionTypeList[type].PositionList[point]["DepartmentId"] = global.department.Id
        inspect.PositionTypeList[type].PositionList[0]["DepartmentId"] = global.department.Id

        inspect.PositionTypeList[type].PositionList[point]["StateList"] = stateList;


        
        global.inspect = inspect;
        stores.writeFile(inspect, () => {
            this.setState({ StateList: stateList })
            Toast.info(`设置成功`, 1);
        })

        // this.props.navigation.state.params.updateData(global.inspect);
    }
    /**
     * 设为正常
     * @param id
     */
    setNormal = (id) => {
        console.log(id);
        this.setStateList(id, "normal");
        let aNumber=0;nNumber=0;pNumber=0;
        for( i=0;i<this.state.StateList.length;i++){
            let stateList=this.state.StateList
             if (stateList[i] == "advantage") {
                
                 aNumber++;
             } else if (stateList[i] == "problem") {
                 pNumber++
             }else if (stateList[i] == "normal") {
                 nNumber++
             }
         }
 
         this.setState({
             Numbers:{
             aNumber: aNumber,
             pNumber:pNumber,
             nNumber:nNumber
             }
         })
    }

    endCheck=()=>{
        // Toast.info('890')
        const { state, navigate, goBack } = this.props.navigation;
        const params = state.params || {};
        // params.go_back_key = params.go_back_key - 1;
        goBack(params.go_back_key);
    }

    /**
     * 新增优点
     * @param id
     */
    addAdvantage = (id) => {
        const { state, navigate } = this.props.navigation;
        navigate('AddAdvantage', { id: id, go_back_key: state.key, pointName: state.params.point, updateData: this.updateData });

    }
    /**
     * 新增问题
     * @param id
     */
    addProblem = (id) => {
        const { state, navigate } = this.props.navigation;
        navigate('AddProblem', { id: id, go_back_key: state.key, pointName: state.params.point, updateData: this.updateData });
    }

    render() {
        return (

            <View style={{ flex: 1 }}>
                <ScrollView>
                    <List className="my-list">
                        {this.state.StandardList.map((val, index) => {
                            let itemState = this.state.StateList[index];
                            // let itemStateText = this.state.StateList[index] ? StateObj[this.state.StateList[index]] : '未检查'
                            let icon = itemState == "advantage" ? require('../../iconImages/advantages.png') : (itemState == "problem" ? require('../../iconImages/problem.png') : (itemState ? require('../../iconImages/normal.png'):require('../../iconImages/un.png')))
                            return (
                                <Item
                                    key={"pointitem" + index}
                                    arrow="horizontal"
                                    multipleLine
                                    platform="android"
                                >
                                    <View style={styles.view}>
                                        <Text style={styles.title}>{val.Category}</Text>
                                        <Image source={icon} style={[styles.right, { width: 15, height: 16 }]} />

                                    </View>


                                    <Brief>{val.Standard}</Brief>
                                    <Flex>
                                        <Flex.Item><Button key={"button-problem"} type="warning" size="small" inline style={{ marginRight: 10 }}
                                            onClick={this.addProblem.bind(this, index)} disabled={itemState === "problem" ? true : false}>发现问题</Button></Flex.Item>
                                        <Flex.Item><Button key={"button-advantage"} type="ghost" size="small" inline style={{ marginRight: 10 }}
                                            className={"am-button-borderfix"}
                                            onClick={this.addAdvantage.bind(this, index)} disabled={itemState === "advantage" ? true : false}>记录优点</Button></Flex.Item>
                                        <Flex.Item><Button key={"button-normal"} type="primary" size="small" inline style={{ marginRight: 10 }}
                                            onClick={this.setNormal.bind(this, index)} disabled={itemState === "normal" ? true : false}>设为正常</Button></Flex.Item>
                                    </Flex>
                                </Item>
                            )
                        })}
                    </List>
 

                </ScrollView>
                <View style={{ height: 50, backgroundColor: '#fff' }}>
                    <Flex>
                        <Flex.Item style={styles.inner}>
                        <Image  source={require('../../iconImages/normal.png')} style={{width:20, height: 20}} />
                        <Text style={{ marginLeft: 4 ,marginRight: 15 }}>{this.state.Numbers.nNumber}</Text>
                        <Image  source={require('../../iconImages/advantages.png')} style={{width:20, height: 20}} />
                        <Text style={{ marginLeft: 4 ,marginRight: 15 }}>{this.state.Numbers.aNumber}</Text>
                        <Image source={require('../../iconImages/problem.png')} style={{width:20, height: 20}} />
                        <Text style={{ marginLeft: 4 ,marginRight: 15 }}>{this.state.Numbers.pNumber}</Text>
                            </Flex.Item>
                        <Flex.Item > 
                        {/* <Text>结束检查</Text> */}
                        <Button style={{ height: 50 }} type="primary" size="small" inline  onClick={this.endCheck}>结束检查</Button>
                        </Flex.Item>
                    </Flex>
                </View>
            </View>

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
    right: {
        position: 'absolute',
        top: 5,
        right: 10,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        height: 100,

    },
    inner: {
        flexDirection: 'row',
        marginLeft: 20,
    }
});