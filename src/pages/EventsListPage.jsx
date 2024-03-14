import { useEffect, useState } from "react";
import {
  Pressable,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import EventCard from "../components/EventCard";
import EventPage from "./EventPage";
import Routes from "../routes";

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

  useEffect(() => {
    fetch(`${url}/${resource}.json`)
      .then((res) => res.json())
      .then((resJson) => {
        const convertedList = converter(resJson);
        setEvents(convertedList);
      });
  }, []);

  function selectEvent(event) {
    // setSelectedEvent(event);
    // navigation
    navigation.navigate(Routes.EventPage, event); //String -> Rota (name)
  }

  const showEvents = () => {
    if (events.length > 0) {
      // return events.map((event, index) => (
      //   <EventCard key={"evento_" + index} item={event} action={selectEvent} />
      // ));
      return (
        <FlatList
          style={styles.container}
          data={events}
          // renderItem={EventCard}
          renderItem={({ item }) => (
            <EventCard item={item} action={selectEvent} />
          )}
          keyExtractor={(item) => item._id}
        />
      );
    } else {
      return <Text>Nenhum evento cadastrado</Text>;
    }
  };

  return (
    <View style={styles.container}>
        {events ? showEvents() : <Text>Carregando dados...</Text>}
        {/* <Text>{events?.length}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerMenu: {
    flexDirection: "row",
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    padding: 6,
    margin: 2,
    flexGrow: 1,
  },
});
