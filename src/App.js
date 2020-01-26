import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import { config } from './Config';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import logo from './logo.svg';
import './App.css';
import Home from './components/home/Home';

function App() {
  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login firebase={firebase}/>
          </Route>
          <Route path="/register">
            <Register firebase={firebase}/>
          </Route>
          <Route path="/">
            <Home firebase={firebase}/>
          </Route>
        </Switch>
      </Router>
    </FirebaseAuthProvider>
  );
}

export default App;
