import React from 'react';
import { Button, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

export const GoogleIcon = ({ disabled, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            disabled={disabled}
            onPress={onPress}>
            <Svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M22.06 11.75C22.06 10.97 21.99 10.22 21.86 9.5H11.5V13.755H17.42C17.165 15.13 16.39 16.295 15.225 17.075V19.835H18.78C20.86 17.92 22.06 15.1 22.06 11.75Z"
                    fill="#4285F4"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.5 22.4998C14.47 22.4998 16.96 21.5148 18.78 19.8348L15.225 17.0748C14.24 17.7348 12.98 18.1248 11.5 18.1248C8.63497 18.1248 6.20997 16.1898 5.34497 13.5898H1.66997V16.4398C3.47997 20.0348 7.19997 22.4998 11.5 22.4998Z"
                    fill="#34A853"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.345 13.5901C5.125 12.9301 5 12.2251 5 11.5001C5 10.7751 5.125 10.0701 5.345 9.41006V6.56006H1.67C0.925 8.04506 0.5 9.72506 0.5 11.5001C0.5 13.2751 0.925 14.9551 1.67 16.4401L5.345 13.5901Z"
                    fill="#FBBC05"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.5 4.875C13.115 4.875 14.565 5.43 15.705 6.52L18.86 3.365C16.955 1.59 14.465 0.5 11.5 0.5C7.19997 0.5 3.47997 2.965 1.66997 6.56L5.34497 9.41C6.20997 6.81 8.63497 4.875 11.5 4.875Z"
                    fill="#EA4335"
                />
            </Svg>
        </TouchableOpacity>
    );
};

export const FacebookIcon = ({ disabled, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.facebook}
            activeOpacity={0.5}
            disabled={disabled}
            onPress={onPress}>
            <Svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                    d="M23 11.5698C23 5.21857 17.8513 0.069849 11.5 0.069849C5.14872 0.069849 0 5.21857 0 11.5698C0 17.3098 4.20538 22.0674 9.70312 22.9301V14.8941H6.7832V11.5698H9.70312V9.03626C9.70312 6.15407 11.42 4.56204 14.0468 4.56204C15.305 4.56204 16.6211 4.78665 16.6211 4.78665V7.61672H15.171C13.7424 7.61672 13.2969 8.50319 13.2969 9.41263V11.5698H16.4863L15.9765 14.8941H13.2969V22.9301C18.7946 22.0674 23 17.3098 23 11.5698Z"
                    fill="white"
                />
            </Svg>
        </TouchableOpacity>
    );
};

export const AppleIcon = ({ disabled, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.apple}
            activeOpacity={0.5}
            disabled={disabled}
            onPress={onPress}>
            <Svg
                width="19"
                height="23"
                viewBox="0 0 19 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                    d="M18.0073 17.3886C17.6884 18.1252 17.311 18.8033 16.8737 19.4266C16.2777 20.2765 15.7897 20.8647 15.4136 21.1913C14.8305 21.7275 14.2059 22.0021 13.5369 22.0177C13.0567 22.0177 12.4776 21.8811 11.8035 21.6039C11.1271 21.328 10.5056 21.1913 9.93727 21.1913C9.34123 21.1913 8.70198 21.328 8.01823 21.6039C7.33343 21.8811 6.78177 22.0255 6.35998 22.0399C5.71852 22.0672 5.07914 21.7848 4.44094 21.1913C4.0336 20.8361 3.5241 20.227 2.91374 19.3642C2.25888 18.4428 1.72049 17.3743 1.2987 16.1562C0.846988 14.8405 0.620544 13.5664 0.620544 12.333C0.620544 10.92 0.925853 9.70141 1.53738 8.6802C2.01799 7.85993 2.65737 7.21287 3.4576 6.73786C4.25783 6.26285 5.12248 6.02079 6.05363 6.00531C6.56313 6.00531 7.23127 6.1629 8.06156 6.47264C8.88951 6.78341 9.42114 6.94101 9.65422 6.94101C9.82847 6.94101 10.4191 6.75673 11.4202 6.38935C12.367 6.04864 13.166 5.90757 13.8207 5.96314C15.5945 6.10629 16.9271 6.80554 17.8134 8.06529C16.2269 9.02651 15.4422 10.3728 15.4578 12.0999C15.4721 13.4451 15.9602 14.5646 16.9193 15.4535C17.354 15.866 17.8394 16.1849 18.3795 16.4113C18.2623 16.751 18.1387 17.0763 18.0073 17.3886ZM13.9391 1.38013C13.9391 2.43454 13.5539 3.41903 12.786 4.33027C11.8594 5.41356 10.7387 6.03953 9.5233 5.94076C9.50781 5.81426 9.49883 5.68113 9.49883 5.54123C9.49883 4.529 9.93948 3.44571 10.722 2.55998C11.1127 2.11152 11.6096 1.73863 12.2121 1.44116C12.8134 1.14814 13.3821 0.986094 13.917 0.958344C13.9326 1.0993 13.9391 1.24027 13.9391 1.38012V1.38013Z"
                    fill="white"
                />
            </Svg>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        gap: 15,
        width: 40,
        height: 40,
        borderWidth: 0.1,
        backgroundColor: '#FFFFFF',
        shadowColor: 'rgba(0,0,0,0.165)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.58,
        shadowRadius: 3,
        elevation: 3,
        borderRadius: 50,
    },
    facebook: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        gap: 15,
        width: 40,
        height: 40,
        borderWidth: 0.1,
        backgroundColor: '#1877F2',
        shadowColor: 'rgba(0,0,0,0.165)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.58,
        shadowRadius: 3,
        elevation: 3,
        borderRadius: 50,
    },
    apple: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        gap: 15,
        width: 40,
        height: 40,
        borderWidth: 0.1,
        backgroundColor: '#000',
        shadowColor: 'rgba(0,0,0,0.165)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.58,
        shadowRadius: 3,
        elevation: 3,
        borderRadius: 50,
    },
});
