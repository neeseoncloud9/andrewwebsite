import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, setPersistence, browserSessionPersistence } from "firebase/auth";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'andywebsite';
  loggedin: boolean = false;
  constructor(
    public auth: Auth,
  ) { 
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.loggedin = true;
      } else {
        this.loggedin = false;
      }
    })
  }
  
  signInClicked(): void {
    const auth = getAuth();
    const user = auth.currentUser;
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

  signOutClicked(): void {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      this.loggedin = false;
    }).catch((error) => {
      // An error happened.
    });
  }
}
