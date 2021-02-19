import Head from 'next/head';
import { useQuery } from '@apollo/client';
import { Table } from 'components';
import { Grid, makeStyles, Typography } from '@material-ui/core';

import { GET_LEAGUES } from 'apollo/queries/leagues';
import { League } from 'types/league';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(3),
	},
}));

export default function Home() {
	const classes = useStyles();

	const { loading, error, data } = useQuery<{ leagues: League[] }>(GET_LEAGUES);

	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Grid container justify="center" className={classes.root}>
				<Grid item md={12}>
					{loading ? (
						<Typography>Loading...</Typography>
					) : (
						<Table
							scores={data.leagues.find((x) => x.name === 'ATest').totalScores}
						/>
					)}
				</Grid>
			</Grid>

			<footer></footer>
		</div>
	);
}
