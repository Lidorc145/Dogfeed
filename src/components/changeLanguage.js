import { StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
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
        <Picker
            selectedValue={useAppSelector((state) => state.user.language)}
            onValueChange={(value) => dispatch(setLanguage(value))}
            mode="dropdown" // Android only
            style={styles.picker}>
            <Picker.Item label="English" value="en" />
            <Picker.Item label="עברית" value="he" />
        </Picker>
    );
};
