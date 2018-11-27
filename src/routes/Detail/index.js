import React, { PureComponent } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { getDetail } from "../../service/api";

export default class extends PureComponent {
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
      const res = await getDetail(this.state.id,params);
      if (res) {
        console.log(res,'1222222222')

        this.setState({
          detailObj: res
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { detailObj } = this.state;
    const { images = {} } = detailObj || {};
    return (
      <ScrollView style={sty.container}>
        <View style={sty.top}>
          <Image  style={sty.images} source={{uri:images.small}}/>
        </View>
        <View style={sty.middle}>
          <Text style={sty.title}>
            {detailObj.title ||''}
          </Text>
          <Text>
            {detailObj.genres &&
            detailObj.genres.map((item,v)=>{
              return(
                <Text key={v}>{detailObj.year} /{item}{v+1<detailObj.genres.length?'/':''}</Text>
              )
            })
            }
          </Text>
          <Text>原名：{detailObj.original_title}</Text>
          <Text>上映时间：{detailObj.mainland_pubdate}</Text>
          <Text>片长：{detailObj.durations && detailObj.durations.length>0 ?detailObj.durations[0]:'0分钟'
          }</Text>

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
    flex: 1,
    height:250,
    backgroundColor:'gray',
    justifyContent: 'center',
    alignItems: 'center'
  },
  images:{
    width:150,
    height: 200,

  }

});
