import React from "react";
import {
  View,
  Text,
  Alert,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import waterImg from "../../assets/waterdrop.png";
import { SvgFromUri } from "react-native-svg";

import { Button } from "../../components/Button";

import { styles } from "./styles";

export function PlantSave() {
  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri uri="{}" height={150} width={150} />
        <Text style={styles.plantName}>Nome da planta</Text>
        <Text style={styles.plantAbout}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
          Libero in saepe maiores, repellendus quod molestiae dicta voluptas.
        </Text>
      </View>
      <View style={styles.controllers}>
        <View style={styles.tipContainer}>
          <Image source={waterImg} style={styles.tipImage} />
          <Text style={styles.tipText}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </Text>
        </View>
        <Text style={styles.alertLabel}>
          Escolha o melhor horário para ser lembrado
        </Text>

        <Button title="Cadastrar planta" onPress={() => {}} />
      </View>
    </View>
  );
}
