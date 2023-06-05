/* eslint-disable */
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js'
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyBzEG_bG1PcTjj_LPhcyjOxG3MF_UcLgKc',
  authDomain: 'zero3z.firebaseapp.com',
  projectId: 'zero3z',
  storageBucket: 'zero3z.appspot.com',
  messagingSenderId: '69201417644',
  appId: '1:69201417644:web:5a3f6db177d4ae2df01609',
  measurementId: 'G-WY1LCFMR3Y',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
