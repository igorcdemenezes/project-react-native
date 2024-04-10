import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import app from "../../Firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default function CameraContainer() {
  const [hasPermission, setPermission] = useState(false);
  const [camera, setCamera] = useState(null);
  const [uri, setUri] = useState(null);
  const [msg, setMsg] = useState(null);
  // const [hasPermission, setPermission] = Camera.useCameraPermissions();

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
      const name = `photo${new Date().getTime()}.jpeg`;
      const photoRef = ref(firebaseStorage, name);
      uploadPhoto(photoRef);
    } catch (error) {
      setMsg(error.message);
    }
  }

  async function uploadPhoto(photoRef) {
    const response = await fetch(uri);
    const photo = await response.blob();
    const uploadResult = await uploadBytes(photoRef, photo);
    if (uploadResult) setUri(null);
    else setMsg("Algo deu errado!");
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
          <View style={styles.containerBtn}>
            <Pressable style={styles.btn} onPress={() => takePicture()}>
              <Text style={styles.btnTitle}>Capturar</Text>
            </Pressable>
          </View>
        </>
      )}
      {uri && (
        <>
          <Image style={styles.photo} source={{ uri }} />
          <View style={styles.containerBtn}>
            <Pressable style={styles.btn} onPress={() => savePhoto()}>
              <Text style={styles.btnTitle}>Salvar</Text>
            </Pressable>
            <Pressable style={styles.btn} onPress={() => setUri(null)}>
              <Text style={styles.btnTitle}>Excluir</Text>
            </Pressable>
          </View>
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
  containerBtn: {
    alignContent: "center",
    alignItems: "center",
  },

  btn: {
    backgroundColor: "#0053cf",
    marginVertical: 15,
    padding: 10,
    borderRadius: 4,
    width: 80,
  },
  btnTitle: {
    color: "white",
    textAlign: "center",
  },
});
