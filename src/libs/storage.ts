import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

export type PlantProps = {
  plant: {
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
    DateTimeNotification: Date;
  };
};

type StoragePlantProps = {
  [id: string]: {
    data: PlantProps;
  };
};

export async function plantSave(plant: PlantProps): Promise<void> {
  try {
    const data = await AsyncStorage.getItem("@plantmanager:plants");
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const newPlant = {
      [plant.id]: {
        data: plant,
      },
    };
    await AsyncStorage.setItem(
      "@plantmanager:plants",
      JSON.stringify({
        ...newPlant,
        ...oldPlants,
      })
    );
  } catch (erro) {
    throw new Error(erro);
  }
}
