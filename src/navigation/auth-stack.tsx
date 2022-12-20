import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, WelcomeScreen, IntroScreen } from 'src/screens';

export type AuthStackParams = {
    IntroScreen?: undefined;
    Welcome?: undefined;
    Login: {
        signInMethods: Array<string>;
        email: string;
        title?: string;
        extra?: any;
    };
};

const StackNav = createNativeStackNavigator<AuthStackParams>();

export /**
 *Auth Stack Navigator for moving between Welcome and Login screen
 *
 * @return {*}
 */
const AuthStackNavigator: React.FC<{}> = () => {
    return (
        <StackNav.Navigator screenOptions={{ gestureEnabled: true }} initialRouteName="IntroScreen">
            <StackNav.Screen
                name="Intro"
                component={IntroScreen}
                options={{ headerShown: false, animationTypeForReplace: 'pop' }}
            />
            <StackNav.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ headerShown: false, animationTypeForReplace: 'pop' }}
            />
            <StackNav.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
        </StackNav.Navigator>
    );
};
