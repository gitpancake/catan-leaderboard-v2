import React from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Score } from 'types/score';

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	minLineHeight: {
		lineHeight: '10px',
	},
});

interface Props {
	scores: Score[];
}

const LeagueScoreTable = ({ scores }: Props) => {
	const classes = useStyles();

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Player Name</TableCell>
						<TableCell align="center">Victory Points</TableCell>
						<TableCell align="center">Cities</TableCell>
						<TableCell align="center">Settlements</TableCell>
						<TableCell align="center">Longest Roads</TableCell>
						<TableCell align="center">Largest Armies</TableCell>
						<TableCell align="center">Dev Card Pts</TableCell>
						{/* <TableCell align="center" className={classes.minLineHeight}>
							Average
							<br />
							<small>(score / games played)</small>
						</TableCell> */}
					</TableRow>
				</TableHead>
				<TableBody>
					{scores &&
						scores.map((score) => (
							<TableRow key={score.playerName}>
								<TableCell component="th" scope="score">
									{score.playerName}
								</TableCell>
								<TableCell align="center">{score.victoryPoints}</TableCell>
								<TableCell align="center">{score.cities}</TableCell>
								<TableCell align="center">{score.settlements}</TableCell>
								<TableCell align="center">{score.longestRoads}</TableCell>
								<TableCell align="center">{score.largestArmies}</TableCell>
								<TableCell align="center">{score.devPoints}</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default LeagueScoreTable;
