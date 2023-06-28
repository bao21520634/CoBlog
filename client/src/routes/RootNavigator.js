import React, { useRef, useEffect } from 'react';
import { AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as NavigationBar from 'expo-navigation-bar';

import { useFonts } from 'expo-font';

import Signin from '../screens/Auth/Signin';
import Signup from '../screens/Auth/Signup';
import Verification from '../screens/Auth/Verification';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import ChangePassword from '../screens/Auth/ChangePassword';

import Blog from '../screens/Blog';
import EditUser from '../screens/Profile/EditUser';

import Layout from '../layouts';

import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();

function RootNavigator() {
    const appState = useRef(AppState.currentState);

    const [fontsLoaded] = useFonts({
        'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
        'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    });

    useEffect(() => {
        NavigationBar.setVisibilityAsync('hidden');
        NavigationBar.setBackgroundColorAsync('white');

        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                NavigationBar.setVisibilityAsync('hidden');
                NavigationBar.setBackgroundColorAsync('white');
            }

            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* <Stack.Screen name="Blog" component={Blog} /> */}
                <Stack.Screen name="Signin" component={Signin} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Verification" component={Verification} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} />

                <Stack.Screen name="Layout" component={Layout} />

                <Stack.Screen name="Profile" component={Profile} />

                <Stack.Screen name="EditUser" component={EditUser} />
                <Stack.Screen name="Blog" component={Blog} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigator;
