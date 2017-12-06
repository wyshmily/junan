import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,Image
} from 'react-native';
import {Grid, List, Checkbox,Button, TextareaItem} from 'antd-mobile';

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
            photoData: [{icon: '../../images/img.png'}],
            remark:'',
            problem:[]
        };
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
    onReset = () => {
        //返回

    }

    render() {

        let dataArr = this.state.photoData;
        const photoLength=dataArr.length;
        if (photoLength === 0 || !dataArr[photoLength - 1].isAdd) {
            dataArr.push({icon:'',isAdd:true})
        }

        return (
            <View>
                <Grid data={dataArr}
                      columnNum={3}
                      renderItem={(dataItem, index) => {
                          if (dataItem.isAdd)
                              return (<View style={{padding: 12.5}} onClick={this.takePhoto}>
                                  <Image source={require('../../images/add.png')} style={{width: 75, height: 75}}/>
                              </View>)
                          else
                              return (<View style={{padding: 12.5}}>
                                  <Image source={require('../../images/img.png')} style={{width: 75, height: 75}}/>
                              </View>)
                      }}

                />
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
                    <Item>
                    <Button size="small" inline onClick={this.onReset}>取消</Button>
                    <Button type="primary" size="small" inline style={{marginLeft: 2.5}}
                            onClick={this.onSubmit}>保存</Button>
                    </Item>
                </List>
            </View>
        )
    }
}

// {
//     <TextareaItem
//         value={}
//         rows={5}
//     />
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});
