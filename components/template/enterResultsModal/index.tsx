import React from 'react';
import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	Input,
	makeStyles,
	Typography,
} from '@material-ui/core';
import { PlayerContext } from 'context/player';
import { ScoreContext } from 'context/scores';
import { Dropdown } from 'components';
import { AddCircle, RemoveCircle } from '@material-ui/icons';
import { Score } from 'types/score';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '750px',
		height: '500px',
	},
	header: {
		fontWeight: 'bold',
		fontSize: 'small',
		textAlign: 'center',
	},
	checkbox: {
		padding: '0px 15px 0px 15px',
		alignItems: 'center',
	},
	addIcon: {
		fill: 'green',
	},
	removeIcon: {
		fill: 'red',
	},
}));

const ResultsModal = () => {
	const { players } = React.useContext(PlayerContext);
	const { scores, addScoreToList, removeScoreFromList } = React.useContext(
		ScoreContext,
	);

	const [playerName, setPlayerName] = React.useState<string>();
	const [victoryPoints, setVictoryPoints] = React.useState<number>();
	const [settlements, setSettlements] = React.useState<number>();
	const [cities, setCities] = React.useState<number>();
	const [devPoints, setDevPoints] = React.useState<number>();
	const [longestRoad, setLongestRoad] = React.useState<boolean>(false);
	const [largestArmy, setLargestArmy] = React.useState<boolean>(false);

	const classes = useStyles();

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const headers = [
		'Victory Points',
		'Settlements',
		'Cities',
		'Dev Points',
		'Longest Road',
		'Largest Army',
	];

	const playersWithoutScores = players.filter(
		(player) =>
			!scores.map((score) => score.playerName).includes(player.playerName),
	);

	const addScore = () => {
		if (!playerName) return;

		addScoreToList({
			playerName,
			victoryPoints,
			cities,
			settlements,
			devPoints,
			longestRoads: longestRoad ? 1 : 0,
			largestArmies: largestArmy ? 1 : 0,
		});

		setPlayerName('');
		setVictoryPoints(0);
		setSettlements(0);
		setCities(0);
		setDevPoints(0);
		setLongestRoad(false);
		setLargestArmy(false);
	};

	return (
		<>
			<Button variant="contained" color="secondary" onClick={handleClickOpen}>
				Enter Results
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				maxWidth="md"
			>
				<DialogTitle id="form-dialog-title">Enter Results</DialogTitle>
				<DialogContent className={classes.root}>
					<Grid container justify="space-between">
						<Grid item md={2}>
							<Typography className={classes.header}>Player Name</Typography>
						</Grid>
						{headers.map((header) => (
							<Grid item md={1}>
								<Typography className={classes.header}>{header}</Typography>
							</Grid>
						))}
						<Grid item md={1}></Grid>
					</Grid>
					<Grid container justify="space-between" alignItems="center">
						<Grid item md={2}>
							<Dropdown
								value={playerName}
								options={playersWithoutScores.map((player) => ({
									value: player.playerName,
									text: player.playerName,
								}))}
								onChange={(input) => setPlayerName(input.target.value)}
							/>
						</Grid>
						<Grid item md={1}>
							<Input
								type="number"
								value={victoryPoints}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									const val: string = e.target.value;

									if (isNaN(+val)) return;

									setVictoryPoints(+val);
								}}
							/>
						</Grid>
						<Grid item md={1}>
							<Input
								type="number"
								value={settlements}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									const val: string = e.target.value;

									if (isNaN(+val)) return;

									setSettlements(+val);
								}}
							/>
						</Grid>
						<Grid item md={1}>
							<Input
								type="number"
								value={cities}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									const val: string = e.target.value;

									if (isNaN(+val)) return;

									setCities(+val);
								}}
							/>
						</Grid>
						<Grid item md={1}>
							<Input
								type="number"
								value={devPoints}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									const val: string = e.target.value;

									if (isNaN(+val)) return;

									setDevPoints(+val);
								}}
							/>
						</Grid>
						<Grid item md={1}>
							<Checkbox
								className={classes.checkbox}
								color="primary"
								checked={longestRoad}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
									setLongestRoad(event.target.checked)
								}
							/>
						</Grid>
						<Grid item md={1}>
							<Checkbox
								className={classes.checkbox}
								color="primary"
								checked={largestArmy}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
									setLargestArmy(event.target.checked)
								}
							/>
						</Grid>
						<Grid item md={1}>
							<IconButton onClick={() => addScore()}>
								<AddCircle className={classes.addIcon} />
							</IconButton>
						</Grid>
					</Grid>

					{scores.map((score: Score) => (
						<Grid justify="space-between" alignItems="center" container>
							<Grid item md={2}>
								{score.playerName}
							</Grid>
							<Grid item md={1}>
								{score.victoryPoints}
							</Grid>
							<Grid item md={1}>
								{score.cities}
							</Grid>
							<Grid item md={1}>
								{score.settlements}
							</Grid>
							<Grid item md={1}>
								{score.devPoints}
							</Grid>
							<Grid item md={1}>
								{score.longestRoads}
							</Grid>
							<Grid item md={1}>
								{score.largestArmies}
							</Grid>
							<Grid item md={1}>
								<IconButton
									size="small"
									onClick={() => removeScoreFromList(score)}
								>
									<RemoveCircle className={classes.removeIcon} />
								</IconButton>
							</Grid>
						</Grid>
					))}
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button variant="contained" onClick={handleClose} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ResultsModal;
