import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { List } from 'antd-mobile'
const Item = List.Item;

export default class PointTypeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pointList: [],


        };
    }
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.org}`,
        // title: global.inspect.PositionTypeList[0].PositionList[0].departmentId


    });

    componentWillMount() {

        let inspect = global.inspect;
 
        let positionTypeListArr = [].slice.call(JSON.parse(JSON.stringify(inspect.PositionTypeList)));

 
        positionTypeListArr.forEach(function (element, i) {

            element.PositionList.forEach(function (ele, index) {
                
                if (ele.departmentId) {
                    if (ele.departmesntId != global.department.Id) {

                        positionTypeListArr[i].PositionList.splice(index, 1);

                    }
                }

            });

          return positionTypeListArr;
         

        });

        this.setState({
            pointList: positionTypeListArr
        })

      

    }
    beginCheck = (pointName, index) => {
        console.log("selected:", pointName)
        const { navigate } = this.props.navigation;
        navigate("PointList", { pointType: pointName, index: index })

    }

    render() {
        return (
            <List className="my-list">
                {this.state.pointList.map((val, index) => {
                    return (<Item key={"pointitem" + index} arrow="horizontal" extra={val.PositionList.length} multipleLine
                        onClick={this.beginCheck.bind(this, val.Name, index)}>{val.Name}</Item>)
                })}
            </List>
        )
    }
}

const styles = StyleSheet.create({


});