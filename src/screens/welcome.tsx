import React from 'react';
import { Keyboard, Platform } from 'react-native';
import {
    Box,
    VStack,
    Button,
    Heading,
    Text,
    useToast,
    HStack,
    KeyboardAvoidingView,
} from 'native-base';
import { useNavigation, useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailSchema } from 'src/utils/schemas';
import { FormInput } from 'src/components/form-input';
import { useAppSelector } from 'src/ducks/useful-hooks';
import { AuthStackParams } from 'src/navigation/auth-stack';
import { AlertToast } from 'src/components/alert-toast';
import { styles } from 'src/constants/theme';
import {
    useLazyFetchSignInMethodsQuery,
    useLazySignOutQuery,
    useLazySignUpQuery,
} from 'src/services/auth-api';
import { LogoIcon } from 'src/components/logo-icon';
import { ChangeLanguage } from 'src/components/changeLanguage';
import { SocialLogins } from 'src/components/SocialLogins';
import { rText } from '../../localizations';

// define navigation props
type WelcomeScreenParams = StackNavigationProp<AuthStackParams, 'Welcome'>;

export /**
 * Welcome Screen, used either signing into Maet or making an account
 *
 * @return {*}
 */
const WelcomeScreen: React.FC<{}> = () => {
    // hooks
    const navigation = useNavigation<WelcomeScreenParams>();
    const isAnonymous = useAppSelector((state) => state.user.isAnonymous);
    const toast = useToast();
    const iconColor = useTheme().colors.text;
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(emailSchema),
    });

    // redux query hooks
    const [getSignInMethods, { isFetching: emailFetching, error: fetchingError }] =
        useLazyFetchSignInMethodsQuery();
    const [triggerSignUp, { isFetching: guestFetching }] = useLazySignUpQuery();
    const [triggerSignOut] = useLazySignOutQuery();

    // toast component for guest
    const renderGuestToast = () => (
        <AlertToast
            title="Using Dogfeel as a Guest."
            type="primary"
            toExit={() => toast.close('guestToast')}
        />
    );

    // handling button presses
    const handleEmail = async (data: any) => {
        // updating variables within function, since they need to be sent to new screen
        const emailSignInMethods = await getSignInMethods(data.email).unwrap();
        navigation.navigate('Login', {
            signInMethods: emailSignInMethods,
            email: data.email,
        });
        reset();
    };

    const handleAnonymous = async () => {
        await triggerSignUp('guest');
        toast.show({
            placement: 'top',
            render: renderGuestToast,
            id: 'guestToast',
        });
    };

    return (
        <KeyboardAvoidingView
            h={{
                lg: 'auto',
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            onTouchStart={() => Keyboard.dismiss()}
            w="100%">
            <Box
                px="10"
                w="100%"
                h="100%"
                bg="background.100"
                justifyContent={!isAnonymous ? 'center' : 'flex-start'}
                alignItems="center"
                safeArea={!isAnonymous ? true : undefined}>
                <VStack space={3} alignItems="center" w="100%">
                    {!isAnonymous ? (
                        <>
                            <LogoIcon size={200} color={iconColor} />
                            <Heading textAlign="center" mb={3} color="plainText.900">
                                {rText('WelcomeToDogfeel')}
                            </Heading>
                        </>
                    ) : (
                        <HStack pt={5} space={5} w="100%" justifyContent="center">
                            <LogoIcon size={50} color={iconColor} />
                            <Heading textAlign="left" mb={3} color="plainText.900">
                                {rText('WelcomeToDogfeel')}
                            </Heading>
                        </HStack>
                    )}
                    <FormInput
                        rounded="3xl"
                        key="login-email"
                        name="email"
                        control={control}
                        isInvalid={'email' in errors}
                        label={rText('InputYourEmail')}
                        placeholder="name@example.com"
                        defaultValue=""
                        errorMessage={rText(String(errors?.email?.message))}
                    />

                    <Button
                        style={styles.input}
                        key="Password-Button"
                        w="100%"
                        colorScheme="primary"
                        onPress={handleSubmit(handleEmail)}
                        isLoading={emailFetching}
                        isLoadingText={rText('Submitting')}>
                        {rText('Submit')}
                    </Button>
                    <SocialLogins />

                    {!isAnonymous ? (
                        <Button
                            w="100%"
                            colorScheme="primary"
                            variant="link"
                            onPress={handleAnonymous}
                            isLoading={guestFetching}
                            isLoadingText={rText('Continuing')}>
                            {rText('continueAsGuest')}
                        </Button>
                    ) : null}
                    <Text color="danger.600">{fetchingError?.message}</Text>
                    {isAnonymous ? (
                        <Button
                            w="100%"
                            colorScheme="primary"
                            variant="link"
                            onPress={() => triggerSignOut(undefined)}
                            isLoading={guestFetching}
                            isLoadingText="Continuing">
                            Logout of Guest
                        </Button>
                    ) : null}

                    <ChangeLanguage />
                </VStack>
            </Box>
        </KeyboardAvoidingView>
    );
};
