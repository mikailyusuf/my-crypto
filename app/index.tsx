import React, { View, Text, SafeAreaView } from "react-native";

import { Redirect } from "expo-router";

const Index = () => {
  return <Redirect href={"/(home)"} />;
};

export default Index;
