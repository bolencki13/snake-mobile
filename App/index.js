import React from 'react'
import { SafeAreaView } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Styles from './styles'
import Board from './Board'

function App() {
  return (
    <SafeAreaView style={Styles.container}>
      <Board
        size={{
          height: 12,
          width: 12
        }}
      />
    </SafeAreaView>
  )
}

export default createAppContainer(
  createStackNavigator(
    {
      App: {
        screen: App,
        navigationOptions: () => ({
          title: `Snake Game`
        })
      }
    },
    {
      initialRouteName: 'App'
    }
  )
)
