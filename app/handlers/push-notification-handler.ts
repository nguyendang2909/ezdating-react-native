import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(payload => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  };

  console.log(notificationOptions);
});
