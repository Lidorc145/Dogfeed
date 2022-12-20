import React from 'react';
import { Platform, Keyboard } from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from 'src/navigation/auth-stack';
import { useNavigation } from '@react-navigation/native';
import { Box, VStack, Button, Heading, Text, HStack, KeyboardAvoidingView } from 'native-base';
import { LogoIcon } from 'src/components/logo-icon';
import { FormInput } from 'src/components/form-input';

import { ChangeLanguage } from 'src/components/changeLanguage';
import { rText } from '../../localizations';

type WelcomeScreenParams = StackNavigationProp<AuthStackParams, 'Welcome'>;

export const IntroScreen: React.FC<{}> = ({}) => {
    // route params
    // const { } = route.params;
    const navigation = useNavigation<WelcomeScreenParams>();
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
                justifyContent="center"
                alignItems="center"
                safeArea>
                <VStack space={3} alignItems="center" w="100%">
                    <HStack pt={5} space={5} w="100%" justifyContent="center">
                        <Heading textAlign="left" mb={3} color="plainText.900">
                            <Text>Intro screen</Text>

                            <Button onPress={() => navigation.navigate('Welcome')}>
                                title={rText('Welcome')}
                            </Button>
                        </Heading>
                    </HStack>

                    <ChangeLanguage />
                </VStack>
            </Box>
        </KeyboardAvoidingView>
    );
};
