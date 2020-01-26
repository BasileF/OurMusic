import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          backgroundColor: 'inherit',
          boxShadow: 'none'
        }
      }>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          </Typography>
          <FirebaseAuthConsumer>
            {({ isSignedIn, user, providerId }) => {
              return (
                isSignedIn ?
                  <Button
                    color="inherit"
                    onClick={(e) => { props.firebase.auth().signOut() }}
                  >Logout</Button> :
                  <Button
                    color="inherit"
                    href="/login"
                  >Login</Button>
              );
            }}
          </FirebaseAuthConsumer>
        </Toolbar>
      </AppBar>
    </div>
  );
}