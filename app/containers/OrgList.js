import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import {List} from 'antd-mobile'
const Item = List.Item;

export default class OrgList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orgList:[{id:"11",org:"一连"},{id:"22",org:"二连"}]
        };
    }
    beginCheck=(orgName)=>{
        console.log("selected:",orgName)
        const {navigate} = this.props.navigation;
        navigate("TabBars", { org: orgName })
    }
    render() {
        return (
            <View>
                <List className="my-list">
                    {this.state.orgList.map((val,index)=>{
                        return(<Item key={"orgitem"+index} arrow="horizontal" multipleLine onClick={this.beginCheck.bind(this,val.org)}>{val.org}</Item>)
                    })}
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
        backgroundColor: '#fff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        marginBottom: 5,
    },
});