import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DetailsContainer from "./DetailsContainer";
import GalleryContainer from "./GalleryContainer";
import HotelsContainer from "./HotelsContainer";

const Tabs = createBottomTabNavigator();

export default function ShowContainer(props) {
  const { params } = props.route;

  // const { name, description, images } = event;
  const { name, description, images, hotels } = params;

  const [image, setImage] = useState(0);
  const [msg, setMsg] = useState(null);

  const voltarImage = () => {
    setMsg("Voltar");
    if (image > 0) setImage(image - 1);
  };

  const avancarImage = () => {
    setMsg("Avançar");
    if (image < image.length - 1) setImage(image + 1);
  };

  function btnImageController(label, action) {
    return (
      <Pressable>
        <Text onPress={() => action()}>{label}</Text>
      </Pressable>
    );
  }

  return (
    <Tabs.Navigator>
      <Tabs.Screen name="details">
        {() => <DetailsContainer event={params} />}
      </Tabs.Screen>
      <Tabs.Screen name="gallery">
        {() => <GalleryContainer images={images} />}
      </Tabs.Screen>
      <Tabs.Screen name="hotels">
        {() => <HotelsContainer hotels={hotels} />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  imageController: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
