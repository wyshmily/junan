import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,Image,ScrollView
} from 'react-native';
import {Flex, List, Checkbox,Button, TextareaItem,WingBlank,ImagePicker,Toast} from 'antd-mobile';
import * as stores from './../../Stores';
const Item = List.Item;


export default class AddAdvantage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            remark:'',
            advantage:[],
            isLoading:false,

        };
    }
    componentWillMount() {
        let inspect =global.inspect;
        let type = global.currentPoint.type;
        let point = global.currentPoint.point;
        let index = this.props.navigation.state.params.id;//点位的检查项
        let currentIndex = 0;
        const currentAdvantage = inspect.PositionTypeList[type].PositionList[point]["AdvantageList"].find((val,i)=>{
            if(val["index"]==index){
                currentIndex=i
                return true
            }
            return false
        })
        this.setState({
            files:currentAdvantage?currentAdvantage["value"]["images"]:[],
        })
    }
    componentWillReceiveProps() {
        let inspect =global.inspect;
        let type = global.currentPoint.type;
        let point = global.currentPoint.point;
        let index = this.props.navigation.state.params.id;//点位的检查项
        let currentIndex = 0;
        const currentAdvantage = inspect.PositionTypeList[type].PositionList[point]["AdvantageList"].find((val,i)=>{
            if(val["index"]==index){
                currentIndex=i
                return true
            }
            return false
        })
        this.setState({
            files:currentAdvantage?currentAdvantage["value"]["images"]:[],
        })
    }
    onChangePhoto = (files, type, index) => {
        this.setState({
            files,
        });
    }
    setStateList=(index,value,advantage)=>{
        let inspect = global.inspect;
        let type = global.currentPoint.type;
        let point = global.currentPoint.point;
        let stateList = inspect.PositionTypeList[type].PositionList[point].StateList

        if(stateList[index]=="problem"){
            let currentIndex = 0;
            const current = inspect.PositionTypeList[type].PositionList[point]["ProblemList"].find((val,i)=>{
                if(val["index"]==index){
                    currentIndex=i
                    return true
                }
                return false
            })
            if(current){
                inspect.PositionTypeList[type].PositionList[point]["ProblemList"].splice(currentIndex,1);
            }
        }else if(stateList[index]=="advantage"){
            let currentIndex = 0;
            const current = inspect.PositionTypeList[type].PositionList[point]["AdvantageList"].find((val,i)=>{
                if(val["index"]==index){
                    currentIndex=i
                    return true
                }
                return false
            })
            if(current){
                inspect.PositionTypeList[type].PositionList[point]["AdvantageList"][currentIndex]["value"]=advantage;
            }else{
                inspect.PositionTypeList[type].PositionList[point]["AdvantageList"].push({
                    "index":index,"value":advantage
                })
            }
        }else{
            inspect.PositionTypeList[type].PositionList[point]["AdvantageList"].push({
                "index":index,"value":advantage
            })
        }

        stateList[index]=value;
        inspect.PositionTypeList[type].PositionList[point]["StateList"] = stateList
        global.inspect = inspect;
        this.setState({isLoading:true})
        stores.writeFile(inspect,()=>{
            Toast.info(`保存成功`, 1);
            this.setState({
                isLoading:false
            })
            const { state, navigate, goBack } = this.props.navigation;
            const params = state.params || {};
            goBack(params.go_back_key);
            // navigate("CheckList", {point: params.pointName})

        });
    }
    takePhoto = () => {
        //拍照
    }
    changeRemark=(value)=>{
        this.setState({"remark":value})
    }
    onSubmit = () => {
        //将优点保存至优点列表
        let advantage = {"images":this.state.files,remark:this.state.remark}
        //记录当前检查项为优点项目
        this.setStateList(this.props.navigation.state.params.id,'advantage',advantage)
    }

    render() {
        const { files } = this.state;

        return (
            <ScrollView>
                <WingBlank>
                    <ImagePicker
                        files={files}
                        onChange={this.onChangePhoto}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={files.length < 9}
                        multiple={true}
                    />
                </WingBlank>
                <List renderHeader={() => '优点备注'}>
                    <TextareaItem
                        value={this.state.remark}
                        onChange={this.changeRemark}
                        rows={5}
                    />
                </List>
                <List>
                    <Item style={styles.view}>
                        <Flex>
                            <Flex.Item></Flex.Item>
                            <Flex.Item><Button type="primary" loading={this.state.isLoading}
                                               onClick={this.onSubmit}>保存</Button></Flex.Item>
                            <Flex.Item></Flex.Item>
                        </Flex>
                    </Item>
                </List>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
    },
});
