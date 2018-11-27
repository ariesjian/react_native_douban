import React, {PureComponent} from "react";
import {View, TextInput, StyleSheet, FlatList, Text, Image, TouchableOpacity} from "react-native";
import {getSearch} from "../../service/api";


export default class extends PureComponent {
    state = {
        inputValue: '胡歌',
        moveArr: [],
    };

    componentDidMount() {
        this.getSearchData(this.state.inputValue);
    }

    getSearchData = async (key) => {
        try {
            const res = await getSearch({q: key});
            console.log(res, '数据');
            if (res) {
                this.setState({
                    moveArr: res.subjects,
                });
            }
        } catch (e) {
            console.log(e);
        }
    };
    // 将内容单独提取成组件
    ItemRow = (item) => {
        return (
            <View style={sty.list}>
                <View style={sty.left}>
                    <Image style={sty.imgs} source={{uri: item.item.images.small}}/>
                </View>
                <View style={sty.right}>
                    <Text>{item.item.title}</Text>
                </View>
            </View>
        )
    };

    render() {
        return (
            <View style={sty.container}>
                <View style={sty.iput_wrap}>
                    <TextInput
                        style={sty.input_}
                        placeholder={'请输入演员/导演/电影名称'}
                        onChangeText={(text) => this.setState({inputValue: text})}
                        value={this.state.inputValue}
                    />
                    <TouchableOpacity style={sty.btn_search} onPress={() => {
                        if (this.state.inputValue && this.state.inputValue.length > 0) {
                            this.getSearchData(this.state.inputValue)
                        }

                    }}>
                        <Text style={sty.btn_text}>搜索</Text>
                    </TouchableOpacity>

                </View>
                <FlatList
                    style={sty.content}
                    data={this.state.moveArr}
                    keyExtractor={(item, index) => index}
                    renderItem={this.ItemRow}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        );
    }
}
const sty = StyleSheet.create({
    container: {
        flex: 1
    },
    iput_wrap: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
    },
    input_: {
        flex: 1,
        height: 44,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "gray",
        marginHorizontal: 10,
        marginTop: 10
    },
    btn_search: {
        marginTop: 10,
        marginRight: 10,
        height: 44,
        width: 80,
        borderRadius: 4,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn_text: {
        color: '#fff'
    },
    list: {
        flex: 1,
        height: 150,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
    },
    left: {
        width: 100,
        height: 150,
        marginRight: 20,
        marginLeft: 10,
    },
    imgs: {
        width: 100,
        height: 150,
    },
    content: {
        flex: 1,
        marginTop: 20,
    },
});