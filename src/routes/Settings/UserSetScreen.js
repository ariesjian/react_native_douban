import React, { PureComponent } from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { queryBrands } from "../../service/api";
export default class extends PureComponent {
  state = {
    list: []
  };
  async componentWillMount() {
    try {
      const res = await queryBrands();
      console.log(res, "值");
      this.setState({
        list: res
      });
    } catch (e) {
      console.log(e, "111");
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image
          style={{ width: 50, height: 50 }}
          source={require("../../images/picture.jpeg")}
        />
        <Text>个人中心设置页面</Text>
        <ScrollView style={{ flex: 1 }}>
          {this.state.list.map((item, index) => (
            <View key={String(index)}>
              <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: item.avatar }}
              />
              <Text>{item.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}
