import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View, Image, ScrollView, PixelRatio,
    TouchableOpacity,
    Easing,
} from 'react-native';
import { Card, Modal, WhiteSpace, Grid, List, TextareaItem, WingBlank, Toast, Flex, Button } from 'antd-mobile';
import ImagePicker from 'react-native-image-picker';
import ZoomImage from 'react-native-zoom-image';
import * as stores from './../../Stores';
const Item = List.Item;
const Brief = Item.Brief;

  

export default class AdvantageDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            modal: false,
            departmentName: global.inspect.DepartmentTree.name,
            TeamLists: global.inspect.DepartmentTree.SubDepartments,
            Units: [],
            UnitId: '',
            UnitName: '请选择',
            temporaryTeamLists:[]
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

        this.props.navigation.setParams({ button: 'save' });

    }

    onSave = () => {

        this.props.navigation.setParams({ button: 'edit' });

        let index = this.props.navigation.state.params.item.index

       
        let inspect = global.inspect;

        inspect.AdvantageList[index].images = this.state.files
        inspect.AdvantageList[index].remark = this.state.advantageRemark
        inspect.AdvantageList[index].UnitId = this.state.UnitId
        inspect.AdvantageList[index].UnitName = this.state.UnitName
       

       
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

            this.props.navigation.state.params.updateData(global.inspect);
            
        });






    }

    componentDidMount() {
        this.props.navigation.setParams({ handleEdit: this.onEdit });
        this.props.navigation.setParams({ handleSave: this.onSave });
    }

    componentWillMount() {
        let index = this.props.navigation.state.params.item.index
 
        let currentAdvantage = global.inspect.AdvantageList[index];
 

        this.setState({
            advantageRemark: currentAdvantage.remark,
            files: currentAdvantage.images,
            UnitName: currentAdvantage.UnitName,
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

    takePhoto = () => {
        //拍照
    }



    onReset = () => {
        //返回

    }

    changeRemark = (value) => {

        this.setState({ advantageRemark: value })
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

    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            Units:[],
            TeamLists: global.inspect.DepartmentTree.SubDepartments,
            [key]: true,
        });
    }
    changeUnit = (val) => {

        // Toast.info(val.subDepartments.length)
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


    render() {

        const { files } = this.state;
        const photoLength = files.length;
        if (photoLength == 0 || files[photoLength - 1].uri) {
            files.push({ uri: null })
        }
        if (this.props.navigation.state.params.button == "save") {

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
                                                {!dataItem.uri ? <Text style={{ fontSize: 30 }}>+</Text> :
                                                    // <Image style={styles.avatar} source={dataItem} />
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
                                value={this.state.advantageRemark}
                                onChange={this.changeRemark}
                                rows={5}
                            />
                        </Card.Body>
                    </Card>

                    <WhiteSpace size="lg" />

                    <List>
                        <Item extra={this.state.UnitName} arrow="horizontal" onClick={this.showModal('modal')}>受检单位</Item>

                    </List>
                    <WhiteSpace size="lg" />

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


                </ScrollView>
            )

        } else {


            return (
                <ScrollView>


                    <Card>
                        <Card.Header
                            title="照片记录"
                        />
                        <Card.Body>
                            <WingBlank>
                                <Grid data={this.state.files}
                                    columnNum={3}
                                    renderItem={(dataItem, index) => {
                                        return <TouchableOpacity  >
                                            <View style={[styles.avatar, styles.avatarContainer]}>
                                                {!dataItem.uri ? <Text style={{ fontSize: 30 }}>+</Text> :
                                                    // <Image style={styles.avatar} source={dataItem} />
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
                            <WingBlank>
                                <Brief>{this.state.advantageRemark}</Brief>
                            </WingBlank>

                        </Card.Body>
                    </Card>

                    <WhiteSpace size="lg" />

                    <List>
                        <Item extra={this.state.UnitName} arrow="horizontal" onClick={this.showModal('modal')}>受检单位</Item>

                    </List>
                    <WhiteSpace size="lg" />


                </ScrollView>
            )

        }

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
        borderColor: '#fff',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 96,
        height: 80,
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
});
