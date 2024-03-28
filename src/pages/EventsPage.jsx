import { useEffect, useState } from "react";
import {
  Pressable,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import EventCard from "../components/EventCard";
import EventPage from "./EventPage";
import Routes from "../routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShowContainer from "../containers/Events/ShowContainer";
import ListContainer from "../containers/Events/ListContainer";

const Stack = createNativeStackNavigator();

// https://aula-reactnative-22-02-default-rtdb.firebaseio.com/
function converter(data) {
  // funcao somente porque está sendo usado o firebase, recurso para simular uma API
  // {idA: {eventA}, idB: {eventA}}
  const ids = Object.keys(data); //resposta será [ idA, idB, ...]
  const events = Object.values(data); // resposta sera um array com os objetos [{eventA}, {eventB}]
  const eventsList = events.map((event, index) => {
    return {
      _id: ids[index],
      ...event,
    };
  });
  return eventsList;
}

export default function EventsPage(props) {
  // const navigation = props.navigation;
  const { navigation } = props; //o EventsPage so recebe a propriedade navigation no props porque ela foi instacianda por uma Screen

  const url = "https://aula-reactnative-22-02-default-rtdb.firebaseio.com";
  const resource = "events";
  const [events, setEvents] = useState(null);
  // const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${url}/${resource}.json`)
      .then((res) => res.json())
      .then((resJson) => {
        const convertedList = converter(resJson);
        setEvents(convertedList);
      })
      .finally((_) => setIsLoading(false));
  }, []);

  function selectEvent(event) {
    // setSelectedEvent(event);
    // navigation
    navigation.navigate(Routes.EventsShowPage, event); //String -> Rota (name)
  }

  // function renderItem({ item }) {
  //   return <EventCard item={item} action={selectEvent} />;
  // }

  // const showEvents = () => {
  //   if (!events) {
  //     return <Text>Carregando dados...</Text>;
  //   } else if (events.length > 0) {
  //     // return events.map((event, index) => (
  //     //   <EventCard key={"evento_" + index} item={event} action={selectEvent} />
  //     // ));
  //     return (
  //       <FlatList
  //         style={styles.container}
  //         data={events}
  //         // renderItem={EventCard}
  //         renderItem={renderItem}
  //         keyExtractor={(item) => item._id}
  //       />
  //     );
  //   } else {
  //     return <Text>Nenhum evento cadastrado</Text>;
  //   }
  // };

  function StackContainer() {
    return (
      <Stack.Navigator initialRouteName={Routes.EventsListPage}>
        <Stack.Screen name={Routes.EventsListPage}>
          {() => <ListContainer events={events} action={selectEvent} />}
        </Stack.Screen>
        <Stack.Screen name={Routes.EventsShowPage} component={ShowContainer} />
      </Stack.Navigator>
    );
  }

  if (isLoading) {
    return <ActivityIndicator />;
  } else {
    return <StackContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
