import React from "react";
import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Newsfeed from "./post/Newsfeed";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";
import PrivateRoute from "./auth/helper/PrivateRoute";
import { Route, Routes } from "react-router-dom";
import FindPeople from "./user/FindPeople";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { API } from "./backend";
import { useEffect } from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDcdI6ka8Jpf5NLMDoL7CJVpJwFnBzTMbI",
//   authDomain: "notification-20f5b.firebaseapp.com",
//   projectId: "notification-20f5b",
//   storageBucket: "notification-20f5b.appspot.com",
//   messagingSenderId: "764138157910",
//   appId: "1:764138157910:web:1c68ecffc85787c0d888f7",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);
// Notification.requestPermission()
//   .then(function () {
//     console.log("Notification granted");
//     getToken(messaging, {
//       vapidKey:
//         "BGCGuhn-rYLSDIwlhTgDuE5ni_KZoGw1YKZKuo-u56qGYhaAMfwelCNU05xOZtNzih4ImUtetdGn_L5PuPEZOkY",
//     })
//       .then((currentToken) => {
//         if (currentToken) {
//           fetch(`${API}/fcmtoken/` + params.userId, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ fcmToken: currentToken }),
//           });
//           console.log("currenttoken", currentToken);
//           // Send the token to your server and update the UI if necessary
//           // ...
//           // Send the FCM token to the server using an HTTP request
//         } else {
//           // Show permission request UI
//           console.log(
//             "No registration token available. Request permission to generate one."
//           );
//         }
//       })
//       .catch((err) => {
//         console.log("An error occurred while retrieving token. ", err);
//       });
//   })
//   .catch(function (err) {
//     console.log("unable to get permission");
//   });

// onMessage(messaging, (payload) => {
//   console.log("message received:", payload);
// });
import { Navigate, useNavigate, useParams } from "react-router-dom";

function App() {
  const getUserId = () => {};
  // useEffect(() => {
  //   const sendFCMToken = async (userId, fcmToken) => {
  //     const firebaseConfig = {
  //       apiKey: "AIzaSyDcdI6ka8Jpf5NLMDoL7CJVpJwFnBzTMbI",
  //       authDomain: "notification-20f5b.firebaseapp.com",
  //       projectId: "notification-20f5b",
  //       storageBucket: "notification-20f5b.appspot.com",
  //       messagingSenderId: "764138157910",
  //       appId: "1:764138157910:web:1c68ecffc85787c0d888f7",
  //     };

  //     // Initialize Firebase
  //     const app = initializeApp(firebaseConfig);
  //     const messaging = getMessaging(app);
  //     Notification.requestPermission();
  //     // //   .then(function () {
  //     // //     console.log("Notification granted");
  //     // //     getToken(messaging, {
  //     // //       vapidKey:
  //     // //         "BGCGuhn-rYLSDIwlhTgDuE5ni_KZoGw1YKZKuo-u56qGYhaAMfwelCNU05xOZtNzih4ImUtetdGn_L5PuPEZOkY",
  //     // //     })
  //     const token = await getToken(messaging, {
  //       vapidKey:
  //         "BGCGuhn-rYLSDIwlhTgDuE5ni_KZoGw1YKZKuo-u56qGYhaAMfwelCNU05xOZtNzih4ImUtetdGn_L5PuPEZOkY",
  //     });
  //     // const userId = params.userId; // Replace with actual user ID

  //     const requestOptions = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         // Authorization: `Bearer ${await getToken()}`,
  //       },
  //       body: JSON.stringify({ fcmToken: token }),
  //     };
  //     console.log(userId);
  //     fetch(`${API}/fcmtoken/${userId}`, requestOptions)
  //       .then((response) => {
  //         if (response.ok) {
  //           console.log("FCM token sent successfully");
  //         } else {
  //           console.log("Failed to send FCM token");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  //   sendFCMToken(userId, fcmToken);
  // }, [userId, fcmToken]);
  // Notification.requestPermission().then((permission) => {
  //   if (permission === "granted") {
  //     console.log("Notification permission granted.");
  //     return messaging.getToken();
  //   } else {
  //     console.log("Unable to get permission to notify.");
  //   }
  // });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/newsfeed" element={<Newsfeed />} />
        <Route path="/user/:userId" element={<Profile />} />
        <Route path="/user/edit/:userId" element={<EditProfile />} />
        <Route path="/findpeople" element={<FindPeople />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/signup",
//     element: <Signup />,
//   },

//   {
//     path: "/newsfeed",
//     element: <Newsfeed />,
//   },
//   {
//     path: "/user/:userId",
//     element: <Profile />,
//   },
//   {
//     path: "/user/edit/:userId",
//     element: <EditProfile />,
//   },
// ]);

// export default router;
