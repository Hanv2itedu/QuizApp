import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import Summary from '../screens/Summary';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Summary" component={Summary} />
    </Stack.Navigator>
  );
};

export default RootStack;
