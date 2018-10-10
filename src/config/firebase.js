import * as firebase from "firebase";

import { FirebaseConfig } from "../config/keys";
firebase.initializeApp(FirebaseConfig);

export const databaseRef = firebase.database().ref();
export const menuRef = databaseRef.child("menu");
export const taxesRef = databaseRef.child("taxes");
export const userRef = databaseRef.child('user');