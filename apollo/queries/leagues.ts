import { gql } from '@apollo/client';

export const GET_LEAGUES = gql`
	query GetLeagues {
		leagues {
			_id
			name
			totalScores {
				playerName
				cities
				settlements
				victoryPoints
				longestRoads
				largestArmies
				devPoints
			}
		}
	}
`;

export const CREATE_LEAGUE = gql`
	mutation CreateLeague($name: String!) {
		createLeague(userPayload: { name: $name }) {
			_id
			name
		}
	}
`;
