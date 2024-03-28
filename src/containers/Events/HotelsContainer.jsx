import { FlatList, StyleSheet, Text, View } from "react-native";
import HotelCard from "../../components/HotelCard";

export default function HotelsContainer({ hotels }) {
  //pega uma lista passada por parâmetro, aplica um map sobre ela, pegando cada um dos elementos
  return (
    <View style={styles.container}>
      {/* {hotels.map((hotel) => {
        //map tem que ter um return
        return <Text>{hotel.name}</Text>;
      })} */}
      <FlatList
        data={hotels}
        renderItem={({ item }) => <HotelCard hotel={item} />}
        keyExtractor={(item) => "hotel_" + item.name} //api do teste saiu sem id
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "blue",
  },
});
