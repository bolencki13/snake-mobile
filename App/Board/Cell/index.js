import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import Styles from './styles'

function Cell(props) {
  return <View style={Styles.container}>{props.children}</View>
}

Cell.propTypes = {
  children: PropTypes.any,
  isInFirstRow: PropTypes.bool
}

export default Cell
