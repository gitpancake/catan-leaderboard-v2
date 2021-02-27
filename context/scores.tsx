import React from 'react';

import { Score } from 'types/score';

interface Props {
	children: React.ReactElement;
}

type ScoreContextType = {
	scores: Score[];
	addScoreToList: (score: Score) => void;
	clearScoreList: () => void;
	removeScoreFromList: (score: Score) => void;
};

export const ScoreContext = React.createContext<ScoreContextType>({
	scores: [],
	addScoreToList: null,
	clearScoreList: null,
	removeScoreFromList: null,
});

const ScoreContextProvider = ({ children }: Props) => {
	const [scores, setScores] = React.useState<Score[]>([]);

	const addScoreToList = (score: Score) => {
		setScores([...scores, score]);
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
			value={{ scores, addScoreToList, clearScoreList, removeScoreFromList }}
		>
			{children}
		</ScoreContext.Provider>
	);
};

export default ScoreContextProvider;
