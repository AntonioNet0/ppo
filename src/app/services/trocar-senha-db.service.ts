import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { TrocarSenha } from '../shared/trocar-senha';
import { Router } from '@angular/router';

var auth = firebase.auth();
var emailAddress = "user@example.com";

auth.sendPasswordResetEmail(emailAddress).then(function() {
  // Email sent.
}).catch(function(error) {
  // An error happened.
});