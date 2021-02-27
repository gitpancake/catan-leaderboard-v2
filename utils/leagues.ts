import { League } from 'types/league';

export const getLeagueNames = (leagues: League[]): string[] =>
	leagues.map((league) => league.name);

export const findLeagueByName = (
	leagues: League[],
	leagueName: string,
): League => leagues.find((league) => league.name === leagueName);
