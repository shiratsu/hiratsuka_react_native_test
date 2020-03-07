import React from 'react';
import { Text, AppRegistry, View } from 'react-native';

// 追加
import Header from './common/Header';

// 修正
const App = () => (
  <View>
    <Header showText={'Hello'} />
  </View>
);

export default App;