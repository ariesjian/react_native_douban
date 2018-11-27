import React from "react";
import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer
} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./Home";
import DetailsScreen from "./Detail";
import OutLinkScreen from "./OutLink";
import SearchScreen from "./Search";

const Tab = createBottomTabNavigator(
    // 配置tab切换的路由
    {
        Home: HomeScreen,
        Search: SearchScreen
    },
    {
        navigationOptions: ({navigation}) => {
            const {index} = navigation.state;
            return {
                title: index === 0 ? '首页' : '搜索'
            }
        },
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === "Home") {
                    iconName = `ios-home`;
                } else if (routeName === "Search") {
                    iconName = `ios-settings`;
                }

                return <Ionicons name={iconName} size={25} color={tintColor}/>;
            }
        }),
        tabBarOptions: {
            activeTintColor: "tomato",
            inactiveTintColor: "gray"
        }
    }
);

const MainStack = createStackNavigator(
    {
        Tab: Tab,
        Detail: DetailsScreen,
        OutLink: OutLinkScreen,
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#f4511e"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold"
            }
        }
    }
);

export default createAppContainer(MainStack);
