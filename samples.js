import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
} from 'react-native';
import Constants from 'expo-constants';

const DATA = [
    {
      title: 'Main dishes',
      data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
      title: 'Sides',
      data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
      title: 'Drinks',
      data: ['Water', 'Coke', 'Beer'],
    },
    {
      title: 'Desserts',
      data: ['Cheese Cake', 'Ice Cream'],
    },
  ];

  function Item({ title }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
  
  class SampleList extends Component {
    
    // let Item = (title) => {
    //   return (
    //     <View style={styles.item}>
    //       <Text style={styles.title}>{title}</Text>
    //     </View>
    //   );
    // }

    componentWillUnmount(){
      console.log("componentDidMount");
    }

    componentWillMount(){
      console.log("componentWillMount");
    }

    componentDidMount(){
      console.log("componentDidMount");
    }

    componentDidUpdate(prevProps) {

      console.log("componentDidUpdate");
    }
    
    componentWillUpdate(prevProps) {

      console.log("componentWillUpdate");
    }

    componentWillUnmount() {

      console.log("componentWillUnmount");
    }

    // static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    //   const name = nextProps.name.toUpperCase();
    //   if (prevState.name !== name) {
    //     return { isDerivered: true, name };
    //   }
    //   return;
    // }
   
    render() {
      return (
        <SafeAreaView style={styles.container}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item title={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </SafeAreaView>
      )
    }
  }


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
      marginHorizontal: 16,
    },
    item: {
      backgroundColor: '#33ff33',
      padding: 20,
      marginVertical: 8,
    },
    header: {
      fontSize: 32,
    },
    title: {
      fontSize: 24,
    },
  });

export default SampleList;  
  