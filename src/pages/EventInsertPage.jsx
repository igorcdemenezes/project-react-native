import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function EventInsertPage() {
  const url = "https://aula-reactnative-22-02-default-rtdb.firebaseio.com";
  const resource = "events";

  const [name, setName] = useState(""); //eventos reais do aplicativo
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [dateDay, setDateDay] = useState("1");
  const [dateMonth, setDateMonth] = useState("1");
  const [dateYear, setDateYear] = useState("2024");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState(null);
  const [secureOn, setSecureOn] = useState(true);

  const dias = [];
  const meses = [];
  const anos = [];

  for (let i = 1; i <= 31; i++) {
    dias.push({ value: i, label: i });
  }

  for (let i = 1; i <= 12; i++) {
    meses.push({ value: i, label: i });
  }

  for (let i = 2000; i <= 3000; i++) {
    anos.push({ value: i, label: i });
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Nome"
        // returnKeyType="send"
        // keyboardType="email-address"
        // inputMode="email"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder="Descrição"
        // returnKeyType="send"
        // keyboardType="email-address"
        // inputMode="email"
      />
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={(text) => setLocation(text)}
        placeholder="Localização"
        // returnKeyType="send"
        // keyboardType="email-address"
        // inputMode="email"
      />

      <View style={styles.dateInputContainer}>
        <Text>Dia:</Text>
        <Picker
          style={{ width: 100 }}
          selectedValue={dateDay}
          onValueChange={setDateDay}
        >
          {dias.map((dia, index) => (
            <Picker.Item key={"picker_item_day" + index} {...dia} />
          ))}
        </Picker>
        <Text>Mês:</Text>

        <Picker
          style={{ width: 100 }}
          selectedValue={dateMonth}
          onValueChange={setDateMonth}
        >
          {meses.map((dia, index) => (
            <Picker.Item key={"picker_item_day" + index} {...dia} />
          ))}
        </Picker>
        <Text>Ano:</Text>
        <Picker
          style={{ flex: 1 }}
          selectedValue={dateYear}
          onValueChange={setDateYear}
        >
          {anos.map((dia, index) => (
            <Picker.Item key={"picker_item_day" + index} {...dia} />
          ))}
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        value={price}
        onChangeText={(text) => setPrice(text)}
        placeholder="Preço"
        keyboardType="decimal-pad"
      />

      <Pressable
        style={styles.btn}
        onPress={() => {
          const newEvent = {
            name: name,
            description: description,
            location: location,
            date: new Date(dateYear, dateMonth, dateDay),
            price: Number.parseFloat(price),
          };
          fetch(`${url}/${resource}.json`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newEvent),
          })
            .then((res) => res.json())
            .then((json) => setMsg(json.name))
            .catch((error) => setMsg(error.message));
        }}
      >
        <Text style={styles.btnLabel}>Salvar</Text>
      </Pressable>
      {msg && <Text>{msg}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  input: {
    marginHorizontal: 10,
    marginVertical: 2,
    backgroundColor: "#e9edc9",
    height: 40,
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateInputPicker: {
    flex: 1,
  },
  btn: {
    backgroundColor: "#8ac926",
    margin: 10,
    padding: 10,
  },
  btnLabel: {
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
  },
});
