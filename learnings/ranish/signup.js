
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";

import {getAuth,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDOT2krZGgCIdH3UoBA3FFV984rKnfnIEk",
  authDomain: "agglomeration-project.firebaseapp.com",
  projectId: "agglomeration-project",
  storageBucket: "agglomeration-project.firebasestorage.app",
  messagingSenderId: "116434044665",
  appId: "1:116434044665:web:9ebef05a798ba91e700428",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

let signupbtn = document.querySelector(".signup-btn");

signupbtn.addEventListener("click", (event) => {
  event.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmp = document.getElementById("confirm-password").value;
  

  if(password==confirmp)
  {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });

  }
  else
  {
    alert("Re-enter password")
  }

  
});
