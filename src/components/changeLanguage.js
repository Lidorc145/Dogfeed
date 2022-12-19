import { StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import React from 'react';
import { Button } from 'native-base';
import { useAppDispatch, useAppSelector } from '../ducks/useful-hooks';
import { setLanguage } from '../ducks/user-slice';

export const ChangeLanguage = () => {
    const dispatch = useAppDispatch();

    const styles = StyleSheet.create({
        picker: {
            width: 120,
            padding: 0,
            margin: 0,
            color: '#1b3544',
        },
    });

    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <RNPickerSelect
                selectedValue={useAppSelector((state) => state.user.language)}
                onValueChange={(value) => dispatch(setLanguage(value))}
                placeholder={{ label: 'Select Language', disabled: true }}
                items={[
                    { label: 'English', value: 'en' },
                    { label: 'עברית', value: 'he' },
                ]}>
                <Button w="100%" colorScheme="primary" variant="link">
                    Change Language
                </Button>
            </RNPickerSelect>
        </View>
    );
};
const styles = StyleSheet.create({
    modalContent: {
        height: '25%',
        width: '100%',
        backgroundColor: '#25292e',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: 'absolute',
        bottom: 0,
    },
    titleContainer: {
        height: '16%',
        backgroundColor: '#464C55',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#fff',
        fontSize: 16,
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 50,
        paddingVertical: 20,
    },
    picker: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 50,
        paddingVertical: 20,
        width: 300,
        height: 100,
    },
});
