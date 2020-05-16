import React from "react";

/**Native components */
import { View, StyleSheet, Dimensions, Text } from "react-native";

/**Natigations */
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

/**Icons */
import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";

/**Constants */
import { COLORS } from "../constants/Colors";

/*Screens*/
import FeedScreen from "../screens/tabs/FeedScreen";
import AddOrUpdateTaskScreen from "../screens/tabs/AddOrUpdateTaskScreen";
import UpcomingTaskScreen from "../screens/tabs/UpcomingTaskScreen";

/**For multi language */
import * as Localization from "expo-localization";
import i18n from "i18n-js";

/**Tabs navigations */
const Tab = createMaterialBottomTabNavigator();
const TabsNavigator = () => {
  i18n.translations = {
    en: {
      feedScreen: "Tasks",
      addOrUpdateTaskScreen: "Add Task",
      upcomingTaskScreen: "Upcoming",
    },
    tr: {
      feedScreen: "Görevler",
      addOrUpdateTaskScreen: "Görev Ekle",
      upcomingTaskScreen: "Yaklaşanlar",
    },
  };
  i18n.locale = Localization.locale;
  i18n.fallbacks = true;
  return (
    <Tab.Navigator
      initialRouteName="FeedScreen"
      activeColor={COLORS.active}
      inactiveColor={COLORS.ianctive}
      barStyle={{ backgroundColor: COLORS.tabs }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          if (route.name === "FeedScreen") {
            return (
              <MaterialCommunityIcons
                name="book-open-page-variant"
                size={24}
                color={color}
              />
            );
          } else if (route.name === "AddOrUpdateTaskScreen") {
            return <EvilIcons name="plus" color={color} size={24} />;
          } else if (route.name === "UpcomingTaskScreen") {
            return (
              <UpcomingTaskIconWithBadge name="bell" size={26} color={color} />
            );
          }
        },
      })}
    >
      <Tab.Screen
        options={{
          tabBarLabel: i18n.t("feedScreen"),
        }}
        name="FeedScreen"
        component={FeedScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: i18n.t("addOrUpdateTaskScreen"),
        }}
        name="AddOrUpdateTaskScreen"
        component={AddOrUpdateTaskScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: i18n.t("upcomingTaskScreen"),
        }}
        name="UpcomingTaskScreen"
        component={UpcomingTaskScreen}
      />
    </Tab.Navigator>
  );
};

/**UpcomingTask icon with badge */
function UpcomingTaskIconWithBadge(props: any) {
  return <IconWithBadge {...props} badgeCount={3} />;
}
/**Badge for tab */
function IconWithBadge({ name = "", badgeCount = 0, color = "", size = 0 }) {
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <EvilIcons name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: "absolute",
            right: -6,
            top: -3,
            backgroundColor: "yellow",
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "black", fontSize: 10, fontWeight: "bold" }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

/**Stack navigation for tab */
const Stack = createStackNavigator();
const TabStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={FeedScreen} />
    </Stack.Navigator>
  );
};

/**Base navigation */
export default function Navigation() {
  return (
    <NavigationContainer>
      <TabsNavigator />
    </NavigationContainer>
  );
}
