import React, {PureComponent} from "react";
import {Text, View, StyleSheet, Image, ScrollView, Button, FlatList} from "react-native";
import {getDetail} from "../../service/api";

export default class extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params || {};
        return {
            title,
        };
    };

    state = {
        start: 1,
        detailObj: {}, // 电影详情对象
        id: this.props.navigation.getParam("id") // 详情页面的id
    };

    componentDidMount() {
        this.getInTheatersList();
    }

    getInTheatersList = async () => {
        // 获取电影详情接口数据

        const params = {
            apikey: "0b2bdeda43b5688921839c8ecb20399b",
            city: "上海",
            start: this.state.start,
            count: 15
        };
        try {
            const res = await getDetail(this.state.id, params);
            console.log(res, '详情数据');
            if (res) {
                this.setState({
                    detailObj: res
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const {detailObj} = this.state;
        const {images = {}} = detailObj || {};
        return (
            <ScrollView style={sty.container}>
                <View style={sty.top}>
                    <Image style={sty.images} source={{uri: images.small}}/>
                </View>
                <View style={sty.middle}>
                    <Text style={sty.title}>
                        {detailObj.title || ''}
                    </Text>
                    <Text style={sty.description}>
                        {detailObj.year} /
                        {detailObj.genres &&
                        detailObj.genres.map((item, v) => {
                            return (
                                <Text key={v}>{item}{v + 1 < detailObj.genres.length ? '/' : ''}</Text>
                            )
                        })
                        }
                    </Text>
                    <Text style={sty.description}>原名：{detailObj.original_title}</Text>
                    <Text style={sty.description}>上映时间：{detailObj.mainland_pubdate}</Text>
                    <Text
                        style={sty.description}>片长：{detailObj.durations && detailObj.durations.length > 0 ? detailObj.durations[0] : '0分钟'
                    }</Text>

                </View>
                <Button
                    onPress={() => {
                        this.props.navigation.navigate("OutLink", {
                            url: detailObj.mobile_url
                        });
                        console.log('需要完成的功能 播放啊')
                    }}
                    title="在线观看"
                />
                {detailObj.photos && detailObj.photos.length > 0 &&
                <View style={sty.list_actor}>
                    <Text style={sty.title_about}>相关资料</Text>
                    <FlatList
                        style={sty.lists}
                        data={detailObj.photos}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={(v) => {
                            return (
                                <View style={sty.pic_wrap}>
                                    <Image key={v.index} style={sty.pics} source={{uri: v.item.image}}/>
                                </View>
                            )
                        }}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />

                </View>

                }

            </ScrollView>
        );
    }
}

const sty = StyleSheet.create({
    container: {
        flex: 1
    },
    top: {
        flex: 1,
        height: 250,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    images: {
        width: 150,
        height: 200,

    },
    middle: {
        flex: 1,
        height: 160,
    },
    title: {
        textAlign: 'left',
        fontSize: 22,
        height: 50,
        lineHeight: 50,
        marginTop: 10,
        color: 'black',
        fontWeight: '500',
        marginLeft: 10,
    },
    description: {
        width: 500,
        height: 25,
        lineHeight: 25,
        color: '#BDBDBD',
        marginLeft: 10,
    },
    list_actor: {
        flex: 1,
        height: 150,
        marginBottom: 10,
    },
    lists: {
        display: 'flex',
        overflow: 'scroll',
        width: 750,
        height: 100,
        flexWrap: 'nowrap',
        flexDirection: 'row'
    },
    pic_wrap: {
        width: 80,
        height: 100,
        marginLeft: 5,
        marginRight: 5,
    },
    pics: {
        width: 80,
        height: 100,
    },
    title_about: {
        width: 200,
        height: 50,
        lineHeight: 50,
    },
});
