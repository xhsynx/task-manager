import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";

/**Constants */
const { width, height } = Dimensions.get("window");
import { COLORS } from "../../constants/Colors";

/**Icons */
import { EvilIcons } from "@expo/vector-icons";

/**Custom components */
import Header from "../../components/HeaderComponent";
import { hexcolor } from "../../helpers/RandomHexColor";

/**For multi language */
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { getAllTasks } from "../../controllers/TaskController";

export default function UpcomingTaskcreen() {
  i18n.translations = {
    en: {
      haveNotification: "You have uncompleted tasks!",
      haveNotNotification: "Notifications",
      buttonOk: "Ok",
      alertSuccessTitle: "Great!😊",
      alertSuccessMessage: "You completed task.",
    },
    tr: {
      haveNotification: "Tamamlanmamış görevleriniz var!",
      haveNotNotification: "Bildirimler",
      buttonOk: "Tamam",
      alertSuccessTitle: "Harika!😊",
      alertSuccessMessage: "Görevi tamamladınız.",
    },
  };
  i18n.locale = Localization.locale;
  i18n.fallbacks = true;

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = getAllTasks().then((allTasks) => {
      if (allTasks) {
        setTasks(allTasks);
      }
    });

    return () => {
      unsubscribe;
    };
  }, []);

  return (
    <>
      <Header
        title={
          tasks.length === 0
            ? i18n.t("haveNotNotification")
            : i18n.t("haveNotification")
        }
        iconName={"bell"}
        iconColor={COLORS.white}
        titleColor={COLORS.active}
        iconSize={24}
        titleSize={20}
      />
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.background,
        }}
      >
        <FlatList
          data={tasks}
          renderItem={({ item }) => <Item task={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    </>
  );
}
const Item = ({ task }: any) => {
  return (
    <View
      style={{
        marginVertical: 5,
        marginHorizontal: 10,
        width: width / 1.1,
        elevation: 2.5,
        borderColor: COLORS.header,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          height: 50,
          backgroundColor: COLORS.header,
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
        }}
      >
        <View
          style={{
            height: 40,
            width: 70,
            marginStart: 5,
            borderRadius: 50,
            borderWidth: 1,
            borderColor: COLORS.active,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: COLORS.active }}>{task.date}</Text>
          <Text style={{ color: COLORS.active, fontWeight: "bold" }}>
            Son 3 Gün!
          </Text>
        </View>
        <View>
          <Text style={{ color: COLORS.active, fontWeight: "bold" }}>
            {task.title}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            Alert.alert(
              i18n.t("alertSuccessTitle"),
              i18n.t("alertSuccessMessage"),
              [
                {
                  text: i18n.t("buttonOk"),
                  style: "default",
                },
              ]
            );
          }}
        >
          <EvilIcons name="check" size={24} color={COLORS.active} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 50,
            backgroundColor: hexcolor(),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>😔</Text>
        </View>
        <View
          style={{
            height: height / 5,
            paddingHorizontal: 25,
          }}
        >
          <Text>{task.desc}</Text>
        </View>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
