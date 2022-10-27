import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { Provider } from 'react-redux';
import Main from './src/navigation/navigationConfig';
import store from './src/reducer/configStore';
import colors from './src/theme/colors';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Provider store={store}>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});

export default App;
