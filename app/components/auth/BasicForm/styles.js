import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: '#ffffff',
    height: 40,
    margin: 10,
    borderRadius: 5,
    padding: 3,
  },
  button: {
    backgroundColor: '#88cc88',
    height: 40,
    margin: 10,
    borderRadius: 5,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginBox: {
    margin: 10,
  },
  imageBox: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 120,
    height: 120,
  },
  scrollView: {
    backgroundColor: '#e6e6e6',
  },
});

export default styles;
