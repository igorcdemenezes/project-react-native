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
    <View>
      <View>
        <Image
          style={styles.image}
          source={{
            uri: "https://images.pexels.com/photos/7551737/pexels-photo-7551737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          }}
        />
      </View>
      <ScrollView>
        <Text>Nossa Empresa</Text>
        <Text>Nossa Diretoria</Text>
        <Text>Nossos Colaboradores</Text>
        <Text>Contatos</Text>
        <Text>+55 21 99999-9999</Text>
        <Pressable
          onPress={() => {
            navigation.navigate(Routes.EventsPage);
          }}
        >
          <Text>Eventos</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "auto",
    height: 200,
  },
});
