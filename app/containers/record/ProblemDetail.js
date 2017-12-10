import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,Image,ScrollView
} from 'react-native';
import {Grid, List, Checkbox,Button, TextareaItem,WingBlank,ImagePicker,Flex} from 'antd-mobile';

const CheckboxItem = Checkbox.CheckboxItem;
const Item = List.Item;
const Brief = Item.Brief;

const data = [
    {value: 0, label: '设置位置不符合要求'},
    {value: 1, label: '面积达不到要求 '},
];

export default class ProblemDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [{url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',id:1}],
            remark:'我是问题备注',
            problem:[]
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
            <View>
                <WingBlank>
                    <ImagePicker
                        files={files}
                        onChange={this.onChangePhoto}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={false}
                        multiple={true}
                    />
                </WingBlank>
                <List renderHeader={() => '存在问题'}>
                    {data.map(i => (
                        <CheckboxItem disabled key={i.value}>
                            {i.label}
                        </CheckboxItem>
                    ))}
                </List>
                <List renderHeader={() => '问题备注'}>
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
