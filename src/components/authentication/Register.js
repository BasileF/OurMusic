import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { Redirect } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import 'firebase/database';

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.onRegister = this.onRegister.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onRegister() {
    const email = this.state.email;
    const password = this.state.password;
    const firstName = this.state.firstName;
    this.props.firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(authUser => {
      this.props.firebase.database().ref('users').child(authUser.user.uid).set({name: firstName});
    });
  }

  render() {
    return (
      <FirebaseAuthConsumer>
        {({ isSignedIn }) => {
          return (
            isSignedIn ?
              <Redirect to="/" />
              :
              <SignUp
                handleChange={this.handleChange}
                onRegister={this.onRegister}
              />
          );
        }}
      </FirebaseAuthConsumer>
    );
  }
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  card: {
    marginTop: theme.spacing(8),
    padding: '15px',
    backgroundColor: 'ivory'
  }
}));

function SignUp(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.card}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
        </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={props.handleChange}
                  onKeyUp={(e) => {
                    if (e.keyCode == 13) {
                      props.onRegister();
                    }
                  }}
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={props.handleChange}
                  onKeyUp={(e) => {
                    if (e.keyCode == 13) {
                      props.onRegister();
                    }
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={props.handleChange}
                  onKeyUp={(e) => {
                    if (e.keyCode == 13) {
                      props.onRegister();
                    }
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={props.handleChange}
                  onKeyUp={(e) => {
                    if (e.keyCode == 13) {
                      props.onRegister();
                    }
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              onClick={props.onRegister}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
          </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
              </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Paper>
    </Container>
  );
}