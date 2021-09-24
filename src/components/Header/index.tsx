import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import avatarImg from "../../assets/joao.png";
import { styles } from "./styles";

export function Header() {
  const [userName, setUsername] = useState<string>();

  useEffect(() => {
    async function loadStorageUsername() {
      const user = await AsyncStorage.getItem("@plantmanager:user");
      setUsername(user || "");
    }
    loadStorageUsername();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.username}>{userName}</Text>
      </View>
      <Image style={styles.image} source={avatarImg} />
    </View>
  );
}
