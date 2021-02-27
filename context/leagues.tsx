import React from 'react';
import * as Apollo from '@apollo/client';

import * as leagueQueries from 'apollo/queries/leagues';
import { League } from 'types/league';
import { ApolloError } from '@apollo/client';

interface Props {
	children: React.ReactElement;
}

type LeagueContextType = {
	leagues: League[];
	error: ApolloError | null;
	loading?: boolean;
};

export const LeagueContext = React.createContext<LeagueContextType>({
	leagues: [],
	error: null,
});

const LeagueContextProvider = ({ children }: Props) => {
	const [leaguesList, setLeaguesList] = React.useState<League[]>([]);

	const { loading, error, data } = Apollo.useQuery<{ leagues: League[] }>(
		leagueQueries.GET_LEAGUES,
	);

	React.useEffect(() => {
		const setLeagues = () => {
			const { leagues } = data;

			setLeaguesList(leagues);
		};

		if (data || (!loading && !error)) {
			setLeagues();
		}
	}, [data]);

	return (
		<LeagueContext.Provider value={{ leagues: leaguesList, error, loading }}>
			{children}
		</LeagueContext.Provider>
	);
};

export default LeagueContextProvider;
