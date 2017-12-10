import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,Image,ScrollView
} from 'react-native';
import {Grid, List, Button, TextareaItem,WingBlank,ImagePicker,Flex} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;


export default class AdvantageDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [{url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',id:1}],
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
        const { files } = this.state;
        return (

            <ScrollView>
                <WingBlank>
                    <ImagePicker
                        files={files}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={false}
                        multiple={true}
                    />
                </WingBlank>
                <List renderHeader={() => '优点备注'}>
                    <Item>
                        <Brief>{this.state.remark}</Brief>
                    </Item>
                </List>
                <List>
                    <Item>
                        {
                            //<Button size="small" inline onClick={this.onReset}>返回</Button>
                        }
                        <Flex>
                            <Flex.Item></Flex.Item>
                            <Flex.Item></Flex.Item>
                            <Flex.Item></Flex.Item>
                        </Flex>
                    </Item>
                </List>
            </ScrollView>
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
