import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View, Image, ScrollView, PixelRatio,
    TouchableOpacity,
} from 'react-native';
import { Grid, List, TextareaItem, WingBlank, Toast, Flex, Button } from 'antd-mobile';
import ImagePicker from 'react-native-image-picker';
import * as stores from './../../Stores';
const Item = List.Item;
const Brief = Item.Brief;


export default class AdvantageDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [{ uri: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg', id: 1 }, { uri: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg', id: 2 }],
            advantage: {},
            name: "编辑"
        };
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {
            button: 'edit'
        } } = navigation.state;

        let headerRight = (
            <Button
                onClick={params.handleEdit ? params.handleEdit : () => null}
            >编辑</Button>
        );

        if (params.button === 'save') {
            headerRight = (
                <Button
                    onClick={params.handleSave ? params.handleSave : () => null}
                >保存</Button>
            );
        }
        return { headerRight };
    };

    onEdit = () => {
        Toast.info('on edit');
        this.props.navigation.setParams({ button: 'save' });
        // navigationOptions = {
        //     headerRight: <Button title="保存" onClick={this.onSave} type="ghost"
        //         className={"am-button-borderfix"}>保存</Button>,
        // }
    }

    onSave = () => {
        Toast.info('on save');
        // navigationOptions = {
        //     headerRight: <Button title="保存" onClick={this.onSave} type="ghost"
        //         className={"am-button-borderfix"}>保存</Button>,
        // }
    }

    componentDidMount() {
        // We can only set the function after the component has been initialized
        this.props.navigation.setParams({ handleEdit: this.onEdit });
        this.props.navigation.setParams({ handleSave: this.onSave });
    }

    componentWillMount() {
        let paramsObject = this.props.navigation.state.params.item

        let inspect = global.inspect;
        let firstIndex = paramsObject.value.positionArr[2];
        let secondIndex = paramsObject.value.positionArr[3];
        let currentObject = inspect.PositionTypeList[firstIndex].PositionList[secondIndex].AdvantageList;
        let currentAdvantage = {};

        for (var i = 0; i < currentObject.length; i++) {
            if (currentObject[i].index == paramsObject.index) {
                currentAdvantage = currentObject[i]
            }
        }


        this.setState({
            advantage: currentAdvantage.value,
            files: currentAdvantage.value.images
        })
    }

    componentWillReceiveProps() {
    }


    selectPhotoTapped = (index) => {
        const options = {
            title: '选择一张照片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '从手机相册选择',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
                path: 'junan356/images',//will save the image at Documents/[path]/ rather than the root Documents
                cameraRoll: true,
            },
            permissionDenied: {
                title: '权限被拒绝',
                text: '请用相机拍照，并从手机相册选择照片..',
                reTryTitle: '重试',
                okTitle: '确定',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                let files = this.state.files;

                if (files.length >= index) {
                    files[index] = source;
                } else
                    files.push(source)
                this.setState({
                    files: files
                });
            }
        });
    }
    onChangePhoto = (files, type, index) => {
        this.setState({
            files,
        });
    }
    setStateList = (index, value, advantage) => {
        let inspect = global.inspect;
        let type = global.currentPoint.type;
        let point = global.currentPoint.point;
        let stateList = inspect.PositionTypeList[type].PositionList[point].StateList

        if (stateList[index] == "problem") {
            let currentIndex = 0;
            const current = inspect.PositionTypeList[type].PositionList[point]["ProblemList"].find((val, i) => {
                if (val["index"] == index) {
                    currentIndex = i + 1
                    return true
                }
                return false
            })
            if (current) {
                inspect.PositionTypeList[type].PositionList[point]["ProblemList"].splice(currentIndex, 1);
            }
        } else if (stateList[index] == "advantage") {
            let currentIndex = 0;
            const current = inspect.PositionTypeList[type].PositionList[point]["AdvantageList"].find((val, i) => {
                if (val["index"] == index) {
                    currentIndex = i
                    return true
                }
                return false
            })
            if (current) {
                inspect.PositionTypeList[type].PositionList[point]["AdvantageList"][currentIndex]["value"] = advantage;
            } else {
                inspect.PositionTypeList[type].PositionList[point]["AdvantageList"].push({
                    "index": index, "value": advantage
                })
            }
        } else {
            inspect.PositionTypeList[type].PositionList[point]["AdvantageList"].push({
                "index": index, "value": advantage
            })
        }

        stateList[index] = value;
        inspect.PositionTypeList[type].PositionList[point]["StateList"] = stateList
        global.inspect = inspect;
        this.setState({ isLoading: true })
        stores.writeFile(inspect, () => {
            Toast.info(`保存成功`, 1);
            this.setState({
                isLoading: false
            })
            const { state, navigate, goBack } = this.props.navigation;
            const params = state.params || {};
            goBack(params.go_back_key);
            params.go_back_key = params.go_back_key - 1;
            // navigate("CheckList", {point: params.pointName})

        });
    }
    takePhoto = () => {
        //拍照
    }




    onReset = () => {
        //返回

    }

    render() {
        const { files } = this.state;
        const photoLength = files.length;
        if (photoLength == 0 || files[photoLength - 1].uri) {
            files.push({ uri: null })
        }
        return (
            <ScrollView>
                <WingBlank>

                    <Grid data={this.state.files}
                        columnNum={3}
                        renderItem={(dataItem, index) => {
                            return <TouchableOpacity onPress={this.selectPhotoTapped.bind(this, index)}>
                                <View style={[styles.avatar, styles.avatarContainer]}>
                                    {!dataItem.uri ? <Text>+</Text> :
                                        <Image style={styles.avatar} source={dataItem} />
                                    }
                                </View>
                            </TouchableOpacity>

                        }}

                    />

                </WingBlank>
                <List renderHeader={() => '优点备注'}>
                    <Item>
                        {/* <Brief>{this.state.advantage.remark}</Brief> */}

                        <TextareaItem
                            value={this.state.advantage.remark}
                            onChange={this.changeRemark}
                            rows={5}
                        />
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
    },
    view: {
        flexDirection: 'row',
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
    }
});
