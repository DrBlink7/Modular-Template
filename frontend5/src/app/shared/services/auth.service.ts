import { Injectable, Optional } from '@angular/core';
import { Auth, GoogleAuthProvider, OAuthCredential, signInWithPopup, signOut, User, user, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, map, tap } from 'rxjs';
import { AppRoutingBuilder } from '../classes/app-routing-builder';
import { ESections } from '../constants/routing.constants';
import { IUser } from '../constants/user.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private provider: GoogleAuthProvider = new GoogleAuthProvider();

  // observable that is updated when the auth state changes
  user$: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);

  constructor(@Optional() private auth: Auth, private router: Router) {
    user(this.auth).pipe(
      map((user: User | null) => user ? {
        img: user.photoURL || '',
        uid: user.uid || ''
      } : null),
      tap((userData) => console.log(userData ? 'user logged in: ' + userData : 'user logged out'))
    )
      .subscribe(this.user$);
  }

  login(): void {
    signInWithPopup(this.auth, this.provider)
      .then((result: UserCredential) => {
        const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
        this.router.navigate([AppRoutingBuilder.fullPath([ESections.home])]).then(r => { });
        return credential;
      })
  }

  logout(): void {
    signOut(this.auth).then(
      () => {
        this.user$.next(null);
        this.router.navigate([AppRoutingBuilder.fullPath([ESections.login])]).then(r => { });
      }
    ).catch((error) => {
      console.error('sign out error: ' + error);
    })
  }

}
