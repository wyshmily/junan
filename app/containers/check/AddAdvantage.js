
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View, ScrollView, PixelRatio,
    TouchableOpacity,
    Image,
    Easing,

} from 'react-native';
import { Flex, List, Card, Grid, Checkbox, WhiteSpace, Button, TextareaItem, WingBlank, Toast } from 'antd-mobile';
import ImagePicker from 'react-native-image-picker';

import ZoomImage from 'react-native-zoom-image';

import * as stores from './../../Stores';

const CheckboxItem = Checkbox.CheckboxItem;
const Item = List.Item;



export default class AddAdvantage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            remark: '',
            advantage: [],
            isLoading: false,

        };
    }


    componentWillMount() {
        let inspect = global.inspect;
        let type = global.currentPoint.type;
        let point = global.currentPoint.point;
        let index = this.props.navigation.state.params.id;//点位的检查项
        let currentIndex = 0;
        const currentAdvantage = inspect.PositionTypeList[type].PositionList[point]["AdvantageList"].find((val, i) => {
            if (val["index"] == index) {
                currentIndex = i + 1
                return true
            }
            return false
        })
        this.setState({
            files: currentAdvantage ? currentAdvantage["value"]["images"] : [],
        })
    }
    componentWillReceiveProps() {
        let inspect = global.inspect;
        let type = global.currentPoint.type;
        let point = global.currentPoint.point;
        let index = this.props.navigation.state.params.id;//点位的检查项
        let currentIndex = 0;
        const currentAdvantage = inspect.PositionTypeList[type].PositionList[point]["AdvantageList"].find((val, i) => {
            if (val["index"] == index) {
                currentIndex = i
                return true
            }
            return false
        })
        this.setState({
            files: currentAdvantage ? currentAdvantage["value"]["images"] : [],
        })

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
                    currentIndex = i + 1
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

            ++global.advantageIndex;
            const { state, navigate, goBack } = this.props.navigation;
            const params = state.params || {};
            params.go_back_key = params.go_back_key - 1;
            goBack(params.go_back_key);
            // params.go_back_key=params.go_back_key-2;
            // navigate("CheckList", {point: params.pointName})

            this.props.navigation.state.params.updateData(global.inspect);
        });
    }
    takePhoto = () => {
        //拍照
    }
    changeRemark = (value) => {
        this.setState({ "remark": value })
    }
    onSubmit = () => {
        let index = this.props.navigation.state.params.id;
        let firstIndex = global.currentPoint.type;
        let secondIndex = global.currentPoint.point;
        let category = inspect.PositionTypeList[firstIndex].StandardList[index]["Category"]


        //将优点保存至优点列表
        let advantage = { "images": this.state.files, remark: this.state.remark, "category": category, positionArr: [inspect.PositionTypeList[firstIndex].Name, inspect.PositionTypeList[firstIndex].PositionList[secondIndex].Name, firstIndex, secondIndex, index] }
        // let advantage = {"images":this.state.files,remark:this.state.remark,category:category}
        //记录当前检查项为优点项目
        this.setStateList(this.props.navigation.state.params.id, 'advantage', advantage)
    }

    dosomething() {
        Toast.info(9)
    }

    render() {
        const { files } = this.state;

        const photoLength = files.length;
        if (photoLength == 0 || files[photoLength - 1].uri) {
            files.push({ uri: null })
        }
        return (
            <ScrollView>

                <Card>
                    <Card.Header
                        title="添加照片"
                    />
                    <Card.Body>
                    <WingBlank>
                    <Grid data={this.state.files}
                        columnNum={3}
                        renderItem={(dataItem, index) => {
                            return <TouchableOpacity onPress={this.selectPhotoTapped.bind(this, index)}>
                                <View style={[styles.avatar, styles.avatarContainer]}>
                                    {!dataItem.uri ? <Text  style={{fontSize:30}}>+</Text> :
                                        <ZoomImage
                                            source={dataItem}
                                            imgStyle={{ width: 250, height: 230 }}
                                            style={styles.avatar}
                                            duration={200}
                                            enableScaling={false}
                                            easingFunc={Easing.ease}
                                        />

                                    }





                                </View>
                            </TouchableOpacity>

                        }}

                    />
                    </WingBlank>
                    </Card.Body>
                </Card>

                
                <WhiteSpace size="lg" />
                
                

                <Card>
                    <Card.Header
                        title="优点备注"
                    />
                    <Card.Body>
                    <TextareaItem
                        value={this.state.remark}
                        onChange={this.changeRemark}
                        rows={5}
                    />
                    </Card.Body>
                </Card>

                <WhiteSpace size="lg" />


                <List>
                    <Item style={styles.view}>
                        <Flex>
                            <Flex.Item></Flex.Item>
                            <Flex.Item><Button type="primary" focusableInTouchMode="false" focusable="false" loading={this.state.isLoading}
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
    avatarContainer: {
        borderColor: '#fff',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 96,
        height: 80,
    },
    
});
