import React from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Score } from 'types/score';
import { RemoveCircle } from '@material-ui/icons';

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	minLineHeight: {
		lineHeight: '10px',
	},
	removeIcon: {
		fill: 'red',
	},
	header: {
		fontWeight: 'bold',
	},
});

interface Props {
	scores: Score[];
	deleteFunction?: (score: Score) => void;
}

const LeagueScoreTable = ({ scores, deleteFunction }: Props) => {
	const classes = useStyles();

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell className={classes.header}>Player Name</TableCell>
						<TableCell align="center" className={classes.header}>
							Victory Points
						</TableCell>
						<TableCell align="center" className={classes.header}>
							Settlements
						</TableCell>
						<TableCell align="center" className={classes.header}>
							Cities
						</TableCell>
						<TableCell align="center" className={classes.header}>
							Longest Roads
						</TableCell>
						<TableCell align="center" className={classes.header}>
							Largest Armies
						</TableCell>
						<TableCell align="center" className={classes.header}>
							Dev Card Pts
						</TableCell>
						{deleteFunction && <TableCell />}
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
								<TableCell align="center">{score.settlements}</TableCell>
								<TableCell align="center">{score.cities}</TableCell>
								<TableCell align="center">{score.longestRoads}</TableCell>
								<TableCell align="center">{score.largestArmies}</TableCell>
								<TableCell align="center">{score.devPoints}</TableCell>
								{deleteFunction && (
									<TableCell align="center">
										<IconButton
											size="small"
											onClick={() => deleteFunction(score)}
										>
											<RemoveCircle className={classes.removeIcon} />
										</IconButton>
									</TableCell>
								)}
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default LeagueScoreTable;
