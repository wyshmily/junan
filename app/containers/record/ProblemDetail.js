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
            files: [ ],
           
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

        let paramsObject = this.props.navigation.state.params.item

        let inspect = global.inspect;
        let firstIndex = paramsObject.value.positionArr[2];
        let secondIndex = paramsObject.value.positionArr[3];
        let currentObject = inspect.PositionTypeList[firstIndex].PositionList[secondIndex].AdvantageList;
        let currentAdvantage = {};
        let currentIndex=0;

        for (var i = 0; i < currentObject.length; i++) {
            if (currentObject[i].index == paramsObject.index) {
                // currentAdvantage = currentObject[i];
                currentIndex=i;
            }
        }

        inspect.PositionTypeList[firstIndex].PositionList[secondIndex].AdvantageList[currentIndex].value.images=this.state.files
        inspect.PositionTypeList[firstIndex].PositionList[secondIndex].AdvantageList[currentIndex].value.remark=this.state.problemRemark
        
        global.inspect = inspect;
        this.setState({isLoading:true})
        stores.writeFile(inspect,()=>{
            Toast.info(`保存成功`, 1);
            this.setState({
                isLoading:false
            })
            const { state, navigate, goBack } = this.props.navigation;
            const params = state.params || {};
            // goBack(params.go_back_key);
            params.go_back_key=params.go_back_key-1;
            navigate("AdvantageList")

        });



        Toast.info(this.props.navigation.state.params.button);
        

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
            problemRemark: currentAdvantage.value.remark,
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

    takePhoto = () => {
        //拍照
    }




    onReset = () => {
        //返回

    }

        //问题项
        onChange = (value) => {
            let issue = this.state.issue;
            let currentIndex=0;
            const currentIssue = this.state.issue.find((val,index)=>{
                if(val==value){
                    currentIndex=index;
                    return true;
                }
                return false;
            })
            if(currentIssue){
                issue.splice(currentIndex,1)
            }else{
                issue.push(value)
            }
            this.setState({"issue":issue})
        }

    changeRemark=(value)=>{
         
        this.setState({problemRemark:value})
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
