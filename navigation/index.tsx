import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import AddProduct from '../screens/AddProduct';
import Home from '../screens/Home';
import ModalScreen from '../screens/ModalScreen';
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
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{ headerShown: false }}
        />

      </Stack.Group>
    </Stack.Navigator>
  );
}

// const { Navigator, Screen } = createBottomTabNavigator();

// const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => (
//   <BottomNavigation
//     style={{
//       borderTopColor: '#E9ECEF',
//       borderTopWidth: 1,
//     }}
//     selectedIndex={state.index}
//     onSelect={index => navigation.navigate(state.routeNames[index])}>
//     <BottomNavigationTab
//       title='Home'
//       icon={<Icon name='home' />}
//     />
//     <BottomNavigationTab
//       title='Settings'
//       icon={<Icon name='settings' />}
//     />
//   </BottomNavigation>
// );

// function BottomTabNavigator() {
//   return (
//     <Navigator
//       tabBar={props =>
//         <BottomTabBar {...props} />}
//     >
//       <Screen name='Home' component={Home} options={{ headerShown: false }} />
//       <Screen name='Settings' component={Settings} />
//     </Navigator>
//   );
// }