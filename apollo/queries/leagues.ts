import { gql } from '@apollo/client';

export const GET_LEAGUES = gql`
	query GetLeagues {
		leagues {
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
