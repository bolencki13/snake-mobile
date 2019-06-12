import React from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import Styles from './styles'
import imgSnakeHead from '../../../../assets/snake-head.png'

function SnakeBox(props) {
  return (
    <View style={Styles.container}>
      {props.isHead ? (
        <Image
          style={[Styles.image, Styles[props.direction]]}
          source={imgSnakeHead}
        />
      ) : null}
    </View>
  )
}

SnakeBox.propTypes = {
  isHead: PropTypes.bool,
  direction: PropTypes.oneOf(['right', 'left', 'up', 'down']).isRequired
}

export default SnakeBox
