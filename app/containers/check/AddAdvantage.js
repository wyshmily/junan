import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,Image,ScrollView
} from 'react-native';
import {Flex, List, Checkbox,Button, TextareaItem,WingBlank,ImagePicker} from 'antd-mobile';

const Item = List.Item;


export default class AddAdvantage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [{url:'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',id:1}],
            remark:'',
            advantage:[]
        };
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
