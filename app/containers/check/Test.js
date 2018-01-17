import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View, Image,
    TouchableHighlight,
    DeviceEventEmitter, Span
} from 'react-native';
import { WingBlank, Toast, WhiteSpace, Flex, Modal, Item, List, Button } from 'antd-mobile';



export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            departmentName:global.inspect.departmentTree.name,
            TeamLists: global.inspect.departmentTree.subDepartments,
            Units:[],
            UnitId:''
        };
    }
    componentWillMount() {

        this.setState({
            problem: { num: global.inspect.ProblemList.length },
            advantage: { num: global.inspect.AdvantageList.length }
        })
    }


    componentWillReceiveProps() {
        this.componentWillMount();
    }


    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    changeUnit = (val) => {

        // Toast.info(val.subDepartments.length)
        if (val.subDepartments.length) {
            this.state.Units.push(val.name)
            this.setState({
                TeamLists: val.subDepartments,
            });
        }

    }
    chooseUnit = (val) => {
        
        this.state.Units.push(val.name)

        this.setState({
            UnitId:val.id,
            modal: false,
            
        });


    }




    render() {
        return (
            <View >
                <WingBlank >
                    <Button onClick={this.showModal('modal')}>popup</Button>
                    <WhiteSpace size="lg" />

                    <View style={styles.inner}>
                        <View style={styles.cell}>
                            <Text>1</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text>2</Text>
                        </View>

                    </View>

                    <Modal
                        popup
                        visible={this.state.modal}
                        onClose={this.onClose('modal')}
                        animationType="slide-up"
                    >
                        <List renderHeader={() => <Text style={{ fontSize: 20, height: 40, marginTop: 10, textAlign: "center" }}>{this.state.departmentName}</Text>} className="popup-list">
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

                                    {/* <Text style={styles.cell}>{i}</Text><Text style={styles.cell}>选择</Text> */}

                                </List.Item>
                            ))}
                            <List.Item>
                                <Button type="primary" onClick={this.onClose('modal')}>关闭</Button>
                            </List.Item>
                        </List>
                    </Modal>

                </WingBlank >



            </View >
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 40,
        paddingTop: 40,
        backgroundColor: '#fff'
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
    title: {
        fontSize: 16,
        textAlign: 'left',
        marginLeft: 15,
    },
    num: {
        textAlign: 'right',
    },
    icon: {
        width: 26,
        height: 26,
    }
});
