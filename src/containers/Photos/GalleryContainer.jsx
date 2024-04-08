import { Text, View, Image } from "react-native";
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
    <View>
      <Text>{photos.length}</Text>
      {photos.map((uri) => (
        <Image style={{ width: 50, height: 50 }} source={{ uri }} />
      ))}
    </View>
  );
}
