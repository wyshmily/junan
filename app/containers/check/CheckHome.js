import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Dimensions
} from 'react-native'
import Swiper from 'react-native-swiper'
import {  Flex,List,Button, WhiteSpace, Toast, Carousel } from 'antd-mobile'
const { width } = Dimensions.get('window')
const Item = List.Item;
const Brief = Item.Brief;
const styles = {
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  wrapper: {
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },

  image: {
    width,
    flex: 1
  }
}



export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '现场检查',
            time: '',
            inspectorName: '',

        };
    }
    componentWillMount() {
        let result = global.inspect;
    
        let timer = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
        this.setState({
            time: timer,
            inspectorName: result.Record.InspectorName
        })
    }
    beginCheck = () => {
        const { navigate } = this.props.navigation;
        console.log(navigate)
        //跳转页面
        navigate("Check")
    }
    checkRecord = () => {
      const { navigate } = this.props.navigation;
      console.log(navigate)
      //跳转页面
      navigate("RecordHome")
  }
  render () {
    return (
      <View style={styles.container}>

        <Swiper style={styles.wrapper} height={140}
        loop={true}                
        autoplay={true}
          onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
          dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
          activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
          paginationStyle={{
            bottom: -23, left: null, right: 10
          }} loop>
          <View style={styles.slide} title={<Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>}>
            <Image resizeMode='stretch' style={styles.image} source={require('../../iconImages/1.png')} />
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Big lie behind Nine’s new show</Text>}>
            <Image resizeMode='stretch' style={styles.image} source={require('../../iconImages/2.png')} />
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}>
            <Image resizeMode='stretch' style={styles.image} source={require('../../iconImages/3.png')} />
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Learn from Kim K to land that job</Text>}>
            <Image resizeMode='stretch' style={styles.image} source={require('../../iconImages/4.png')} />
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}>
            <Image resizeMode='stretch' style={styles.image} source={require('../../iconImages/5.png')} />
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Learn from Kim K to land that job</Text>}>
            <Image resizeMode='stretch' style={styles.image} source={require('../../iconImages/6.png')} />
          </View>
        </Swiper>
  
        {/* <List  style={{height:80,position:"relative"}} >
      <Image source={require('../../iconImages/name.png')} style={{width:35, height: 35,position:"absolute",top:20,left:15}} />
        
        <Item multipleLine   extra=" " style={{fontSize:27,marginLeft:60}}>
          检查名称<Brief style={{fontSize:20,marginTop:8}}>{this.state.name}</Brief>
        </Item>
      </List> */}
      <List  style={{height:80,position:"relative"}} >
      <Image source={require('../../iconImages/person.png')} style={{width:35, height: 35,position:"absolute",top:20,left:15}} />
        <Item multipleLine extra=" "   style={{ marginLeft:60}}>
          检查人 <Brief style={{fontSize:20,marginTop:8 }}>{this.state.inspectorName}</Brief>
        </Item>
      </List>
      <List  style={{height:80,position:"relative"}} >
      <Image source={require('../../iconImages/time.png')} style={{width:35, height: 35,position:"absolute",top:20,left:15}} />
      
        <Item multipleLine extra=" " style={{ marginLeft:60}}>
          检查时间 <Brief style={{fontSize:20,marginTop:8}}>{this.state.time}</Brief>
        </Item>
      </List>
      <WhiteSpace size="lg" />
      <Flex>
      <Flex.Item>
      <Button style={{marginRight:8}} type="primary" onClick={this.beginCheck}>开始检查</Button>
        
      </Flex.Item>
      <Flex.Item>
      <Button style={{marginLeft:8}} type="primary" onClick={this.checkRecord}>检查记录</Button>
        
      </Flex.Item>
      </Flex>
      <WhiteSpace size="lg" />
      
      </View>
    )
  }
}