import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { getAuth, GoogleAuthProvider,FacebookAuthProvider, signInWithCredential } from 'firebase/auth';
import { View } from 'react-native';
import {GoogleIcon,FacebookIcon,AppleIcon} from '../../assets/SocialLoginsIcons';
import {getPrivateUserData, updatePrivateUserData} from "../firebase/user-api";
import { useAppDispatch, useAppSelector } from '../ducks/useful-hooks';
import { signInSocial } from '../ducks/user-slice';
import {ResponseType} from "expo-auth-session";
import * as AuthSession from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();
const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();

providerFacebook.setCustomParameters({
    prompt: 'select_account'
});
providerGoogle.setCustomParameters({
    prompt: 'select_account'
});

const FaceBookButton = () => {
    const dispatch = useAppDispatch();
    const [request, response, promptAsync] = Facebook.useAuthRequest({
        clientId: '459488606352209'
    });

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { access_token } = response.params;
            const auth = getAuth();
            const credential = FacebookAuthProvider.credential(access_token);

            signInWithCredential(auth, credential).then(async (r)=>{
                    const user = r._tokenResponse;
                    const renderedData =
                        {
                            id: user.localId,
                            provider: user.providerId,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            emailVerified: user.emailVerified,
                            image: user.photoUrl,
                            isAnonymous: false,
                            loggedIn: true,
                        };
                    if (user.isNewUser) {
                        await updatePrivateUserData(renderedData, user.isNewUser);
                        dispatch(signInSocial(renderedData));
                    } else {
                        const privateUserDataFromDB = await getPrivateUserData(user.localId);
                        dispatch(signInSocial({ ...renderedData, ...privateUserDataFromDB.data(), loggedIn: true}));
                    }
            }).catch(e=>{});
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

const GoogleButton = (navigation) => {
    const dispatch = useAppDispatch();
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        androidClientId: '290343474599-8g53us0muj2goe3oufbsvdl7q1un64j8.apps.googleusercontent.com',
        iosClientId: '290343474599-l54lot58sbpllfmm2h3ef0kl3uo2f748.apps.googleusercontent.com'
    });

    React.useEffect( () => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const auth = getAuth();
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential).then(async (r) => {
                const user = r._tokenResponse;
                const renderedData =
                {
                    id: user.localId,
                    provider: user.providerId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    image: user.photoUrl,
                    isAnonymous: false,
                    loggedIn: true,
                };
                if (user.isNewUser) {
                    await updatePrivateUserData(renderedData, user.isNewUser);
                    dispatch(signInSocial(renderedData));
                } else {
                    const privateUserDataFromDB = await getPrivateUserData(user.localId);
                    dispatch(signInSocial({ ...renderedData, ...privateUserDataFromDB.data(), loggedIn: true}));
                }

            }).catch(e=>{});
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
