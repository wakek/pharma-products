import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import AddPrice from '../screens/AddPrice';
import AddProduct from '../screens/AddProduct';
import Home from '../screens/Home';
import NotFoundScreen from '../screens/NotFoundScreen';
import ProductDetails from '../screens/ProductDetails';
import UpdateProduct from '../screens/UpdateProduct';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';


export default function Navigation() {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={Home} options={{ headerShown: false }} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateProduct"
        component={UpdateProduct}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddPrice"
        component={AddPrice}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>

      </Stack.Group>
    </Stack.Navigator>
  );
}
