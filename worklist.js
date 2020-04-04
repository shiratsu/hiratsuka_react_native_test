import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';


  function Item({ workitem }) {
    console.log(workitem);
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{workitem.CatchCopy}</Text>
        <Text style={styles.itemTitle}>給与情報</Text>
        <Text style={styles.itemTitle}>職種</Text>
        <Text style={styles.itemTitle}>駅</Text>
        <Text style={styles.itemTitle}>時間</Text>
      </View>
    );
  }
  
  class WorkList extends Component {
    
    currentOffset = 0;

    state = {
      worklists: null,
      listMeta: null,
      loading: false,
      isRefreshing: false
    }

    componentDidMount() {
       
      this.fetchWorkList();
    }
   

    render() {
      if (this.state.loading && this.page === 1) {
        return <View style={{
          width: '100%',
          height: '100%'
        }}><ActivityIndicator style={{ color: '#000' }} /></View>;
      }
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={this.state.worklists}
            renderItem={({ item }) => <Item workitem={item} />}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
            keyExtractor={item => item.WorkId}
            ListFooterComponent={this.renderFooter.bind(this)}
            onEndReachedThreshold={0.4}
            onEndReached={this.handleLoadMore.bind(this)}
          />
        </SafeAreaView>
      )
    }

    renderFooter = () => {
      //it will show indicator at the bottom of the list when data is loading otherwise it returns null
       if (!this.state.loading) return null;
       return (
         <ActivityIndicator
           style={{ color: '#000' }}
         />
       );
    };

     handleLoadMore = () => {
      if (!this.state.loading) {
        this.setState({ loading: true });
        this.currentOffset = this.currentOffset + 20; // increase page by 1
        this.fetchWorkList(); // method for API call 
      }
    };

    onRefresh() {
      this.currentOffset = 1
      this.setState({ isRefreshing: true }); // true isRefreshing flag for enable pull to refresh indicator
      this.fetchWorkList()
    }

    constructor(props) {
      super(props);
      this.state = {date: new Date()};
      console.log("constructor");
    }

    fetchWorkList(){
      var param = {'a':'01','pr':'13','start':this.currentOffset,'limit':'20'}
  
      axios
      .get('https://api-front.shotworks.jp/api-front/app/worklist', { params: param　})
      .then((results) => {
          // 通信に成功してレスポンスが返ってきた時に実行したい処理
          this.setState({ worklists: results.data.Result, listMeta: results.data.ResultSet, isRefreshing: false, loading: false });
      })
      .catch((error) => { 
          // 通信に失敗してレスポンスが返ってこなかった時に実行したい処理
          console.log('処理に失敗しました');
          this.setState({ worklists: null, listMeta: null, isRefreshing: false, isloading: false });
      });     
    
    }

    
  }


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
      marginHorizontal: 10,
    },
    item: {
      backgroundColor: '#ffffff',
      padding: 20,
      marginVertical: 8,
    },
    header: {
      fontSize: 28,
    },
    title: {
      fontSize: 13,
    },
    title: {
      fontSize: 13,
    },
    itemTitle: {
      fontSize: 10,
      color: '#444444'
    },
  });

export default WorkList;  
  