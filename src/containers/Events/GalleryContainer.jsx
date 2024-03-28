import { Image, ScrollView, StyleSheet, View, Text } from "react-native";

export default function GalleryContainer({ images }) {
  return (
    <ScrollView style={styles.container}>
      {images.map((uri, index) => {
        return (
          <Image
            key={"gallery" + index}
            style={styles.image}
            source={{ uri }}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "blue",
  },
  image: {
    height: 200,
    marginVertical: 2,
    marginHorizontal: 4,
  },
});
