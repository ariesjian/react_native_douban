import React from "react";
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
    createAppContainer
} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./Home";
import DetailsScreen from "./Detail";
// import ModalScreen from "./Modal";
// import RegisterScreen from "./Auth/RegisterScreen";
// import SignInScreen from "./Auth/SignInScreen";
import SettingsScreen from "./Settings";
// import UserSetScreen from "./Settings/UserSetScreen";

const Tab = createBottomTabNavigator(
  // 配置tab切换的路由
  {
    Home: HomeScreen,
    Settings: SettingsScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-home`;
        } else if (routeName === "Settings") {
          iconName = `ios-settings`;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
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

    Detail: DetailsScreen
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
