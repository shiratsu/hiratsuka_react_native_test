import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export default class AppNav extends React.Component {
  render() {
    // switch between Stack and Switch navigator
    //return <MySwitchNavigator />;
    return <NavigationContainer><MyStackNavigator /></NavigationContainer>;
  }
}

class MyTabBar extends React.Component{
  render(){
    return <View style={{ flexDirection: 'row' }}>
      {this.props.state.routes.map((route, index) => {
        const { options } = this.props.descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = this.props.state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  }
}

class ScreenOne extends React.Component {
  // use in Stack navigator only
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Screen One</Text>
        <Button title="Go to two"
          onPress={() => this.props.navigation.navigate('routeTwo')}
        />
      </View>
    );
  }
}

class ScreenTwo extends React.Component {
  // use in Stack navigator only
  static navigationOptions = {
    title: 'Screen Two',
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Screen Two</Text>
        <Button
          title="Go to three"
          onPress={() =>
            this.props.navigation.navigate('routeThree', {
              greeting: 'Hallo',
            })
          }
        />
      </View>
    );
  }
}

class ScreenThree extends React.Component {
  render() {
    let greeting = this.props.navigation.getParam('greeting', 'Hi');

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Screen Three</Text>
        <Button
          title={`${greeting}! Go to one`}
          onPress={() => this.props.navigation.navigate('routeOne')}
        />
      </View>
    );
  }
}

// Notice the head and back link on top of the screen
const MyStackNavigator = createStackNavigator(
  {
    routeOne: ScreenOne,
    routeTwo: ScreenTwo,
    routeThree: ScreenThree,
  },
  {
    initialRouteName: 'routeOne',
  }
);

const MySwitchNavigator = createSwitchNavigator(
  {
  routeOne: ScreenOne,
  routeTwo: ScreenTwo,
  routeThree: ScreenThree,
  },
  {
    initialRouteName: 'routeTwo',
  }
);