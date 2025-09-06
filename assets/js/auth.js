// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// ✅ Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "YOUR-PROJECT.firebaseapp.com",
  projectId: "YOUR-PROJECT-ID",
  storageBucket: "YOUR-PROJECT.appspot.com",
  messagingSenderId: "YOUR-SENDER-ID",
  appId: "YOUR-APP-ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Register user
window.register = function () {
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      alert("Registered successfully!");
    })
    .catch(error => {
      alert(error.message);
    });
};

// Login user
window.login = function () {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      alert("Login successful!");
      window.location.href = "profile.html";
    })
    .catch(error => {
      alert(error.message);
    });
};

// Logout user
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};

// Detect auth state
onAuthStateChanged(auth, user => {
  const profileInfo = document.getElementById("profile-info");
  if (profileInfo) {
    if (user) {
      profileInfo.innerHTML = `
        <p><strong>Email:</strong> ${user.email}</p>
        <p>User ID: ${user.uid}</p>
      `;
    } else {
      profileInfo.innerHTML = `<p>Please <a href="login.html">login</a>.</p>`;
    }
  }
});

