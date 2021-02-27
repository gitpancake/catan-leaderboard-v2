import { gql } from '@apollo/client';

export const GET_PLAYERS = gql`
	query GetPlayers {
		players {
			_id
			playerName
		}
	}
`;
