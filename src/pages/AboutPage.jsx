import {
  Text,
  Pressable,
  ScrollView,
  Image,
  View,
  StyleSheet,
} from "react-native";
import Routes from "../routes";

export default function AboutPage({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          style={styles.image}
          source={{
            uri: "https://images.pexels.com/photos/7551737/pexels-photo-7551737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          }}
        />
        <View style={styles.aboutContainer}>
          <Text style={styles.title}>Nossa Empresa</Text>
          <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            scelerisque nisl nec justo ultricies aliquam.
          </Text>
          <Text style={styles.title}>Nossa Diretoria</Text>
          <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            scelerisque nisl nec justo ultricies aliquam.
          </Text>
          <Text style={styles.title}>Nossos Colaboradores</Text>
          <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            scelerisque nisl nec justo ultricies aliquam.
          </Text>
          <Text style={styles.title}>Contatos</Text>
          <Text style={styles.paragraph}>+55 21 99999-9999</Text>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate(Routes.EventsPage);
            }}
          >
            <Text style={styles.buttonText}>Eventos disponíveis</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "auto",
    height: 200,
  },
  aboutContainer: {
    padding: 15,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    textAlign: "justify",
    fontSize: 15,
    marginBottom: 20,
    color: "#494949",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
