import React from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

export default class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			search: ""
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {
		return (
			<Grid
				item
				sm={12}
				xs={6}
			>
				<SearchBar
					handleChange={this.handleChange}
					submitSearch={this.props.submitSearch}
					search={this.state.search}
				/>
			</Grid>
		);
	}
}

const useStyles = makeStyles(theme => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
	divider: {
		height: 28,
		margin: 4,
	},
}));

function SearchBar(props) {
	const classes = useStyles();

	return (
		<Paper className={classes.root}>
			<InputBase
				value={props.search}
				onKeyUp={(e) => {
					if (e.keyCode == 13) {
						props.submitSearch(props.search)
					}
				}}
				onChange={props.handleChange}
				name="search"
				className={classes.input}
				placeholder="Search for music"
				inputProps={{ 'aria-label': 'search google maps' }}
			/>
			<Divider className={classes.divider} orientation="vertical" />
			<IconButton onClick={() => props.submitSearch(props.search)} className={classes.iconButton} aria-label="search">
				<SearchIcon />
			</IconButton>
		</Paper>
	);
}