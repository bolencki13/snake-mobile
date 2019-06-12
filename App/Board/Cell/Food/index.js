import React from 'react'
import { View, Image } from 'react-native'
import Styles from './styles'
import imgRabbit from '../../../../assets/rabbit.png'

function FoodBox(props) {
  return (
    <View style={Styles.container}>
      <Image style={Styles.image} source={imgRabbit} />
    </View>
  )
}

export default FoodBox
