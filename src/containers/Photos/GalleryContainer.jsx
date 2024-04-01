import { Text, View } from "react-native";
import app from "../../Firebase";
import { getStorage, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react";

export default function GalleryContainer() {
  const [photos, setPhotos] = useState([]);

  async function getPhotos() {
    try {
      const firebaseStorage = getStorage(app); //instancia do firebase storage
      const photosRef = ref(firebaseStorage); //referencia sem nome do arquivo, porque quero pegar todas
      const list = await listAll(photosRef); //funcao listAll passando as referencias das fotos
      console.dir(list);
      setPhotos(list.items);
    } catch (error) {
      //...
    }
  }

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <View>
      <Text key={"photos_length"}>{photos.length}</Text>
      {/* <Text>Galeria</Text> */}
    </View>
  );
}
