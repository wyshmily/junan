import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,Image
} from 'react-native';
import {Grid, List, Button, TextareaItem} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;


export default class AdvantageDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoData: [{icon: '../../images/img.png'}],
            remark:'我是优点备注',
            advantage:[]
        };
    }

    static navigationOptions = {
        headerRight: <Button title="编辑" onClick={this.onEdit} type="ghost"
                             className={"am-button-borderfix"}>编辑</Button>,
    };

    onEdit=()=>{

    }

    onReset = () => {
        //返回

    }

    render() {

        let dataArr = this.state.photoData;

        return (
            <View>
                <Grid data={dataArr}
                      columnNum={3}
                      renderItem={(dataItem, index) => {
                              return (<View style={{padding: 12.5}}>
                                  <Image source={require('../../images/img.png')} style={{width: 75, height: 75}}/>
                              </View>)
                      }}

                />
                <List renderHeader={() => '优点备注'}>
                    <Item>
                        <Brief>{this.state.remark}</Brief>
                    </Item>
                </List>
                <List>
                    <Item>
                    <Button size="small" inline onClick={this.onReset}>返回</Button>
                    </Item>
                </List>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});
