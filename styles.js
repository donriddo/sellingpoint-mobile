import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
      marginTop: 70,
    flex: 1,
//    justifyContent: 'center',
//    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    flex: 2,
    backgroundColor: 'powderblue',
    fontSize: 55,
    textAlign: 'center',
    margin: 10,
  },
  topbar: {
    backgroundColor: "steelblue",
    flex: 0.5
  },
  button: {
    backgroundColor: "powderblue",
    borderRadius: 10,
    height: 50,
    width: 150,
//    justifyContent: "center",
    marginTop: 25
  },
  instructions: {
    flex: 1,
    backgroundColor: 'white',
    fontSize: 25,
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
    margin: 10
  },
    signup: {
      flex: 3,
      alignItems: "center",
      backgroundColor: 'steelblue',
      marginBottom: 5,
      margin: 10
  },
  toolbar: {
      backgroundColor: '#333',
      height: 56,
  },
  menuItem: {
      color: '#333',
      padding: 10,
      textAlign: 'left'
  },
  navBar: {
      backgroundColor: 'steelblue',
  },
  navBarText: {
      color: 'white',
      fontSize: 16,
      marginVertical: 10,
  },
  navBarTitleText: {
      fontWeight: '500',
      marginVertical: 9,
  },
  navBarLeftButton: {
      paddingLeft: 10,
  },
  navBarRightButton: {
      padding: 10,
      paddingTop: 5
  },
  scene: {
      flex: 1,
      paddingTop: 63,
  }
});
export default styles;
