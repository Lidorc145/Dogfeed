import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExploreScreen } from 'src/screens';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { HomeStackNavigator } from './home-stack';
import { rText } from '../../localizations';

export type BottomTabParams = {
    HomeTab: undefined;
    Explore: undefined;
    Profile: undefined;
};

const Tabs = createBottomTabNavigator<BottomTabParams>();

/*
    Define Icons
*/
interface TabBarIconProps {
    focused: boolean;
    color: string;
    size: number;
}

const HomeIcon = ({ focused, color, size }: TabBarIconProps) => (
    <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} color={color} size={size} />
);

const ExploreIcon = ({ focused, color, size }: TabBarIconProps) => (
    <MaterialIcons name={focused ? 'search' : 'search'} color={color} size={size} />
);

const ChatIcon = ({ focused, color, size }: TabBarIconProps) => (
    <MaterialIcons name={focused ? 'forum' : 'forum'} color={color} size={size} />
);

export /**
 *Bottom Tab Navigator, used for Navigating between all bottom tab screens
 *
 * @return {*}
 */
const BottomTabNavigator: React.FC<{}> = () => {
    const tabs = [
        <Tabs.Screen
            key="HomeTab"
            name="HomeTab"
            component={HomeStackNavigator}
            options={{
                title: rText('home'),
                headerShown: false,
                tabBarIcon: HomeIcon,
            }}
        />,
        <Tabs.Screen
            key="ExploreTab"
            name="Explore"
            component={ExploreScreen}
            options={{
                title: rText('DogParks'),
                headerShown: true,
                tabBarIcon: ExploreIcon,
            }}
        />,
        <Tabs.Screen
            key="ChatTab"
            name="Chat"
            component={ExploreScreen}
            options={{
                title: rText('chat'),
                tabBarIcon: ChatIcon,
            }}
        />,
    ];

    if (rText('dir') === 'LTR') {
        tabs.reverse();
    }

    return (
        <Tabs.Navigator
            screenListeners={({ navigation }) => ({
                tabLongPress: (e) => {
                    navigation.jumpTo(e.target.split('-')[0]);
                },
            })}
            screenOptions={{ tabBarHideOnKeyboard: true }}>
            {tabs}
        </Tabs.Navigator>
    );
};
