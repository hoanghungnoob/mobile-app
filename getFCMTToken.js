import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid,Platform} from 'react-native';
export async function requestUserPermission() {

    console.log('PermissionsAndroid.RESULTS.granted',PermissionsAndroid.RESULTS.GRANTED);
    // eslint-disable-next-line eqeqeq
    if (Platform.OS == 'android' && Platform.Version >= 33){
    const granted =  await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    console.log('grantedgranted',granted);
    if (granted === PermissionsAndroid.RESULTS.GRANTED){
        const out = await  getFCMToken();
        console.log("out: ",out)
        return out

    } else {
        console.log('permission denied');
    }
    } else {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
          console.log('Authorization status:', authStatus);
          const out = await  getFCMToken();
          console.log("out: ",out)
          return out
        }
    }
}

const getFCMToken = async() =>{
    try {
        await messaging().registerDeviceForRemoteMessages();

        let fcmToken = await AsyncStorage.getItem('fcm_token');
        if (fcmToken){
           console.log('OLD FCM_TOKEN FOUND',fcmToken);
           return fcmToken;
        } else {
            const token = await messaging().getToken();
            await AsyncStorage.setItem('fcm_token', token);
            console.log('NEW FCM_TOKEN',token);
            return token;
        }
    } catch (error) {
        console.log('error during generating token',error);
    }
};
