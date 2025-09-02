export interface MatchResponse<T = object> {
    data: T;
    statusCode: number;
}