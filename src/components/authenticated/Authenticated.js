import React from 'react';
import { makeStyles } from '@material-ui/core';
import Room from './room/Room';
import { Grid } from '@material-ui/core';
import Search from './search/Search';
import Results from './search/Results';
import Player from './Player';
const axios = require('axios');

export default class Authenticated extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      song: undefined,
      roomId: '',
      members: [],
      playing: undefined
    };

    this.submitSearch = this.submitSearch.bind(this);
    this.play = this.play.bind(this);
    this.create = this.create.bind(this);
    this.join = this.join.bind(this);
    this.skip = this.skip.bind(this);
  }

  submitSearch(search) {
    axios.get('http://localhost:5000/search/' + search)
      .then((response) => {
        console.log(response)
        this.setState({
          songs: response.data.songs
        });
      })
      .catch(function (error) {
        console.log("error");
      });
  }

  skip() {
    this.play(this.state.songs[Math.floor(Math.random() * 12)].id);
  }

  play(id) {
    const uid = this.props.firebase.auth().currentUser.uid;
    axios.get('http://localhost:5000/songs/' + id)
      .then((response) => {
        console.log(response);
        this.setState({
          song: response.data
        });
        if (uid==this.state.roomId) {
          this.props.firebase.database().ref('rooms/').child(uid).child('song').set(id);
        }
      })
      .catch(function (error) {
        console.log("error");
      });
      
  }

  create() {
    const uid = this.props.firebase.auth().currentUser.uid;
    if (this.state.roomId == '') {
      this.props.firebase.database().ref('users/').child(uid).child('name').on('value', s => {
        this.props.firebase.database().ref('rooms/').child(uid).set({
          song: 'none',
          state: false,
          time: 'none',
          members: {
            [uid]: s.val()
          }
        });
      });
    
      this.setState({
        roomId: uid
      })
      this.props.firebase.database().ref('rooms/').child(uid).child('members').on('value', snapshot => {
        let test = [];
        snapshot.forEach(x => {
          test.push(x.val());
        })
        this.setState({
          members: test
        });
      })
    } else if (this.state.roomId == uid) {
      this.props.firebase.database().ref('rooms/').set({[uid]: null});
      this.setState({
        roomId: ''
      })
    } else {
      this.props.firebase.database().ref('rooms/').child(this.state.roomId).child('members').child(uid).set(null);
      this.props.firebase.database().ref('rooms/').child(this.state.roomId).child('state').off();
      this.props.firebase.database().ref('rooms/').child(this.state.roomId).child('song').off();
      this.props.firebase.database().ref('rooms/').child(this.state.roomId).child('members').off();
      this.setState({
        roomId: '',
        members: [],
        playing: undefined,
        song: undefined
      });
    }
  }

  join() {
    const uid = this.props.firebase.auth().currentUser.uid;
    const roomId = prompt('Enter room ID:');
    this.props.firebase.database().ref('users/').child(uid).child('name').on('value', s => {
      this.props.firebase.database().ref('rooms/').child(roomId).child('members').child(uid).set(s.val());
    });
    
    this.setState({
      roomId: roomId
    });

    this.props.firebase.database().ref('rooms/').child(roomId).child('song').on('value', snapshot => {
      console.log(snapshot.val());
      if (snapshot.val() != 'none') {
        this.play(snapshot.val());
      }
    })

    this.props.firebase.database().ref('rooms/').child(roomId).child('state').on('value', snapshot => {
      console.log(snapshot.val());
      this.setState({
        playing: snapshot.val()
      });
    })

    this.props.firebase.database().ref('rooms/').child(roomId).child('members').on('value', snapshot => {
      let test = [];
      snapshot.forEach(x => {
        test.push(x.val());
      })
      this.setState({
        members: test
      });
    })
  }

  render() {
    return (
      <div>
        <SideMenu 
          firebase={this.props.firebase}
          members={this.state.members}
          roomId={this.state.roomId}
          create={this.create}
          join={this.join}
        />
        <Grid
          container
          spacing={2}
          style={{
            marginLeft: '250px',
            width: 'calc(100% - 250px)',
            padding: '0px 25px 0px 25px'
          }}>
          <Search
            submitSearch={this.submitSearch}
          />
          <Results
            songs={this.state.songs}
            play={this.play}
            roomId={this.state.roomId}
            firebase={this.props.firebase}
          />
        </Grid>
        <Player
          song={this.state.song}
          roomId={this.state.roomId}
          firebase={this.props.firebase}
          syncedPlaying={this.state.playing}
          skip={this.skip}
        />
      </div>
    )
  }
}

const useStyles = makeStyles({
  list: {
    width: 250,
    height: 'calc(100% - 48px)',
    backgroundColor: 'white',
    position: 'fixed',
    top: 0,
    boxShadow: '5px 0px 8px #888888'
  },
});

function SideMenu(props) {
  const classes = useStyles();
  return (
    <div
      className={classes.list}
    >
      <Room 
        firebase={props.firebase} 
        members={props.members}
        roomId={props.roomId}
        join={props.join}
        create={props.create}
      />
    </div>
  );
}