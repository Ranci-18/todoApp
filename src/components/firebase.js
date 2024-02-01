// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoxCuglp_h73nrN_WEcOy6nXsxWK4s5oI",
  authDomain: "frank-s-to-do-app.firebaseapp.com",
  projectId: "frank-s-to-do-app",
  storageBucket: "frank-s-to-do-app.appspot.com",
  messagingSenderId: "859503154219",
  appId: "1:859503154219:web:06b7ebf8bf50efc043466e",
  measurementId: "G-2BXGQ6E8M4"
};

// Initialize Firebase
if (typeof window !== "undefined" && isSupported()) {
  const analytics = getAnalytics(app);
} else {
  console.warn("Firebase analytics is not supported in this browser.");
}
const app = initializeApp(firebaseConfig);


export default app;