import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  email: string = '';
  authState: any = null;
  userLoggedIn: boolean; // other components can check on this variable for the login status of the user

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.userLoggedIn = false;
    this.afAuth.onAuthStateChanged((user) => {
      // set up a subscription to always know the login status of the user
      if (user) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });
    this.afAuth.authState.subscribe((authState) => {
      this.authState = authState;
    });
  }

  get isAuthenticated(): boolean {
    return this.authState !== null;
  }

  get userEmail(): any {
    if (!this.isAuthenticated) {
      return '';
    }
    return this.authState.email;
  }

  deleteUser() {
    return this.afAuth.currentUser.then((user) => user?.delete());
  }

  logoutUser() {
    return this.afAuth.signOut();
  }

  loginUser(email: string, password: string): Promise<any> {
    this.afAuth.setPersistence('session');
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        localStorage.setItem('email', JSON.stringify(this.authState.userEmail));
        console.log('Auth Service: loginUser: success');
        // this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        console.log('Auth Service: login error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code) return { isValid: false, message: error.message };
        return;
      });
  }

  signupUser(user: any): Promise<any> {
    return this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        this.userLoggedIn = false;
        result.user!.sendEmailVerification(); // immediately send the user a verification email
      })
      .catch((error) => {
        console.log('Auth Service: signup error', error);
        if (error.code) return { isValid: false, message: error.message };
        return;
      });
  }
}
