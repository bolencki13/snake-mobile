import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import Styles from './styles'

function SnakeBox(props) {
  return <View style={Styles.container} />
}

SnakeBox.propTypes = {
  isHead: PropTypes.bool,
  direction: PropTypes.oneOf(['right', 'left', 'up', 'down']).isRequired
}

export default SnakeBox
