import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import EventsListPage from './src/pages/EventsListPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import EventPage from './src/pages/EventPage';
import AboutPage from './src/pages/AboutPage';
import Routes from './src/routes';

// NavigationContainer
// Navigator / NativeStackNavigator
// Screens: EventsPage, EventPage

// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
// const Tabs = createBottomTabNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {/* registrar a rota home que ira navegar para a pagina, que é um componente, EventsPage */}
        <Drawer.Screen name={Routes.Home} component={AboutPage}/>
        <Drawer.Screen name={Routes.EventsListPage} component={EventsListPage}/>
        {/* <Drawer.Screen name={Routes.EventPage} component={EventPage}/> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // alignItems: 'stretch',
    justifyContent: 'center',
    padding: 20,
  },
});
