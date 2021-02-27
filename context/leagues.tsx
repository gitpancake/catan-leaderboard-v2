import React from 'react';
import * as Apollo from '@apollo/client';

import * as Leagues from 'apollo/queries/leagues';
import { League } from 'types/league';

interface Props {
	children: React.ReactElement;
}

type LeagueContextType = {
	leagues: League[];
	createLeague: (name: string) => void;
	error: Apollo.ApolloError | null;
	loading?: boolean;
};

export const LeagueContext = React.createContext<LeagueContextType>({
	leagues: [],
	createLeague: null,
	error: null,
});

const LeagueContextProvider = ({ children }: Props) => {
	const [leaguesList, setLeaguesList] = React.useState<League[]>([]);

	const { loading, error, data } = Apollo.useQuery<{ leagues: League[] }>(
		Leagues.GET_LEAGUES,
	);

	const [addNewLeague] = Apollo.useMutation(Leagues.CREATE_LEAGUE, {
		update(cache, { data: { createLeague } }) {
			cache.modify({
				fields: {
					leagues(existingLeagues = []) {
						const newLeagueRef = cache.writeFragment({
							data: createLeague,
							fragment: Apollo.gql`
								fragment NewLeague on League {
									_id
									type
								}
							`,
						});
						return [...existingLeagues, newLeagueRef];
					},
				},
			});
		},
	});

	const createLeague = (name: string) => addNewLeague({ variables: { name } });

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
		<LeagueContext.Provider
			value={{ leagues: leaguesList, createLeague, error, loading }}
		>
			{children}
		</LeagueContext.Provider>
	);
};

export default LeagueContextProvider;
