import { Injectable, NgZone } from '@angular/core';
import { IUser } from '../interfaces';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument, } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { finalize, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

export interface CreateUserDto { uid: string, username: string, email: string, password: string, photoURL: string, phoneNumber: number, city: string, emailVerified: boolean }

export interface UpdateUserDto { uid: string; username:string, photoURL: string, photo: any, city: string, phoneNumber: number }

export interface LoginUserDto { email: string, password: string }

export interface ResetPasswordUserDto { email: string}

@Injectable({ providedIn: 'root' })
export class UserService {

  currentUser!: any;

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = getAuth().currentUser;
    return user !== null && user.emailVerified !== false ? true : false;
  }

  constructor(
    public db: AngularFirestore, // Inject Firestore service
    public Auth: AngularFireAuth, // Inject Firebase auth service
    public dbStorage: AngularFireStorage, 
    public router: Router,
    public ngZone: NgZone) {
      /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.Auth.authState.subscribe((user) => {
      if (user) {
        this.currentUser = user;
        localStorage.setItem('email', JSON.stringify(this.currentUser));
        JSON.parse(localStorage.getItem('email')!);
      } else {
        localStorage.setItem('email', 'null');
        JSON.parse(localStorage.getItem('email')!);
      }
    });
  }

  // Sign up with email/password
  SignUp(user: CreateUserDto) {
    return this.Auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        user.uid = result.user!.uid;
        user.emailVerified = result.user!.emailVerified;
        this.SetUserData(user);        
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.Auth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['email-verification']);
      });
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(
      `users/${user.uid}`
    );
    const userData: IUser = {
      uid: user.uid,
      email: user.email,
      username: user.username,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      city: user.city,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Log in with email/password
  LogIn(email: string, password: string) {
    return this.Auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.ngZone.run(() => {
          this.router.navigate(['profile']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Auth log in to run auth providers
  AuthLogin(provider: any) {
    return this.Auth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['profile']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.Auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Емийлът е изпратен успешно. Моля проверете го, също така и папката спам.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  //Updating current user profile
  UpdateProfile(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(
      `users/${user.uid}`
    );
    const _photoURL = this.dbStorage.ref(user.photoURL);

    this.dbStorage.upload(user.photoURL, user.photo).snapshotChanges().pipe(
      finalize(()=>{          
        _photoURL.getDownloadURL().subscribe((url) =>{
          user.photoURL = url;
        })
      })
    ).subscribe();
    
    const userData = {
      username: user.username,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      city: user.city,
    };
    userRef.update(userData)
    .then(() => {
      window.alert('Профилът е ъпдейтнат успешно');
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
    })
    .catch((error) => {
      window.alert(error.message);
    });;
  }

  // Getting current user data
  GetCurrentUserData$(): Observable<any> {
    return this.db.collection("users")
    .valueChanges({ idField: 'uid' == this.currentUser.uid });
  }
  
  // Getting current user data
  GetPublisherData$(uid: string): Observable<any> {
    return this.db.collection("users")
    .valueChanges({ idField: 'uid' == uid });
  }

   // Log out
   LogOut() {
    return this.Auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}

