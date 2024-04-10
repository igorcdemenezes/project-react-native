import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, TextInput, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Routes from "../routes";
import ListContainer from "../containers/Events/ListContainer";

const Stack = createNativeStackNavigator();

function converter(data) {
  const ids = Object.keys(data);
  const events = Object.values(data);
  const eventsList = events.map((event, index) => {
    return {
      _id: ids[index],
      ...event,
    };
  });
  return eventsList;
}

export default function EventsPage(props) {
  const { navigation } = props;
  const url = "https://aula-reactnative-22-02-default-rtdb.firebaseio.com";
  const resource = "events";
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`${url}/${resource}.json`)
      .then((res) => res.json())
      .then((eventsJson) => {
        const events = converter(eventsJson);
        setEvents(events);
      })
      .finally((_) => setIsLoading(false));
  }, []);

  function selectEvent(event) {
    navigation.navigate(Routes.EventsShowPage, { id: event._id });
  }

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <ActivityIndicator />;
  } else {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Procure um evento..."
          onChangeText={setSearchTerm}
          value={searchTerm}
        />
        <ListContainer events={filteredEvents} action={selectEvent} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
