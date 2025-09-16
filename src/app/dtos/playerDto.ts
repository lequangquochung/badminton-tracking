export interface PlayerDto {
    id?: string;
    name: string;
    winRate: string;
    score: number;
    matchesPlayed: number;
    matchesWon: number;
    matchesLost: number;
    partnerInfo: [];
    gender: string;
}