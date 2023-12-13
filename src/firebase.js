import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKc1FtVrGg832J-nfTO8ci3WG7eRn6Xyg",
  authDomain: "proyecto-udemy-git-657ec.firebaseapp.com",
  projectId: "proyecto-udemy-git-657ec",
  storageBucket: "proyecto-udemy-git-657ec.appspot.com",
  messagingSenderId: "282176123209",
  appId: "1:282176123209:web:929ba3491c3de2ee7a6a98",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
