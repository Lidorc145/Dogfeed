import React from 'react';
import { Alert, GestureResponderEvent, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExploreScreen, HomeScreen } from 'src/screens';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Icon, IconButton } from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';
import { useAppSelector } from 'src/ducks/useful-hooks';
import { ChangeLanguage } from 'src/components/changeLanguage';
import { AuthStackNavigator } from './auth-stack';
import { SettingsStack } from './settings-stack';
import { rText } from '../../localizations';

export type HomeStackParams = {
    Home: undefined;
    SettingsStack: undefined;
    Auth: undefined;
};

const StackNav = createNativeStackNavigator<HomeStackParams>();

const CloseIcon = (onClose: () => void) => (
    <MaterialCommunityIcons name="close" size={22} onPress={onClose} />
);

const SettingsButton = (onPress?: (event: GestureResponderEvent) => void, isDisabled?: boolean) => (
    <>
        <ChangeLanguage />
        <IconButton
            isDisabled={isDisabled}
            variant="unstyled"
            icon={<Icon as={MaterialIcons} name="settings" size="lg" color="primary.700" />}
            onPress={isDisabled ? null : onPress}
        />
    </>
);

type HomeStackProps = StackScreenProps<HomeStackParams, 'Home'>;

export /**
 * Home Stack Navigator, used for navigating between, home, auth, and settings screen
 *
 * @param {*} { navigation }
 * @return {*}
 */
const HomeStackNavigator: React.FC<HomeStackProps> = ({ navigation }) => {
    const isAnonymous = useAppSelector((state) => state.user.isAnonymous);
    const checkLogin = () => {
        Alert.alert(
            'Are you sure you want to exit?',
            'Your progress will not be saved.',
            [
                { text: 'Exit', onPress: navigation.goBack, style: 'destructive' },
                {
                    text: 'Return',
                    onPress: () => null,
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    };

    return (
        <StackNav.Navigator>
            <StackNav.Screen
                name={rText('home')}
                component={HomeScreen}
                options={{
                    headerRight: () =>
                        SettingsButton(() => navigation.navigate('SettingsStack'), isAnonymous),
                }}
            />
            <StackNav.Screen
                name="SettingsStack"
                component={SettingsStack}
                options={{ headerTitle: rText('Settings'), animationTypeForReplace: 'pop' }}
            />
            <StackNav.Screen
                name="Auth"
                component={AuthStackNavigator}
                options={{
                    headerTitle: 'Login or Sign Up',
                    headerRight: () => CloseIcon(checkLogin),
                    presentation: 'modal',
                }}
            />
            <StackNav.Screen
                name="Explore"
                component={ExploreScreen}
                options={{ headerTitle: 'Explore', animationTypeForReplace: 'pop' }}
            />
        </StackNav.Navigator>
    );
};
