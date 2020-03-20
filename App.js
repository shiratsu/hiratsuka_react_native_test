import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import SampleList from './samples';

const Stack = createStackNavigator();

function HomeNavScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Hiratsuka Test" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

function HomeScreen({ navigation }){
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
    </View>
  );
}

function SamplesScreen() {
  return (
    <SampleList />
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeNavScreen} />
      <Tab.Screen name="Samples" component={SamplesScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  // console.log(`[INFO] this.state.activeTab: ${this.state.activeTab}`);
  console.log("test");
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
