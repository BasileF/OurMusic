import React from 'react';
import ReactPlayer from 'react-player';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { CardMedia, CardContent } from '@material-ui/core';

export default class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false
    }

    this.play = this.play.bind(this);
  }

  play() {
    const current = this.state.playing;
    const uid = this.props.firebase.auth().currentUser.uid;
    if (this.props.roomId == uid) {
      this.props.firebase.database().ref('rooms/').child(uid).child('state').set(!current);
      this.setState({
        playing: !current
      });
    } else if (this.props.roomId == '') {
      this.setState({
        playing: !current
      });
    }
  }

  render() {
    const imageUrl = this.props.song ? this.props.song.artist.jackets["50"] : undefined;
    console.log(imageUrl);
    return (
      <div>
        <ReactPlayer
          url={this.props.song ? this.props.song.playUrl : undefined}
          playing={this.props.syncedPlaying == undefined ? this.state.playing : this.props.syncedPlaying}
          width={0}
          height={0}
        />
        <Grid
          container
          direction='row'
          justify='center'
          style={{
            position: 'fixed',
            bottom: 0,
            backgroundColor: 'white',
            boxShadow: '5px 0px 8px #888888'
          }}
        >
          <CardMedia
            image={imageUrl}
            title={this.props.song ? this.props.song.title : undefined}
            style={{
              width: '50px',
              height: '50px',
              position: 'absolute',
              left: 0
            }}
          />
          <CardContent
            style={{
              bottom: '2px',
              left: '50px',
              paddingLeft: '5px',
              position: 'absolute',
              padding: '0px 0px 0px 5px'
            }}
          >
            <Typography variant='body2'>
              {this.props.song ? this.props.song.title : undefined}
            </Typography>
            <Typography variant="caption">
              {this.props.song ? this.props.song.artist.name : undefined}
            </Typography>
          </CardContent>
          <IconButton aria-label="previous">
            <SkipPreviousIcon />
          </IconButton>
          <IconButton aria-label="play/pause" onClick={this.play}>
            {this.state.playing ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <IconButton aria-label="next" onClick={this.props.skip}>
            <SkipNextIcon />
          </IconButton>
        </Grid>
      </div>
    );
  }
}