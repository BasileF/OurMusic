import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import './song.css';
const axios = require('axios');

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    whiteSpace: 'nowrap',
  },
  cover: {
    width: 50,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

var input = document.getElementById("myInput");

export default function Song(props) {
  const classes = useStyles();
  const theme = useTheme();
  const canClick = props.uid == props.roomId || props.roomId == '';
  return (
    <Grid
      item
      sm={4}
      xs={12}
    >
      <Card className={classes.card} className="song" onClick={canClick ? () => props.play(props.song.id) : () => {}}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h6" style={{textOverflow: 'ellipsis', overflow: 'hidden'}}>
              {props.song.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {props.song.artistName}
            </Typography>
          </CardContent>
        </div>
        <CardMedia
          className={classes.cover}
          image="/static/images/cards/live-from-space.jpg"
          title="Live from space album cover"
        />
      </Card>
    </Grid>
  );
}