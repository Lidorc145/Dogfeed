import React, { useState } from 'react';
import { Platform, Keyboard, StyleSheet, Text, View, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParams } from 'src/navigation/auth-stack';
import { useNavigation } from '@react-navigation/native';
import { Box, Button, Heading, KeyboardAvoidingView } from 'native-base';
import { ChangeLanguage } from 'src/components/changeLanguage';
import * as Progress from 'react-native-progress';
import { AntDesign } from '@expo/vector-icons';
import { rText } from '../../localizations';
import introImage1 from '../../assets/intro1.png';
import introImage2 from '../../assets/intro2.png';
import introImage3 from '../../assets/intro3.png';
import introImage4 from '../../assets/intro4.png';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 20,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    circles: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progress: {
        margin: 10,
    },
    button: {
        position: 'absolute',
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        bottom: 10,
    },
    buttonProgress: {
        position: 'absolute',
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        bottom: 0,
    },
});

type WelcomeScreenParams = StackNavigationProp<AuthStackParams, 'Welcome'>;

export const IntroScreen: React.FC<{}> = () => {
    // route params
    // const { } = route.params;
    const navigation = useNavigation<WelcomeScreenParams>();
    const [page, setPage] = useState(0);
    const pageData = [
        {
            image: introImage1,
            pageFunc: () => setPage(page + 1),
            title: rText('introTitle1'),
            subTitle: rText('introSubTitle1'),
        },
        {
            image: introImage2,
            pageFunc: () => setPage(page + 1),
            title: rText('introTitle2'),
            subTitle: rText('introSubTitle2'),
        },
        {
            image: introImage3,
            pageFunc: () => setPage(page + 1),
            title: rText('introTitle3'),
            subTitle: rText('introTitle3'),
        },
        {
            image: introImage4,
            pageFunc: () => navigation.navigate('Welcome'),
            title: rText('introTitle4'),
            subTitle: rText('introSubTitle4'),
        },
    ];
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
                <View
                    style={{
                        flex: 1,
                        height: '100%',
                        margin: 50,
                    }}>
                    <Image source={pageData[page].image} />
                </View>
                <View style={{ marginTop: 50 }}>
                    <Heading textAlign="center" mb={3} color="plainText.900">
                        <Text>{pageData[page].title}</Text>
                    </Heading>
                    <Text>{pageData[page].subTitle}</Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        height: 100,
                        margin: 20,
                    }}>
                    <Progress.Circle
                        size={100}
                        progress={0.25}
                        style={[
                            styles.buttonProgress,
                            { transform: [{ rotate: `${page * 90}deg` }] },
                        ]}
                    />
                    <Button style={styles.button} onPress={pageData[page].pageFunc}>
                        <AntDesign name="arrowright" size={24} color="white" />
                    </Button>
                </View>
                <ChangeLanguage />
            </Box>
        </KeyboardAvoidingView>
    );
};
