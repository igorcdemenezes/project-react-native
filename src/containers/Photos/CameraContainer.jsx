import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import app from "../../Firebase";
import { getStorage, ref, uploadString } from "firebase/storage";

export default function CameraContainer() {
  const [hasPermission, setPermission] = useState(false);
  // const [hasPermission, setPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [uri, setUri] = useState(null);
  const [msg, setMsg] = useState(null);

  async function requestCamera() {
    const permission = await Camera.requestCameraPermissionsAsync();
    const { status } = permission;
    if (status == "granted") {
      setPermission(true);
    }
  }

  async function takePicture() {
    if (camera) {
      const photo = await camera.takePictureAsync();
      const { uri } = photo;
      setUri(uri);
    }
  }

  async function savePhoto() {
    try {
      const firebaseStorage = getStorage(app);
      const photoRef = ref(
        firebaseStorage,
        `photo${new Date().getTime()}.jpeg`
      );
      const uploadResult = await uploadString(photoRef, uri, "base64", {
        contentType: "image/jpeg",
        contentEncoding: "base64",
      });
      setUri(null);
    } catch (error) {
      setMsg(error.message);
    }
  }

  useEffect(() => {
    requestCamera();
  }, []);

  return (
    <View style={styles.container}>
      {msg && <Text>{msg}</Text>}
      {hasPermission && !uri && (
        <>
          <Camera
            ref={(ref) => {
              setCamera(ref);
            }}
          />
          <Pressable onPress={() => takePicture()}>
            <Text>Capturar</Text>
          </Pressable>
        </>
      )}
      {uri && (
        <>
          <Image style={styles.photo} source={{ uri }} />
          <Pressable onPress={() => savePhoto()}>
            <Text>Salvar</Text>
          </Pressable>
          <Pressable onPress={() => setUri(null)}>
            <Text>Excluir</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photo: {
    flex: 1,
  },
});
