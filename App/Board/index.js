import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { isValidInput } from '../../services/helper'
import Styles from './styles'

class Board extends React.Component {
  generateCols = h => {
    let row = []
    for (let w = 0; w < this.props.size.width; w++) {
      // const isSnakeCell =
      //   this.props.snake.squares.filter(square => {
      //     return square.x === w && square.y === h
      //   }).length > 0
      // const isHeadSnake =
      //   this.props.snake.squares[0].x === w &&
      //   this.props.snake.squares[0].y === h
      // const isFoodBox =
      //   this.props.food.origin.x === w && this.props.food.origin.y === h

      row.push(<View key={`w-${w}`} style={Styles.cell}></View>)
    }

    return row
  }

  render() {
    let board = []
    for (let h = 0; h < this.props.size.height; h++) {
      board.push(
        <View key={`h-${h}`} style={Styles.boardRow}>
          {this.generateCols(h)}
        </View>
      )
    }

    return <View style={Styles.container}>{board}</View>
  }
}

Board.propTypes = {
  size: PropTypes.shape({
    width: function(props, propName) {
      return isValidInput(props[propName], 'size.width')
    },
    height: function(props, propName) {
      return isValidInput(props[propName], 'size.height')
    }
  }).isRequired,
  snake: PropTypes.shape({
    squares: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      })
    ).isRequired,
    direction: PropTypes.oneOf(['right', 'left', 'up', 'down'])
  }).isRequired,
  food: PropTypes.shape({
    origin: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  game: PropTypes.shape({
    isPlaying: PropTypes.bool,
    score: PropTypes.number.isRequired,
    reset: PropTypes.func.isRequired,
    hasWon: PropTypes.bool
  }).isRequired
}

export default Board
