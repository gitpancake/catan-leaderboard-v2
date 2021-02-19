import { Game } from './game';
import { Score } from './score';

export interface League {
	name: string;
	games?: Game[];
	totalScores?: Score[];
}
