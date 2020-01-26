import React from 'react';
import { List, ListItem, Divider, ListItemText, Button, Grid } from '@material-ui/core';
import 'firebase/database';

export default class Room extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      members: [],
      roomId: ''
    };
  }

  render() {
    const uid = this.props.firebase.auth().currentUser.uid;
    return (
      <div
        style={{
          height: '50%'
        }}
      >
        <List
          style={{
            padding: 0
          }}
        >
          <ListItem>
            <Grid
              container
              spacing={1}
            >
              <Grid item sm={6}>
                <Button fullWidth onClick={this.props.join} disabled={this.props.roomId != ''}>JOIN</Button>
              </Grid>
              <Grid item sm={6}>
                <Button fullWidth onClick={this.props.create}>{this.props.roomId == '' ? 'CREATE' : 'LEAVE'}</Button>
              </Grid>
            </Grid>
          </ListItem>
        </List>
        <Divider />
        <List>
          {
            this.props.members.length == 0 &&
            <ListItem>
              <ListItemText>
                Create a shared session and send the code to your friends! You can also join an existing session with a share code!
              </ListItemText>
            </ListItem>
          }
          {
            uid == this.props.roomId &&
            <div>
            <ListItem>
              <ListItemText>
                <span style={{fontSize: '0.84rem'}}>Your share code: {uid}</span>
              </ListItemText>
            </ListItem>
            <Divider />
            </div>
          }
          {
            this.props.members.map(x =>
              <ListItem>
                {x}
              </ListItem>
            )
          }
        </List>
      </div>
    );
  }
}