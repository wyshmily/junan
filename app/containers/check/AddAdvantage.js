import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,Image
} from 'react-native';
import {Grid, List, Button, TextareaItem} from 'antd-mobile';

const Item = List.Item;


export default class AddAdvantage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoData: [{icon: '../../images/img.png'}],
            remark:'',
            advantage:[]
        };
    }

    takePhoto = () => {
        //拍照
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
                <List renderHeader={() => '优点备注'}>
                    <TextareaItem
                        value={this.state.remark}
                        onChange={this.changeRemark}
                        rows={5}
                    />
                </List>
                <List>
                    <Item style={styles.view}>
                    <Button size="small" inline onClick={this.onReset}>取消</Button>
                    <Button type="primary" size="small" inline style={{marginLeft: 2.5}}
                            onClick={this.onSubmit}>保存</Button>
                    </Item>
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
