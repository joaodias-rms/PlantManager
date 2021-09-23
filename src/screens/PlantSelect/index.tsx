import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";

import { EnvironmentButton } from "../../components/EnvironmentButton";
import { PlantCardPrimary } from "../../components/PlantCardPrimary";
import { Header } from "../../components/Header";
import { Load } from "../../components/Load";

import api from "../../services/api";
import { styles } from "./styles";

type EnvironmentProps = {
  key: string;
  title: string;
};

type PlantsProps = {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
};

export function PlantSelect() {
  const [environment, setEnvironment] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantsProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState("all");
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)

  const handleEnvironmentSelected = (environment: string) =>{
    setEnvironmentSelected(environment);

    if(environment == 'all' )
    return setFilteredPlants(plants)

    const filtered = plants.filter(plants =>
           plants.environments.includes(environment)
        )
        setFilteredPlants(filtered) 
  }


  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api.get(
        "plants_environments?_sort=title&order=asc"
      );
      setEnvironment([
        {
          key: "all",
          title: "Todos",
        },
        ...data,
      ]);
    }

    fetchEnvironment();
  }, []);

  useEffect(() => {
    async function fetchPlants() {
      const { data } = await api.get("plants?_sort=name&order=asc");
      setPlants(data);
      setFilteredPlants(data)
      setLoading(false)
    }
    fetchPlants();
  }, []);

  if(loading) 
    return <Load />

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          data={environment}
          renderItem={({ item }) => (
            <EnvironmentButton
              title={item.title}
              active={item.key === environmentSelected}
              onPress={()=>{handleEnvironmentSelected(item.key)}}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          renderItem={({ item }) => <PlantCardPrimary data={item} />}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      </View>
    </View>
  );
}
