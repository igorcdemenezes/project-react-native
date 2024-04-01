import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import EventsPage from './src/pages/EventsPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import EventPage from './src/pages/EventPage';
import AboutPage from './src/pages/AboutPage';
import Routes from './src/routes';
import EventInsertPage from './src/pages/EventInsertPage';
import PhotosPage from './src/pages/PhotosPage';

// NavigationContainer
// Navigator / NativeStackNavigator
// Screens: EventsPage, EventPage

// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
// const Tabs = createBottomTabNavigator();



export default function App() {

  const screensProps = [
    { name: Routes.Home, component: AboutPage, options: { title: "Sobre o App" } },
    { name: Routes.EventsPage, component: EventsPage, options: { title: "Eventos" } },
    { name: Routes.EventInsertPage, component: EventInsertPage, options: { title: "Novo evento" } },
    { name: Routes.PhotosPage, component: PhotosPage, options: { title: "Galeria" } },
  ];

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {screensProps.map(
          (props, index) =>
            <Drawer.Screen key={"drawer_screen_" + index} {...props} />
        )
        }
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
