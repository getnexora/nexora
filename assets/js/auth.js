// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { 
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  signOut, setPersistence, browserLocalPersistence, browserSessionPersistence 
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { 
  getFirestore, doc, setDoc 
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBPYzbOzSgnEpYe_L_F-QLrr8cpAwkZyJk",
  authDomain: "nexora-prosuite.firebaseapp.com",// assets/js/auth.js
document.addEventListener("DOMContentLoaded", () => {
  const togglePassword = document.getElementById("togglePassword");
  const passwordField = document.getElementById("password");

  togglePassword.addEventListener("click", () => {
    const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
  });

  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    alert(`Welcome back, ${username}! (demo only, no backend yet)`);
  });
});
  projectId: "nexora-prosuite",
  storageBucket: "nexora-prosuite.firebasestorage.app",
  messagingSenderId: "367987127145",
  appId: "1:367987127145:web:be983d04a0b769a4b183f8",
  measurementId: "G-LRP2XBZ7HS"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup
async function signup(email, password, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user profile in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      createdAt: new Date()
    });

    alert("Signup successful!");
    window.location.href = "profile.html"; // redirect after signup
  } catch (error) {
    alert("Signup error: " + error.message);
  }
}

// Login with Remember Me
async function login(email, password) {
  try {
    const rememberMe = document.getElementById("rememberMe").checked;

    // Set persistence based on checkbox
    await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);

    await signInWithEmailAndPassword(auth, email, password);

    alert("Login successful!");
    window.location.href = "profile.html"; // redirect after login
  } catch (error) {
    alert("Login error: " + error.message);
  }
}

// Hook up forms
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signupName").value;
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;
      signup(email, password, name);
    });
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      login(email, password);
    });
  }
});
