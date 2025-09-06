// Import Firebase SDKs (make sure you included firebase-app.js, firebase-auth.js, firebase-firestore.js in your HTML)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// ✅ Firebase config from your Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyBPYzbOzSgnEpYe_L_F-QLrr8cpAwkZyJk",
  authDomain: "nexora-prosuite.firebaseapp.com",
  projectId: "nexora-prosuite",
  storageBucket: "nexora-prosuite.appspot.com",
  messagingSenderId: "367987127145",
  appId: "1:367987127145:web:be983d04a0b769a4b183f8",
  measurementId: "G-LRP2XBZ7HS"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ------------------ AUTH FUNCTIONS ------------------

// Signup
async function signup(email, password, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Save user profile in Firestore
    await setDoc(doc(db, "users", uid), {
      name: name,
      email: email,
      apps: []
    });

    alert("Signup successful!");
  } catch (error) {
    alert("Signup error: " + error.message);
  }
}

// Login
async function login(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
  } catch (error) {
    alert("Login error: " + error.message);
  }
}

// Logout
async function logout() {
  try {
    await signOut(auth);
    alert("Logged out successfully!");
  } catch (error) {
    alert("Logout error: " + error.message);
  }
}

// ------------------ AUTH STATE LISTENER ------------------
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("User logged in: ", user.uid);

    // Fetch user profile
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("User profile: ", docSnap.data());
      document.getElementById("profile-name").innerText = docSnap.data().name;
    } else {
      console.log("No profile found.");
    }
  } else {
    console.log("User logged out.");
    document.getElementById("profile-name").innerText = "Guest";
  }
});

// ------------------ ATTACH TO HTML FORMS ------------------
window.signup = signup;
window.login = login;
window.logout = logout;
