import React from 'react';
import Header from './Header';
import Authenticated from '../authenticated/Authenticated';
import './home.css';

import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header firebase={this.props.firebase}/>
        <FirebaseAuthConsumer>
            {({ isSignedIn, user, providerId }) => {
              return (
                isSignedIn ?<div></div>:
                   <div style={{width: '100%', textAlign: 'center'}}><img id='logo' src='./newlogorotate.png' /></div>
                  
              );
            }}
          </FirebaseAuthConsumer>
        
        <IfFirebaseAuthed>
          <Authenticated firebase={this.props.firebase} />
        </IfFirebaseAuthed>
      </div>  
      
    );
  }
}