import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  boardRow: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    width: '100%'
  },
  cell: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: 'white',
    borderBottomColor: '#545454',
    borderBottomWidth: 1,
    borderRightColor: '#545454',
    borderRightWidth: 1
  }
})
