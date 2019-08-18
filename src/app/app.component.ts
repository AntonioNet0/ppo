import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ppo';

  ngOnInit(){
    let firebaseConfig = {
      apiKey: "AIzaSyARd6H2Cen1499RM56Fr8zD0q9IiflagG0",
      authDomain: "sistema-academico-ppo.firebaseapp.com",
      databaseURL: "https://sistema-academico-ppo.firebaseio.com",
      projectId: "sistema-academico-ppo",
      storageBucket: "",
      messagingSenderId: "576893790807",
      appId: "1:576893790807:web:a771311aef2b0e60"
    }
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
  }

}
