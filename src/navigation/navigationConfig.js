import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Summary from '../screens/Summary';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Summary" component={Summary} />
    </Stack.Navigator>
  );
};

export default RootStack;
