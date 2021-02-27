import { gql } from '@apollo/client';

export const GET_GAMES = gql`
	query GetGames {
		games {
			date
			scores {
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

export const CREATE_GAME = gql`
	mutation CreateGame(
		$date: String!
		$leagueId: String!
		$scores: [ScoreInput]
	) {
		createGame(
			userPayload: { date: $date, leagueId: $leagueId, scores: $scores }
		) {
			_id
			date
			scores {
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
