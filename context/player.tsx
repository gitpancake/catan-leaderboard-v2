import React from 'react';
import * as Apollo from '@apollo/client';

import * as playerQueries from 'apollo/queries/players';
import { Player } from 'types/player';
import { ApolloError } from '@apollo/client';
import { SignalCellularNullSharp } from '@material-ui/icons';

interface Props {
	children: React.ReactElement;
}

type PlayerContextType = {
	players: Player[];
	error: ApolloError | null;
	loading?: boolean;
};

export const PlayerContext = React.createContext<PlayerContextType>({
	players: [],
	error: null,
});

const PlayerContextProvider = ({ children }: Props) => {
	const [playersList, setPlayersList] = React.useState<Player[]>([]);

	const { loading, error, data } = Apollo.useQuery<{ players: Player[] }>(
		playerQueries.GET_PLAYERS,
	);

	React.useEffect(() => {
		const setPlayers = () => {
			const { players } = data;

			setPlayersList(players);
		};

		if (data || (!loading && !error)) {
			setPlayers();
		}
	}, [data]);

	return (
		<PlayerContext.Provider value={{ players: playersList, loading, error }}>
			{children}
		</PlayerContext.Provider>
	);
};

export default PlayerContextProvider;
