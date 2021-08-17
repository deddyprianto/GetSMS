import React from 'react';
import {View} from 'react-native';
import Home from './components/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './components/SplashScreen';
import DetailContact from './components/DetailContact';
import {StateProvider} from './StateProvider';
import reduce, {initialState} from './reducer/reduce';
import 'react-native-gesture-handler';
const App = () => {
  const Stack = createStackNavigator();
  return (
    <StateProvider reduce={reduce} initialState={initialState}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="DetailContact" component={DetailContact} />
        </Stack.Navigator>
      </NavigationContainer>
    </StateProvider>
  );
};

export default App;
