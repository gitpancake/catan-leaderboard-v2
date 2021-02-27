import { Game } from './game';
import { Score } from './score';

export interface League {
	_id?: string;
	name: string;
	games?: Game[];
	totalScores?: Score[];
}
