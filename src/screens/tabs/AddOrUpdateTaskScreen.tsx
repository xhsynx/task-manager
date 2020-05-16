import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  SafeAreaView,
  Alert,
  View,
  Platform,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

/**Icons */
import { EvilIcons } from "@expo/vector-icons";

/**Constants */
const { width, height } = Dimensions.get("window");
import { COLORS } from "../../constants/Colors";
import { hexcolor } from "../../helpers/RandomHexColor";

/**For multi language */
import * as Localization from "expo-localization";
import i18n from "i18n-js";

/**Controllers */
import { addTask } from "../../controllers/TaskController";

/**Custom components */
import Header from "../../components/HeaderComponent";

export default function AddOrUpdateTaskScreen() {
  const navigation = useNavigation();
  i18n.translations = {
    en: {
      addTaskHeaderTitle: "Add Task",
      updateTaskHeaderTitle: "Update Task",
      taskTitle: "Title:",
      taskDesc: "Description:",
      add: "Add",
      warning: "Warning!",
      warningMessage: "All fileds are required.",
      success: "Great!",
      successMessage: "Task is added successfully.",
      ok: "Ok",
    },
    tr: {
      addTaskHeaderTitle: "Görev Ekle",
      updateTaskHeaderTitle: "Güncelle",
      taskTitle: "Başlık:",
      taskDesc: "Açıklama:",
      add: "Ekle",
      warning: "Uyarı!",
      warningMessage: "Tüm alanlar zorunlu.",
      success: "Harika!",
      successMessage: "Görev başarıyla eklendi.",
      ok: "Tamam",
    },
  };
  i18n.locale = Localization.locale;
  i18n.fallbacks = true;

  const [task, setTask] = useState({
    id: "",
    title: "",
    desc: "",
    date: "",
  });

  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };
  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };
  return (
    <>
      <Header
        title={i18n.t("addTaskHeaderTitle")}
        iconName={"bandcamp"}
        titleSize={20}
        titleColor={COLORS.background}
        iconColor={COLORS.background}
        iconSize={24}
        screenName={"AddOrUpdateTaskScreen"}
      />
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: width,
          height: height,
          position: "relative",
        }}
      >
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
              height: height / 12,
              backgroundColor: COLORS.header,
              justifyContent: "flex-start",
              alignItems: "center",
              alignContent: "center",
              borderTopEndRadius: 10,
              borderTopStartRadius: 10,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                height: 40,
                width: width / 5,
                marginStart: 5,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: COLORS.white,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                showDatepicker();
              }}
            >
              <Text style={{ color: COLORS.white }}>
                {date.toLocaleDateString()}
              </Text>
              <EvilIcons name="calendar" color={COLORS.white} size={24} />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: "bold",
                  paddingStart: 5,
                  fontSize: 20,
                }}
              >
                {i18n.t("taskTitle")}
              </Text>
              <TextInput
                autoFocus={false}
                multiline={true}
                keyboardType="default"
                maxLength={512}
                onChangeText={(text: string) => {
                  setTask({
                    ...task,
                    title: text,
                  });
                }}
                value={task.title}
                style={{
                  marginStart: 5,
                  backgroundColor: COLORS.white,
                  color: COLORS.black,
                  width: width / 2.3,
                  height: height / 25,
                  borderRadius: 10,
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              />
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  height: 40,
                  width: 40,
                  marginStart: 5,
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: COLORS.white,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  setTask({
                    ...task,
                    id: "",
                    title: "",
                    desc: "",
                    date: "",
                  });
                  navigation.goBack();
                }}
              >
                <EvilIcons name="close" color={COLORS.white} size={24} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: hexcolor(),
                width: 10,
                height: height / 10,
                borderRadius: 50,
              }}
            />
            <View
              style={{
                height: height / 4,
                paddingHorizontal: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  alignSelf: "flex-start",
                  paddingStart: 10,
                  fontWeight: "bold",
                  color: COLORS.header,
                }}
              >
                {i18n.t("taskDesc")}
              </Text>
              <TextInput
                autoFocus={false}
                autoCompleteType="off"
                keyboardType="default"
                maxLength={32}
                onChangeText={(text: string) => {
                  setTask({
                    ...task,
                    desc: text,
                  });
                }}
                value={task.desc}
                style={{
                  marginStart: 5,
                  backgroundColor: COLORS.white,
                  color: COLORS.black,
                  width: width / 1.3,
                  height: height / 5,
                  borderRadius: 10,
                  fontWeight: "bold",
                  fontSize: 15,
                  borderWidth: 1,
                  borderColor: COLORS.header,
                }}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            backgroundColor: COLORS.header,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            alignSelf: "center",
            bottom: 10,
          }}
          onPress={() => {
            let t = {
              id: Date.now().toString(),
              title: task.title,
              date: date.toLocaleDateString().toString(),
              desc: task.desc,
            };
            console.log("********", t);
            if (t.title && t.desc && t.id && t.date) {
              addTask(task).then((isSuccess) => {
                if (isSuccess) {
                  Alert.alert(i18n.t("success"), i18n.t("successMessage"), [
                    {
                      text: "Ok",
                      onPress: () => navigation.navigate("FeedScreen"),
                    },
                  ]);
                } else {
                  Alert.alert(i18n.t("error"), i18n.t("errorMessage"), [
                    {
                      text: i18n.t("ok"),
                      onPress: () => navigation.navigate("FeedScreen"),
                    },
                  ]);
                }
              });
              setTask({
                ...task,
                id: "",
                title: "",
                desc: "",
                date: "",
              });
            } else {
              Alert.alert(i18n.t("warning"), i18n.t("warningMessage"));
            }
          }}
        >
          <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
            {i18n.t("add")}
          </Text>
        </TouchableOpacity>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </SafeAreaView>
    </>
  );
}

const Styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
