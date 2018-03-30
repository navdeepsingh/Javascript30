importScripts('https://www.gstatic.com/firebasejs/4.4.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.4.0/firebase-messaging.js');
var config = {
  apiKey: "AIzaSyCqwFbV3J6uDaH6qGFZlMEptumEzsRQv-M",
  authDomain: "pwa-hello-world-7127b.firebaseapp.com",
  databaseURL: "https://pwa-hello-world-7127b.firebaseio.com",
  projectId: "pwa-hello-world-7127b",
  storageBucket: "pwa-hello-world-7127b.appspot.com",
  messagingSenderId: "165974926428"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
 const title = 'Hello World';
 const options = {
  body: payload.data.body
 };
 return self.registration.showNotification(title, options);
});
