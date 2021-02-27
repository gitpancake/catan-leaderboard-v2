import * as React from 'react';
import Head from 'next/head';
import * as Apollo from '@apollo/client';
import { Dropdown, Table } from 'components';
import { Grid, makeStyles, Typography } from '@material-ui/core';

import { GET_LEAGUES } from 'apollo/queries/leagues';
import { League } from 'types/league';
import { getLeagueNames, findLeagueByName } from 'utils/leagues';
import { LeagueContext } from 'context/leagues';
import { Score } from 'types/score';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(3),
	},
	headerGrid: {
		marginBottom: theme.spacing(2),
	},
}));

export default function Home() {
	const classes = useStyles();

	const [currentLeague, setCurrentLeague] = React.useState<League | null>(null);
	const [leagueNames, setLeagueNames] = React.useState<string[] | null>(null);

	const { leagues, error, loading } = React.useContext(LeagueContext);

	React.useEffect(() => {
		const sortData = () => {
			const foundLeague = findLeagueByName(leagues, 'ATest');
			const filteredLeagueNames = getLeagueNames(leagues);

			setCurrentLeague(foundLeague ?? leagues[0]);
			setLeagueNames(filteredLeagueNames);
		};

		if (leagues) sortData();
	}, [leagues]);

	if (loading || error) {
		return <Typography>Loading...</Typography>;
	}

	if (!currentLeague) {
		return (
			<Typography color="error">Error, failed to load a league</Typography>
		);
	}
	return (
		<div>
			<Head>
				<title>Catan Leaderboard</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Grid container justify="center" className={classes.root}>
				<Grid
					item
					md={12}
					container
					justify="space-between"
					className={classes.headerGrid}
				>
					<Grid item md={6}>
						<Typography variant="h5">{currentLeague.name}</Typography>
					</Grid>
					<Grid item md={3}>
						{leagueNames && (
							<Dropdown
								value={currentLeague.name}
								onChange={(event) => {
									const newLeague = findLeagueByName(
										leagues,
										event.target.value,
									);

									setCurrentLeague(newLeague);
								}}
								options={leagueNames.map((name) => ({
									value: name,
									text: name,
								}))}
							/>
						)}
					</Grid>
				</Grid>
				<Grid item md={12}>
					{error ? (
						<Typography color="error">Error</Typography>
					) : (
						<>
							{loading || !currentLeague ? (
								<Typography>Loading...</Typography>
							) : (
								<Table
									scores={currentLeague.totalScores
										.slice()
										.sort(
											(a: Score, b: Score) => b.victoryPoints - a.victoryPoints,
										)}
								/>
							)}
						</>
					)}
				</Grid>
			</Grid>

			<footer></footer>
		</div>
	);
}
