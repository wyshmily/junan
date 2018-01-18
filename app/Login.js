/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { List, Modal, Button,InputItem,Flex, Toast,WingBlank,WhiteSpace } from 'antd-mobile';
import * as stores from './Stores';
const Item = List.Item;
const prompt = Modal.prompt

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            currentUser:{i:0,user:{account:'',password:'',NewPassword:null}}
        };
    }
    componentWillMount() {
        ////test,省略导入文件步骤
        // stores.writeFile(inspect)
        stores.readFile((result)=>{
            global.inspect = result;
        })
       
    }

    static navigationOptions={
        header:null,
    }

    changeInput=(key,value)=>{
        let newState=this.state;
        newState[key]=value
        this.setState(newState);
    }

    //验证用户名密码
    getUser=(userName)=>{
      
        let length = global.inspect.InspectorList.length;
        let user=null,targetI=0;

        const targetUser = global.inspect.InspectorList.find((value,i)=>{
            if(value.Account===userName){
                targetI = i;
                return true
            }
            return false;
        })
        
     
        this.setState({
            currentUser:{i:targetI,user:targetUser}
        })
        global.currentUser={i:targetI,user:targetUser}
        return targetUser;
    }


    login = () => {
        //首次登陆弹出修改密码窗口
        if(!this.state.username||!this.state.password){
            Toast.info(`请输入用户名密码`, 1);
            return;
        }
        //获取该用户名对应的用户
        let user = this.getUser(this.state.username);
        if(!user){
            Toast.info(`没有该用户`, 1);
            return
        }
        //判断是否第一次登录，第一次登录时，必须修改密码
        if(!user.NewPassword){
            if(user.Password!=this.state.password){
                Toast.info(`用户名或密码错误`, 1);
                return
            }
            prompt('设置密码', '密码',
                [
                    { text: '取消' },
                    {
                        text: '设置',
                        onPress: value => new Promise((resolve) => {
                            //存储新密码数据
                            let inspect = global.inspect;
                            // 设置新密码
                            inspect.InspectorList[this.state.currentUser.i]["NewPassword"]=value;
                            // 修改旧密码
                          
                            
                            inspect.InspectorList[this.state.currentUser.i]["Password"]=value;
                           
                            // 存储用户信息
                            inspect.Record.InspectorName=inspect.InspectorList[this.state.currentUser.i]["Name"];
                            inspect.Record.InspectorAccount=inspect.InspectorList[this.state.currentUser.i]["Account"];

                            stores.writeFile(inspect)
                            global.inspect = inspect;
                            Toast.info(`新密码设置成功,下次登录请使用新密码登录`, 2);
                            setTimeout(() => {
                                resolve();

                                //验证成功后跳转页面
                                const {navigate} = this.props.navigation;
                                navigate("CheckHome")

                            }, 1000);
                        }),
                    },
                ], 'secure-text', null, ['新密码'])
        }else{
            if(user.NewPassword!=this.state.password){
                Toast.info(`用户名或密码错误`, 1);
                return
            }

            //验证成功后跳转页面
            const {navigate} = this.props.navigation;
            navigate("CheckHome")
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <List style={styles.list}>
                    <InputItem value={this.state.username} onChange={this.changeInput.bind(this,"username")}>用户名</InputItem>
                    <InputItem type={"password"} value={this.state.password} onChange={this.changeInput.bind(this,"password")}>密码</InputItem>
                <Item>
                    <Flex style={styles.button} >
                        <Flex.Item></Flex.Item>
                        <Flex.Item><Button type="primary" onClick={this.login}>登录</Button></Flex.Item>
                        <Flex.Item></Flex.Item>
                    </Flex>
                </Item>
                </List>
                    <WhiteSpace size="lg"/>
                    <WhiteSpace size="lg"/>
                    <WhiteSpace size="lg"/>
                    <WhiteSpace size="lg"/>
                    <WhiteSpace size="lg"/>
                    <WhiteSpace size="lg"/>
                    <WhiteSpace size="lg"/>
                    <WhiteSpace size="lg"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      flex:1,
      justifyContent: 'center',
      backgroundColor: '#F5FCFF',

  },
    list:{
        // backgroundColor:'#fff',
        // paddingTop:30,
        // paddingBottom:30,
    },
});
