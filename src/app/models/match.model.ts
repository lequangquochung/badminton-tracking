export interface IMatch {
    _id?: string;
    firstPlayer: string;
    secPlayer: string;
    thirdPlayer: string;
    fourthPlayer: string;
    firstScore: number;
    secScore: number;
    winner: string[];
    matchDay: Date | undefined;
    type?: string;
}

export interface IHeadToHead {
    historyByTeam: {
        matchesPlayed: number;
        firstTeamPairWins: number;
        secTeamPairWins: number;
        winRateFirstTeamPair: string
        winRateSecTeamPair: string;
    }
}

