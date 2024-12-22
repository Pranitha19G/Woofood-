  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAvH1dcJDaF9ZlHRGENRHrdoMJJDVpLhrc",
    authDomain: "authentification-3aa87.firebaseapp.com",
    projectId: "authentification-3aa87",
    storageBucket: "authentification-3aa87.firebasestorage.app",
    messagingSenderId: "240048337560",
    appId: "1:240048337560:web:fda5ae24343a3200e816ed"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
const db = getFirestore(app);

// Registration function
async function register(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: userCredential.user.email,
      uid: userCredential.user.uid,
      createdAt: new Date()
    });
    alert("User registered successfully!");
  } catch (error) {
    console.error("Registration error:", error);
    alert(error.message);
  }
}

// Sign-in function
async function signIn(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Sign in successful!");
    window.location.href='main.html';
  } catch (error) {
    console.error("Sign-in error:", error);
    alert(error.message);
  }

}

// Event listeners for form submission
document.getElementById("btn1").addEventListener("click", (e) => {
  e.preventDefault();
  register(document.getElementById("remail").value, document.getElementById("rpassword").value);
});

document.getElementById("btn2").addEventListener("click", (e) => {
  e.preventDefault();
  signIn(document.getElementById("email").value, document.getElementById("password").value);
});
document.getElementById("guest").addEventListener("click",() => {
  window.location.href="main.html";
  alert("Now you can access as a guest");

});