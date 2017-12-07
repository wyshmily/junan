import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import {List,Button, WingBlank, WhiteSpace, Flex} from 'antd-mobile';

const Item = List.Item;

export default class RecordHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            problem: {num: 10},
            advantage: {num: 8}
        };
    }

    toList = (uri) => {
        const {navigate} = this.props.navigation;
        navigate(uri)
    }

    render() {
        return (
            <View>
                <WingBlank size="lg">
                    <WhiteSpace size="lg"/>
                    <List className="my-list" onClick={this.toList.bind(this, "ProblemList")}>
                        <Item>
                            <Flex>
                                <Flex.Item><Image source={require('../../images/img.png')}
                                                                style={{
                                                                    width: 55,
                                                                    height: 55,
                                                                    marginRight: 20
                                                                }}/></Flex.Item>
                                <Flex.Item><Text style={styles.title}>{"问题记录"}</Text>
                                    <Button type="primary" onClick={this.toList.bind(this, "ProblemList")}>test</Button></Flex.Item>
                                <Flex.Item><Text
                                    style={styles.num}>{this.state.problem.num}</Text></Flex.Item>
                            </Flex>
                        </Item>
                    </List>
                    <WhiteSpace size="lg"/>
                    <WhiteSpace size="lg"/>
                </WingBlank>
                <WingBlank size="lg">
                    <WhiteSpace size="lg"/>
                    <List className="my-list" onClick={this.toList.bind(this, "AdvantageList")}>
                        <Item>
                            <Flex>
                                <Flex.Item><Image source={require('../../images/img.png')}
                                                  style={{
                                                      width: 55,
                                                      height: 55,
                                                      marginRight: 20
                                                  }}/></Flex.Item>
                                <Flex.Item>
                                    <Button type="primary" onClick={this.toList.bind(this, "AdvantageList")}>test</Button>
                                    <Text style={styles.title}>{"优点记录"}</Text></Flex.Item>
                                <Flex.Item><Text
                                    style={styles.num}>{this.state.advantage.num}</Text></Flex.Item>
                            </Flex>
                        </Item>
                    </List>
                    <WhiteSpace size="lg"/>
                </WingBlank>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    title:{
        textAlign:'left',
    },
    num: {
        textAlign: 'right',
    },
});
