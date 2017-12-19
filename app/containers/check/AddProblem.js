import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,Image,ScrollView
} from 'react-native';
import {Flex, List, Checkbox,Button, TextareaItem,WingBlank,ImagePicker} from 'antd-mobile';

const CheckboxItem = Checkbox.CheckboxItem;
const Item = List.Item;

const data = [
    {value: 0, label: '设置位置不符合要求'},
    {value: 1, label: '面积达不到要求 '},
];

export default class AddProblem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StateList:[],
            files: [],
            remark:'',
            problem:[]
        };
    }

    componentWillMount() {
        let inspect =global.inspect;
        let type = global.currentPoint.type;
        let point = global.currentPoint.point;
        let index = this.navigation.state.params.id;//点位的检查项

        this.setState({
            StateList:inspect.PositionTypeList[type].PositionList[point].StateList
        })
    }

    setStateList=(index,value)=>{
        // let checkI=null;
        // const currentCheck = this.state.StateList.find((val,i)=>{
        //     if(val["index"]==index){
        //         checkI = i;
        //         return true
        //
        //     }
        //     return false;
        // })
        // let stateList = this.state.StateList
        // if(currentCheck){
        //     stateList[checkI]["value"]=value
        // }else{
        //     stateList.push({"index":index,"value":value})
        // }
        // this.setState({StateList:stateList})
        // let inspect = global.inspect;
        // inspect.PositionTypeList[global.currentPoint.type].PositionList[global.currentPoint.point]["StateList"] = stateList
        // global.inspect = inspect;
    }

    onChangePhoto = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }


    takePhoto = () => {
        //拍照
    }
    onChange = (value) => {
        // this.setState({"problem":value})
    }
    changeRemark=(value)=>{
        this.setState({"remark":value})
    }
    onSubmit = () => {

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

                <List renderHeader={() => '存在问题'}>
                    {data.map(i => (
                        <CheckboxItem key={i.value} onChange={() => this.onChange.bind(this,i.value)}>
                            {i.label}
                        </CheckboxItem>
                    ))}
                </List>
                <List renderHeader={() => '问题备注'}>
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
                            <Flex.Item><Button type="primary"
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
