import React, { useEffect } from 'react';
import { useColorScheme, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider,Text } from 'native-base';
import { Provider } from 'react-redux';
import { SSRProvider } from '@react-aria/ssr';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import RootNavigator from 'src/navigation';
import { store } from 'src/ducks/store';
import { nativeBaseLightTheme, nativeBaseDarkTheme } from 'src/constants/theme';
import {
    useFonts,
    Nunito_200ExtraLight,
    Nunito_200ExtraLight_Italic,
    Nunito_300Light,
    Nunito_300Light_Italic,
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    Nunito_600SemiBold,
    Nunito_600SemiBold_Italic,
    Nunito_700Bold,
    Nunito_700Bold_Italic,
    Nunito_800ExtraBold,
    Nunito_800ExtraBold_Italic,
    Nunito_900Black,
    Nunito_900Black_Italic,
} from '@expo-google-fonts/nunito';
// import messaging from '@react-native-firebase/messaging';
import a from '../app.json';

const persistor = persistStore(store);

/**
 * Main app file
 *
 * @remarks
 * Will load the google custom fonts along with setting the persistStore and other configuration
 *
 * @return {*}
 */
export const App = () => {
    // hook to find user preference for color scheme
    const scheme = useColorScheme();

    /**
     * Load google fonts using expo-font
     * @resources
     * expo and googl fonts: https://github.com/expo/google-fonts
     * blog to setup with nativebase and ts: https://dev.to/nerdjfpb/how-to-use-custom-google-font-with-react-native-expo-nativebase-and-typescript-3jf7
     */
    const [fontsLoaded] = useFonts({
        Nunito_200ExtraLight,
        Nunito_200ExtraLight_Italic,
        Nunito_300Light,
        Nunito_300Light_Italic,
        Nunito_400Regular,
        Nunito_400Regular_Italic,
        Nunito_600SemiBold,
        Nunito_600SemiBold_Italic,
        Nunito_700Bold,
        Nunito_700Bold_Italic,
        Nunito_800ExtraBold,
        Nunito_800ExtraBold_Italic,
        Nunito_900Black,
        Nunito_900Black_Italic,
    });

    if (!fontsLoaded) {
        return <StatusBar />;
    }

    // useEffect(() => {
    //     const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    //         Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //     });
    //
    //     return unsubscribe;
    // }, []);

    return (
        <>
            <StatusBar />
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <SSRProvider>
                        <NativeBaseProvider
                            theme={scheme === 'dark' ? nativeBaseDarkTheme : nativeBaseLightTheme}>
                            <RootNavigator scheme={scheme} />
                            <Text textAlign="center">Version: {a.expo.android.versionCode} 1.0.4</Text>
                        </NativeBaseProvider>
                    </SSRProvider>
                </PersistGate>
            </Provider>

        </>
    );
};
