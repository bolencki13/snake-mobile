import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90bc26'
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  left: {
    transform: [{ rotate: '90deg' }]
  },
  right: {
    transform: [{ rotate: '270deg' }]
  },
  up: {
    transform: [{ rotate: '180deg' }]
  },
  down: {
    transform: [{ rotate: '0deg' }]
  }
})
