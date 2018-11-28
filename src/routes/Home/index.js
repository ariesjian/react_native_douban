import React, {PureComponent} from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    TouchableHighlight,
    Dimensions
} from "react-native";
import Swiper from "react-native-swiper";
import {getInTheaters} from "../../service/api";

const {height: D_HEIGHT, width: D_WIDTH} = Dimensions.get('window');
export default class extends PureComponent {
    state = {
        start: 1,
        contentList: [],// 热映列表数据
        total: '',// 总条数
    };

    componentDidMount() {
        this.getInTheatersList(false);
    }

    getInTheatersList = async (startNew) => {
        // 获取热映列表

        const params = {
            apikey: "0b2bdeda43b5688921839c8ecb20399b",
            city: "上海",
            start: startNew ? startNew : this.state.start,
            count: 15
        };
        try {
            const res = await getInTheaters(params);
            if (res && res.subjects && res.subjects.length > 0) {
                this.setState({
                    contentList: this.state.contentList.concat(res.subjects),
                    total: res.total,
                    start: res.start,
                });
            }
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const {contentList, start, total} = this.state;
        return (
            <ScrollView
                style={sty.container}
                onMomentumScrollEnd={() => {
                    if ((start-0) * 15 >= (total-0)) {
                        console.log('已经没有更多了')
                    } else {
                        const startNew = this.state.start + 1;
                        console.log('要分页了',startNew);
                        this.getInTheatersList(startNew)
                    }

                }}
            >
                <View style={sty.top}>
                    <Swiper
                        style={sty.swiperWrap}
                        height={200}
                        autoplay={true}
                    >
                        {contentList.map((d, index) => {
                            return (
                                <TouchableHighlight
                                    key={index}
                                    onPress={() => {
                                        this.props.navigation.navigate("Detail", {
                                            id: d.id,
                                            title: d.title
                                        });
                                    }}
                                >
                                    <View style={sty.swiper}>
                                        <Image
                                            style={sty.swiper_pic}
                                            source={{uri: d.images.large}}
                                        />
                                        <View style={sty.titleTop}>
                                            <Text style={sty.tit}>{d.title}</Text>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            );
                        })}
                    </Swiper>
                </View>
                <View style={sty.content}>
                    {contentList.map((item, index) => {
                        return (
                            <TouchableHighlight
                                key={index + 'a'}
                                onPress={() => {
                                    this.props.navigation.navigate("Detail", {
                                        id: item.id,
                                        title: item.title
                                    });
                                }}
                            >
                                <View style={sty.item}>
                                    <View style={sty.pic_info}>
                                        <Image
                                            style={sty.moviePic}
                                            source={{uri: item.images.small}}
                                        />
                                        <View style={sty.vip}>
                                            <Text style={sty.vip_text}> VIP</Text>
                                        </View>
                                        <View style={sty.average}>
                                            <Text style={sty.count}>{item.rating.average}</Text>
                                        </View>
                                    </View>
                                    <View style={sty.movie_info}>
                                        <Text style={sty.name}>{item.title}</Text>
                                        <Text style={sty.types}>
                                            {item.genres.map((i, v) => {
                                                return (
                                                    <Text key={v} style={sty.type}>
                                                        {i}{v + 1 < item.genres.length ? '·' : ''}

                                                    </Text>
                                                );
                                            })}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        );
                    })}
                </View>
            </ScrollView>
        );
    }
}

const sty = StyleSheet.create({
    container: {
        flex: 1
    },
    top: {
        flex: 1
    },
    swiperWrap: {
        // width: 375,
        // height: 200
    },
    swiper: {
        width: '100%',
        height: 200,
        position: "relative"
    },
    swiper_pic: {
        width: '100%',
        height: 200,
        position: "absolute",
        left: 0,
        top: 0
    },
    titleTop: {
        width: 200,
        height: 30,
        position: "absolute",
        left: 30,
        bottom: 10
    },
    tit: {
        width: 200,
        height: 30,
        textAlign: "center",
        fontSize: 20
    },
    content: {
        flex: 3,
        justifyContent: "flex-start",
        flexDirection: "row",
        padding: 5,
        flexWrap: "wrap"
    },
    item: {
        height: 180,
        width: (D_WIDTH - 40) / 3,
        margin: 5
    },
    pic_info: {
        width: '100%',
        height: 120,
        position: "relative"
    },
    moviePic: {
        position: "absolute",
        height: 120,
        left: 0,
        top: 0,
        width: '100%'
    },
    vip: {
        position: "absolute",
        width: 30,
        height: 15,
        right: 3,
        top: 0,
        borderRadius: 3
    },
    vip_text: {
        width: 30,
        height: 20,
        color: "white",
        fontSize: 14,
        textAlign: "center"
    },
    average: {
        position: "absolute",
        width: 30,
        height: 20,
        right: 3,
        bottom: 3
    },
    count: {
        width: 30,
        height: 20,
        color: "yellow",
        fontSize: 14,
        textAlign: "center"
    },
    movie_info: {
        height: 60,
        width: 120
    },
    name: {
        width: 120,
        height: 30,
        color: "#666666",
        fontSize: 13,
        textAlign: "center",
        lineHeight: 30
    },
    types: {
        flexDirection: "column",
        width: 120,
        height: 30,
        justifyContent: "center",
    },
    type: {
        width: 30,
        height: 30,
        color: "gray",
        fontSize: 10,
        textAlign: "center",
        lineHeight: 30
    }
});
