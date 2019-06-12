import React from 'react'
import { View, Text, Button } from 'react-native'
import PropTypes from 'prop-types'
import { isValidInput } from '../../services/helper'
import Cell from './Cell'
import Styles from './styles'
import SnakeBox from './Cell/Snake'
import FoodBox from './Cell/Food'
import SnakeService from '../../services/snake'
import FoodService from '../../services/food'
import GameService from '../../services/game'

class Board extends React.Component {
  generateCols = h => {
    let row = []
    for (let w = 0; w < this.props.size.width; w++) {
      const isSnakeCell =
        this.props.snake.squares.filter(square => {
          return square.x === w && square.y === h
        }).length > 0
      const isHeadSnake =
        this.props.snake.squares[0].x === w &&
        this.props.snake.squares[0].y === h
      const isFoodBox =
        this.props.food.origin.x === w && this.props.food.origin.y === h

      row.push(
        <Cell key={`w-${w}`}>
          {isSnakeCell ? (
            <SnakeBox
              isHead={isHeadSnake}
              direction={this.props.snake.direction}
            />
          ) : isFoodBox ? (
            <FoodBox />
          ) : null}
        </Cell>
      )
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

    return (
      <View style={Styles.container}>
        {!this.props.game.isPlaying ? (
          <View style={Styles.gameOver}>
            <Text style={Styles.gameOverText}>
              {this.props.game.hasWon ? "You've won!" : 'Game Over :('}
            </Text>
            <Button
              style={Styles.gameOverButton}
              title="Play Again"
              onPress={() => this.props.game.reset()}
            />
          </View>
        ) : (
          <React.Fragment>
            <Text>Score: {this.props.game.score}</Text>
            {board}
          </React.Fragment>
        )}
      </View>
    )
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

export default GameService(
  FoodService({
    x: 5,
    y: 5
  })(
    SnakeService({
      x: 0,
      y: 0
    })(Board)
  )
)
