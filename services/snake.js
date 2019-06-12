import React from 'react'
import PropTypes from 'prop-types'
import GestureRecognizer from 'react-native-swipe-gestures'
import { isValidInput, kTimeInterval, randomNumberBetween } from './helper'

const HOCSnakeService = origin => Component => {
  let result = isValidInput(origin.x + 1, 'origin.x')
  if (result) throw result
  result = isValidInput(origin.y + 1, 'origin.y')
  if (result) throw result

  const INITIAL_STATE = {
    squares: [origin],
    direction: 'right'
  }

  class SnakeService extends React.Component {
    state = INITIAL_STATE

    componentDidMount() {
      this.resetGame()
    }

    componentWillUnmount() {
      return this.gameOver()
    }

    componentDidUpdate(previousProps, previousState) {
      const head = this.state.squares[0]
      const food = this.props.food.origin

      if (food.x === head.x && food.y === head.y) {
        this.setState(state => {
          const tail = { ...state.squares[state.squares.length - 1] }
          return {
            squares: state.squares.concat(tail)
          }
        })
        this.generateNewFoodPosition()
      }
    }

    generateNewFoodPosition = () => {
      const newFood = {
        x: randomNumberBetween(0, this.props.size.width),
        y: randomNumberBetween(0, this.props.size.height)
      }

      const isUnderSnake =
        this.state.squares.filter(square => {
          return square.x === newFood.x && square.y === newFood.y
        }).length > 0
      const hasEmptySquares =
        this.props.size.width * this.props.size.height >
        this.state.squares.length
      if (isUnderSnake && hasEmptySquares) {
        return this.generateNewFoodPosition()
      } else {
        this.props.food.setOrigin(newFood)
      }
    }

    gameOver = async () => {
      await this.props.game.setPlaying(false)
      clearInterval(this.intervalId)
    }

    timer = async () => {
      if (!this.props.game.isPlaying) return

      const squares = [...this.state.squares]
      const head = { ...squares[0] }

      for (let i = squares.length - 1; i > 0; i--) {
        squares[i] = { ...squares[i - 1] }
      }

      switch (this.state.direction) {
        case 'up':
          if (head.y > 0) {
            head.y = head.y - 1
          } else {
            await this.gameOver()
            return
          }
          break
        case 'down':
          if (head.y < this.props.size.height - 1) {
            head.y = head.y + 1
          } else {
            await this.gameOver()
            return
          }
          break
        case 'right':
          if (head.x < this.props.size.width - 1) {
            head.x = head.x + 1
          } else {
            await this.gameOver()
            return
          }
          break
        case 'left':
        default:
          if (head.x > 0) {
            head.x = head.x - 1
          } else {
            await this.gameOver()
            return
          }
      }

      const isTouchingSelf =
        squares.filter(square => {
          return square.x === head.x && square.y === head.y
        }).length > 0
      const hasEmptySquares =
        this.props.size.width * this.props.size.height > squares.length

      if (!hasEmptySquares) {
        this.props.game.setWon(true)
        return
      } else if (isTouchingSelf && hasEmptySquares) {
        await this.gameOver()
        return
      }
      squares[0] = head

      this.setState({
        squares
      })
    }

    resetGame = async () => {
      await this.setState(INITIAL_STATE)

      const intervalId = setInterval(this.timer, kTimeInterval)
      this.intervalId = intervalId
      this.props.game.setPlaying(true)
    }

    render() {
      return (
        <GestureRecognizer
          onSwipeUp={state => {
            if (this.state.direction !== 'down') {
              this.setState({ direction: 'up' })
            }
          }}
          onSwipeDown={state => {
            if (this.state.direction !== 'up') {
              this.setState({ direction: 'down' })
            }
          }}
          onSwipeLeft={state => {
            if (this.state.direction !== 'right') {
              this.setState({ direction: 'left' })
            }
          }}
          onSwipeRight={state => {
            if (this.state.direction !== 'left') {
              this.setState({ direction: 'right' })
            }
          }}
          config={{
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
          }}
          style={{
            flex: 1
          }}
        >
          <Component
            {...this.props}
            snake={this.state}
            game={{
              ...this.props.game,
              score: this.state.squares.length - 1,
              reset: this.resetGame
            }}
          />
        </GestureRecognizer>
      )
    }
  }

  SnakeService.propTypes = {
    size: PropTypes.shape({
      width: function(props, propName) {
        return isValidInput(props[propName], 'size.width')
      },
      height: function(props, propName) {
        return isValidInput(props[propName], 'size.height')
      }
    }).isRequired,
    food: PropTypes.shape({
      origin: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      }).isRequired,
      setOrigin: PropTypes.func.isRequired
    }).isRequired,
    game: PropTypes.shape({
      isPlaying: PropTypes.bool,
      setPlaying: PropTypes.func.isRequired,
      setWon: PropTypes.func.isRequired
    }).isRequired
  }

  return SnakeService
}

export default HOCSnakeService
