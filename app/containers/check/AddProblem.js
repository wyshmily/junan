import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View, Image, ScrollView, PixelRatio,
    TouchableOpacity,
    Easing
} from 'react-native';
import { Flex, Card, List, Grid, WhiteSpace, Checkbox, Button, TextareaItem, WingBlank, Toast } from 'antd-mobile';
import ImagePicker from 'react-native-image-picker';
import ZoomImage from 'react-native-zoom-image';

import * as stores from './../../Stores';

const CheckboxItem = Checkbox.CheckboxItem;
const Item = List.Item;

export default class AddProblem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            remark: '',
            issue: [],
            IssueList: [],
            isLoading: false,
        };
    }

    componentWillMount() {
        let inspect = global.inspect;
        let type = global.currentPoint.type;
        let point = global.currentPoint.point;
        let index = this.props.navigation.state.params.id;//点位的检查项
        let currentIndex = 0;
        const currentProblem = inspect.PositionTypeList[type].PositionList[point]["ProblemList"].find((val, i) => {
            if (val["index"] == index) {
                currentIndex = i
                return true
            }
            return false
        })
        this.setState({

            IssueList: inspect.PositionTypeList[type].StandardList[index]["IssueList"],
            files: currentProblem ? currentProblem["value"]["images"] : [],
        })
    }
    componentWillReceiveProps() {
        let inspect = global.inspect;
        let type = global.currentPoint.type;
        let point = global.currentPoint.point;
        let index = this.props.navigation.state.params.id;//点位的检查项
        let currentIndex = 0;
        const currentProblem = inspect.PositionTypeList[type].PositionList[point]["ProblemList"].find((val, i) => {
            if (val["index"] == index) {
                currentIndex = i + 1
                return true
            }
            return false
        })
        this.setState({
            IssueList: inspect.PositionTypeList[type].StandardList[index]["IssueList"],
            files: currentProblem ? currentProblem["value"]["images"] : [],
        })
    }

    setStateList = (index, value, problem) => {
        let inspect = global.inspect;
        let type = global.currentPoint.type;
        let point = global.currentPoint.point;
        let stateList = inspect.PositionTypeList[type].PositionList[point].StateList

        if (stateList[index] == "advantage") {
            let currentIndex = 0;
            const current = inspect.PositionTypeList[type].PositionList[point]["AdvantageList"].find((val, i) => {
                if (val["index"] == index) {
                    currentIndex = i
                    return true
                }
                return false
            })
            if (current) {
                inspect.PositionTypeList[type].PositionList[point]["AdvantageList"].splice(currentIndex, 1);
            }
        }

        inspect.PositionTypeList[type].PositionList[point]["ProblemList"].push({
            "index": index, "value": problem
        })

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
            // goBack(params.go_back_key);
            params.go_back_key = params.go_back_key - 1;
            goBack(params.go_back_key);
            this.props.navigation.state.params.updateData(global.inspect);
            // navigate("CheckList", {point: params.pointName})
        });
    }

    onChangePhoto = (files, type, index) => {
        this.setState({
            files,
        });
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

    takePhoto = () => {
        //拍照
    }
    //问题项
    onChange = (value) => {
        let issue = this.state.issue;
        // let 
        let currentIndex = 0;
        const currentIssue = this.state.issue.find((val, index) => {
            if (val == value) {
                currentIndex = index;
                return true;
            }
            return false;
        })
        if (currentIssue) {
            issue.splice(currentIndex, 1)
        } else {
            issue.push(value)
        }
        this.setState({ "issue": issue })
    }


    changeRemark = (value) => {
        this.setState({ "remark": value })
    }
    onSubmit = () => {
        //将问题保存至问题列表

        if (this.state.files.length < 2) {
            Toast.info("请添加照片")
        } else if (this.state.issue.length < 1) {
            Toast.info("请先选择问题类型")
        } else {
 
            let index = this.props.navigation.state.params.id;

            let firstIndex = global.currentPoint.type;
            let secondIndex = global.currentPoint.point;
            let category = inspect.PositionTypeList[firstIndex].StandardList[index]["Category"]


            //将缺点保存至优点列表

            let problem = { "images": this.state.files, issue: this.state.issue, remark: this.state.remark, "category": category, positionArr: [inspect.PositionTypeList[firstIndex].Name, inspect.PositionTypeList[firstIndex].PositionList[secondIndex].Name, firstIndex, secondIndex, index] }
            //记录当前检查项为问题项目
            this.setStateList(this.props.navigation.state.params.id, 'problem', problem)
        }

    }



    render() {

        const { files } = this.state;

        const photoLength = files.length;
        if (photoLength == 0 || files[photoLength - 1].uri) {
            files.push({ uri: null })
        }

        return (

            <View style={{ flex: 1 }}>
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
                                                {!dataItem.uri ? <Text style={{ fontSize: 30 }}>+</Text> :

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
                            title="存在问题"
                        />
                        <Card.Body>
                            {this.state.IssueList.map((val, i) => (
                                <CheckboxItem key={i} onChange={this.onChange.bind(this, val)}>
                                    {val}
                                </CheckboxItem>
                            ))}
                        </Card.Body>
                    </Card>

                    <WhiteSpace size="lg" />



                    <Card>
                        <Card.Header
                            title="问题详情"
                        />
                        <Card.Body>
                            <TextareaItem
                                value={this.state.remark}
                                onChange={this.changeRemark}
                                rows={5}
                            />
                        </Card.Body>
                    </Card>


                </ScrollView>

                <WhiteSpace size="lg" />


                <List>
                    <Item style={styles.view}>
                        <Flex>
                            <Flex.Item></Flex.Item>
                            <Flex.Item><Button type="primary" loading={this.state.isLoading}
                                onClick={this.onSubmit}>保存</Button></Flex.Item>
                            <Flex.Item></Flex.Item>
                        </Flex>
                    </Item>
                </List>
            </View >
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
    }
});
