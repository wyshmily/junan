import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import {List, Modal, Button, Flex, Toast} from 'antd-mobile';

var RNFS = require('react-native-fs');


const prompt = Modal.prompt;
const Item = List.Item;


export default class PointList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pointList: [{id: "0", point: "兵器室大门", num: 3, checkedNum: 2}, {
                id: "1",
                point: "手枪柜",
                num: 5,
                checkedNum: 0
            }],
            readTxtResult:''
        };
    }

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.pointType}`,
    });

    componentWillMount() {
        this.readFile((result)=>{
            let obj = JSON.parse(result);
            this.setState({pointList:obj.pointList})
        });
    }

    /*将文本写入本地 txt*/
    writeFile(obj) {
        let str =JSON.stringify({'pointList':obj})
        // create a path you want to write to
        const path = RNFS.DocumentDirectoryPath + '/test.json';

        // write the file
        RNFS.writeFile(path, str, 'utf8')
            .then((success) => {
                console.log('path', path);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    /*读取txt文件内容*/
    readFile(callback) {
        // create a path you want to delete
        const path = RNFS.DocumentDirectoryPath + '/test.json';

        return RNFS.readFile(path)
            .then((result) => {
            if(typeof callback =='function'){
                callback(result)
            }

                this.setState({
                    readTxtResult: result,
                })

            })
            .catch((err) => {
                console.log(err.message);

            });
    }

    newPoint = () => {
        this.readFile();
    }
    beginCheck = (point) => {
        const {navigate} = this.props.navigation;
        navigate("CheckList", {point: point})
    }

    render() {
        return (
            <View style={styles.container}>
                <List className="my-list">
                    {this.state.pointList.map((val, index) => {
                        return (
                            <Item key={"pointitem" + index} arrow="horizontal" extra={val.checkedNum + '/' + val.num}
                                  multipleLine
                                  onClick={this.beginCheck.bind(this, val.point)}>{val.point}</Item>)
                    })}
                </List>
                <Flex style={styles.button}>
                    <Flex.Item></Flex.Item>
                    <Flex.Item><Button type={"primary"} onClick={() => prompt('新增点位', '点位名称',
                        [
                            {text: '取消'},
                            {
                                text: '保存',
                                onPress: value => new Promise((resolve) => {
                                    let pointList = this.state.pointList;
                                    pointList.push({
                                        id: "point" + pointList.length,
                                        point: value,
                                        num: 0,
                                        checkedNum: 0
                                    })
                                    this.setState({pointList: pointList})
                                    this.writeFile(pointList);
                                    Toast.info(`新增成功`, 1);
                                    setTimeout(() => {
                                        resolve();
                                    }, 1000);
                                }),
                            },
                        ], 'default', null, ['点位名称'])}
                    >新增点位</Button></Flex.Item>
                    <Flex.Item></Flex.Item>
                </Flex>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        position: 'absolute',
        bottom: 20,
    },
});