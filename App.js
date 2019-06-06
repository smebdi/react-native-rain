import React from 'react';
import {StyleSheet, View, ImageBackground, StatusBar} from 'react-native';
import Rain from './Rain/Rain'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <ImageBackground
          resizeMode={'stretch'} // or cover
          style={{flex: 1}}
          source={require('./Rain/rain.png')}
        >
          <Rain numDrops={100} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'slategray',
  }
});
