import { Component, HostBinding, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @HostBinding('@.disabled')
  public animationsDisabled = false;

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDpsWNo4De8I5f8O9UtvCA5TgD54dnYkQk",
      authDomain: "conservicorrida.firebaseapp.com"
    });
  }
}

// Important note: If you're using Firebase 5.x or higher (you can check the 
// package.json  file to find out), you should use getIdToken()  for obtaining the token,
// NOT getToken()  as shown in the next lectures.
