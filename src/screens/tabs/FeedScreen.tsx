import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

/**For multi language */
import * as Localization from "expo-localization";
import i18n from "i18n-js";

/**Constants */
const { width, height } = Dimensions.get("window");
import { COLORS } from "../../constants/Colors";

/**Icons */
import { EvilIcons, AntDesign, MaterialIcons } from "@expo/vector-icons";

/**Custom components */
import Header from "../../components/HeaderComponent";
import { hexcolor } from "../../helpers/RandomHexColor";

/**Third party library */
import Dialog, {
  DialogContent,
  DialogButton,
  DialogFooter,
  DialogTitle,
} from "react-native-popup-dialog";

/**Controllers */
import {
  getAllTasks,
  getMonthlyTasks,
  getDailyTasks,
  getWeeklyTasks,
  getFilteredTasks,
  deleteTask,
} from "../../controllers/TaskController";

export default function FeedScreen() {
  const navigation = useNavigation();
  i18n.translations = {
    en: {
      feedScreenTitle: "TASKS",
      all: "All",
      daily: "Daily",
      weekly: "Weekly",
      monthly: "Monthly",
      filter: "Filter",
      buttonOk: "Ok",
      buttonCancel: "Cancel",
      startDate: "Start Date",
      endDate: "End Date",
      daysRemain: "Day(s) remain",
      edit: "Edit",
      remove: "Remove",
      options: "Options",
      noTask: "You do not have available tasks.",
    },
    tr: {
      feedScreenTitle: "GÖREVLER",
      all: "Tümü",
      daily: "Günlük",
      weekly: "Haftalık",
      monthly: "Aylık",
      filter: "Filtrele",
      buttonOk: "Tamam",
      buttonCancel: "İptal",
      startDate: "Başlangıç",
      endDate: "Bitiş",
      daysRemain: "Gün Kaldı",
      edit: "Düzenle",
      remove: "Sil",
      options: "Seçenekler",
      noTask: "Herhangi bir gönderiniz bulunmamakta.",
    },
  };
  i18n.locale = Localization.locale;
  i18n.fallbacks = true;

  const [startDate, setStartDate] = useState(new Date(Date.now()));
  const [endDate, setEndDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [datePickerChangeType, setDatePickerChangeType] = useState("");

  const [isFabPressed, setIsFabPressed] = useState(false);
  const [tasks, setTasks] = useState([]);

  const [isAllTaskSelected, setIsAllTaskSelected] = useState(true);
  const [isDailyTaskSelected, setIsDailyTaskSelected] = useState(false);
  const [isWeeklyTaskSelected, setIsWeeklyTaskSelected] = useState(false);
  const [isMonthlyTaskSelected, setIsMonthlyTaskSelected] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getAllTasks().then((allTasks) => {
        if (allTasks) {
          setTasks(allTasks);
        }
      });
    });

    return unsubscribe;
  }, [navigation]);

  const taskSelector = (selectType: string) => {
    switch (selectType) {
      case "isAllTaskSelected":
        setIsAllTaskSelected(true);
        setIsDailyTaskSelected(false);
        setIsWeeklyTaskSelected(false);
        setIsMonthlyTaskSelected(false);
        break;
      case "isDailyTaskSelected":
        setIsAllTaskSelected(false);
        setIsDailyTaskSelected(true);
        setIsWeeklyTaskSelected(false);
        setIsMonthlyTaskSelected(false);
        break;
      case "isWeeklyTaskSelected":
        setIsAllTaskSelected(false);
        setIsDailyTaskSelected(false);
        setIsWeeklyTaskSelected(true);
        setIsMonthlyTaskSelected(false);
        break;
      case "isMonthlyTaskSelected":
        setIsAllTaskSelected(false);
        setIsDailyTaskSelected(false);
        setIsWeeklyTaskSelected(false);
        setIsMonthlyTaskSelected(true);
        break;
      case "isfilteredTasks":
        setIsAllTaskSelected(false);
        setIsDailyTaskSelected(false);
        setIsWeeklyTaskSelected(false);
        setIsMonthlyTaskSelected(false);
        break;

      default:
        setIsAllTaskSelected(true);
        break;
    }
  };

  const onChangeStartDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || startDate;
    setShow(Platform.OS === "ios");
    setStartDate(currentDate);
  };
  const onChangeEndDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || startDate;
    setShow(Platform.OS === "ios");
    setEndDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = (changeType: string) => {
    setDatePickerChangeType(changeType);
    showMode("date");
  };

  return (
    <>
      <Header
        title={i18n.t("feedScreenTitle")}
        iconName={"book-open-page-variant"}
        titleSize={20}
        titleColor={COLORS.background}
        iconColor={COLORS.background}
        iconSize={24}
        screenName={"TaskScreen"}
      />
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.background,
          position: "relative",
        }}
      >
        <View
          style={{
            width: width,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            alignContent: "center",
            padding: 10,
          }}
        >
          <TouchableOpacity
            style={{
              width: width / 5,
              height: 25,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              backgroundColor: isAllTaskSelected ? COLORS.header : COLORS.gray,
              borderRadius: 20,
            }}
            onPress={() => {
              getAllTasks().then((allTasks) => {
                setTasks(allTasks);
                taskSelector("isAllTaskSelected");
              });
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontWeight: "bold",
              }}
            >
              {i18n.t("all")} {isAllTaskSelected && `(${tasks.length})`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: width / 5,
              height: 25,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              backgroundColor: isDailyTaskSelected
                ? COLORS.header
                : COLORS.gray,
              borderRadius: 20,
            }}
            onPress={() => {
              getDailyTasks(tasks as []).then((getDailyTasks) => {
                setTasks(getDailyTasks);
                taskSelector("isDailyTaskSelected");
              });
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontWeight: "bold",
              }}
            >
              {i18n.t("daily")} {isDailyTaskSelected && `(${tasks.length})`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: width / 5,
              height: 25,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              backgroundColor: isWeeklyTaskSelected
                ? COLORS.header
                : COLORS.gray,
              borderRadius: 20,
            }}
            onPress={() => {
              getWeeklyTasks(tasks as []).then((getWeeklyTasks) => {
                setTasks(getWeeklyTasks);
                taskSelector("isWeeklyTaskSelected");
              });
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontWeight: "bold",
              }}
            >
              {i18n.t("weekly")}
              {isWeeklyTaskSelected && `(${tasks.length})`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: width / 5,
              height: 25,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              backgroundColor: isMonthlyTaskSelected
                ? COLORS.header
                : COLORS.gray,
              borderRadius: 20,
            }}
            onPress={() => {
              getMonthlyTasks(tasks as []).then((monthlyTasks) => {
                setTasks(monthlyTasks);
                taskSelector("isMonthlyTaskSelected");
              });
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontWeight: "bold",
              }}
            >
              {i18n.t("monthly")} {isMonthlyTaskSelected && `(${tasks.length})`}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          renderItem={({ item }) => <Item task={item} />}
          keyExtractor={(item: any) => item.id.toString()}
          ListEmptyComponent={<Text>{i18n.t("noTask")}</Text>}
        />
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            position: "absolute",
            backgroundColor: COLORS.header,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "flex-end",
            bottom: 10,
            right: 10,
          }}
          onPress={() => {
            setIsFabPressed(!isFabPressed);
          }}
        >
          <AntDesign name="filter" size={24} color={COLORS.white} />
        </TouchableOpacity>
        {/** Dialog pop up is FAB button pressed */}
        <Dialog
          visible={isFabPressed}
          footer={
            <DialogFooter>
              <DialogButton
                text={i18n.t("buttonCancel")}
                textStyle={{ color: COLORS.red }}
                onPress={() => {
                  setIsFabPressed(!isFabPressed);
                }}
              />
              <DialogButton
                text={i18n.t("buttonOk")}
                textStyle={{ color: COLORS.header }}
                onPress={() => {
                  getFilteredTasks(startDate, endDate, tasks).then(
                    (filteredTasks) => {
                      setTasks(filteredTasks);
                      taskSelector("isfilteredTasks");
                      setIsFabPressed(!isFabPressed);
                    }
                  );
                }}
              />
            </DialogFooter>
          }
          dialogTitle={
            <DialogTitle
              style={{ backgroundColor: COLORS.header }}
              textStyle={{ color: COLORS.white }}
              title={i18n.t("filter")}
            />
          }
        >
          <DialogContent style={{ flexDirection: "column" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Text
                style={{
                  color: COLORS.header,
                  fontWeight: "bold",
                  paddingRight: 5,
                }}
              >
                {i18n.t("startDate")}
              </Text>
              <Text style={{ color: COLORS.header }}>
                {startDate.toDateString()}
              </Text>
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignContent: "center",
                }}
                onPress={() => {
                  showDatepicker("startDate");
                }}
              >
                <EvilIcons name="calendar" color={COLORS.header} size={40} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Text
                style={{
                  color: COLORS.header,
                  fontWeight: "bold",
                  paddingRight: 5,
                }}
              >
                {i18n.t("endDate")}
              </Text>
              <Text style={{ color: COLORS.header }}>
                {endDate.toDateString()}
              </Text>
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignContent: "center",
                }}
                onPress={() => {
                  showDatepicker("endDate");
                }}
              >
                <EvilIcons name="calendar" color={COLORS.header} size={40} />
              </TouchableOpacity>
            </View>
          </DialogContent>
        </Dialog>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={startDate}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={
              datePickerChangeType === "startDate"
                ? onChangeStartDate
                : onChangeEndDate
            }
          />
        )}
      </SafeAreaView>
    </>
  );
}
const Item = ({ task }: any) => {
  const [isMoreButtonPressed, setIsMoreButtonPressed] = useState(false);
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
          <Text style={{ color: COLORS.white }}>{task.date}</Text>
          <Text style={{ fontSize: 10, color: COLORS.white }}>
            3 {i18n.t("daysRemain")}
          </Text>
        </View>
        <View>
          <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
            {task.title}
          </Text>
        </View>
        <TouchableOpacity
          style={{ height: 30, width: 30 }}
          onPress={() => {
            setIsMoreButtonPressed(!isMoreButtonPressed);
          }}
        >
          <MaterialIcons name="more-vert" size={24} color={COLORS.active} />
        </TouchableOpacity>
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
            height: height / 5,
            paddingHorizontal: 20,
          }}
        >
          <Text>{task.desc}</Text>
        </View>
      </View>
      {/** Dialog pop up is more button pressed */}
      <Dialog
        visible={isMoreButtonPressed}
        dialogTitle={
          <DialogTitle
            style={{ backgroundColor: COLORS.header }}
            textStyle={{ color: COLORS.white }}
            title={i18n.t("options")}
          />
        }
        footer={
          <DialogFooter
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-around",
              alignContent: "space-around",
              width: width / 2,
              backgroundColor: COLORS.lightGreen,
            }}
          >
            <DialogButton
              text={i18n.t("edit")}
              textStyle={{ color: COLORS.white, fontSize: 15 }}
              style={{
                backgroundColor: COLORS.header,
                borderRadius: 50,
                width: 60,
                height: 60,
                margin: 5,
              }}
              onPress={() => {
                //TODO edit operation will be implemented
                setIsMoreButtonPressed(false);
              }}
            />
            <DialogButton
              text={i18n.t("remove")}
              textStyle={{ color: COLORS.white, fontSize: 15 }}
              style={{
                backgroundColor: COLORS.red,
                borderRadius: 50,
                width: 60,
                height: 60,
                margin: 5,
              }}
              onPress={() => {
                deleteTask(task.id.toString()).then((res) => {
                  if (res) {
                    Alert.alert("Success!", "Task is deleted.");
                  } else {
                    Alert.alert("Error!", "Task could not be deleted.");
                  }
                  setIsMoreButtonPressed(false);
                });
              }}
            />
            <DialogButton
              text={i18n.t("buttonCancel")}
              textStyle={{ color: COLORS.white, fontSize: 15 }}
              style={{
                backgroundColor: COLORS.cancel,
                borderRadius: 50,
                width: 60,
                height: 60,
                margin: 5,
              }}
              onPress={() => {
                setIsMoreButtonPressed(false);
              }}
            />
          </DialogFooter>
        }
      ></Dialog>
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
