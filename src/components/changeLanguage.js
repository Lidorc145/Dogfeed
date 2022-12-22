import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import React from 'react';
import { Button } from 'native-base';
import { useAppDispatch, useAppSelector } from '../ducks/useful-hooks';
import { setLanguage } from '../ducks/user-slice';
import {styles} from "../constants/theme";

export const ChangeLanguage = () => {
    const dispatch = useAppDispatch();

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
                <Button w="100%" colorScheme="primary" variant="link" style={styles.input}>
                    Change Language
                </Button>
            </RNPickerSelect>
        </View>
    );
};