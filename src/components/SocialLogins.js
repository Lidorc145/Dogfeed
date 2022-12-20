import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, GoogleAuthProvider,FacebookAuthProvider, getRedirectResult, signInWithCredential, signInWithRedirect } from 'firebase/auth';
import {Button, View} from 'react-native';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as AuthSession from "expo-auth-session";
import {GoogleIcon,FacebookIcon,AppleIcon} from '../../assets/SocialLoginsIcons';
import {getPrivateUserData, updatePrivateUserData} from "../firebase/user-api";
import { useLazySignUpQuery} from "../services";
import {useToast} from "native-base";
import {AlertToast} from "./alert-toast";
import { useAppDispatch, useAppSelector } from '../ducks/useful-hooks';
import { setLanguage,signInSocial } from '../ducks/user-slice';

WebBrowser.maybeCompleteAuthSession();

const FaceBookButton = () => {
    const [request, response, promptAsync] = Facebook.useAuthRequest({
        responseType: ResponseType.Token,
        clientId: '459488606352209',
        expoClientId: '459488606352209',
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    });

    const provider = new FacebookAuthProvider();

    // redux query hooks
    const toast = useToast();
    const [triggerLogin, { isFetching, error }] = useLazySignUpQuery();

    const navigateBack = () => {
        const parentNavigator = navigation.getParent();
        if (parentNavigator?.getId() && parentNavigator?.getId() !== 'root') {
            parentNavigator?.goBack();
        }
    };

    const renderVerificationToast = () => (
        <AlertToast
            title="Email Sent!"
            type="success"
            message={`Verification email sent to ${email}.`}
            toExit={() => toast.close('verificationToast')}
        />
    );

    const handleLogin = async ({ email, password, firstName, lastName }) => {
        const { isSuccess } = await triggerLogin({
            email,
            password,
            firstName,
            lastName,
        });

        // navigate back screen if in stack
        if (isSuccess) {
            toast.show({
                placement: 'bottom',
                render: renderVerificationToast,
                id: 'verificationToast',
            });
            navigateBack();
        }
    };

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { access_token } = response.params;
            const auth = getAuth();
            const credential = FacebookAuthProvider.credential(access_token);
            //console.log("response: ", response,"credential: ", credential, "auth: ", auth);
            signInWithCredential(auth, credential).then(res=>{

                console.log("Google: ", res);
            });
            //console.log("~~~~", getPrivateUserData("qsx1omcy3WPN1zu7cmv4YTDiGeG2"));
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
        clientId: '290343474599-je01f3rsbkikc7fjspimoabt4kcr5skp.apps.googleusercontent.com',
    });

    React.useEffect( () => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const auth = getAuth();
            const credential = GoogleAuthProvider.credential(id_token);

            signInWithCredential(auth, credential).then(async (r) => {
                console.log(r._tokenResponse);
                const user = r._tokenResponse;
                if (user.isNewUser) {
                    updatePrivateUserData({
                        id: user.localId,
                        provider: user.providerId,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        emailVerified: user.emailVerified,
                        image: user.photoUrl,
                        isAnonymous: false,
                        loggedIn: true,
                    }, user.isNewUser);
                    dispatch(signInSocial(user));
                } else {
                    const privateUserDataFromDB = await getPrivateUserData(user.localId);
                    console.log(user.localId,  privateUserDataFromDB.data());

                    dispatch(signInSocial({ ...privateUserDataFromDB.data()}));
                }

            });
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
