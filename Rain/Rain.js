import React from 'react';
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';

const { height, width } = Dimensions.get('window');

export default class Rain extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
          drops: [],
          animation: new Animated.Value(0)
      }
  }

  _animatedValue = this._setAnimatedValue();
  _setAnimatedValue() {
    return new Animated.Value(0);
  }

  animate = () => {
    const { fallSpeed = 18000 } = this.props;
    this._animatedValue.setValue(0)

    Animated.loop(Animated.timing(this._animatedValue , {
        toValue: 1,
        duration: fallSpeed,
        easing: Easing.linear,
        useNativeDriver: true
    })).start();
  };

  startRain() {
      this.animate()
  }

  componentDidUpdate(prevProps) {
    if(this.props.numDrops !== prevProps.numDrops) {
      this.stopRain();
      this.startRain()
    }
  }

  stopRain() {
    this.setState({
        drops: [],
        animation: new Animated.Value(0)
    })
  }

  randRange(minNum, maxNum) {
    return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
  }

  componentDidMount() {
    this.startRain();
  }

  render() {
    let dropsArray = [] 
    for(let i = 1; i < this.props.numDrops; i++) {
        dropsArray.push(
            <Animated.View 
                key={i}
                style={{
                    backgroundColor: 'rgba(255,255,255,.8)',
                    width: StyleSheet.hairlineWidth * 2,
                    height: this.randRange(45, 90),
                    position: "absolute",
                    left: this.randRange(0, width),
                    top: this.randRange(-height * 18, height),
                    transform: [{
                        translateY: this._animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, height * 18]
                        }),
                    },
                    {perspective: 1000}
                ],
                }}
            />
        )        
    }
    return (this.props.numDrops) ? (
      <View >
          <React.Fragment>
            {dropsArray}
          </React.Fragment>
      </View>
    ) : null
  }
}

Rain.propTypes = {
  numDrops: PropTypes.number.isRequired
};