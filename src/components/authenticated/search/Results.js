import React from 'react';
import { Grid } from '@material-ui/core';
import Song from './Song';

export default function Result(props) {
  const uid = props.firebase.auth().currentUser.uid;
  return (
    <Grid
      item
      sm={12}
    >
      <Grid
        container
        spacing={1}
      >
        {
          props.songs.map((x) => 
            <Song 
              song={x}
              play={props.play}
              roomId={props.roomId}
              uid={uid}
            />)
        }
      </Grid>
    </Grid>
  );
}