import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.css'],
})
export class LogoutPageComponent implements OnInit {
  message = '';
  logoutForm: FormGroup;
  firebaseErrorMessage: string = '';
  showPopUp = false;

  constructor(
    private title: Title,
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    title.setTitle('Logout - Thrifty');
    this.logoutForm = new FormGroup('');
  }

  ngOnInit(): void {}

  logoutUser() {
    console.log('Log status' + localStorage.getItem('isUserLoggedIn'));

    if (this.authService.userLoggedIn) {
      this.authService.logoutUser();
      this.message = 'User logged out successfully.';
      this.showPopUp = true;
    } else {
      this.message = 'Please log in first. ';
      this.showPopUp = true;
    }
  }
}
