import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import {Platform, Text} from "react-native";
import {useEffect, useState} from "react";
import { app } from '../firebase/config';
import React from 'react';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});


export const registerForPushNotification = async () => {
    if(!Device.isDevice){
        return null;
    }

    const {status}  = await Notifications.requestPermissionsAsync();
    if(status!=='granted'){
        alert("Failed te get permission for Push Notification.");
        return null;
    }

    if(Platform.OS === "android"){
        await Notifications.setNotificationChannelAsync("dog", {
            name: "dog",
            importance: Notifications.AndroidImportance.MAX,
            sound: 'short_bark.wav'
        });
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;

    const MY_TASK_NAME = 'BACKGROUND-NOTIFICATION-TASK';
    TaskManager.defineTask(MY_TASK_NAME, ({data,error})=>{
        if (error) {
            return;
        }
        if (data) {
            // Notifications.getBadgeCountAsync()
            // Notifications.setBadgeCountAsync(0);

            //catch the notifications when the app is close
            Notifications.addNotificationReceivedListener((notification: Notifications.Notification)=>{
                console.log("receive: "+notification.request.content.title +": "+ notification.request.content.body);
            });
        }
    });

    //catch the notifications when app is open
    Notifications.addNotificationReceivedListener((notification: Notifications.Notification)=>{
       // if (notification.request.content.data.channel === 'alert'){
            alert(notification.request.content.title +": "+ notification.request.content.body)
       // }

    });
    await Notifications.registerTaskAsync(MY_TASK_NAME);

    return token;
};
