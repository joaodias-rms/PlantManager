import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/native";
import { plantLoad, PlantProps, plantSave } from "../../libs/storage";

import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { format, isBefore } from "date-fns";

import waterImg from "../../assets/waterdrop.png";
import { SvgFromUri } from "react-native-svg";

import { Button } from "../../components/Button";

import { styles } from "./styles";

type Params = {
  plant: PlantProps;
};

export function PlantSave() {
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios");

  const route = useRoute();
  const navigation = useNavigation();
  const { plant } = route.params as Params;

  const handleChangeTime = (event: Event, dateTime: Date | undefined) => {
    if (Platform.OS === "android") {
      setShowDatePicker((oldState) => !oldState);
    }
    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedTime(new Date());
      return Alert.alert("Escolha uma hora futura");
    }
    if (dateTime) setSelectedTime(dateTime);
  };

  const handleOpenDateTimePickerAndroid = () => {
    setShowDatePicker((oldState) => !oldState);
  };

  const handleSave = async () => {
    // const data =  await plantLoad()
    //  return console.log(data);

    try {
      await plantSave({
        ...plant,
        dateTimeNotification: selectedTime,
      });

      navigation.navigate("Confirmation", {
        title: "Tudo certo",
        subTitle:
          "Fique tranquilo que sempre vamos lembar você de cuidar da sua plantinha com muito cuidado",
        buttonTitle: "Muito obrigado",
        icon: "hug",
        nextScreen: "MyPlants",
      });
    } catch {
      Alert.alert("Não foi possível salvar");
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri uri={plant.photo} height={150} width={150} />
          <Text style={styles.plantName}>{plant.name}</Text>
          <Text style={styles.plantAbout}>{plant.about}</Text>
        </View>
        <View style={styles.controller}>
          <View style={styles.tipContainer}>
            <Image source={waterImg} style={styles.tipImage} />
            <Text style={styles.tipText}>{plant.water_tips}</Text>
          </View>
          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado
          </Text>

          {showDatePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              display="spinner"
              onChange={handleChangeTime}
            />
          )}

          {Platform.OS === "android" && (
            <TouchableOpacity
              style={styles.dateTimePickerButton}
              onPress={handleOpenDateTimePickerAndroid}
            >
              <Text style={styles.dateTimePickerText}>{`Mudar ${format(
                selectedTime,
                "HH:mm"
              )}`}</Text>
            </TouchableOpacity>
          )}

          <Button title="Cadastrar planta" onPress={handleSave} />
        </View>
      </View>
    </ScrollView>
  );
}
