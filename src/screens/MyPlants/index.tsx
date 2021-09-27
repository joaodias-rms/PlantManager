import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList } from "react-native";

import { Header } from "../../components/Header";
import waterImg from "../../assets/waterdrop.png";

import { styles } from "./styles";

import { plantLoad, PlantProps } from "../../libs/storage";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import { PlantCardSecondary } from "../../components/PlantCardSecondary";

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);

  const [nextWatered, setNextWatered] = useState<String>();

  useEffect(() => {
    async function loadStorageDate() {
      const plantStoraged = await plantLoad();

      const nextTime = formatDistance(
        new Date(plantStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

      setNextWatered(
        `Não esqueça de regar a ${plantStoraged[0].name} em ${nextTime}`
      );

      setMyPlants(plantStoraged);
      setLoading(false);
    }

    loadStorageDate();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.spotlight}>
        <Image source={waterImg} style={styles.spotlightImage} />
        <Text style={styles.spotlightText}>{nextWatered}</Text>
      </View>
      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>
        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (<PlantCardSecondary data={item}/>)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  );
}
