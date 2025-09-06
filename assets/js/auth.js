// Import Firebase SDK functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPYzbOzSgnEpYe_L_F-QLrr8cpAwkZyJk",
  authDomain: "nexora-prosuite.firebaseapp.com",
  projectId: "nexora-prosuite",
  storageBucket: "nexora-prosuite.firebasestorage.app",
  messagingSenderId: "367987127145",
  appId: "1:367987127145:web:be983d04a0b769a4b183f8",
  measurementId: "G-LRP2XBZ7HS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// =======================
// Authentication Functions
// =======================

// Register new user
async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("✅ Account created:", userCredential.user.email);
    window.location.href = "profile.html"; // redirect after signup
  } catch (error) {
    alert("❌ Signup Error: " + error.message);
  }
}

// Login user
async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("✅ Logged in:", userCredential.user.email);
    window.location.href = "profile.html"; // redirect after login
  } catch (error) {
    alert("❌ Login Error: " + error.message);
  }
}

// Logout user
async function logoutUser() {
  try {
    await signOut(auth);
    console.log("✅ Logged out");
    window.location.href = "login.html";
  } catch (error) {
    alert("❌ Logout Error: " + error.message);
  }
}

// =======================
// Hook into your HTML forms
// =======================

// Signup form
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    registerUser(email, password);
  });
}

// Login form
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    loginUser(email, password);
  });
}

// Logout button
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", logoutUser);
}
