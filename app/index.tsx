import React, { View, Text, SafeAreaView } from "react-native";

import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { PortfolioScreen } from "./(home)/portfolio";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/portfolio");
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);
  return (
    <SafeAreaView>
      <Text>Crypto App</Text>
    </SafeAreaView>
  );
};

export default Index;
