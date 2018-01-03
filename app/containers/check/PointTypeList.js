import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter
} from 'react-native';
import { List, Toast } from 'antd-mobile'
const Item = List.Item;

export default class PointTypeList extends Component {
    constructor(props) {
        super(props);

      
    }
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.org}`,

    });

    componentWillMount() {
 
        global.inspect.PositionTypeList.forEach(positionType => {
            positionType.PositionCount = positionType.PositionList
                .filter(position => position.departmentId == global.department.Id).length
        });

        this.setState({
            pointList: global.inspect.PositionTypeList
        })
 
    }

    componentDidMount() {
        DeviceEventEmitter.addListener('ChangeIndex', (dic) => {
            this.componentWillMount();
        });
    }


     
    beginCheck = (pointName, index) => {
        console.log("selected:", pointName)
        const { navigate } = this.props.navigation;
        navigate("PointList", { pointType: pointName, index: index  })

    }

    render() {
        return (
            <List className="my-list">
                {this.state.pointList.map((val, index) => {
                    return (<Item key={"pointitem" + index} arrow="horizontal" extra={val.PositionCount} multipleLine
                        onClick={this.beginCheck.bind(this, val.Name, index)}>{val.Name}</Item>)
                })}
            </List>
        )
    }
}

const styles = StyleSheet.create({


});