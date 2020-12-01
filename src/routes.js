import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/natve';

import Main from './pages/main'

const Stack = createStackNavigator();

export default function StackRoutes(){
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen name="Main" component={Main} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}