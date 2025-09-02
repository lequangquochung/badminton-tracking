export interface MatchesDto {
    id?: string;
    firstPlayer: string;
    secPlayer: string;
    thirdPlayer: string;
    fourthPlayer: string;
    firstScore: number;
    secScore: number;
    winner: string[];
    matchDay: Date;
}