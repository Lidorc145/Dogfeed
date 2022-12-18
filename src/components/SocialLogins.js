import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, GoogleAuthProvider,FacebookAuthProvider, getRedirectResult, signInWithCredential, signInWithRedirect } from 'firebase/auth';
import {Button, View} from 'react-native';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as AuthSession from "expo-auth-session";
import {GoogleIcon,FacebookIcon,AppleIcon} from '../../assets/SocialLoginsIcons';
WebBrowser.maybeCompleteAuthSession();

const FaceBookButton = () => {
    const [request, response, promptAsync] = Facebook.useAuthRequest({
        responseType: ResponseType.Token,
        clientId: '459488606352209',
        expoClientId: '459488606352209',
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    });

    const provider = new FacebookAuthProvider();

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { access_token } = response.params;
            const auth = getAuth();
            const credential = FacebookAuthProvider.credential(access_token);
            //console.log("response: ", response,"credential: ", credential, "auth: ", auth);
            signInWithCredential(auth, credential).then(r=>console.log("Google: ", r.user));
        }
    }, [response]);

    return (
        <FacebookIcon disabled={!request}
            onPress={() => {
                promptAsync();
            }}
        />
    );
};

const GoogleButton = () => {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '290343474599-je01f3rsbkikc7fjspimoabt4kcr5skp.apps.googleusercontent.com',
    });

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const auth = getAuth();
            const credential = GoogleAuthProvider.credential(id_token);
            //console.log("response: ", response,"credential: ", credential, "auth: ", auth);
            signInWithCredential(auth, credential).then(r=>console.log("Google: ", r.user));
        }
    }, [response]);

    return (
            <GoogleIcon
                disabled={!request}
                onPress={() => {
                    promptAsync();
                }}
            />
    );
}


export function SocialLogins() {
    return (
        <View style={{flexDirection: 'row', alignContent: 'space-around',justifyContent: 'space-around',  padding: 20, width: 250}}>
            <GoogleButton />
            <FaceBookButton />
            <AppleIcon />
        </View>
    );
}
