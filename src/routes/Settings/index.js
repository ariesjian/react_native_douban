import React, { PureComponent } from "react";
import { Button, StatusBar, Text, View } from "react-native";

export default class extends PureComponent {

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <StatusBar barStyle={"light-content"} />
        <Text>设置page</Text>
        <Button
          title={'跳转到SetUser'}
          onPress={()=>{
          this.props.navigation.navigate("SetUser")}
        }/>
      </View>
    );
  }
}
