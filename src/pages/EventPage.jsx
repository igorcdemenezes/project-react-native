import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState } from "react";

export default function EventPage(props) {
  const { params } = props.route;

  // const { name, description, images } = event;
  const { name, description, images } = params;

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
    <View style={styles.container}>
      <Text>{image}</Text>
      <Text>{msg}</Text>
      <Image style={styles.image} source={{ uri: images[image] }} />
      <View style={styles.imageController}>
        {btnImageController("Anterior", voltarImage)}
        {btnImageController("Próxima", avancarImage)}
        {/* <Pressable>
          <Text onPress={() => voltarImage()}>Anterior</Text>
        </Pressable>
        <Pressable onPress={() => avancarImage()}>
          <Text>Próxima</Text>
        </Pressable> */}
      </View>
      <Text>{name}</Text>
      <ScrollView>
        <Text>{description}</Text>
      </ScrollView>
    </View>
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
