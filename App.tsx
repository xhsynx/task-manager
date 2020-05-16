import React from "react";
import { StatusBar } from "react-native";
import Navigation from "./src/navigations/Navigation";
import { COLORS } from "./src/constants/Colors";

export default function App() {
  StatusBar.setBackgroundColor(COLORS.header);
  StatusBar.setBarStyle("light-content");
  return <Navigation />;
}
