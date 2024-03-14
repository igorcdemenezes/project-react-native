import { Pressable, Text, View } from "react-native";
import Routes from "../routes";

export default function AboutPage({ navigation }) {
   return (
    <View>
        <Text>Nossa empresa</Text>
        <Text>Nossa diretoria</Text>
        <Text>Nossos colaboradores</Text>
        <Text>Contatos</Text>
        <Text>+55 11 99999-9999</Text>
        <Pressable
            onPress={() => {
                navigation.navigate(Routes.EventsListPage);
        }}
        >
            <Text>Eventos</Text>
        </Pressable>
    </View>
   ); 
}