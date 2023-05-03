// importScripts("/__/firebase/9.18.0/firebase-app-compat.js");
// importScripts("/__/firebase/9.18.0/firebase-messaging-compat.js");
// importScripts("/__/firebase/init.js");

import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcdI6ka8Jpf5NLMDoL7CJVpJwFnBzTMbI",
  authDomain: "notification-20f5b.firebaseapp.com",
  projectId: "notification-20f5b",
  storageBucket: "notification-20f5b.appspot.com",
  messagingSenderId: "764138157910",
  appId: "1:764138157910:web:1c68ecffc85787c0d888f7",
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
// onBackgroundMessage(messaging, (payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   // Customize notification here
//   const notificationTitle = "Background Message Title";
//   const notificationOptions = {
//     body: "Background Message body.",
//     icon: "/firebase-logo.png",
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// // getToken(messaging, {
// //   vapidKey:
// //     "BGCGuhn-rYLSDIwlhTgDuE5ni_KZoGw1YKZKuo-u56qGYhaAMfwelCNU05xOZtNzih4ImUtetdGn_L5PuPEZOkY",
// // });
// function requestPermission() {
//   console.log("Requesting permission...");
//   Notification.requestPermission().then((permission) => {
//     if (permission === "granted") {
//       console.log("Notification permission granted.");
//     } else {
//       console.log("Unable to get permission to notify.");
//     }
//   });
// }

// getToken(messaging, {
//   vapidKey:
//     "BGCGuhn-rYLSDIwlhTgDuE5ni_KZoGw1YKZKuo-u56qGYhaAMfwelCNU05xOZtNzih4ImUtetdGn_L5PuPEZOkY",
// })
//   .then((currentToken) => {
//     if (currentToken) {
//       // Send the token to your server and update the UI if necessary
//       // ...
//     } else {
//       // Show permission request UI
//       console.log(
//         "No registration token available. Request permission to generate one."
//       );
//       // ...
//     }
//   })
//   .catch((err) => {
//     console.log("An error occurred while retrieving token. ", err);
//     // ...
//   });
