import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DetailsContainer from "./DetailsContainer";
import GalleryContainer from "./GalleryContainer";
import HotelsContainer from "./HotelsContainer";

const Tabs = createBottomTabNavigator();

export default function ShowContainer(props) {
  const { params } = props.route;

  // const { name, description, images } = event;
  // const { name, description, images, hotels } = params;
  const { id } = params;

  const [event, setEvent] = useState(null);

  const [image, setImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    // setIsLoading(true);
    const url = "https://aula-reactnative-22-02-default-rtdb.firebaseio.com";
    const resource = "events";
    fetch(`${url}/${resource}/${id}.json`)
      .then((res) => res.json())
      .then((event) => {
        setEvent({
          _id: id,
          ...event,
        });
      })
      .catch((error) => setMsg(error.message))
      .finally(setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading && <ActivityIndicator />}
      {event && (
        <Tabs.Navigator>
          <Tabs.Screen name="details">
            {() => <DetailsContainer event={event} />}
          </Tabs.Screen>
          <Tabs.Screen name="gallery">
            {() => <GalleryContainer images={event.images} />}
          </Tabs.Screen>
          <Tabs.Screen name="hotels">
            {() => <HotelsContainer hotels={event.hotels} />}
          </Tabs.Screen>
        </Tabs.Navigator>
      )}
    </>
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
