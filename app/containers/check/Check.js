import React, { Component } from 'react';
import {
    Text,
    View, Image,
    ScrollView,
    StyleSheet, PixelRatio,
    TouchableOpacity,
    Easing,

} from 'react-native';
import { Form, Accordion, Modal, Toast, Grid, Button, Radio, Checkbox, Flex, List, Card, TextareaItem, WhiteSpace, WingBlank, SegmentedControl } from 'antd-mobile';

import ZoomImage from 'react-native-zoom-image';
import ImagePicker from 'react-native-image-picker';

import * as stores from './../../Stores';


const CustomChildren = props => (
    <View
        onClick={props.onClick}
        style={{ backgroundColor: '#fff', paddingLeft: 15 }}
    >
        <View className="test" style={{ display: 'flex', height: '45px', lineHeight: '45px' }}>
            <View style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.children}</View>
            <View style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>{props.extra}</View>
        </View>
    </View>
);



const CheckboxItem = Checkbox.CheckboxItem;
const RadioItem = Radio.RadioItem;
const AgreeItem = Checkbox.AgreeItem;



const Item = List.Item;
const Brief = Item.Brief;

export default class Check extends Component {

    constructor(props) {
        super(props);
        this.state = {
            advantageRemark: '',
            files: [],
            lists: global.inspect.StandardClass,
            remark: '',
            value: 0,
            listIndex: 0,
            valueIndex: 0,
            issue: [],
            noChecked: false,
            modal: false,
            departmentName: global.inspect.DepartmentTree.name,
            TeamLists: global.inspect.DepartmentTree.SubDepartments,
            Units: [],
            UnitId: '',
            UnitName: '请选择',
            temporaryTeamLists:[]
        }

    };

    // 加载数据
    componentWillMount() {
        let inspect = global.inspect;

        for (var i = 0; i < this.state.lists.length; i++) {
            this.state.issue.push([]);
        }

        this.setState({
            lists: inspect.StandardClass,
           
        })

    }

    // 选择照片
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
                // let time=new Date()
                let source = { uri: response.uri, cTime: new Date() };

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


    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    };
    onAddImageClick = (e) => {
        e.preventDefault();
        this.setState({
            files: this.state.files.concat({
                url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
                id: '3',
            }),
        });
    };
    onTabChange = (key) => {
        console.log(key);
    };

    changeRemark = (value) => {

        this.setState({ remark: value })
    }



    onSubmit = () => {

        if (!this.state.UnitId) {
            Toast.info("请选择受检单位")
        } else {
            this.setState({ isLoading: true })


            if (this.state.value) {
                // //将优点保存至优点列表
                let advantage = { "images": this.state.files, "remark": this.state.remark, "UnitId": this.state.UnitId, "UnitName": this.state.UnitName, "index": global.inspect.AdvantageList.length }
                this.setStateList('advantage', advantage)

            } else {
                let problem = { "images": this.state.files, "remark": this.state.remark, "UnitId": this.state.UnitId, "UnitName": this.state.UnitName, "issue": this.state.issue, "index": global.inspect.ProblemList.length }
                this.setStateList('problem', problem)
            }

        }

    }


    setStateList = (index, value) => {
        let inspect = global.inspect;


        if (index == "problem") {


            inspect.ProblemList.push(value);

        } else {
            inspect.AdvantageList.push(value);
        }



        global.inspect = inspect;
        this.setState({ isLoading: true })
        stores.writeFile(inspect, () => {
            // Toast.info(`保存成功`, 1);
            this.setState({
                isLoading: false,
                advantageRemark: '',
                files: [],

                lists: global.inspect.StandardClass,
                value: 0,
                listIndex: 0,
                valueIndex: 0,
                issue: [],
                noChecked: false,

            })

            // 刷新页面,置空

            const { state, navigate, goBack } = this.props.navigation;
            const params = state.params || {};
            // params.go_back_key = params.go_back_key - 1;
            navigate("CheckHome")

        });
    }

    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            Units: [],
            TeamLists: global.inspect.DepartmentTree.SubDepartments,
            [key]: true,
        });
    }
    changeUnit = (val) => {

       
        if (val.SubDepartments.length) {
            this.state.Units.push(val.Name)
            this.setState({
                temporaryTeamLists:this.state.TeamLists,
                TeamLists: val.SubDepartments,
            });
        }else{
            this.state.Units.push(val.Name)

            this.setState({
                UnitId: val.Id,
                UnitName: this.state.Units.join(','),
                modal: false,
                temporaryTeamLists:[]
    
            });
        }

    }
    chooseUnit = (val) => {

        this.state.Units.push(val.Name)

        this.setState({
            UnitId: val.Id,
            UnitName: this.state.Units.join(','),
            modal: false,
            temporaryTeamLists:[]

        });


    }


    onChangeRadio = (value) => {

        this.setState({
            value
        });
    };


    onChangeO = (key) => {
        this.setState({
            listIndex: key,
        })
    }


    //问题项
    onChangeR = (value) => {


        let issue = this.state.issue;
        let inspect = global.inspect;


        let issueList = inspect.StandardClass[this.state.listIndex].IssueClassList;
        for (var i = 0; i < issueList.length; i++) {
            if (issueList[i] == value) {
                this.setState({
                    valueIndex: i,
                })
            }
        }
        // let 
        let currentIndex = 0;
        const currentIssue = this.state.issue.find((val, index) => {
            if (val.Id == value.Id) {
                currentIndex = index;
                return true;
            }
            return false;

        })
        if (currentIssue) {
            issue.splice(currentIndex, 1)
        } else {
            issue[this.state.listIndex].push(value)
        }
        this.setState({ "issue": issue })
    }
    goback=()=>{
        if(this.state.temporaryTeamLists.length){
            this.state.Units.pop();
            this.setState({
                TeamLists:this.state.temporaryTeamLists,
            });
           
        }else{
            this.setState({
                modal: false,
            });

        }
       
    }

    render() {
        const { value } = this.state;
        const datas = [
            { value: 0, label: '问题' },
            { value: 1, label: '优秀' },

        ];

        const { files } = this.state;

        const photoLength = files.length;
        if (photoLength == 0 || files[photoLength - 1].uri) {
            files.push({ uri: null })
        }

        if (!value) {
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

                        {datas.map(i => (
                            <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChangeRadio(i.value)}>
                                {i.label}
                            </RadioItem>
                        ))}


                        <WhiteSpace size="lg" />


                        <List>
                            <Item extra={this.state.UnitName} arrow="horizontal" onClick={this.showModal('modal')}>选择受检单位</Item>

                        </List>
                        <WhiteSpace size="lg" />

                        <Card>
                            <Card.Header
                                title="问题类型"
                            />
                            <Card.Body>
                                <Accordion accordion openAnimation={{}} onChange={this.onChangeO}>
                                    {this.state.lists.map((val, index) => (<Accordion.Panel header={val.Name}>

                                        <List>
                                            {val.IssueClassList.map((v, i) => (
                                                <CheckboxItem key={i} defaultChecked={false} onChange={this.onChangeR.bind(this, v)}>
                                                    {v.Name}
                                                </CheckboxItem>
                                            ))}
                                        </List>
                                    </Accordion.Panel>))
                                    }


                                </Accordion>
                            </Card.Body>
                        </Card>

                        <WhiteSpace size="lg" />

                        <Card>
                            <Card.Header
                                title="问题描述"
                            />
                            <Card.Body>
                                <TextareaItem
                                    value={this.state.remark}
                                    onChange={this.changeRemark}
                                    rows={4}
                                />
                            </Card.Body>
                        </Card>


                        <WhiteSpace size="lg" />



                    </ScrollView>

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

                    <Modal
                        popup
                        visible={this.state.modal}
                        onClose={this.onClose('modal')}
                        animationType="slide-up"
                    >
                        <List renderHeader={() => <View style={styles.inner} >
                            <TouchableOpacity onPress={this.goback}>
                                <View style={{ flex: 1 }} >
                                    <Image source={require('../../iconImages/back.png')} style={{ marginTop: 10, marginLeft: 10, width: 25, height: 25 }} />
                                </View>
                            </TouchableOpacity>
                            <View style={{ flex: 4 }} ><Text style={{ fontSize: 20, height: 40, marginTop: 10, textAlign: "center" }}>{this.state.departmentName}</Text></View>
                            <View style={{ flex: 1 }}></View>
                        </View>} className="popup-list">
                            {this.state.TeamLists.map((val, index) => (
                                <List.Item key={index}  >
                                    <View style={styles.inner} >
                                        <View style={styles.cell} >
                                            <Button type="ghost" style={{ borderColor: "#fff" }} onClick={this.changeUnit.bind(this, val)}>{val.Name}</Button>
                                        </View>
                                        <View style={styles.cell} >
                                        </View>

                                        <View style={styles.cells} onClick={this.chooseUnit.bind(this, val)}>
                                            <Button type="primary" inline style={{ borderColor: "#fff" }} onClick={this.chooseUnit.bind(this, val)}>确定</Button>
                                        </View>

                                    </View>

                                </List.Item>
                            ))}
                            <List.Item>
                                <Button type="primary" onClick={this.onClose('modal')}>关闭</Button>
                            </List.Item>
                        </List>
                    </Modal>


                    <WhiteSpace size="lg" />
                </View>
            )
        } else {
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


                        {datas.map(i => (
                            <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChangeRadio(i.value)}>
                                {i.label}
                            </RadioItem>
                        ))}

                        <WhiteSpace size="lg" />

                        <List>
                            <Item extra={this.state.UnitName} arrow="horizontal" onClick={this.showModal('modal')}>选择受检单位</Item>

                        </List>
                        <WhiteSpace size="lg" />

                        <Card>
                            <Card.Header
                                title="优点描述"
                            />
                            <Card.Body>
                                <TextareaItem
                                    value={this.state.remark}
                                    onChange={this.changeRemark}
                                    rows={4}
                                />
                            </Card.Body>
                        </Card>


                        {/* <JSONTree data={json} /> */}

                        <WhiteSpace size="lg" />



                    </ScrollView>
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

                    <Modal
                        popup
                        visible={this.state.modal}
                        onClose={this.onClose('modal')}
                        animationType="slide-up"
                    >
                        <List renderHeader={() => <View style={styles.inner} >
                            <TouchableOpacity onPress={this.goback}>
                                <View style={{ flex: 1 }} >
                                    <Image source={require('../../iconImages/back.png')} style={{ marginTop: 10, marginLeft: 10, width: 25, height: 25 }} />
                                </View>
                            </TouchableOpacity>
                            <View style={{ flex: 4 }} ><Text style={{ fontSize: 20, height: 40, marginTop: 10, textAlign: "center" }}>{this.state.departmentName}</Text></View>
                            <View style={{ flex: 1 }}></View>
                        </View>} className="popup-list">
                            {this.state.TeamLists.map((val, index) => (
                                <List.Item key={index}  >
                                    <View style={styles.inner} >
                                        <View style={styles.cell} >
                                            <Button type="ghost" style={{ borderColor: "#fff" }} onClick={this.changeUnit.bind(this, val)}>{val.name}</Button>
                                        </View>
                                        <View style={styles.cell} >
                                        </View>

                                        <View style={styles.cells} onClick={this.chooseUnit.bind(this, val)}>
                                            <Button type="primary" inline style={{ borderColor: "#fff" }} onClick={this.chooseUnit.bind(this, val)}>确定</Button>
                                        </View>

                                    </View>

                                </List.Item>
                            ))}
                            <List.Item>
                                <Button type="primary" onClick={this.onClose('modal')}>关闭</Button>
                            </List.Item>
                        </List>
                    </Modal>

                    <WhiteSpace size="lg" />

                </View>
            )
        }
    }
}



const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
    },
    inner: {
        flexDirection: 'row',
    },
    cell: {
        flex: 2,
    },
    cells: {
        flex: 1,
        color: '#007ACC'

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
    myRadio: {
        padding: 2.5,
        borderRadius: 2,
        marginRight: 5,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ccc',
        color: "#f00"
    }

});







