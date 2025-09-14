export interface IRequestMatch {
    search?: string;
    page?: number;
    limit?: number;
}

export interface IRequestHeadToHead {
    firstTeam: string[];
    secTeam: string[];
}