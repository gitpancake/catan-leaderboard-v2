import React from 'react';
import * as Apollo from '@apollo/client';

import { Score } from 'types/score';
import * as Games from 'apollo/queries/games';

interface Props {
	children: React.ReactElement;
}

type ScoreContextType = {
	scores: Score[];
	createGame: (date: Date, scores: Score[], leagueId: string) => void;
	addScoreToList: (score: Score) => void;
	clearScoreList: () => void;
	removeScoreFromList: (score: Score) => void;
};

export const ScoreContext = React.createContext<ScoreContextType>({
	scores: [],
	createGame: null,
	addScoreToList: null,
	clearScoreList: null,
	removeScoreFromList: null,
});

const ScoreContextProvider = ({ children }: Props) => {
	const [scores, setScores] = React.useState<Score[]>([]);

	const addScoreToList = (score: Score) => {
		setScores([...scores, score]);
	};

	const [addNewGame] = Apollo.useMutation(Games.CREATE_GAME, {
		refetchQueries: ['leagues'],
	});

	const createGame = (date: Date, scores: Score[], leagueId: string) => {
		addNewGame({
			variables: { date, leagueId, scores },
		});
	};

	const clearScoreList = () => setScores([]);

	const removeScoreFromList = (score: Score) => {
		const scoreIndex = scores.findIndex(
			(scoreItem) => scoreItem.playerName === score.playerName,
		);

		const newScores = scores;

		newScores.splice(scoreIndex, 1);

		setScores([...newScores]);
	};

	return (
		<ScoreContext.Provider
			value={{
				scores,
				createGame,
				addScoreToList,
				clearScoreList,
				removeScoreFromList,
			}}
		>
			{children}
		</ScoreContext.Provider>
	);
};

export default ScoreContextProvider;
