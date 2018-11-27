import React, {PureComponent} from "react";
import {WebView} from "react-native";

export default class extends PureComponent {
    state = {
        url: this.props.navigation.getParam("url") // 要跳转的外部链接
    };

    componentDidMount() {
    }

    render() {
        return (
            <WebView
                source={{uri: this.state.url}}
                style={{marginTop: 20}}
            />
        );
    }
}


