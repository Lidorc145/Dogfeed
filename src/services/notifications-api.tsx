import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import {Platform, Text} from "react-native";
import {useEffect, useState} from "react";
import { app } from '../firebase/config';
import React from 'react';
import {NotificationResponse} from "expo-notifications";



export const registerForPushNotification = async () => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });



    if(!Device.isDevice){
        return null;
    }

    const {status}  = await Notifications.requestPermissionsAsync();
    await Notifications.getPermissionsAsync();
    if(status!=='granted'){
        alert("Failed te get permission for Push Notification.");
        return null;
    }

    await Notifications.setNotificationCategoryAsync('dog', [
        {
            identifier: 'yes',
            buttonTitle: 'כן',

            textInput: {
                submitButtonTitle: 'send ittt',
                placeholder: 'string',
            },
            options: {
                isAuthenticationRequired: false,
                isDestructive: false,
            },
        },
        {
            identifier: 'no',
            buttonTitle: 'no',
            options: {
                isAuthenticationRequired: false,
                isDestructive: true,
            },
        }

    ]);

    if(Platform.OS === "android"){
        await Notifications.setNotificationChannelAsync("dog", {
            name: "dog",
            importance: Notifications.AndroidImportance.MAX,
            sound: 'short_bark.wav',
            vibrationPattern: [0,50,250,50,250,0,50,250,0,25],
            bypassDnd: true,
            enableVibrate: true,
            enableLights: true,
            showBadge: true,
        });

        // const lastNotification = await Notifications.addNotificationResponseReceivedListener((response)=>{
        //     const {actionIdentifier, userText, notification} = response;
        //
        //         alert(actionIdentifier + " " + userText + " " + JSON.stringify(notification));
        //
        //         return () => lastNotification.remove();
        // });
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;

    const MY_TASK_NAME = 'BACKGROUND-NOTIFICATION-TASK';
    TaskManager.defineTask(MY_TASK_NAME, ({data,error})=>{
        if (error) {
            return;
        }
        if (data) {
            // Notifications.setBadgeCountAsync(0);

            //catch the notifications when the app is close
            const lastNotification = Notifications.addNotificationResponseReceivedListener((notification:NotificationResponse)=>{
               // console.log("receive: "+notification.actionIdentifier+ " " + notification.userText + " " +  JSON.stringify(notification));
                return () => lastNotification.remove();
            });
        }
    });

    //catch the notifications when app is open
    // const lastNotification = Notifications.addNotificationResponseReceivedListener((notification:NotificationResponse)=>{
    //    // if (notification.request.content.data.channel === 'alert'){
    //        // alert(notification.actionIdentifier+ " " + notification.userText + " " +  JSON.stringify(notification));
    //      return () => lastNotification.remove();
    //    // }
    // });

    await Notifications.registerTaskAsync(MY_TASK_NAME);

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Wellcome to Dogfeel",
            body: 'We are so happy to see you with us :)',
            data: { data: 'Click here' },
            launchImageName: 'dogSqureIcon.png',
            sound: 'short_bark.wav',
            attachments: [{
                url: 'dogSqureIcon.png',
                hideThumbnail: true
            }],
            categoryIdentifier: 'dog',
        },
        trigger: {
            channelId: 'dog',
            seconds: 10
        },
    });

    return token;
};
