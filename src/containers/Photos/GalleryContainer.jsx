import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import app from "../../Firebase";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function GalleryContainer() {
  const [photos, setPhotos] = useState([]);

  async function getPhotos() {
    try {
      const firebaseStorage = getStorage(app); //instancia do firebase storage
      const photosRef = ref(firebaseStorage); //referencia sem nome do arquivo, porque quero pegar todas
      const list = await listAll(photosRef); //funcao listAll passando as referencias das fotos
      const urls = [...photos];
      for (let fileRef of list.items) {
        const photoRef = ref(firebaseStorage, fileRef);
        const url = await getDownloadURL(photoRef);
        if (!urls.includes(url)) {
          urls.push(url);
        }
      }
      setPhotos(urls);
    } catch (error) {
      //...
    }
  }

  useFocusEffect(
    useCallback(() => {
      getPhotos();
    }, [])
  );

  // useEffect(() => {
  //   getPhotos();
  // }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Galeria de Fotos</Text>
      <View style={styles.photosContainer}>
        {photos.map((uri, index) => (
          <Image key={index} style={styles.photo} source={{ uri }} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  photosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  photo: {
    width: 160,
    height: 160,
    margin: 5,
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.8,
    elevation: 5,
  },
});
