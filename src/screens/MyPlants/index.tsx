import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, Alert } from "react-native";

import { Header } from "../../components/Header";
import { PlantCardSecondary } from "../../components/PlantCardSecondary";
import { Load } from "../../components/Load";
import waterImg from "../../assets/waterdrop.png";

import { styles } from "./styles";

import {
  plantLoad,
  PlantProps,
  plantRemove,
} from "../../libs/storage";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);

  const [nextWatered, setNextWatered] = useState<String>();

  const handleRemove = (plant: PlantProps) => {
    Alert.alert("Remover", `Deseja remover a ${plant.name}?`, [
      {
        text: "Não",
        style: "cancel",
      },

      {
        text: "sim",
        onPress: async () => {
          try {
            await plantRemove(plant.id);

            setMyPlants((oldData) =>
              oldData.filter((item) => item.id != plant.id)
            );
          } catch {
            Alert.alert("Não foi possível remover!");
          }
        },
      },
    ]);
  };

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

  if (loading) return <Load />;

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
          renderItem={({ item }) => (
            <PlantCardSecondary
              handleRemove={() => {
                handleRemove(item);
              }}
              data={item}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  );
}
