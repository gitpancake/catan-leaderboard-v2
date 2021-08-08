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
import { KeyboardDatePicker } from '@material-ui/pickers';
import { PlayerContext } from 'context/player';
import { ScoreContext } from 'context/scores';
import { LeagueContext } from 'context/leagues';
import { Dropdown, Table } from 'components';
import { AddCircle } from '@material-ui/icons';
import { time } from 'console';

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
	dropdownContainer: {
		paddingTop: '14px',
	},
}));

const ResultsModal = () => {
	const { players } = React.useContext(PlayerContext);
	const {
		scores,
		createGame,
		addScoreToList,
		removeScoreFromList,
	} = React.useContext(ScoreContext);
	const { leagues } = React.useContext(LeagueContext);

	const [league, setLeague] = React.useState<string>();
	const [gameDate, setGameDate] = React.useState<Date>(new Date());
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
				<Grid container justify="space-between">
					<Grid item md={6}>
						<DialogTitle className={classes.dropdownContainer}>
							Enter Results
						</DialogTitle>
					</Grid>
					<Grid item md={6}>
						<DialogTitle>
							<Grid container justify="space-between">
								<Grid item md={6}>
									<KeyboardDatePicker
										disableToolbar
										variant="inline"
										format="dd/MM/yyyy"
										margin="normal"
										id="date-picker-inline"
										value={gameDate}
										onChange={(date: Date | null) => setGameDate(date)}
										KeyboardButtonProps={{
											'aria-label': 'change date',
										}}
									/>
								</Grid>
								<Grid item md={5} className={classes.dropdownContainer}>
									<Dropdown
										value={league}
										options={leagues.map((league) => ({
											value: league._id,
											text: league.name,
										}))}
										onChange={(input) => setLeague(input.target.value)}
									/>
								</Grid>
							</Grid>
						</DialogTitle>
					</Grid>
				</Grid>
				<DialogContent className={classes.root}>
					<Grid container justify="space-between">
						<Grid item md={2}>
							<Typography className={classes.header}>Player Name</Typography>
						</Grid>

						{headers.map((header, index) => (
							<Grid item md={1} key={index}>
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

					{scores.length > 0 && (
						<Table
							scores={scores}
							deleteFunction={(score) => removeScoreFromList(score)}
						/>
					)}
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button
						variant="contained"
						onClick={async () => {
							await createGame(gameDate, scores, league);
							setOpen(false);
							// window.location.reload();
						}}
						color="primary"
						disabled={!league || scores.length <= 0}
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ResultsModal;
